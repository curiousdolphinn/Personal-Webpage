import { activitiesData } from '../content/activities';
import { workData } from '../content/work';
import { fieldsData } from '../content/fields';
import { ActivityRecord, ActivityType, WorkItem } from '../types';

export interface TypeBreakdownItem {
  type: ActivityType;
  label: string;
  minutes: number;
  formatted: string;
  percentage: number;
}

export interface FieldTimeSummary {
  fieldId: string;
  slug: string;
  title: string;
  shortTitle: string;
  totalMinutes: number;
  formatted: string;
  percentageOfAllWork: number;
  activityCount: number;
}

/**
 * Computes duration in minutes from an ActivityRecord.
 * Automatically parses startTime and endTime (e.g. "14:00" to "15:30" or ISO timestamps)
 * or falls back to manually recorded durationMinutes.
 */
export function computeActivityDuration(activity: ActivityRecord): number {
  if (activity.startTime && activity.endTime) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (timeRegex.test(activity.startTime) && timeRegex.test(activity.endTime)) {
      const [h1, m1] = activity.startTime.split(':').map(Number);
      const [h2, m2] = activity.endTime.split(':').map(Number);
      const startMin = h1 * 60 + m1;
      let endMin = h2 * 60 + m2;
      if (endMin < startMin) {
        endMin += 24 * 60; // Spans midnight
      }
      return Math.max(0, endMin - startMin);
    }

    const d1 = new Date(activity.startTime).getTime();
    const d2 = new Date(activity.endTime).getTime();
    if (!isNaN(d1) && !isNaN(d2) && d2 >= d1) {
      return Math.round((d2 - d1) / (1000 * 60));
    }
  }

  return activity.durationMinutes || 0;
}

/**
 * Filters canonical activities for public visibility
 */
export function getPublicActivities(): ActivityRecord[] {
  return activitiesData.filter(act => act.visibility === 'public' || act.visibility === undefined);
}

/**
 * Resolves the effective fields for an activity.
 * If activity.fields is not specified or empty, it inherits the fields from the linked work item.
 */
export function getActivityFields(activity: ActivityRecord): string[] {
  if (activity.fields && activity.fields.length > 0) {
    return activity.fields;
  }
  if (activity.workId) {
    const work = workData.find(w => w.id === activity.workId || w.slug === activity.workId);
    if (work && work.fields && work.fields.length > 0) {
      return work.fields;
    }
  }
  return [];
}

/**
 * Format minutes into "00h 00m" or "Xh YYm"
 */
export function formatMinutes(minutes: number): string {
  const rounded = Math.round(minutes);
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

/**
 * Format minutes padded with leading zeros for hours (e.g. "04h 27m")
 */
export function formatMinutesPadded(minutes: number): string {
  const rounded = Math.round(minutes);
  const h = Math.floor(rounded / 60);
  const m = rounded % 60;
  return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m`;
}

/**
 * Get total recorded focus time across all public activities
 */
export function getTotalRecordedTime(): { totalMinutes: number; formatted: string; count: number } {
  const publicActs = getPublicActivities();
  const totalMinutes = publicActs.reduce((acc, act) => acc + computeActivityDuration(act), 0);
  return {
    totalMinutes,
    formatted: formatMinutesPadded(totalMinutes),
    count: publicActs.length
  };
}

/**
 * Get recorded time for a specific Field Hub.
 * 
 * MULTI-FIELD ALLOCATION RULE:
 * If an activity belongs to N fields (e.g. ['mathematics', 'cryptography']),
 * its duration D is split equally (D / N) across those fields for field-level
 * aggregations, preventing double counting in overall time metrics.
 */
export function getRecordedTimeByField(fieldSlug: string): { totalMinutes: number; formatted: string; count: number } {
  const publicActs = getPublicActivities();
  let allocatedMinutes = 0;
  let count = 0;

  for (const act of publicActs) {
    const fields = getActivityFields(act);
    if (fields.includes(fieldSlug)) {
      const dur = computeActivityDuration(act);
      const share = fields.length > 0 ? dur / fields.length : dur;
      allocatedMinutes += share;
      count += 1;
    }
  }

  const rounded = Math.round(allocatedMinutes);
  return {
    totalMinutes: rounded,
    formatted: formatMinutesPadded(rounded),
    count
  };
}

/**
 * Get time summary across all registered fields
 */
export function getAllFieldsTimeSummary(): FieldTimeSummary[] {
  const totalAll = getTotalRecordedTime().totalMinutes;

  const summaries = fieldsData.map(f => {
    const timeData = getRecordedTimeByField(f.slug);
    const percentage = totalAll > 0 ? (timeData.totalMinutes / totalAll) * 100 : 0;
    return {
      fieldId: f.id,
      slug: f.slug,
      title: f.title,
      shortTitle: f.shortTitle || f.title,
      totalMinutes: timeData.totalMinutes,
      formatted: timeData.formatted,
      percentageOfAllWork: Math.round(percentage * 10) / 10,
      activityCount: timeData.count
    };
  });

  return summaries;
}

/**
 * Get recorded time for a specific Work item (project, proof, coursework, essay, etc.)
 */
export function getRecordedTimeByWork(workIdOrSlug: string): { totalMinutes: number; formatted: string; count: number } {
  const publicActs = getPublicActivities();
  const matched = publicActs.filter(act => act.workId === workIdOrSlug);
  const totalMinutes = matched.reduce((acc, act) => acc + computeActivityDuration(act), 0);
  return {
    totalMinutes,
    formatted: formatMinutesPadded(totalMinutes),
    count: matched.length
  };
}

// Backward-compatibility aliases
export const getRecordedTimeByProject = getRecordedTimeByWork;
export const getRecordedTimeByWriting = getRecordedTimeByWork;
export const getRecordedTimeByReading = getRecordedTimeByWork;
