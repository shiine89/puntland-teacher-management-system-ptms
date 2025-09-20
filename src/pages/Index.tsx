import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  GraduationCap, 
  Award, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";
import ptmsHero from "@/assets/ptms-hero.jpg";
import { Link } from "react-router-dom";

const Index = () => {
  const stats = [
    { icon: Users, label: "Registered Teachers", value: "1,247", color: "text-primary" },
    { icon: GraduationCap, label: "Subjects Covered", value: "45", color: "text-success" },
    { icon: Award, label: "Qualified Professionals", value: "89%", color: "text-secondary" },
    { icon: TrendingUp, label: "System Efficiency", value: "95%", color: "text-primary" },
  ];

  const benefits = [
    {
      title: "Digital Teacher Profiles",
      description: "Comprehensive digital profiles for all teachers with qualifications, experience, and specializations.",
      icon: Users
    },
    {
      title: "Efficient Management",
      description: "Streamlined processes for managing teacher information, assignments, and performance tracking.",
      icon: GraduationCap
    },
    {
      title: "Quick Search & Filter",
      description: "Advanced search capabilities to find the right teachers by subject, location, or qualifications.",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Puntland Teacher
                <br />
                <span className="text-yellow-300">Management System</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                A comprehensive digital platform for registering, managing, and tracking teacher profiles across Puntland. 
                Enhancing efficiency, accuracy, and accessibility in education management.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/teachers">
                  <Button size="lg" className="ptms-btn-secondary group">
                    View Teachers
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Register as Teacher
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="animate-slide-up">
              <img
                src={ptmsHero}
                alt="PTMS Hero"
                className="w-full h-auto rounded-2xl shadow-2xl border border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="ptms-card text-center animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-gradient-primary">PTMS</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our system revolutionizes teacher management with modern technology, 
              ensuring efficient operations and better educational outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="ptms-card group animate-bounce-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Comprehensive Teacher
                <br />
                <span className="text-gradient-primary">Management Features</span>
              </h2>
              
              <div className="space-y-4">
                {[
                  "Complete teacher profile registration",
                  "Document and CV management system",
                  "Subject and specialization tracking",
                  "Advanced search and filtering",
                  "Performance monitoring tools",
                  "Comprehensive reporting system"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CheckCircle className="w-6 h-6 text-success" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button size="lg" className="ptms-btn-primary group">
                    Learn More About PTMS
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-slide-up">
              <Card className="ptms-card">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Quality Assured</h3>
                  <p className="text-muted-foreground">Verified teacher credentials and qualifications</p>
                </CardContent>
              </Card>
              
              <Card className="ptms-card mt-8">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Performance Tracking</h3>
                  <p className="text-muted-foreground">Monitor and improve teaching effectiveness</p>
                </CardContent>
              </Card>
              
              <Card className="ptms-card">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Easy Access</h3>
                  <p className="text-muted-foreground">Simple interface for all stakeholders</p>
                </CardContent>
              </Card>
              
              <Card className="ptms-card mt-8">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Comprehensive</h3>
                  <p className="text-muted-foreground">Complete educational management solution</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Education Management?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of educational institutions already using PTMS for better teacher management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="ptms-btn-secondary">
                Get Started Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
