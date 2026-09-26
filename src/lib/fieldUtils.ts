import { fieldsData } from '../content/fields';
import { workData } from '../content/work';
import { learningItemsData } from '../content/learningItems';
import { resourcesData } from '../content/resources';
import { FieldDefinition, WorkItem, LearningItem, ResourceItem } from '../types';

/**
 * Returns all available field definitions.
 */
export function getAllFields(): FieldDefinition[] {
  return fieldsData;
}

/**
 * Finds a field by its unique ID or slug.
 */
export function getFieldBySlug(slugOrId: string): FieldDefinition | undefined {
  const normalized = slugOrId.toLowerCase().trim();
  return fieldsData.find(
    f => f.slug.toLowerCase() === normalized || f.id.toLowerCase() === normalized
  );
}

/**
 * Normalizes field identifiers array from item properties.
 */
export function normalizeFields(fields?: string[] | string): string[] {
  if (!fields) return [];
  if (Array.isArray(fields)) return fields.map(f => f.toLowerCase().trim());
  return [fields.toLowerCase().trim()];
}

/**
 * Checks if an item belongs to a specific field.
 */
export function itemMatchesField(
  itemFields: string[] | string | undefined,
  targetFieldIdOrSlug: string
): boolean {
  if (!itemFields) return false;
  const fields = normalizeFields(itemFields);
  const target = targetFieldIdOrSlug.toLowerCase().trim();
  
  const fieldObj = getFieldBySlug(target);
  const validMatches = new Set<string>([target]);
  if (fieldObj) {
    validMatches.add(fieldObj.id.toLowerCase());
    validMatches.add(fieldObj.slug.toLowerCase());
  }

  return fields.some(f => validMatches.has(f));
}

/**
 * Retrieves all canonical work items associated with a field.
 */
export function getWorkByField(fieldSlugOrId: string): WorkItem[] {
  return workData.filter(
    w => w.visibility === 'public' && itemMatchesField(w.fields, fieldSlugOrId)
  );
}

/**
 * Retrieves projects/implementations for a field.
 */
export function getProjectsByField(fieldSlugOrId: string): WorkItem[] {
  return workData.filter(
    w => w.visibility === 'public' && w.type !== 'writing' && itemMatchesField(w.fields, fieldSlugOrId)
  );
}

/**
 * Retrieves writing/essays associated with a field.
 */
export function getWritingByField(fieldSlugOrId: string): WorkItem[] {
  return workData.filter(
    w => w.visibility === 'public' && w.type === 'writing' && itemMatchesField(w.fields, fieldSlugOrId)
  );
}

/**
 * Retrieves learning items associated with a field.
 */
export function getLearningItemsForField(fieldSlugOrId: string): LearningItem[] {
  const fieldObj = getFieldBySlug(fieldSlugOrId);
  const embedded = fieldObj?.currentStudy || [];
  const fromStore = learningItemsData.filter(item => itemMatchesField([item.field], fieldSlugOrId));
  return [...embedded, ...fromStore];
}

/**
 * Retrieves resources associated with a field.
 */
export function getResourcesForField(fieldSlugOrId: string): ResourceItem[] {
  return resourcesData.filter(r => itemMatchesField(r.fields, fieldSlugOrId));
}

/**
 * Retrieves related field objects for a given field.
 */
export function getRelatedFields(field: FieldDefinition): FieldDefinition[] {
  return (field.relatedFieldIds || [])
    .map(id => getFieldBySlug(id))
    .filter((f): f is FieldDefinition => f !== undefined);
}

/**
 * Computes item counts for a field.
 */
export function getFieldStats(fieldSlugOrId: string) {
  const workItems = getWorkByField(fieldSlugOrId);
  const projects = workItems.filter(w => w.type !== 'writing');
  const writing = workItems.filter(w => w.type === 'writing');
  const learningItems = getLearningItemsForField(fieldSlugOrId);
  const resources = getResourcesForField(fieldSlugOrId);

  return {
    workCount: workItems.length,
    projectsCount: projects.length,
    writingCount: writing.length,
    learningCount: learningItems.length,
    resourcesCount: resources.length,
    totalItems: workItems.length + learningItems.length
  };
}

/**
 * Returns display objects for a list of field IDs on any work item.
 */
export function getFieldBadges(fieldIds: string[]): { id: string; slug: string; title: string }[] {
  return (fieldIds || [])
    .map(id => {
      const field = getFieldBySlug(id);
      if (field) {
        return { id: field.id, slug: field.slug, title: field.shortTitle || field.title };
      }
      return { id, slug: id, title: id.replace(/[-_]/g, ' ') };
    });
}
