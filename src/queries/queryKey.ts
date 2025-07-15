export const lanternKeys = {
  all: ['lantern'] as const,
  lists: () => [...lanternKeys.all, 'list'] as const,
  list: (idx: string) => [...lanternKeys.lists(), idx] as const,
  details: () => [...lanternKeys.all, 'detail'] as const,
  detail: (id: string) => [...lanternKeys.details(), id] as const,
  progresses: () => [...lanternKeys.all, 'progress'] as const,
  progress: (id: string) => [...lanternKeys.progresses(), id] as const,
};
