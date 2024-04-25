export interface IResponse {
  items: IStudentDTO[];
  total: number;
}

export interface IStudentDTO {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  birthDate: Date;
  subjectId: number;
}
