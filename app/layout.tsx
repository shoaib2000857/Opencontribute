import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Collab-Sphere",
  description:
    "A collaborative platform for students to share and find open-source projects.",
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
export default RootLayout;
