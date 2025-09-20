import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  UserPlus, 
  User, 
  Mail, 
  Phone, 
  GraduationCap,
  FileText,
  Upload,
  Save
} from "lucide-react";
import { useState } from "react";

const AddTeacher = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    phone: "",
    email: "",
    education: "",
    subjects: "",
    experience: "",
    region: "",
    qualifications: "",
    status: "active"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['fullName', 'gender', 'phone', 'email', 'education', 'subjects'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Get existing teachers
    const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
    
    // Check for duplicate email
    const exists = teachers.some((t: any) => t.email === formData.email);
    
    if (exists) {
      toast({
        title: "Error",
        description: "A teacher with this email already exists",
        variant: "destructive"
      });
      return;
    }

    // Add new teacher
    const newTeacher = {
      id: Date.now(),
      ...formData,
      subjects: formData.subjects.split(',').map(s => s.trim()),
      registrationDate: new Date().toLocaleDateString()
    };

    teachers.push(newTeacher);
    localStorage.setItem("teachers", JSON.stringify(teachers));

    toast({
      title: "Success!",
      description: "Teacher added successfully",
    });

    // Reset form
    setFormData({
      fullName: "",
      gender: "",
      phone: "",
      email: "",
      education: "",
      subjects: "",
      experience: "",
      region: "",
      qualifications: "",
      status: "active"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 animate-fade-in">
        <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
          <UserPlus className="w-6 h-6 text-success" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Add Teacher</h1>
          <p className="text-muted-foreground">Register a new teacher in the system</p>
        </div>
      </div>

      <Card className="ptms-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="w-5 h-5 text-success" />
            Teacher Registration Form
          </CardTitle>
          <CardDescription>
            Fill in all required information for the new teacher
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="ptms-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="ptms-input">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+252-90-XXX-XXXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="ptms-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="teacher.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="ptms-input"
                  required
                />
              </div>
            </div>

            {/* Education & Region */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Education Level *
                </Label>
                <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                  <SelectTrigger className="ptms-input">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Secondary">Secondary</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="University">University</SelectItem>
                    <SelectItem value="Masters">Masters</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={formData.region} onValueChange={(value) => handleInputChange('region', value)}>
                  <SelectTrigger className="ptms-input">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bari">Bari</SelectItem>
                    <SelectItem value="Nugaal">Nugaal</SelectItem>
                    <SelectItem value="Mudug">Mudug</SelectItem>
                    <SelectItem value="Karkaar">Karkaar</SelectItem>
                    <SelectItem value="Sanaag">Sanaag</SelectItem>
                    <SelectItem value="Sool">Sool</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Subjects & Experience */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subjects">Teaching Subjects *</Label>
                <Input
                  id="subjects"
                  placeholder="e.g., Mathematics, Physics (comma separated)"
                  value={formData.subjects}
                  onChange={(e) => handleInputChange('subjects', e.target.value)}
                  className="ptms-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Teaching Experience</Label>
                <Input
                  id="experience"
                  placeholder="e.g., 5 years"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="ptms-input"
                />
              </div>
            </div>

            {/* Qualifications */}
            <div className="space-y-2">
              <Label htmlFor="qualifications" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Additional Qualifications & Certifications
              </Label>
              <Textarea
                id="qualifications"
                placeholder="List any additional qualifications, certifications, or achievements..."
                value={formData.qualifications}
                onChange={(e) => handleInputChange('qualifications', e.target.value)}
                className="ptms-input min-h-[100px]"
              />
            </div>

            {/* File Uploads */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cv" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload CV (PDF)
                </Label>
                <Input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="ptms-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Profile Photo
                </Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="ptms-input"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-border flex gap-4">
              <Button type="submit" className="ptms-btn-primary">
                <Save className="w-4 h-4 mr-2" />
                Add Teacher
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setFormData({
                  fullName: "",
                  gender: "",
                  phone: "",
                  email: "",
                  education: "",
                  subjects: "",
                  experience: "",
                  region: "",
                  qualifications: "",
                  status: "active"
                })}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTeacher;