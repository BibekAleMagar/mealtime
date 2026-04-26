export interface PaginationProps {
  total: number;
  skip: number;
  limit: number;
  onPageChange: (newSkip: number) => void;
  loading: boolean;
}