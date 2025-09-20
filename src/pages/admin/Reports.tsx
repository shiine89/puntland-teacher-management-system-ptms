import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Calendar,
  Users,
  Book,
  TrendingUp,
  Filter,
  BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";

const Reports = () => {
  const { toast } = useToast();
  const [dateFilter, setDateFilter] = useState({
    fromDate: "",
    toDate: "",
    reportType: "teachers"
  });
  
  const [reportData, setReportData] = useState({
    teachers: [],
    subjects: [],
    filteredTeachers: [],
    stats: {
      totalTeachers: 0,
      totalSubjects: 0,
      maleTeachers: 0,
      femaleTeachers: 0,
      universityQualified: 0,
      recentRegistrations: 0
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    generateReport();
  }, [dateFilter, reportData.teachers, reportData.subjects]);

  const loadData = () => {
    const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
    const subjects = JSON.parse(localStorage.getItem("subjects") || "[]");
    
    setReportData(prev => ({
      ...prev,
      teachers,
      subjects,
      filteredTeachers: teachers
    }));
  };

  const generateReport = () => {
    let filtered = reportData.teachers;
    
    // Apply date filter
    if (dateFilter.fromDate && dateFilter.toDate) {
      const fromDate = new Date(dateFilter.fromDate);
      const toDate = new Date(dateFilter.toDate);
      
      filtered = filtered.filter((teacher: any) => {
        const regDate = new Date(teacher.registrationDate);
        return regDate >= fromDate && regDate <= toDate;
      });
    }
    
    // Calculate statistics
    const stats = {
      totalTeachers: filtered.length,
      totalSubjects: reportData.subjects.length,
      maleTeachers: filtered.filter((t: any) => t.gender === 'Male').length,
      femaleTeachers: filtered.filter((t: any) => t.gender === 'Female').length,
      universityQualified: filtered.filter((t: any) => 
        ['University', 'Masters', 'PhD'].includes(t.education)
      ).length,
      recentRegistrations: filtered.filter((t: any) => {
        const regDate = new Date(t.registrationDate);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return regDate >= thirtyDaysAgo;
      }).length
    };
    
    setReportData(prev => ({
      ...prev,
      filteredTeachers: filtered,
      stats
    }));
  };

  const handleDateChange = (field: string, value: string) => {
    setDateFilter(prev => ({ ...prev, [field]: value }));
  };

  const exportReport = () => {
    const reportContent = {
      reportType: dateFilter.reportType,
      dateRange: {
        from: dateFilter.fromDate,
        to: dateFilter.toDate
      },
      statistics: reportData.stats,
      data: dateFilter.reportType === 'teachers' ? reportData.filteredTeachers : reportData.subjects,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportContent, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PTMS_Report_${dateFilter.reportType}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    toast({
      title: "Report Exported",
      description: "Report has been downloaded successfully",
    });
  };

  const statCards = [
    {
      title: "Total Teachers",
      value: reportData.stats.totalTeachers,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Total Subjects",
      value: reportData.stats.totalSubjects,
      icon: Book,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "University Qualified",
      value: reportData.stats.universityQualified,
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "Recent Registrations",
      value: reportData.stats.recentRegistrations,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 animate-fade-in">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and export system reports</p>
        </div>
      </div>

      {/* Report Filters */}
      <Card className="ptms-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-primary" />
            Report Configuration
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={dateFilter.reportType} onValueChange={(value) => handleDateChange('reportType', value)}>
                <SelectTrigger className="ptms-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teachers">Teachers Report</SelectItem>
                  <SelectItem value="subjects">Subjects Report</SelectItem>
                  <SelectItem value="statistics">Statistics Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fromDate">From Date</Label>
              <Input
                id="fromDate"
                type="date"
                value={dateFilter.fromDate}
                onChange={(e) => handleDateChange('fromDate', e.target.value)}
                className="ptms-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toDate">To Date</Label>
              <Input
                id="toDate"
                type="date"
                value={dateFilter.toDate}
                onChange={(e) => handleDateChange('toDate', e.target.value)}
                className="ptms-input"
              />
            </div>

            <div className="flex items-end">
              <Button onClick={exportReport} className="ptms-btn-primary w-full">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Report Period: {dateFilter.fromDate || 'All Time'} - {dateFilter.toDate || 'Present'}</span>
            <Badge variant="outline" className="text-primary border-primary">
              {dateFilter.reportType.charAt(0).toUpperCase() + dateFilter.reportType.slice(1)} Report
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="ptms-card animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 mx-auto mb-4 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-muted-foreground text-sm">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Demographics Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="ptms-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-primary" />
              Gender Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Male Teachers</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ 
                        width: `${reportData.stats.totalTeachers ? (reportData.stats.maleTeachers / reportData.stats.totalTeachers) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="font-medium text-foreground">{reportData.stats.maleTeachers}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-foreground">Female Teachers</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success rounded-full"
                      style={{ 
                        width: `${reportData.stats.totalTeachers ? (reportData.stats.femaleTeachers / reportData.stats.totalTeachers) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="font-medium text-foreground">{reportData.stats.femaleTeachers}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="ptms-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-success" />
              Quick Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Qualification Rate</span>
                <Badge className="ptms-badge-success">
                  {reportData.stats.totalTeachers ? 
                    Math.round((reportData.stats.universityQualified / reportData.stats.totalTeachers) * 100) : 0}%
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-foreground">Active Subjects</span>
                <Badge className="ptms-badge-primary">
                  {reportData.stats.totalSubjects}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-foreground">Growth (30 days)</span>
                <Badge variant="outline" className="text-success border-success">
                  +{reportData.stats.recentRegistrations}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Preview */}
      <Card className="ptms-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            Report Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">
              {dateFilter.reportType.charAt(0).toUpperCase() + dateFilter.reportType.slice(1)} Report Summary
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-foreground mb-2">Report Details:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Report Type: {dateFilter.reportType}</li>
                  <li>• Date Range: {dateFilter.fromDate || 'All Time'} to {dateFilter.toDate || 'Present'}</li>
                  <li>• Generated: {new Date().toLocaleDateString()}</li>
                  <li>• Records: {dateFilter.reportType === 'teachers' ? reportData.stats.totalTeachers : reportData.stats.totalSubjects}</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Key Metrics:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Total Teachers: {reportData.stats.totalTeachers}</li>
                  <li>• University Qualified: {reportData.stats.universityQualified}</li>
                  <li>• Available Subjects: {reportData.stats.totalSubjects}</li>
                  <li>• Recent Activity: {reportData.stats.recentRegistrations} new registrations</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;