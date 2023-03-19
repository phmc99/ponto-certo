import { CreateClockinDto } from './create-clockin.dto';

export type UpdateClockinDto = CreateClockinDto & {
  updateMessage: string;
  date: Date;
};
