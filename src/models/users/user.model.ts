/**
 * User Model
 *
 * Defines the User entity for authentication and authorization
 * within the UmeedAI platform.
 *
 * Users represent system actors (faculty, mentors, admins),
 * NOT students being analyzed.
 *
 * Passwords are securely hashed using bcrypt before storage.
 */

import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

/**
 * Available user roles in UmeedAI.
 *
 * - admin   : System administrator
 * - faculty : Teaching staff
 * - mentor  : Assigned student mentor
 */
export type UserRole = "admin" | "faculty" | "mentor";

/**
 * Core User interface (for type safety).
 */
export interface IUser {
    email: string;
    password: string;
    name: string;
    role: UserRole;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * User document interface (extends Mongoose Document).
 * Adds instance methods.
 */
export interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * User model interface (adds static methods).
 */
export interface IUserModel extends Model<IUserDocument> {
    findByEmail(email: string): Promise<IUserDocument | null>;
}

/**
 * User schema definition.
 */
const userSchema = new Schema<IUserDocument>(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false // Do not return password by default
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: 100
        },
        role: {
            type: String,
            enum: ["admin", "faculty", "mentor"],
            default: "mentor"
        },
        isActive: {
            type: Boolean,
            default: true
        },
        lastLogin: {
            type: Date
        }
    },
    {
        timestamps: true,
        collection: "users"
    }
);

// ============================================================================
// Indexes
// ============================================================================

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hash password before saving.
 *
 * Only hashes the password if it has been modified or is new.
 */
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const saltRounds = parseInt(
        process.env.BCRYPT_SALT_ROUNDS || "12",
        10
    );

    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
});

// ============================================================================
// Instance Methods
// ============================================================================

/**
 * Compares a candidate password with the stored hash.
 *
 * @param candidatePassword - Plain text password
 * @returns True if passwords match
 */
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// ============================================================================
// Static Methods
// ============================================================================

/**
 * Finds a user by email and explicitly includes the password field.
 *
 * Used during authentication.
 *
 * @param email - User email
 * @returns User document or null
 */
userSchema.statics.findByEmail = function (
    email: string
): Promise<IUserDocument | null> {
    return this.findOne({ email }).select("+password");
};

// ============================================================================
// Model Export
// ============================================================================

export const UserModel: IUserModel = mongoose.model<
    IUserDocument,
    IUserModel
>("User", userSchema);

// ============================================================================
// DTOs / Helpers
// ============================================================================

/**
 * Input type for creating a user.
 */
export interface CreateUserInput {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
}

/**
 * Safe user response (excludes password).
 */
export interface UserResponse {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
}

/**
 * Converts a User document into a safe response object.
 *
 * @param user - User document
 * @returns Sanitized user object
 */
export function toUserResponse(user: IUserDocument): UserResponse {
    return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
    };
}
