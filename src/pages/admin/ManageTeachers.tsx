import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Search, 
  Edit, 
  Trash2,
  Plus,
  Eye,
  Filter,
  Save
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Teacher {
  id: number;
  fullName: string;
  gender: string;
  phone: string;
  email: string;
  education: string;
  subjects: string[];
  experience: string;
  region: string;
  registrationDate: string;
  status: string;
}

const ManageTeachers = () => {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteTeacherId, setDeleteTeacherId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState<Set<number>>(new Set());
  const [editingSubjects, setEditingSubjects] = useState<string[]>([]);
  const [customSubjects, setCustomSubjects] = useState<string[]>([]);

  useEffect(() => {
    loadTeachers();
    loadCustomSubjects();
  }, []);

  const loadCustomSubjects = () => {
    const subjects = JSON.parse(localStorage.getItem("subjects") || "[]");
    const subjectNames = subjects.map((s: any) => s.subjectName);
    setCustomSubjects(subjectNames);
  };

  const loadTeachers = () => {
    const stored = localStorage.getItem("teachers");
    const teacherData = stored ? JSON.parse(stored) : [];
    console.log("Loading teachers data:", teacherData);
    console.log("First teacher structure:", teacherData[0]);
    setTeachers(teacherData);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setEditingSubjects([...teacher.subjects]);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingTeacher) return;

    // Validate subjects
    const validSubjects = editingSubjects.filter(subject => subject.trim() !== "");
    if (validSubjects.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one subject",
        variant: "destructive"
      });
      return;
    }

    const updatedTeacher = { ...editingTeacher, subjects: validSubjects };
    const updatedTeachers = teachers.map(t => 
      t.id === updatedTeacher.id ? updatedTeacher : t
    );
    
    localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
    setTeachers(updatedTeachers);
    setIsEditDialogOpen(false);
    setEditingTeacher(null);
    setEditingSubjects([]);
    
    toast({
      title: "Success!",
      description: "Teacher updated successfully",
    });
  };

  const handleDeleteClick = (id: number) => {
    setDeleteTeacherId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTeacherId !== null) {
      const teacherToDelete = teachers.find(t => t.id === deleteTeacherId);
      const updated = teachers.filter(t => t.id !== deleteTeacherId);
      localStorage.setItem("teachers", JSON.stringify(updated));
      setTeachers(updated);
      
      toast({
        title: "Success!",
        description: `${teacherToDelete?.fullName || 'Teacher'} has been deleted successfully`,
      });
    }
    setIsDeleteDialogOpen(false);
    setDeleteTeacherId(null);
  };

  const toggleDetails = (teacherId: number) => {
    const newVisibleDetails = new Set(visibleDetails);
    if (newVisibleDetails.has(teacherId)) {
      newVisibleDetails.delete(teacherId);
    } else {
      newVisibleDetails.add(teacherId);
    }
    setVisibleDetails(newVisibleDetails);
  };

  const filteredTeachers = teachers.filter(teacher => {
    console.log("Filtering teacher:", teacher);
    
    if (!teacher) {
      console.log("Teacher is null/undefined");
      return false;
    }
    
    const nameMatch = (teacher.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const emailMatch = (teacher.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const subjectsMatch = (teacher.subjects || []).some(subject => {
      console.log("Checking subject:", subject);
      return (subject?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    });
    
    return nameMatch || emailMatch || subjectsMatch;
  });

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...editingSubjects];
    newSubjects[index] = value;
    setEditingSubjects(newSubjects);
  };

  const addSubject = () => {
    if (editingSubjects.length < 5) {
      setEditingSubjects([...editingSubjects, ""]);
    }
  };

  const removeSubject = (index: number) => {
    if (editingSubjects.length > 1) {
      const newSubjects = editingSubjects.filter((_, i) => i !== index);
      setEditingSubjects(newSubjects);
    }
  };

  const getSubjectOptions = () => {
    const schoolSubjects = [
      "Math", "Physics", "Biology", "Chemistry",
      "English", "Arabic", "History", "Geography", "Islamic", "Computer"
    ];
    
    const universityFaculties = [
      "Faculty of Engineering", "Faculty of Education", "Faculty of Business",
      "Faculty of Science", "Faculty of Medicine", "Faculty of Law", "Faculty of Agriculture"
    ];

    if (!editingTeacher) return [];
    
    if (editingTeacher.education.toLowerCase() === 'university') {
      return [...universityFaculties, ...customSubjects];
    } else {
      return [...schoolSubjects, ...customSubjects];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Manage Teachers</h1>
            <p className="text-muted-foreground">View and manage all registered teachers</p>
          </div>
        </div>

        <Link to="/admin/teachers/add">
          <Button className="ptms-btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Teacher
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="ptms-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ptms-input pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Table */}
      <Card className="ptms-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            Teachers ({filteredTeachers.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          {filteredTeachers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="ptms-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Level</th>
                    <th>Registration Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher, index) => (
                    <>
                      <tr key={teacher.id}>
                        <td className="font-medium">{index + 1}</td>
                        <td>
                          <div>
                            <div className="font-medium text-foreground">{teacher.fullName}</div>
                            <div className="text-sm text-muted-foreground">
                              {teacher.subjects.slice(0, 2).join(', ')}
                              {teacher.subjects.length > 2 && '...'}
                            </div>
                          </div>
                        </td>
                        <td>{teacher.gender}</td>
                        <td className="text-sm">{teacher.phone}</td>
                        <td className="text-sm">{teacher.email}</td>
                        <td>
                          <Badge className="ptms-badge-primary">
                            {teacher.education}
                          </Badge>
                        </td>
                        <td>{teacher.registrationDate}</td>
                        <td>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => toggleDetails(teacher.id)}
                              title={visibleDetails.has(teacher.id) ? "Hide Details" : "View Details"}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleEditTeacher(teacher)}
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteClick(teacher.id)}
                              className="text-destructive hover:text-destructive"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {visibleDetails.has(teacher.id) && (
                        <tr className="bg-muted/50">
                          <td colSpan={8}>
                            <div className="p-4 space-y-3">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-muted-foreground">Experience:</span>
                                  <p className="text-foreground">{teacher.experience} years</p>
                                </div>
                                <div>
                                  <span className="font-medium text-muted-foreground">Region:</span>
                                  <p className="text-foreground">{teacher.region || 'Not specified'}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-muted-foreground">Status:</span>
                                  <Badge variant="outline" className="mt-1">
                                    {teacher.status || 'Active'}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">All Subjects:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {teacher.subjects.map((subject, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {subject}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Teachers Found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "Try adjusting your search criteria" : "Start by adding your first teacher"}
              </p>
              <Link to="/admin/teachers/add">
                <Button className="ptms-btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Teacher
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      {teachers.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4 animate-bounce-in">
          <Card className="ptms-card">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-primary mb-1">{teachers.length}</h3>
              <p className="text-muted-foreground text-sm">Total Teachers</p>
            </CardContent>
          </Card>
          
          <Card className="ptms-card">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-success mb-1">
                {teachers.filter(t => t.education === 'University' || t.education === 'Masters' || t.education === 'PhD').length}
              </h3>
              <p className="text-muted-foreground text-sm">University Qualified</p>
            </CardContent>
          </Card>
          
          <Card className="ptms-card">
            <CardContent className="p-4 text-center">
              <h3 className="text-2xl font-bold text-secondary mb-1">
                {new Set(teachers.flatMap(t => t.subjects)).size}
              </h3>
              <p className="text-muted-foreground text-sm">Unique Subjects</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Teacher Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>
              Update teacher information below.
            </DialogDescription>
          </DialogHeader>
          
          {editingTeacher && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-fullName">Full Name *</Label>
                  <Input
                    id="edit-fullName"
                    value={editingTeacher.fullName}
                    onChange={(e) => setEditingTeacher({...editingTeacher, fullName: e.target.value})}
                    className="ptms-input"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Gender *</Label>
                  <Select 
                    value={editingTeacher.gender} 
                    onValueChange={(value) => setEditingTeacher({...editingTeacher, gender: value})}
                  >
                    <SelectTrigger className="ptms-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone *</Label>
                  <Input
                    id="edit-phone"
                    value={editingTeacher.phone}
                    onChange={(e) => setEditingTeacher({...editingTeacher, phone: e.target.value})}
                    className="ptms-input"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email *</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingTeacher.email}
                    onChange={(e) => setEditingTeacher({...editingTeacher, email: e.target.value})}
                    className="ptms-input"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-education">Education Level *</Label>
                  <Select 
                    value={editingTeacher.education} 
                    onValueChange={(value) => setEditingTeacher({...editingTeacher, education: value})}
                  >
                    <SelectTrigger className="ptms-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-region">Region</Label>
                  <Select 
                    value={editingTeacher.region} 
                    onValueChange={(value) => setEditingTeacher({...editingTeacher, region: value})}
                  >
                    <SelectTrigger className="ptms-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bari">Bari</SelectItem>
                      <SelectItem value="nugaal">Nugaal</SelectItem>
                      <SelectItem value="mudug">Mudug</SelectItem>
                      <SelectItem value="karkaar">Karkaar</SelectItem>
                      <SelectItem value="sanaag">Sanaag</SelectItem>
                      <SelectItem value="sool">Sool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-experience">Experience (Years)</Label>
                  <Input
                    id="edit-experience"
                    type="number"
                    min="0"
                    max="50"
                    value={editingTeacher.experience}
                    onChange={(e) => setEditingTeacher({...editingTeacher, experience: e.target.value})}
                    className="ptms-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select 
                    value={editingTeacher.status || 'Active'} 
                    onValueChange={(value) => setEditingTeacher({...editingTeacher, status: value})}
                  >
                    <SelectTrigger className="ptms-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Teaching Subjects */}
              <div className="space-y-2">
                <Label>Teaching Subjects *</Label>
                {editingSubjects.map((subject, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Select 
                        value={subject} 
                        onValueChange={(value) => handleSubjectChange(index, value)}
                      >
                        <SelectTrigger className="ptms-input">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {getSubjectOptions().map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {editingSubjects.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSubject(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {editingSubjects.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSubject}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Subject
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the teacher's record from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Teacher
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageTeachers;