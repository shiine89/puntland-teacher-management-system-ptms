import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  GraduationCap,
  Shield
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminDashboard from "@/assets/admin-dashboard.jpg";

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo credentials
    if (formData.username === "admin" && formData.password === "ptms123") {
      toast({
        title: "Login Successful!",
        description: "Welcome to PTMS Admin Dashboard",
      });
      
      if (formData.rememberMe) {
        localStorage.setItem("rememberedUser", formData.username);
      }
      
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your username and password and try again.",
        variant: "destructive"
      });
    }
  };

  // Load remembered username
  useState(() => {
    const remembered = localStorage.getItem("rememberedUser");
    if (remembered) {
      setFormData(prev => ({ 
        ...prev, 
        username: remembered, 
        rememberMe: true 
      }));
    }
  });

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image */}
        <div className="hidden lg:block animate-fade-in">
          <img
            src={adminDashboard}
            alt="PTMS Admin Dashboard"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>

        {/* Right Side - Login Form */}
        <Card className="ptms-card animate-slide-up">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">PTMS</h1>
              </div>
            </div>
            
            <CardTitle className="text-2xl text-foreground">Admin Login</CardTitle>
            <CardDescription>
              Access the PTMS administrative dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="ptms-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="ptms-input pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>

                <Button variant="link" className="text-primary p-0 h-auto">
                  Forgot Password?
                </Button>
              </div>

              <Button type="submit" className="ptms-btn-primary w-full">
                <Shield className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                Demo credentials: <strong>admin</strong> / <strong>ptms123</strong>
              </p>
              <div className="text-center mt-4">
                <Link to="/" className="text-primary hover:underline text-sm">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;