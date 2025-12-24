export interface AttendanceRecord {
    _id: string;
    studentId: string;
    subjectCode: string;
    attendancePercentage: number;
    totalClasses: number;
    attendedClasses: number;
    recordedAt: Date;
}

export type CreateAttendanceInput = Omit<AttendanceRecord, "_id">;

export const attendanceStore: AttendanceRecord[] = [];
