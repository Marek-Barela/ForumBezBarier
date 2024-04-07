import { Navigation } from "@/components/layouts/Navigation";

export default function AppLayout({ children }: { children: JSX.Element }) {
  return (
    <Navigation>
      <main className="p-4 sm:px-6 min-h-screen">{children}</main>
    </Navigation>
  );
}
