import { workData } from './work';
import { WorkItem } from '../types';

/**
 * Public work items (projects, proofs, coursework, experiments, research, etc.)
 */
export const projectsData: WorkItem[] = workData.filter(
  w => w.type !== 'writing' && w.visibility === 'public'
);
