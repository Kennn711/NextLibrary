import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const pathNames = pathname.split("/").filter((path) => path !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const itemTitle =
            link[0].toUpperCase() + link.slice(1).replace(/-/g, " ");

          const isFirst = index === 0;
          const isLast = index === pathNames.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{itemTitle}</BreadcrumbPage>
                ) : isFirst ? (
                  <span className="text-muted-foreground">{itemTitle}</span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{itemTitle}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
