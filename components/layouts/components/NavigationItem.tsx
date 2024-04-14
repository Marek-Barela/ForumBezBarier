"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItemProps {
  href: string;
  title: string;
  icon: JSX.Element;
}

export const NavigationItem = ({ href, title, icon }: NavigationItemProps) => {
  const path = usePathname();

  const activeClass = path === href ? "bg-slate-900 text-white" : "";

  return (
    <Link
      href={href}
      className={`mx-[-0.65rem] bg-primary flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground ${activeClass}`}>
      {icon}
      {title}
    </Link>
  );
};
