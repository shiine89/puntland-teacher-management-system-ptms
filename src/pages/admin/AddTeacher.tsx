import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  UserPlus, 
  User, 
  Mail, 
  Phone, 
  GraduationCap,
  FileText,
  Upload,
  Save,
  Plus,
  Minus,
  Calendar,
  BookOpen
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddTeacher = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    education: "",
    region: "",
    experience: "",
    experienceDetails: "",
    joiningDate: "",
    qualifications: "",
    otherQualification: "",
    cv: null as File | null,
    profilePhoto: null as File | null,
    status: "active"
  });

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [customSubjects, setCustomSubjects] = useState<string[]>([]);
  const [showExperienceDetails, setShowExperienceDetails] = useState(false);
  const [showOtherQualification, setShowOtherQualification] = useState(false);
  const [additionalSubjects, setAdditionalSubjects] = useState<string[]>([""]);

  // Load custom subjects from localStorage
  useEffect(() => {
    const subjects = JSON.parse(localStorage.getItem("customSubjects") || "[]");
    setCustomSubjects(subjects);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'experience') {
      setShowExperienceDetails(value === 'experienced');
    }
    
    if (field === 'qualifications') {
      setShowOtherQualification(value === 'other');
    }
  };

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects(prev => [...prev, subject]);
    } else {
      setSelectedSubjects(prev => prev.filter(s => s !== subject));
    }
  };

  const handleAdditionalSubjectChange = (index: number, value: string) => {
    const newSubjects = [...additionalSubjects];
    newSubjects[index] = value;
    setAdditionalSubjects(newSubjects);
  };

  const addAdditionalSubject = () => {
    setAdditionalSubjects([...additionalSubjects, ""]);
  };

  const removeAdditionalSubject = (index: number) => {
    if (additionalSubjects.length > 1) {
      setAdditionalSubjects(additionalSubjects.filter((_, i) => i !== index));
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (field: 'cv' | 'profilePhoto', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['fullName', 'gender', 'phone', 'email', 'education', 'region'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Validate subjects
    const allSubjects = [
      ...selectedSubjects,
      ...additionalSubjects.filter(s => s.trim() !== "")
    ];

    if (allSubjects.length === 0) {
      toast({
        title: "Missing Subjects",
        description: "Please select at least one teaching subject.",
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

    try {
      // Process file uploads
      let cvBase64 = "";
      let photoBase64 = "";

      if (formData.cv) {
        cvBase64 = await fileToBase64(formData.cv);
      }

      if (formData.profilePhoto) {
        photoBase64 = await fileToBase64(formData.profilePhoto);
      }

      // Create new teacher object
      const newTeacher = {
        id: Date.now(),
        fullName: formData.fullName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phone,
        email: formData.email,
        education: formData.education,
        region: formData.region,
        experience: formData.experience,
        experienceDetails: formData.experienceDetails,
        joiningDate: formData.joiningDate,
        subjects: allSubjects,
        qualifications: formData.qualifications,
        otherQualification: formData.otherQualification,
        cv: cvBase64,
        profilePhoto: photoBase64,
        status: formData.status,
        registrationDate: new Date().toLocaleDateString(),
        registeredBy: "admin"
      };

      teachers.push(newTeacher);
      localStorage.setItem("teachers", JSON.stringify(teachers));

      toast({
        title: "Success!",
        description: "Teacher added successfully. Redirecting to manage teachers...",
      });

      // Reset form
      setFormData({
        fullName: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        education: "",
        region: "",
        experience: "",
        experienceDetails: "",
        joiningDate: "",
        qualifications: "",
        otherQualification: "",
        cv: null,
        profilePhoto: null,
        status: "active"
      });
      setSelectedSubjects([]);
      setAdditionalSubjects([""]);
      setShowExperienceDetails(false);
      setShowOtherQualification(false);

      // Navigate to manage teachers after a short delay
      setTimeout(() => {
        navigate('/admin/teachers/manage');
      }, 2000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process file uploads. Please try again.",
        variant: "destructive"
      });
    }
  };

  const predefinedSubjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English", "Arabic", 
    "History", "Geography", "Computer Science", "Islamic Studies", "Art", 
    "Physical Education", "Music", "Economics", "Sociology", "Psychology"
  ];

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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="ptms-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="joiningDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joining Date
                </Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                  className="ptms-input"
                />
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
                <Label htmlFor="region">Region *</Label>
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

            {/* Experience */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Teaching Experience *</Label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger className="ptms-input">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresh">Fresh Graduate (No Experience)</SelectItem>
                    <SelectItem value="experienced">Experienced Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {showExperienceDetails && (
                <div className="space-y-2 animate-slide-down">
                  <Label htmlFor="experienceDetails">Experience Details</Label>
                  <Textarea
                    id="experienceDetails"
                    placeholder="Please describe your teaching experience, years worked, institutions, etc."
                    value={formData.experienceDetails}
                    onChange={(e) => handleInputChange('experienceDetails', e.target.value)}
                    className="ptms-input min-h-[100px]"
                  />
                </div>
              )}
            </div>

            {/* Teaching Subjects */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Teaching Subjects *
                </Label>
                <p className="text-sm text-muted-foreground">Select subjects you can teach</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-border rounded-lg">
                  {predefinedSubjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                      />
                      <Label
                        htmlFor={subject}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {subject}
                      </Label>
                    </div>
                  ))}
                  
                  {customSubjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                      />
                      <Label
                        htmlFor={subject}
                        className="text-sm font-normal cursor-pointer text-primary"
                      >
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional/Other Subjects</Label>
                <p className="text-sm text-muted-foreground">Add any other subjects not listed above</p>
                {additionalSubjects.map((subject, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Enter subject name"
                      value={subject}
                      onChange={(e) => handleAdditionalSubjectChange(index, e.target.value)}
                      className="ptms-input"
                    />
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={addAdditionalSubject}
                        className="shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      {additionalSubjects.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeAdditionalSubject(index)}
                          className="shrink-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qualifications" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Additional Qualifications
                </Label>
                <Select value={formData.qualifications} onValueChange={(value) => handleInputChange('qualifications', value)}>
                  <SelectTrigger className="ptms-input">
                    <SelectValue placeholder="Select qualification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="certificates">Professional Certificates</SelectItem>
                    <SelectItem value="training">Training Programs</SelectItem>
                    <SelectItem value="workshops">Workshops & Seminars</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {showOtherQualification && (
                <div className="space-y-2 animate-slide-down">
                  <Label htmlFor="otherQualification">Please specify your qualification</Label>
                  <Textarea
                    id="otherQualification"
                    placeholder="Describe your additional qualifications..."
                    value={formData.otherQualification}
                    onChange={(e) => handleInputChange('otherQualification', e.target.value)}
                    className="ptms-input min-h-[100px]"
                  />
                </div>
              )}
            </div>

            {/* File Uploads */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cv" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload CV (PDF/DOC)
                </Label>
                <Input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange('cv', e.target.files?.[0] || null)}
                  className="ptms-input"
                />
                <p className="text-xs text-muted-foreground">Max size: 5MB</p>
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
                  onChange={(e) => handleFileChange('profilePhoto', e.target.files?.[0] || null)}
                  className="ptms-input"
                />
                <p className="text-xs text-muted-foreground">Max size: 2MB</p>
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
                onClick={() => {
                  setFormData({
                    fullName: "",
                    gender: "",
                    dateOfBirth: "",
                    phone: "",
                    email: "",
                    education: "",
                    region: "",
                    experience: "",
                    experienceDetails: "",
                    joiningDate: "",
                    qualifications: "",
                    otherQualification: "",
                    cv: null,
                    profilePhoto: null,
                    status: "active"
                  });
                  setSelectedSubjects([]);
                  setAdditionalSubjects([""]);
                  setShowExperienceDetails(false);
                  setShowOtherQualification(false);
                }}
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