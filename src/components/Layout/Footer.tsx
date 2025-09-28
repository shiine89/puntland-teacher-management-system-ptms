import { Facebook, Twitter, Linkedin, Instagram, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground text-center py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#1877F2] transition-colors duration-300"
            aria-label="Follow us on Facebook"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#1DA1F2] transition-colors duration-300"
            aria-label="Follow us on Twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#0A66C2] transition-colors duration-300"
            aria-label="Connect with us on LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#E4405F] transition-colors duration-300"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://wa.me/252123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#25D366] transition-colors duration-300"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
          <a
            href="mailto:info@ptms.so"
            className="text-white hover:text-[#EA4335] transition-colors duration-300"
            aria-label="Send us an email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        
        {/* Copyright */}
        <p className="text-white">
          &copy; 2025 PTMS - All Rights Reserved | Puntland Teacher Management System
        </p>
      </div>
    </footer>
  );
};

export default Footer;