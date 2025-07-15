export const lanternKeys = {
  all: ['lantern'] as const,
  lists: () => [...lanternKeys.all, 'list'] as const,
  list: (idx: string) => [...lanternKeys.lists(), idx] as const,
  details: () => [...lanternKeys.all, 'detail'] as const,
  detail: (id: string) => [...lanternKeys.details(), id] as const,
};
