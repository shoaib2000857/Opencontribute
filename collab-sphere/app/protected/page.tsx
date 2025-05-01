import { useAuth } from "@clerk/nextjs";

export default function ProtectedPage() {
  const { userId } = useAuth();

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-4">You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome to the Protected Page!</h1>
      <p className="mt-4">You are logged in as User ID: {userId}</p>
    </div>
  );
}