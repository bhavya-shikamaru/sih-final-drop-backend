export interface AcademicRecord {
    _id: string;
    studentId: string;
    subjectCode: string;
    assessmentType: "quiz" | "midsem" | "endsem";
    score: number;
    maxScore: number;
    attemptNumber: number;
    recordedAt: Date;
}

export type CreateAcademicInput = Omit<AcademicRecord, "_id" | "recordedAt">;

export const academicStore: AcademicRecord[] = [];
