import Image from "next/image";

export default function About() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Main Content */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-4xl">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          About Collab-Sphere
        </h1>
        <p className="text-lg text-center sm:text-left text-gray-600">
          Collab-Sphere is a collaborative platform designed to help students
          discover and contribute to beginner-friendly open-source projects.
          Our mission is to make open-source contributions accessible and
          engaging for everyone, regardless of their experience level.
        </p>
        <p className="text-lg text-center sm:text-left text-gray-600">
          Whether you're looking to share your project ideas, find like-minded
          collaborators, or learn new skills, Collab-Sphere provides the tools
          and community to help you succeed.
        </p>
        <h2 className="text-2xl font-semibold text-center sm:text-left mt-8">
          Why Choose Collab-Sphere?
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-600">
          <li>Discover beginner-friendly open-source projects.</li>
          <li>Share your project ideas and find collaborators.</li>
          <li>Engage in discussions and grow your skills.</li>
          <li>Build a portfolio of meaningful contributions.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-center sm:text-left mt-8">
          Our Vision
        </h2>
        <p className="text-lg text-center sm:text-left text-gray-600">
          At Collab-Sphere, we believe in the power of collaboration and
          community. Our vision is to create a thriving ecosystem where
          students can connect, learn, and grow together while contributing to
          impactful open-source projects.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/projects"
          >
            Explore Projects
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/auth/register"
          >
            Get Started
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Powered by Next.js
        </a>
      </footer>
    </div>
  );
}