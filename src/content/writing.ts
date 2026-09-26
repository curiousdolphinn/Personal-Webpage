import { workData } from './work';
import { WorkItem, GoodReadItem } from '../types';

/**
 * Public writing essays, articles, and research notes
 */
export const writingData: WorkItem[] = workData.filter(
  w => w.type === 'writing' && w.visibility === 'public'
);

/**
 * Good Reads: Curated external essays, papers, and timeless writings
 */
export const goodReadsData: GoodReadItem[] = [
  {
    id: "superlinear-returns",
    title: "Superlinear Returns",
    author: "Paul Graham",
    url: "https://paulgraham.com/superlinear.html",
    publicationDate: "October 2023",
    summary: "One of the most important things you can understand about the world is that returns are often superlinear: compound growth, thresholds, and winner-take-all mechanics in science, technology, and ambition.",
    notes: "Essential reading on exponential compounding, performance divergence, and why work that seems merely slightly better often reaps orders of magnitude greater rewards.",
    tags: ["compounding", "essays", "ambition", "performance"]
  }
];
