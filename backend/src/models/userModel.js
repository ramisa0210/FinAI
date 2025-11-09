import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      // FIX APPLIED: Removed duplicate "SMB Owner" and added all roles
      // from your HTML select options (assuming you use these roles).
      enum: [
        "SME Owner", // Changed the first entry to SME Owner for broader use
        "Finance Manager",
        "SMB Owner",
        "Accountant", // Added a few more common roles
        "CEO",
        "Operations Manager",
        "Marketing Specialist",
        "IT Manager",
        "Other",
      ],
      required: true, // Role should be required during registration
      // FIX APPLIED: Removed 'default: "SMB Owner"' so the user's selected role is saved.
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;