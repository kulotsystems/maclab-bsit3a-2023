import { MacType } from './Mac.type';
import { StudentType } from './Student.type';

export type SeatType = {
    mac: MacType,
    student: StudentType | null
};

export type SeatsType = {
    [key: string]: SeatType
};
