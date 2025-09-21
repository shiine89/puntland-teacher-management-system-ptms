import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter,
  User,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import { useState, useEffect } from "react";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Load teachers from localStorage
  useEffect(() => {
    const storedTeachers = localStorage.getItem('teachers');
    if (storedTeachers) {
      const parsedTeachers = JSON.parse(storedTeachers);
      // Add IDs if they don't exist
      const teachersWithIds = parsedTeachers.map((teacher, index) => ({
        ...teacher,
        id: teacher.id || index + 1
      }));
      setTeachers(teachersWithIds);
    } else {
      // Fallback mock data if no registered teachers
      const mockTeachers = [
        {
          id: 1,
          fullname: "Ahmed Mohamed Hassan",
          gender: "Male",
          phone: "+252-90-123-4567",
          email: "ahmed.hassan@email.com",
          education: "University",
          subjects: ["Mathematics", "Physics"],
          experience: "5",
          experienceDetails: "Teaching high school mathematics and physics",
          location: "Bari",
          qualification: "Master's in Mathematics",
          majorSubjects: "Pure Mathematics, Applied Physics",
          joiningDate: "2024-01-01",
          registrationDate: "2024-01-15"
        },
        {
          id: 2,
          fullname: "Fatima Ali Yusuf",
          gender: "Female", 
          phone: "+252-90-987-6543",
          email: "fatima.yusuf@email.com",
          education: "University",
          subjects: ["Faculty of Education"],
          experience: "8",
          experienceDetails: "Primary and secondary English education",
          location: "Nugaal",
          qualification: "Bachelor's in English Literature",
          majorSubjects: "English Literature, Curriculum Development",
          joiningDate: "2023-09-01",
          registrationDate: "2024-02-20"
        }
      ];
      setTeachers(mockTeachers);
    }
  }, []);

  const filteredTeachers = teachers.filter(teacher =>
    (teacher.fullname || teacher.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subjects.some(subject => 
      subject.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    (teacher.qualification || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (teacher.majorSubjects || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Listed <span className="text-gradient-primary">Teachers</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse all registered teachers in our comprehensive database
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or subject..."
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

        {/* Teachers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher, index) => (
            <Card key={teacher.id} className="ptms-card animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    {teacher.image ? (
                      <img 
                        src={teacher.image} 
                        alt={teacher.fullname || teacher.fullName} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg text-foreground">{teacher.fullname || teacher.fullName}</CardTitle>
                    <p className="text-muted-foreground text-sm">{teacher.gender}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{teacher.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{teacher.email}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{teacher.education}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{teacher.location || teacher.region}</span>
                </div>

                {teacher.qualification && (
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{teacher.qualification}</span>
                  </div>
                )}

                {teacher.joiningDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">Available from: {teacher.joiningDate}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">Registered: {teacher.registrationDate}</span>
                </div>

                <div className="pt-3">
                  <p className="text-sm font-medium text-foreground mb-2">Teaching Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject, i) => (
                      <Badge key={i} className="ptms-badge-primary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {teacher.majorSubjects && (
                  <div className="pt-2">
                    <p className="text-sm font-medium text-foreground mb-2">Major Subjects:</p>
                    <p className="text-sm text-muted-foreground">{teacher.majorSubjects}</p>
                  </div>
                )}

                <div className="pt-3 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-success border-success">
                    {teacher.experience} years experience
                  </Badge>
                  {teacher.cv && (
                    <Badge variant="outline" className="text-primary border-primary">
                      CV Available
                    </Badge>
                  )}
                </div>

                {teacher.experienceDetails && (
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground italic">
                      "{teacher.experienceDetails}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Teachers Found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Teachers;