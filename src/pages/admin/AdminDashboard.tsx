import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Book, 
  TrendingUp, 
  UserCheck,
  BarChart3,
  Calendar
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    teachers: 0,
    subjects: 0,
    newTeachers: 0,
    activeProfiles: 0
  });

  useEffect(() => {
    // Load data from localStorage or API
    const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
    const subjects = JSON.parse(localStorage.getItem("subjects") || "[]");
    
    setStats({
      teachers: teachers.length,
      subjects: subjects.length,
      newTeachers: teachers.filter((t: any) => {
        const registrationDate = new Date(t.registrationDate);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return registrationDate >= thirtyDaysAgo;
      }).length,
      activeProfiles: teachers.filter((t: any) => t.status === 'active').length || teachers.length
    });
  }, []);

  const dashboardCards = [
    {
      title: "Total Registered Teachers",
      value: stats.teachers,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "All registered teachers in the system",
      link: "/admin/manage-teachers"
    },
    {
      title: "Listed Subjects",
      value: stats.subjects,
      icon: Book,
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Available subjects for teaching",
      link: "/admin/manage-subjects"
    },
    {
      title: "New Teachers (30 days)",
      value: stats.newTeachers,
      icon: UserCheck,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Recently registered teachers",
      link: "/admin/manage-teachers?filter=recent"
    },
    {
      title: "Active Profiles",
      value: stats.activeProfiles,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Currently active teacher profiles",
      link: "/admin/manage-teachers"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 animate-fade-in">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of PTMS system statistics</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <Link to={card.link} key={index}>
            <Card 
              className="ptms-card cursor-pointer animate-bounce-in hover:shadow-lg transition-shadow" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {card.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="ptms-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              Recent Teacher Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.teachers > 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {stats.teachers} teachers registered
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Check the Manage Teachers section for detailed information
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No teachers registered yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start by adding teachers to the system
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="ptms-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Book className="w-5 h-5 text-success" />
              Subject Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.subjects > 0 ? (
                <div className="text-center py-8">
                  <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {stats.subjects} subjects available
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Manage subjects in the Subjects section
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No subjects added yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Add subjects to organize teacher specializations
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Overview */}
      <Card className="ptms-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">95%</h3>
              <p className="text-muted-foreground">System Uptime</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-success mb-2">24/7</h3>
              <p className="text-muted-foreground">Support Available</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-2">100%</h3>
              <p className="text-muted-foreground">Data Security</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;