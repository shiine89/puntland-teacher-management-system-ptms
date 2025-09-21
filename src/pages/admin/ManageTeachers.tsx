import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Search, 
  Edit, 
  Trash2,
  Plus,
  Eye,
  Filter
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

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = () => {
    const stored = localStorage.getItem("teachers");
    const teacherData = stored ? JSON.parse(stored) : [];
    console.log("Loading teachers data:", teacherData);
    console.log("First teacher structure:", teacherData[0]);
    setTeachers(teacherData);
  };

  const deleteTeacher = (id: number) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      const updated = teachers.filter(t => t.id !== id);
      localStorage.setItem("teachers", JSON.stringify(updated));
      setTeachers(updated);
      
      toast({
        title: "Success!",
        description: "Teacher deleted successfully",
      });
    }
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Manage Teachers</h1>
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
                          <Button size="sm" variant="outline" title="View Details">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" title="Edit">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteTeacher(teacher.id)}
                            className="text-destructive hover:text-destructive"
                            title="Delete"
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
    </div>
  );
};

export default ManageTeachers;