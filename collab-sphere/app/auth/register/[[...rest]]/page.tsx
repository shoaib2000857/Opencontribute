import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Register</h1>
      <SignUp
        path="/auth/register"
        routing="path"
        signInUrl="/auth/login"
        appearance={{
          elements: {
            formButtonPrimary: "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]",
          },
        }}
      />
    </div>
  );
}