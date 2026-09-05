import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Book, 
  Search, 
  Edit, 
  Trash2,
  Plus,
  Save
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Subject {
  id: number;
  subjectName: string;
  subjectCode: string;
  description: string;
  category: string;
  createdDate: string;
}

const ManageSubjects = () => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editForm, setEditForm] = useState({
    subjectName: "",
    subjectCode: "",
    description: "",
    category: ""
  });

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = () => {
    const stored = localStorage.getItem("subjects");
    setSubjects(stored ? JSON.parse(stored) : []);
  };

  const openEditDialog = (subject: Subject) => {
    setEditingSubject(subject);
    setEditForm({
      subjectName: subject.subjectName,
      subjectCode: subject.subjectCode,
      description: subject.description,
      category: subject.category
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editingSubject) return;

    const updatedSubjects = subjects.map(subject =>
      subject.id === editingSubject.id
        ? { ...subject, ...editForm }
        : subject
    );

    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    setSubjects(updatedSubjects);
    setEditDialogOpen(false);
    setEditingSubject(null);

    toast({
      title: "Success!",
      description: "Subject updated successfully",
    });
  };

  const deleteSubject = (id: number) => {
    const updated = subjects.filter(s => s.id !== id);
    localStorage.setItem("subjects", JSON.stringify(updated));
    setSubjects(updated);
    
    toast({
      title: "Success!",
      description: "Subject deleted successfully",
    });
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Book className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Manage Subjects</h1>
            <p className="text-muted-foreground">View and manage all subjects in the system</p>
          </div>
        </div>

        <Link to="/admin/subjects/add">
          <Button className="ptms-btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card className="ptms-card">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search subjects by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ptms-input pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Subjects Table */}
      <Card className="ptms-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Book className="w-5 h-5 text-primary" />
            Subjects ({filteredSubjects.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          {filteredSubjects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="ptms-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>Subject Name</th>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map((subject, index) => (
                    <tr key={subject.id}>
                      <td className="font-medium">{index + 1}</td>
                      <td className="font-medium text-foreground">{subject.subjectName}</td>
                      <td>
                        <span className="ptms-badge-primary">
                          {subject.subjectCode || 'N/A'}
                        </span>
                      </td>
                      <td>{subject.category || 'General'}</td>
                      <td>{subject.createdDate}</td>
                       <td>
                         <div className="flex gap-2">
                           <Button 
                             size="sm" 
                             variant="outline"
                             onClick={() => openEditDialog(subject)}
                           >
                             <Edit className="w-4 h-4" />
                           </Button>
                           
                           <AlertDialog>
                             <AlertDialogTrigger asChild>
                               <Button 
                                 size="sm" 
                                 variant="outline"
                                 className="text-destructive hover:text-destructive"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </Button>
                             </AlertDialogTrigger>
                             <AlertDialogContent>
                               <AlertDialogHeader>
                                 <AlertDialogTitle>Delete Subject</AlertDialogTitle>
                                 <AlertDialogDescription>
                                   Are you sure you want to delete "{subject.subjectName}"? This action cannot be undone.
                                 </AlertDialogDescription>
                               </AlertDialogHeader>
                               <AlertDialogFooter>
                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                                 <AlertDialogAction
                                   onClick={() => deleteSubject(subject.id)}
                                   className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                 >
                                   Delete
                                 </AlertDialogAction>
                               </AlertDialogFooter>
                             </AlertDialogContent>
                           </AlertDialog>
                         </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Book className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Subjects Found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "Try adjusting your search criteria" : "Start by adding your first subject"}
              </p>
              <Link to="/admin/subjects/add">
                <Button className="ptms-btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Subject
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-subject-name">Subject Name</Label>
              <Input
                id="edit-subject-name"
                placeholder="Enter subject name"
                value={editForm.subjectName}
                onChange={(e) => setEditForm({...editForm, subjectName: e.target.value})}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-subject-code">Subject Code</Label>
              <Input
                id="edit-subject-code"
                placeholder="Enter subject code (e.g., MATH101)"
                value={editForm.subjectCode}
                onChange={(e) => setEditForm({...editForm, subjectCode: e.target.value})}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={editForm.category} onValueChange={(value) => setEditForm({...editForm, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Core">Core</SelectItem>
                  <SelectItem value="Elective">Elective</SelectItem>
                  <SelectItem value="Laboratory">Laboratory</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Language">Language</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter subject description"
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>
              <Save className="w-4 h-4 mr-2" />
              Update Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageSubjects;