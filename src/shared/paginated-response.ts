export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    hasMore: boolean;
    nextPage: number | null;
  };
}
