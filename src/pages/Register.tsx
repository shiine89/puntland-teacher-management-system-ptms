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
import { useState, useEffect } from "react";

const Register = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    phone: "",
    email: "",
    education: "",
    experience: "",
    experienceDetails: "",
    region: "",
    qualification: "",
    otherQualification: "",
    joiningDate: "",
    majorSubjects: "",
    picture: null as File | null,
    cv: null as File | null
  });

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([""]);
  const [showExperienceDetails, setShowExperienceDetails] = useState(false);
  const [showMajorSubjects, setShowMajorSubjects] = useState(false);
  const [showOtherQualification, setShowOtherQualification] = useState(false);
  const [customSubjects, setCustomSubjects] = useState<string[]>([]);

  const universityFaculties = [
    "Faculty of Engineering", "Faculty of Education", "Faculty of Business",
    "Faculty of Science", "Faculty of Medicine", "Faculty of Law", "Faculty of Agriculture"
  ];

  const schoolSubjects = [
    "Math", "Physics", "Biology", "Chemistry",
    "English", "Arabic", "History", "Geography", "Islamic", "Computer"
  ];

  // Load custom subjects from localStorage
  useEffect(() => {
    const loadCustomSubjects = () => {
      const subjects = JSON.parse(localStorage.getItem("subjects") || "[]");
      const subjectNames = subjects.map((s: any) => s.subjectName);
      setCustomSubjects(subjectNames);
    };
    loadCustomSubjects();
  }, []);

  const facultyPlaceholders: Record<string, string> = {
    "Faculty of Engineering": "Example: Software Engineering, Civil Engineering, Electrical Engineering",
    "Faculty of Education": "Example: Curriculum Studies, Education Management, Guidance & Counselling",
    "Faculty of Business": "Example: Accounting, Marketing, Business Administration, Management",
    "Faculty of Science": "Example: Biology, Physics, Chemistry, Environmental Science",
    "Faculty of Medicine": "Example: General Medicine, Nursing, Public Health, Pharmacy",
    "Faculty of Law": "Example: Public Law, Sharia Law, Criminal Law",
    "Faculty of Agriculture": "Example: Agronomy, Horticulture, Animal Science, Soil Science"
  };

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (value: string) => {
    handleInputChange('experience', value);
    const experienceYears = parseInt(value);
    setShowExperienceDetails(experienceYears > 0);
    if (experienceYears <= 0) {
      handleInputChange('experienceDetails', '');
    }
  };

  const handleEducationChange = (value: string) => {
    handleInputChange('education', value);
    const isUniversity = value.toLowerCase() === 'university';
    
    // Reset subjects when changing education level
    setSelectedSubjects([""]);
    
    // Show/hide major subjects based on university selection and faculty subjects
    updateMajorSubjectsVisibility(isUniversity, [""]);
  };

  const handleQualificationChange = (value: string) => {
    handleInputChange('qualification', value);
    setShowOtherQualification(value === 'Other');
    if (value !== 'Other') {
      handleInputChange('otherQualification', '');
    }
  };

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...selectedSubjects];
    newSubjects[index] = value;
    setSelectedSubjects(newSubjects);
    
    updateMajorSubjectsVisibility(formData.education.toLowerCase() === 'university', newSubjects);
  };

  const addSubject = () => {
    if (selectedSubjects.length < 5) {
      setSelectedSubjects([...selectedSubjects, ""]);
    }
  };

  const removeSubject = (index: number) => {
    const newSubjects = selectedSubjects.filter((_, i) => i !== index);
    setSelectedSubjects(newSubjects);
    updateMajorSubjectsVisibility(formData.education.toLowerCase() === 'university', newSubjects);
  };

  const updateMajorSubjectsVisibility = (isUniversity: boolean, subjects: string[]) => {
    const hasFacultySubject = subjects.some(subject => universityFaculties.includes(subject));
    setShowMajorSubjects(isUniversity && hasFacultySubject);
    
    if (!isUniversity || !hasFacultySubject) {
      handleInputChange('majorSubjects', '');
    }
  };

  const getMajorSubjectsPlaceholder = () => {
    const firstFaculty = selectedSubjects.find(subject => universityFaculties.includes(subject));
    return firstFaculty ? facultyPlaceholders[firstFaculty] || "Example: Major subjects..." : "Example: Software Engineering, Biochemistry, Marketing...";
  };

  const getSubjectOptions = () => {
    if (formData.education.toLowerCase() === 'university') {
      return [...universityFaculties, ...customSubjects];
    } else if (formData.education.toLowerCase() === 'other') {
      return customSubjects; // Show custom subjects for "other" education
    } else {
      return [...schoolSubjects, ...customSubjects];
    }
  };

  const handleFileChange = (field: string, file: File | null) => {
    handleInputChange(field, file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['fullName', 'gender', 'phone', 'email', 'education'];
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
    const validSubjects = selectedSubjects.filter(subject => subject !== "");
    if (validSubjects.length === 0) {
      toast({
        title: "Subject Required",
        description: "Please select at least one subject.",
        variant: "destructive"
      });
      return;
    }

    // Validate files
    if (!formData.picture || !formData.cv) {
      toast({
        title: "Files Required",
        description: "Please upload both picture and CV files.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Convert files to base64
      const imageData = await fileToBase64(formData.picture);
      const cvData = await fileToBase64(formData.cv);

      // Create teacher object
      const teacher = {
        fullname: formData.fullName,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        education: formData.education,
        experience: formData.experience,
        experienceDetails: formData.experienceDetails,
        location: formData.region,
        qualification: formData.qualification === "Other" ? formData.otherQualification : formData.qualification,
        joiningDate: formData.joiningDate,
        subjects: validSubjects,
        majorSubjects: formData.majorSubjects,
        image: imageData,
        cv: cvData,
        registrationDate: new Date().toISOString().split('T')[0]
      };

      // Save to localStorage
      const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
      teachers.push(teacher);
      localStorage.setItem("teachers", JSON.stringify(teachers));

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
        experience: "",
        experienceDetails: "",
        region: "",
        qualification: "",
        otherQualification: "",
        joiningDate: "",
        majorSubjects: "",
        picture: null,
        cv: null
      });
      setSelectedSubjects([""]);
      setShowExperienceDetails(false);
      setShowMajorSubjects(false);
      setShowOtherQualification(false);

      // Redirect after delay
      setTimeout(() => {
        window.location.href = "/teachers";
      }, 2000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process files. Please try again.",
        variant: "destructive"
      });
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
                  <Select value={formData.education} onValueChange={handleEducationChange}>
                    <SelectTrigger className="ptms-input">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="other">other</SelectItem>
                
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
              {/* Teaching Subjects */}
              <div className="space-y-2">
                <Label>Teaching Subjects *</Label>
                {formData.education.toLowerCase() === 'other' ? (
                  // Text inputs for custom subjects when education is "other"
                  selectedSubjects.map((subject, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Input
                          placeholder="Enter your teaching subject"
                          value={subject}
                          onChange={(e) => handleSubjectChange(index, e.target.value)}
                          className="ptms-input"
                        />
                      </div>
                      {selectedSubjects.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSubject(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  // Dropdown selects for predefined subjects
                  selectedSubjects.map((subject, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Select value={subject} onValueChange={(value) => handleSubjectChange(index, value)}>
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
                      {selectedSubjects.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSubject(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))
                )}
                {selectedSubjects.length < 5 && (
                  <Button
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={addSubject}
                    className="mt-2"
                  >
                    + Add Another Subject
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Teaching Experience (years) *</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.experience}
                  onChange={(e) => handleExperienceChange(e.target.value)}
                  className="ptms-input"
                  min="0"
                  max="50"
                  required
                />
              </div>
              </div>

              {/* Experience Details */}
              {showExperienceDetails && (
                <div className="space-y-2">
                  <Label htmlFor="experienceDetails">Experience Details *</Label>
                  <Textarea
                    id="experienceDetails"
                    placeholder="Describe your work experience, places you've worked, and your professional background..."
                    value={formData.experienceDetails}
                    onChange={(e) => handleInputChange('experienceDetails', e.target.value)}
                    className="ptms-input min-h-[100px]"
                    required={showExperienceDetails}
                  />
                </div>
              )}

              {/* Teacher Qualification */}
              <div className="space-y-2">
                <Label htmlFor="qualification">Teacher Qualification *</Label>
                <Select value={formData.qualification} onValueChange={handleQualificationChange}>
                  <SelectTrigger className="ptms-input">
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diploma in Education">Diploma in Education</SelectItem>
                    <SelectItem value="Bachelor of Education">Bachelor of Education</SelectItem>
                    <SelectItem value="BSc + PGDE">BSc + PGDE</SelectItem>
                    <SelectItem value="Master in Education">Master in Education</SelectItem>
                    <SelectItem value="PhD in Education">PhD in Education</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Other Qualification */}
              {showOtherQualification && (
                <div className="space-y-2">
                  <Label htmlFor="otherQualification">Please specify qualification *</Label>
                  <Input
                    id="otherQualification"
                    placeholder="Enter your qualification"
                    value={formData.otherQualification}
                    onChange={(e) => handleInputChange('otherQualification', e.target.value)}
                    className="ptms-input"
                    required={showOtherQualification}
                  />
                </div>
              )}

              {/* Date of Joining */}
              <div className="space-y-2">
                <Label htmlFor="joiningDate">Date of Joining *</Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                  className="ptms-input"
                  required
                />
              </div>

              {/* Major Subjects for University */}
              {showMajorSubjects && (
                <div className="space-y-2">
                  <Label htmlFor="majorSubjects">Major Subjects (for University Faculty) *</Label>
                  <Input
                    id="majorSubjects"
                    placeholder={getMajorSubjectsPlaceholder()}
                    value={formData.majorSubjects}
                    onChange={(e) => handleInputChange('majorSubjects', e.target.value)}
                    className="ptms-input"
                    required={showMajorSubjects}
                  />
                </div>
              )}

              {/* File Uploads */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="picture" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Teacher Picture *
                  </Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('picture', e.target.files?.[0] || null)}
                    className="ptms-input"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cv" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Teacher CV (PDF) *
                  </Label>
                  <Input
                    id="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange('cv', e.target.files?.[0] || null)}
                    className="ptms-input"
                    required
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