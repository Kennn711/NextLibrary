import { Button } from "@/components/ui/button";

export default function Index() {
  const cards = [
    {
      href: "/add-book",
      title: "Add a New Book",
      description:
        "Register a new book into the library catalog quickly and easily.",
    },
    {
      href: "/search-book",
      title: "Search for a Book",
      description: "Find any book by title, author, genre, or ISBN in seconds.",
    },
    {
      href: "/view-books",
      title: "View All Books",
      description:
        "Browse and explore the entire library collection at a glance.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 selection:bg-blue-500/30">
      {/* Hero */}
      <div className="max-w-3xl text-center space-y-4 mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-linear-to-b from-white to-neutral-400 bg-clip-text text-transparent">
          Welcome to{" "}
          <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Library
          </span>
        </h1>

        <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Manage your library resources with ease. Add, search, and browse your
          entire book collection in one place.
        </p>
      </div>

      {/* Section Label */}
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-500 mb-6">
        What would you like to do?
      </p>

      <div>
        <Button>Click me</Button>
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {cards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="group relative rounded-xl border border-neutral-800 bg-neutral-900/50 p-6
                       transition-all duration-300
                       hover:border-neutral-700 hover:bg-neutral-900"
          >
            {/* Subtle top-left gradient glow on hover */}
            <div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300
                          group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), rgba(59,130,246,0.06), transparent 60%)",
              }}
            />

            <h2 className="text-base font-semibold text-neutral-200 group-hover:text-white transition-colors duration-200 flex items-center gap-2">
              {card.title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-neutral-600 transition-all duration-200 group-hover:text-blue-400 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-neutral-500 group-hover:text-neutral-400 transition-colors duration-200">
              {card.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
