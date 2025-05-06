
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookMarked, Menu, Plus, Search, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2">
          <BookMarked className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ThreadSpire</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link to="/explore" className="text-muted-foreground hover:text-foreground">
            Explore
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/collections" className="text-muted-foreground hover:text-foreground">
                Collections
              </Link>
              <Button asChild variant="ghost" size="icon">
                <Link to="/search">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild>
                <Link to="/create">
                  <Plus className="h-5 w-5 mr-2" />
                  New Thread
                </Link>
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        <button 
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="py-2 hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className="py-2 hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Explore
            </Link>
            {isLoggedIn && (
              <>
                <Link 
                  to="/collections" 
                  className="py-2 hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Collections
                </Link>
                <Link 
                  to="/search" 
                  className="py-2 hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Search
                </Link>
                <Link 
                  to="/create" 
                  className="py-2 hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  New Thread
                </Link>
              </>
            )}
            {!isLoggedIn && (
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
