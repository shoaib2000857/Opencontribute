import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Welcome to Collab-Sphere</h1>
      <p className="mt-4 text-lg">
        A collaborative platform for students to share and find open-source
        projects.
      </p>
      <p className="mt-2 text-lg">
        Join us in making open-source contributions easier and more accessible!
      </p>
      <p className="mt-2 text-lg">
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          Login
        </Link>{" "}
        or{" "}
        <Link href="/auth/register" className="text-blue-500 hover:underline">
          Register
        </Link>{" "}
        to get started.
      </p>{" "}
    </main>
  );
}
