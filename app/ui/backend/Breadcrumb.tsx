import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BreadCrumb() {
  const pathname = usePathname();
  const breadcrumbs = pathname.replace(/^\//, "").split("/").filter(Boolean);

  return (
    <nav className="hidden sm:flex items-center gap-1 text-sm">
      {breadcrumbs.map((crumb, i) => {
        const href = "/" + breadcrumbs.slice(0, i + 1).join("/");
        const isLast = i === breadcrumbs.length - 1;
        return (
          <span key={href} className="flex items-center gap-1">
            {i > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 text-neutral-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
            {isLast ? (
              <span className="font-medium capitalize text-neutral-200">
                {crumb}
              </span>
            ) : (
              <Link
                href={href}
                className="capitalize text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {crumb}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
