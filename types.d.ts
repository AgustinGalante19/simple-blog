declare interface ApiResponse<T> {
  data: T[];
  result: 'ok' | 'error';
  error: string[];
}
