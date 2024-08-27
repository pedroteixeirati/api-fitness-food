export class GenericResponse<T> {
  status: string;
  data?: T | T[];
}
