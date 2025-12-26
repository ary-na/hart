// src/lib/ui/Breadcrumbs.tsx

import Link from "next/link";
import { cn } from "@hart/lib/utils";
import { BreadcrumbsProps } from "@hart/lib/types";

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items.length) return null;
  const allButLast = items.slice(0, -1);
  const last = items[items.length - 1];

  return (
    <div className={cn("breadcrumbs text-sm mb-2", className)}>
      <ul>
        {allButLast.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}

        <li className="opacity-70">{last.label}</li>
      </ul>
    </div>
  );
}
