
import { BookMarked, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="container py-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">ThreadSpire</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground">
              Explore
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ThreadSpire. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
