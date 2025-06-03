"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export function NavigationLink({ 
  href, 
  children, 
  className = "",
  activeClassName = "text-blue-600 font-medium"
}: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "text-sm hover:text-gray-600 transition-colors",
        className,
        isActive && activeClassName
      )}
    >
      {children}
    </Link>
  );
}