import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <SignIn
        path="/auth/login"
        routing="path"
        signUpUrl="/auth/register"
        appearance={{
          elements: {
            formButtonPrimary: "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]",
          },
        }}
      />
    </div>
  );
}