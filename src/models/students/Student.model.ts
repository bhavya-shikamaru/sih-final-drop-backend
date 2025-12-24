/**
 * Student Model
 *
 * Defines the Student entity structure and provides in-memory storage.
 * Students represent individuals being monitored for academic risk
 * within the UmeedAI system.
 */

/**
 * Possible academic status values for a student.
 * - active: Student is currently enrolled
 * - at-risk: Student has been flagged for intervention
 * - dropped: Student has dropped out or been discontinued
 */
export type StudentStatus = 'active' | 'at-risk' | 'dropped';

/**
 * Complete Student entity interface.
 */
export interface Student {
    _id: string;
    enrollmentId: string;
    name: string;
    department: string;
    semester: number;
    batch: string;
    mentorId?: string;
    status: StudentStatus;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Input type for creating a new student.
 * Excludes system-managed fields.
 */
export type CreateStudentInput = Omit<
    Student,
    '_id' | 'status' | 'createdAt' | 'updatedAt'
>;

/**
 * Input type for updating a student.
 * All fields are optional except system-managed fields.
 */
export type UpdateStudentInput = Partial<
    Omit<Student, '_id' | 'enrollmentId' | 'createdAt' | 'updatedAt'>
>;

/**
 * In-memory storage for students.
 * In production, this would be replaced by a database.
 */
export const studentsStore: Student[] = [];
