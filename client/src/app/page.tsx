"use client";
import {
  Code2,
  Rocket,
  Wrench,
  Sun,
  Moon,
  Boxes,
  MousePointer2,
  MousePointerClick,
} from "lucide-react";

export default function Home() {
  const currentFeatures = [
    "Responsive UI with TailwindCSS",
    "Real-time updates via API routes",
    "Dynamic content rendering with Next.js",
    "Create, edit, and delete projects and tasks",
    "Search across projects and tasks",
    "Gantt-style timeline view of projects and tasks ordered by date",
    "Project metrics dashboard (percentages of tasks by state)",
  ];

  const upcomingFeatures = [
    "AWS deployment",
    "User authentication and authorization",
    "Advanced analytics dashboard",
    "Notifications and activity logs",
    "Team collaboration tools",
    "Editable project descriptions and task details",
  ];

  const techStack = [
    { name: "Next.js", icon: <Code2 className="w-5 h-5" /> },
    { name: "TypeScript", icon: <Code2 className="w-5 h-5" /> },
    { name: "TailwindCSS", icon: <Code2 className="w-5 h-5" /> },
    { name: "Lucide Icons", icon: <Code2 className="w-5 h-5" /> },
  ];

  return (
    <div
      className={
        "min-h-screen px-6 py-12 transition-colors duration-500 dark:bg-purple-800 dark:text-gray-100 bg-gray-100 text-purple-700 "
      }
    >
      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Project Overview</h1>
      </header>

      {/* DESCRIPTION */}
      <div
        className={
          "rounded-2xl shadow-md border p-6 mb-6 dark:bg-purple-700 dark:border-purple-500 bg-white border-gray-200"
        }
      >
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <Boxes className="w-6 h-6" /> Welcome to the Project
        </h2>
        <p className="text-base leading-relaxed">
          The application provides an easy way to track projects and tasks
          visually, view progress analytics, and manage work states from start
          to completion.
        </p>
      </div>

      {/* CURRENT FEATURES */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MousePointerClick className="w-5 h-5" /> Current Features
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {currentFeatures.map((feature, i) => (
            <div
              key={i}
              className={
                "rounded-2xl p-4 border transition dark:bg-purple-600 dark:border-purple-400 dark:hover:bg-purple-500 bg-white border-gray-200 hover:bg-gray-200 "
              }
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* INCOMING FEATURES */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Wrench className="w-5 h-5" /> Incoming Features
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingFeatures.map((feature, i) => (
            <div
              key={i}
              className={
                "rounded-2xl p-4 border transition dark:bg-purple-600 dark:border-purple-400 dark:hover:bg-purple-500 bg-white border-gray-200 hover:bg-gray-200"
              }
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-sm opacity-70 text-center">
        .Built with TypeScript, Next.js, Express, Prisma, PostgreSQL, and
        TailwindCSS.
      </footer>
    </div>
  );
}
