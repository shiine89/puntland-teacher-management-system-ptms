import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="ptms-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-wide">PTMS</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-secondary-foreground hover:text-white transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-secondary-foreground hover:text-white transition-colors font-medium"
          >
            About
          </Link>
          <Link 
            to="/teachers" 
            className="text-secondary-foreground hover:text-white transition-colors font-medium"
          >
            Listed Teachers
          </Link>
          <Link 
            to="/register" 
            className="text-secondary-foreground hover:text-white transition-colors font-medium"
          >
            Register
          </Link>
          <Link 
            to="/contact" 
            className="text-secondary-foreground hover:text-white transition-colors font-medium"
          >
            Contact
          </Link>
          <Link to="/admin">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Admin Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary-hover mt-4 p-4 rounded-lg mx-4">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-white hover:text-secondary-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-secondary-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/teachers" 
              className="text-white hover:text-secondary-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Listed Teachers
            </Link>
            <Link 
              to="/register" 
              className="text-white hover:text-secondary-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-secondary-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/admin"
              className="text-white hover:text-secondary-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;