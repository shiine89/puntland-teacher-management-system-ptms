import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap,
  FileText,
  Upload,
  UserPlus
} from "lucide-react";
import { useState } from "react";

const Register = () => {
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
    qualifications: ""
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

    // Simulate form submission
    toast({
      title: "Registration Successful!",
      description: "Your teacher profile has been submitted for review. You will be contacted soon.",
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
      qualifications: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Teacher <span className="text-gradient-primary">Registration</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Join our comprehensive teacher database and advance your career
          </p>
        </div>

        <Card className="ptms-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <UserPlus className="w-6 h-6 text-primary" />
              Register as Teacher
            </CardTitle>
            <CardDescription>
              Please provide accurate information. All fields marked with * are required.
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
                    placeholder="Enter your full name"
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
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
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
                    placeholder="your.email@example.com"
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
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="masters">Masters</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
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

              {/* Subjects & Experience */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subjects">Teaching Subjects *</Label>
                  <Input
                    id="subjects"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
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

              <div className="pt-6 border-t border-border">
                <Button type="submit" className="ptms-btn-primary w-full md:w-auto">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Submit Registration
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Register;