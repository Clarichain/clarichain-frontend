"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/helpers";
import { ButtonProps } from "react-day-picker";
import Link from "next/link";
import { Button as ShadcnBtnComp } from "@/components/ui/button";
import { Loader2, Router } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormSchema = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const router = useRouter()
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormSchema) => {
    setisLoading(true)
    setError("");

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      setError(getErrorMessage(res.error) || "An error occurred");
      toast.error("Login Failed", {
        className: "bg-red-500 text-white",
        description: getErrorMessage(res.error),
       position: "top-right"
      });
      setisLoading(false)
    } else {
       toast.success("You have logged in successfully!", {
         className: "bg-green-500 text-white",
         position: "top-right",
       });
      router.push("/dashboard")
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label
          htmlFor="email-input"
          className="mb-1.5 block text-zinc-500 dark:text-zinc-400"
        >
          Email
        </label>
        <Input
          id="email-input"
          type="email"
          placeholder="your.email@provider.com"
          {...register("email")}
          className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 
          bg-white dark:bg-zinc-900 !px-3 !py-2 text-zinc-800 dark:text-zinc-200
          placeholder-zinc-400 dark:placeholder-zinc-500 
          !ring-1 !ring-transparent !transition-shadow !focus:outline-0 !focus:ring-blue-700"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <div className="mb-1.5 flex items-end justify-between">
          <label
            htmlFor="password-input"
            className="block text-zinc-500 dark:text-zinc-400"
          >
            Password
          </label>
          <a
            href="#"
            className="text-sm text-blue-600 dark:text-blue-400"
          >
            Forgot?
          </a>
        </div>
        <Input
          id="password-input"
          type="password"
          placeholder="••••••••••••"
          {...register("password")}
          className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 
          bg-white dark:bg-zinc-900 !px-3 !py-2 text-zinc-800 dark:text-zinc-200
          placeholder-zinc-400 dark:placeholder-zinc-500 
          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full flex items-center justify-center"
        disabled={isLoading}
      >
       {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
      </Button>

      {error && (
        <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
      )}
    </form>
  );
};

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={`rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 
    ring-2 ring-blue-500/50 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 
    transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default LoginForm;
