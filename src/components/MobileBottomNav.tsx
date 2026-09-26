import React from 'react';
import { Home, Compass, PenTool, User, Layers } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'fields', label: 'Fields', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Compass },
    { id: 'writing', label: 'Writing', icon: PenTool },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const isProfileActive = (view: string) => {
    return view === 'profile' || view === 'about' || view === 'resume' || view === 'cv' || view === 'time';
  };

  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#10131B]/95 backdrop-blur-lg border-t border-[#262B38] px-2 pt-1 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_32px_rgba(0,0,0,0.6)] transition-colors"
    >
      <div className="grid grid-cols-5 items-center justify-around gap-1 max-w-md mx-auto h-13">
        {navItems.map(item => {
          const isActive = item.id === 'profile'
            ? isProfileActive(currentView)
            : currentView === item.id;

          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              id={`mobile-tab-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-md transition-all duration-150 active:scale-90 min-h-[48px] w-full ${
                isActive
                  ? 'text-white bg-[#1A1E2B] border border-[#2F3649] shadow-inner'
                  : 'text-[#8E97A8] hover:text-[#E2E8F0] active:bg-[#141824]'
              }`}
            >
              {/* Subtle top indicator bar for active tab */}
              {isActive && (
                <span className="absolute -top-1 w-6 h-0.5 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              )}
              <IconComponent
                className={`w-5 h-5 mb-1 transition-colors ${
                  isActive ? 'text-sky-400 stroke-[2.3]' : 'text-[#8E97A8] stroke-[1.8]'
                }`}
              />
              <span
                className={`text-[10px] sm:text-[11px] font-sans leading-none tracking-tight ${
                  isActive ? 'font-semibold text-white' : 'font-normal text-[#8E97A8]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

