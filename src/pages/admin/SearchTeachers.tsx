import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter,
  User,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Calendar,
  RefreshCw
} from "lucide-react";
import { useState, useEffect } from "react";

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
}

const SearchTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    education: "",
    region: "",
    gender: ""
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchCriteria, teachers]);

  const loadTeachers = () => {
    const stored = localStorage.getItem("teachers");
    const teacherData = stored ? JSON.parse(stored) : [];
    console.log("Loading teachers data:", teacherData);
    console.log("Education levels found:", teacherData.map(t => t.education));
    setTeachers(teacherData);
    setFilteredTeachers(teacherData);
  };

  const applyFilters = () => {
    console.log("Applying filters with criteria:", searchCriteria);
    let filtered = teachers;

    // Filter by name
    if (searchCriteria.name.trim()) {
      filtered = filtered.filter(teacher =>
        teacher.fullName?.toLowerCase().includes(searchCriteria.name.toLowerCase().trim())
      );
    }

    // Filter by subject
    if (searchCriteria.subject.trim()) {
      filtered = filtered.filter(teacher =>
        teacher.subjects?.some(subject =>
          subject?.toLowerCase().includes(searchCriteria.subject.toLowerCase().trim())
        )
      );
    }

    // Filter by email
    if (searchCriteria.email.trim()) {
      filtered = filtered.filter(teacher =>
        teacher.email?.toLowerCase().includes(searchCriteria.email.toLowerCase().trim())
      );
    }

    // Filter by phone
    if (searchCriteria.phone.trim()) {
      filtered = filtered.filter(teacher =>
        teacher.phone?.includes(searchCriteria.phone.trim())
      );
    }

    // Filter by education level (handle typos in legacy data)
    if (searchCriteria.education && searchCriteria.education !== "all") {
      console.log(`Filtering by education: ${searchCriteria.education}`);
      const beforeFilter = filtered.length;
      filtered = filtered.filter(teacher => {
        // Normalize teacher education to fix typos
        const normalizedTeacherEducation = teacher.education?.toLowerCase()
          .replace('seondary', 'secondary'); // Fix typo from legacy data
        
        const normalizedSearchEducation = searchCriteria.education.toLowerCase();
        
        const match = normalizedTeacherEducation === normalizedSearchEducation;
        console.log(`Teacher ${teacher.fullName} education: "${teacher.education}" (normalized: "${normalizedTeacherEducation}") - Search: "${normalizedSearchEducation}" - Match: ${match}`);
        return match;
      });
      console.log(`Education filter: ${beforeFilter} -> ${filtered.length}`);
    }

    // Filter by region
    if (searchCriteria.region && searchCriteria.region !== "all") {
      filtered = filtered.filter(teacher =>
        teacher.region?.toLowerCase() === searchCriteria.region.toLowerCase()
      );
    }

    // Filter by gender
    if (searchCriteria.gender && searchCriteria.gender !== "all") {
      filtered = filtered.filter(teacher =>
        teacher.gender?.toLowerCase() === searchCriteria.gender.toLowerCase()
      );
    }

    console.log(`Final filtered results: ${filtered.length}`);
    setFilteredTeachers(filtered);
  };

  const handleCriteriaChange = (field: string, value: string) => {
    setSearchCriteria(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setSearchCriteria({
      name: "",
      subject: "",
      email: "",
      phone: "",
      education: "",
      region: "",
      gender: ""
    });
  };

  const hasActiveFilters = Object.values(searchCriteria).some(value => value !== "");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 animate-fade-in">
        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
          <Search className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Search Teachers</h1>
          <p className="text-muted-foreground">Find teachers by name, subject, or other criteria</p>
        </div>
      </div>

      {/* Search Filters */}
      <Card className="ptms-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-secondary" />
            Search Filters
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name">Teacher Name</Label>
              <Input
                id="name"
                placeholder="Search by name..."
                value={searchCriteria.name}
                onChange={(e) => handleCriteriaChange('name', e.target.value)}
                className="ptms-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Search by email..."
                value={searchCriteria.email}
                onChange={(e) => handleCriteriaChange('email', e.target.value)}
                className="ptms-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Search by phone..."
                value={searchCriteria.phone}
                onChange={(e) => handleCriteriaChange('phone', e.target.value)}
                className="ptms-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Search by subject..."
                value={searchCriteria.subject}
                onChange={(e) => handleCriteriaChange('subject', e.target.value)}
                className="ptms-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education Level</Label>
              <Select value={searchCriteria.education || "all"} onValueChange={(value) => handleCriteriaChange('education', value === "all" ? "" : value)}>
                <SelectTrigger className="ptms-input">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                  <SelectItem value="masters">Masters</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select value={searchCriteria.region || "all"} onValueChange={(value) => handleCriteriaChange('region', value === "all" ? "" : value)}>
                <SelectTrigger className="ptms-input">
                  <SelectValue placeholder="All regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Bari">Bari</SelectItem>
                  <SelectItem value="Nugaal">Nugaal</SelectItem>
                  <SelectItem value="Mudug">Mudug</SelectItem>
                  <SelectItem value="Karkaar">Karkaar</SelectItem>
                  <SelectItem value="Sanaag">Sanaag</SelectItem>
                  <SelectItem value="Sool">Sool</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={searchCriteria.gender || "all"} onValueChange={(value) => handleCriteriaChange('gender', value === "all" ? "" : value)}>
                <SelectTrigger className="ptms-input">
                  <SelectValue placeholder="All genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Found {filteredTeachers.length} teacher(s)</span>
            {hasActiveFilters && (
              <Badge variant="outline" className="text-primary border-primary">
                Filters Active
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card className="ptms-card animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Search className="w-5 h-5 text-secondary" />
            Search Results ({filteredTeachers.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          {filteredTeachers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher, index) => (
                <Card key={teacher.id} className="ptms-card animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">{teacher.fullName}</CardTitle>
                        <p className="text-muted-foreground text-sm">{teacher.gender}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{teacher.phone || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground break-all">{teacher.email || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{teacher.education || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{teacher.region || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">Registered: {teacher.registrationDate || 'N/A'}</span>
                    </div>

                    <div className="pt-3">
                      <p className="text-sm font-medium text-foreground mb-2">Subjects:</p>
                      <div className="flex flex-wrap gap-2">
                        {teacher.subjects && teacher.subjects.length > 0 ? (
                          teacher.subjects.map((subject, i) => (
                            <Badge key={i} className="ptms-badge-primary">
                              {subject}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline">No subjects listed</Badge>
                        )}
                      </div>
                    </div>

                    {teacher.experience && (
                      <div className="pt-3">
                        <Badge variant="outline" className="text-success border-success">
                          {teacher.experience} years experience
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Teachers Found
              </h3>
              <p className="text-muted-foreground mb-6">
                {hasActiveFilters 
                  ? "Try adjusting your search criteria to find more results"
                  : "No teachers are registered in the system yet"
                }
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchTeachers;