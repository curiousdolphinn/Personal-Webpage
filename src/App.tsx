/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomeView } from './views/HomeView';
import { ProfileView } from './views/ProfileView';
import { ProjectsView } from './views/ProjectsView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { WritingView } from './views/WritingView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { FieldsView } from './views/FieldsView';
import { FieldDetailView } from './views/FieldDetailView';
import { DocsView } from './views/DocsView';
import { NotFoundView } from './views/NotFoundView';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved) return saved === 'dark';
      return true; // Default to Elegant Dark
    }
    return true;
  });

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [isDark]);

  // Hash-based routing to support static hosting & back/forward history
  const parseHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) {
      setCurrentView('home');
      setViewParam(undefined);
      return;
    }

    const parts = hash.split('/');
    const view = parts[0] || 'home';
    const param = parts[1] || undefined;

    const validViews = [
      'home', 'profile', 'about', 'fields', 'projects', 'writing', 'learning',
      'experiments', 'reading', 'resume', 'cv', 'docs', 'time'
    ];

    if (validViews.includes(view)) {
      // Map legacy/alias routes
      if (view === 'about' || view === 'time' || view === 'resume' || view === 'cv') {
        setCurrentView('profile');
      } else if (view === 'learning') {
        setCurrentView('fields');
      } else if (view === 'experiments' || view === 'reading') {
        setCurrentView('projects');
      } else {
        setCurrentView(view);
      }
      setViewParam(param);
    } else {
      setCurrentView('404');
      setViewParam(undefined);
    }
  }, []);

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, [parseHash]);

  const handleNavigate = (view: string, param?: string) => {
    if (view === 'home') {
      window.location.hash = '#/';
    } else if (param) {
      window.location.hash = `#/${view}/${param}`;
    } else {
      window.location.hash = `#/${view}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut for search (⌘K, Ctrl+K, or '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'profile':
      case 'about':
      case 'time':
      case 'resume':
      case 'cv':
        return <ProfileView onNavigate={handleNavigate} />;
      case 'fields':
        if (viewParam) {
          return <FieldDetailView slug={viewParam} onNavigate={handleNavigate} />;
        }
        return <FieldsView onNavigate={handleNavigate} />;
      case 'projects':
      case 'experiments':
      case 'reading':
        if (viewParam) {
          return <ProjectDetailView slug={viewParam} onNavigate={handleNavigate} />;
        }
        return <ProjectsView onNavigate={handleNavigate} selectedSlug={viewParam} />;
      case 'writing':
        if (viewParam) {
          return <ArticleDetailView slug={viewParam} onNavigate={handleNavigate} />;
        }
        return <WritingView onNavigate={handleNavigate} />;
      case 'docs':
        return <DocsView onNavigate={handleNavigate} />;
      default:
        return <NotFoundView onNavigate={handleNavigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0F14] text-[#E2E8F0] selection:bg-[#253047] selection:text-[#FFFFFF] transition-colors duration-200">
      {/* Top Navigation */}
      <div className="no-print">
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      </div>

      {/* Main Content Area with max-width container & phone-safe bottom padding */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-28 md:pb-12">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <div className="no-print">
        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Mobile Sticky Bottom Navigation (Phone navigation comfort) */}
      <div className="no-print">
        <MobileBottomNav
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
