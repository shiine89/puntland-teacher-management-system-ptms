import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Teachers from "./pages/Teachers";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/Layout/AdminLayout";
import AddSubject from "./pages/admin/AddSubject";
import ManageSubjects from "./pages/admin/ManageSubjects";
import AddTeacher from "./pages/admin/AddTeacher";
import ManageTeachers from "./pages/admin/ManageTeachers";
import SearchTeachers from "./pages/admin/SearchTeachers";
import Reports from "./pages/admin/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="subjects/add" element={<AddSubject />} />
            <Route path="subjects/manage" element={<ManageSubjects />} />
            <Route path="teachers/add" element={<AddTeacher />} />
            <Route path="teachers/manage" element={<ManageTeachers />} />
            <Route path="search" element={<SearchTeachers />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
