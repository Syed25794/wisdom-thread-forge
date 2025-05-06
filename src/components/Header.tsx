
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BookMarked,
  Menu,
  Plus,
  Search,
  X,
  User,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

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
          
          {user ? (
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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || 'User'} />
                      <AvatarFallback>
                        {getInitials(user.user_metadata?.full_name || user.email || 'U')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
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
            {user ? (
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
                <Link 
                  to="/profile" 
                  className="py-2 hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
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
