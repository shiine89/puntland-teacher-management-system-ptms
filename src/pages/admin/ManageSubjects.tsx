import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Book, 
  Search, 
  Edit, 
  Trash2,
  Plus
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

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = () => {
    const stored = localStorage.getItem("subjects");
    setSubjects(stored ? JSON.parse(stored) : []);
  };

  const deleteSubject = (id: number) => {
    if (confirm("Are you sure you want to delete this subject?")) {
      const updated = subjects.filter(s => s.id !== id);
      localStorage.setItem("subjects", JSON.stringify(updated));
      setSubjects(updated);
      
      toast({
        title: "Success!",
        description: "Subject deleted successfully",
      });
    }
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
            <h1 className="text-4xl font-bold text-foreground">Manage Subjects</h1>
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
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteSubject(subject.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
    </div>
  );
};

export default ManageSubjects;