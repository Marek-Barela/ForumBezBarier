import { Navigation } from "@/components/layouts/Navigation";

export default function AppLayout({ children }: { children: JSX.Element }) {
  return (
    <Navigation>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 min-h-screen">
        {children}
      </main>
    </Navigation>
  );
}
