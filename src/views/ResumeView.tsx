import React from 'react';
import { ProfileView } from './ProfileView';

interface ResumeViewProps {
  onNavigate: (view: string, param?: string) => void;
}

/**
 * ResumeView is now unified with ProfileView into a comprehensive single page:
 * - Academic Credentials, Coursework, Exploration Areas, & Research at the top
 * - Life & Focus Ledger (temporal measurements & recorded hours) at the end
 */
export const ResumeView: React.FC<ResumeViewProps> = (props) => {
  return <ProfileView {...props} />;
};
