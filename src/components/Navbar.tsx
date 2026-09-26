import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Menu, X, Layers, Compass, PenTool, User, Home, BookOpen } from 'lucide-react';
import { profileData } from '../content/profile';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change or ESC key
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { id: 'fields', label: 'Fields', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Compass },
    { id: 'writing', label: 'Writing', icon: PenTool },
    { id: 'profile', label: 'Profile & CV', icon: User },
  ];

  const isProfileActive = (view: string) => {
    return view === 'profile' || view === 'about' || view === 'resume' || view === 'cv' || view === 'time';
  };

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#232734] bg-[#0D0F14]/94 backdrop-blur-md transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="text-left font-serif font-medium text-base sm:text-xl tracking-tight text-white hover:text-sky-300 transition-colors py-1 focus:outline-none truncate"
          >
            {profileData.name}
          </button>
          <span className="hidden sm:inline-block font-mono text-[11px] text-[#828DA0] tracking-wider uppercase shrink-0">
            / notebook
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-sans text-sm">
          {navLinks.map(link => {
            const isActive = link.id === 'profile'
              ? isProfileActive(currentView)
              : currentView === link.id;

            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`transition-all py-1.5 px-1 relative text-sm ${
                  isActive
                    ? 'text-white font-medium border-b-2 border-sky-400'
                    : 'text-[#94A3B8] hover:text-white font-normal'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (Search, Theme, Mobile toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Search Button (touch target min 40px) */}
          <button
            id="nav-search-button"
            onClick={onOpenSearch}
            aria-label="Search"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#CBD5E1] hover:text-white bg-[#151822] hover:bg-[#1E2330] rounded-md border border-[#2A2F3D] hover:border-[#3D4559] transition-all active:scale-95 min-h-[40px] shadow-sm"
          >
            <Search className="w-4 h-4 text-sky-400" />
            <span className="font-sans text-xs">Search</span>
            <kbd className="hidden sm:inline text-[10px] font-mono text-[#8892A4] bg-[#0A0D14] px-1 py-0.5 rounded border border-[#232734]">⌘K</kbd>
          </button>

          {/* Theme Toggle (touch target min 40px) */}
          <button
            id="theme-toggle-button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 text-[#94A3B8] hover:text-white rounded-md bg-[#151822] hover:bg-[#1E2330] border border-[#2A2F3D] hover:border-[#3D4559] transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center shadow-sm active:scale-95"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-sky-300" />}
          </button>

          {/* Mobile menu hamburger (Prominent with min 40px touch area) */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center min-h-[40px] min-w-[40px] px-2.5 rounded-md bg-[#151822] border border-[#2A2F3D] text-white hover:bg-[#1E2330] active:scale-95 transition-all shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-15 bg-black/60 backdrop-blur-sm z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="mobile-nav-drawer"
            className="md:hidden relative z-40 border-b border-[#2A2F3D] bg-[#12151E] px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-150"
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-md text-sm transition-colors flex items-center gap-3 min-h-[48px] ${
                currentView === 'home'
                  ? 'bg-[#1C212E] text-white font-medium border border-[#353D52] shadow-sm'
                  : 'text-[#CBD5E1] hover:bg-[#171B26] hover:text-white'
              }`}
            >
              <Home className="w-4 h-4 text-sky-400" />
              <span>Home Dashboard</span>
            </button>

            {navLinks.map(link => {
              const isActive = link.id === 'profile'
                ? isProfileActive(currentView)
                : currentView === link.id;

              const IconComponent = link.icon;

              return (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm transition-colors flex items-center gap-3 min-h-[48px] ${
                    isActive
                      ? 'bg-[#1C212E] text-white font-medium border border-[#353D52] shadow-sm'
                      : 'text-[#CBD5E1] hover:bg-[#171B26] hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4 text-sky-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#232734] mt-2">
              <button
                onClick={() => handleNavClick('docs')}
                className={`w-full text-left px-4 py-2.5 rounded-md text-xs font-mono transition-colors flex items-center gap-3 min-h-[42px] ${
                  currentView === 'docs'
                    ? 'bg-[#1C212E] text-white font-medium'
                    : 'text-[#8E97A8] hover:text-white hover:bg-[#171B26]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#8E97A8]" />
                <span>Documentation & Architecture Guide</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};


