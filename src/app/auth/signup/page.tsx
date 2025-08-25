"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Api } from "@/src/lib/api";
import { useAuthStore } from "@/src/store/useUserStore";

type RegisterFormData = {
  name: string;
  avatar?: string;
  password: string;
  birthdate: string;
  articlesIds: string;
};

export default function Register() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [regMessage, setRegMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      avatar: "",
      password: "",
      birthdate: "",
      articlesIds: "0",
    },
  });

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const onSubmit = async (data: RegisterFormData) => {
    setRegMessage("");
    try {
      const newUser = {
        id: crypto.randomUUID(),
        ...data,
        avatar: data.avatar && data.avatar.trim() !== "" ? data.avatar : "/user.svg",
        createdAt: new Date().toISOString(),
      };

      const created = await Api.createUser(newUser);
      setRegMessage(`✅ User created with ID: ${created.id}`);

      reset(); // reset form
      router.push("/auth/login");
    } catch (error) {
      setRegMessage("⚠️ Error while creating user");
    }
  };

  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white-600 via-[#C19A6B] to-[#d6bfa9]">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          📝 Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2B280]"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Avatar (optional) */}
          <input
            type="url"
            placeholder="Avatar URL (optional)"
            {...register("avatar", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Please enter a valid URL",
              },
            })}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2B280]"
          />
          {errors.avatar && (
            <p className="text-red-500 text-sm">{errors.avatar.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "At least 6 characters",
              },
            })}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2B280]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Birthdate */}
          <input
            type="date"
            {...register("birthdate", { required: "Birthdate is required" })}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2B280]"
          />
          {errors.birthdate && (
            <p className="text-red-500 text-sm">{errors.birthdate.message}</p>
          )}

          {/* Articles ID (hidden) */}
          <input type="hidden" value="0" {...register("articlesIds")} />

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#967969] text-white py-3 rounded-md hover:bg-stone-500 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>

        {regMessage && (
          <p className="mt-4 text-center text-sm text-gray-700">{regMessage}</p>
        )}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-[#A52A2A] font-semibold hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}