import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Book, Plus, Save } from "lucide-react";
import { useState } from "react";

const AddSubject = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    description: "",
    category: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subjectName.trim()) {
      toast({
        title: "Error",
        description: "Subject name is required",
        variant: "destructive"
      });
      return;
    }

    // Get existing subjects
    const subjects = JSON.parse(localStorage.getItem("subjects") || "[]");
    
    // Check for duplicate
    const exists = subjects.some((s: any) => 
      s.subjectName.toLowerCase() === formData.subjectName.toLowerCase()
    );
    
    if (exists) {
      toast({
        title: "Error",
        description: "Subject already exists",
        variant: "destructive"
      });
      return;
    }

    // Add new subject
    const newSubject = {
      id: Date.now(),
      ...formData,
      createdDate: new Date().toLocaleDateString()
    };

    subjects.push(newSubject);
    localStorage.setItem("subjects", JSON.stringify(subjects));

    toast({
      title: "Success!",
      description: "Subject added successfully",
    });

    // Reset form
    setFormData({
      subjectName: "",
      subjectCode: "",
      description: "",
      category: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 animate-fade-in">
        <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
          <Plus className="w-6 h-6 text-success" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Add Subject</h1>
          <p className="text-muted-foreground">Create a new subject for teacher specialization</p>
        </div>
      </div>

      <Card className="ptms-card max-w-2xl animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Book className="w-5 h-5 text-success" />
            Subject Information
          </CardTitle>
          <CardDescription>
            Fill in the details for the new subject
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subjectName">Subject Name *</Label>
                <Input
                  id="subjectName"
                  placeholder="e.g., Mathematics"
                  value={formData.subjectName}
                  onChange={(e) => handleInputChange('subjectName', e.target.value)}
                  className="ptms-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subjectCode">Subject Code</Label>
                <Input
                  id="subjectCode"
                  placeholder="e.g., MATH101"
                  value={formData.subjectCode}
                  onChange={(e) => handleInputChange('subjectCode', e.target.value)}
                  className="ptms-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Science, Arts, Languages"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="ptms-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the subject..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="ptms-input min-h-[100px]"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="ptms-btn-primary">
                <Save className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setFormData({ subjectName: "", subjectCode: "", description: "", category: "" })}
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

export default AddSubject;