"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ButtonProps } from "react-day-picker";
import { signup } from "@/lib/action";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormSchema = z.infer<typeof formSchema>;

const SignupForm: React.FC = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    startTransition(async () => {
      const res = await signup(data);

      if (res?.error) {
        toast.error("Signup Failed", {
          description: res.error,
          className: "bg-red-500 text-white",
          position: "top-right",
        });
      } else {
        toast.success("Account created!", {
          description: "You can now sign in.",
          className: "bg-green-500 text-white",
          position: "top-right",
        });
        router.push("/auth/login");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-zinc-500 dark:text-zinc-400">
            First name
          </label>
          <Input
            {...register("firstName")}
            placeholder="Jane"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-zinc-500 dark:text-zinc-400">
            Last name
          </label>
          <Input
            {...register("lastName")}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label className="mb-1.5 block text-zinc-500 dark:text-zinc-400">
          Email
        </label>
        <Input
          type="email"
          {...register("email")}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="mb-1.5 block text-zinc-500 dark:text-zinc-400">
          Password
        </label>
        <Input
          type="password"
          {...register("password")}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="mb-1.5 block text-zinc-500 dark:text-zinc-400">
          Confirm Password
        </label>
        <Input
          type="password"
          {...register("confirmPassword")}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full flex items-center justify-center"
        disabled={isPending}
      >
        {isPending ? <Loader2 className="animate-spin"/> : "Sign up"}
      </Button>
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

export default SignupForm;
