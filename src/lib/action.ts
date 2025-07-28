import bcrypt from "bcryptjs";
import { supabase } from "./supabaseClient";

export async function signup(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    const { email, password, firstName, lastName } = data;

    // 1. Check if email already exists
    const { data: existingUser, error: findError } = await supabase
      .schema("next_auth")
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (findError && findError.code !== "PGRST116") {
      // Any error other than "No rows found"
      return { error: "Something went wrong. Please try again." };
    }

    if (existingUser) {
      return { error: "Email is already taken" };
    }

    // 2. Hash password and insert new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error: insertError } = await supabase
      .schema("next_auth")
      .from("users")
      .insert({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });

    if (insertError) {
      return { error: "Failed to create user. Please try again." };
    }

    return { success: true };
  } catch (err) {
    return { error: "Server error. Please try again later." };
  }
}
