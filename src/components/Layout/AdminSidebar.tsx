import { Link, useLocation } from "react-router-dom";
import { 
  GraduationCap, 
  Home, 
  Book, 
  Users, 
  Search, 
  FileText,
  Plus,
  Settings,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const AdminSidebar = () => {
  const location = useLocation();
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [teachersOpen, setTeachersOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="ptms-sidebar w-64 p-4">
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="w-8 h-8 text-primary" />
        <h2 className="text-xl font-bold text-sky-300">PTMS Admin</h2>
      </div>

      <Link to="/" className="block mb-6">
        <div className="flex items-center gap-2 text-sky-300/80 hover:text-sky-300 transition-colors p-2 rounded hover:bg-white/10">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </div>
      </Link>

      <nav className="space-y-2">
        <Link to="/admin/dashboard">
          <div className={`ptms-sidebar-item ${isActive('/admin/dashboard') ? 'bg-primary text-white' : ''}`}>
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </div>
        </Link>

        <Collapsible open={subjectsOpen} onOpenChange={setSubjectsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="ptms-sidebar-item w-full justify-start"
            >
              <Book className="w-5 h-5" />
              <span>Subjects</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 space-y-1">
            <Link to="/admin/subjects/add">
              <div className={`ptms-sidebar-item text-sm ${isActive('/admin/subjects/add') ? 'bg-primary text-white' : ''}`}>
                <Plus className="w-4 h-4" />
                <span>Add Subject</span>
              </div>
            </Link>
            <Link to="/admin/subjects/manage">
              <div className={`ptms-sidebar-item text-sm ${isActive('/admin/subjects/manage') ? 'bg-primary text-white' : ''}`}>
                <Settings className="w-4 h-4" />
                <span>Manage Subjects</span>
              </div>
            </Link>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={teachersOpen} onOpenChange={setTeachersOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="ptms-sidebar-item w-full justify-start"
            >
              <Users className="w-5 h-5" />
              <span>Teachers</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 space-y-1">
            <Link to="/admin/teachers/add">
              <div className={`ptms-sidebar-item text-sm ${isActive('/admin/teachers/add') ? 'bg-primary text-white' : ''}`}>
                <Plus className="w-4 h-4" />
                <span>Add Teacher</span>
              </div>
            </Link>
            <Link to="/admin/teachers/manage">
              <div className={`ptms-sidebar-item text-sm ${isActive('/admin/teachers/manage') ? 'bg-primary text-white' : ''}`}>
                <Settings className="w-4 h-4" />
                <span>Manage Teachers</span>
              </div>
            </Link>
          </CollapsibleContent>
        </Collapsible>

        <Link to="/admin/search">
          <div className={`ptms-sidebar-item ${isActive('/admin/search') ? 'bg-primary text-white' : ''}`}>
            <Search className="w-5 h-5" />
            <span>Search</span>
          </div>
        </Link>

        <Link to="/admin/reports">
          <div className={`ptms-sidebar-item ${isActive('/admin/reports') ? 'bg-primary text-white' : ''}`}>
            <FileText className="w-5 h-5" />
            <span>Reports</span>
          </div>
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;