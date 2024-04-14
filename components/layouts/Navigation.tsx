import Link from "next/link";
import { Menu, TrendingUp, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { currentUser, UserButton } from "@clerk/nextjs";
import { NavigationItem } from "./components/NavigationItem";
import { routes } from "@/routing";

interface NavigationProps {
  children: React.ReactNode;
}

const { root, popular, myPosts, signIn } = routes;

export async function Navigation({ children }: NavigationProps) {
  const user = await currentUser();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href={root} className="flex items-center gap-2 font-semibold">
              <span>Forum Bez Barier</span>
            </Link>
          </div>
          <div className="flex-1 p-4">
            <nav className="grid items-start gap-4 px-2 text-sm font-medium lg:px-4">
              <NavigationItem
                href={popular}
                title="Popularne"
                icon={<TrendingUp className="h-4 w-4" />}
              />
              <NavigationItem
                href={myPosts}
                title="Moje Posty"
                icon={<UserRound className="h-4 w-4" />}
              />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex justify-between h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium p-4">
                <NavigationItem
                  href={popular}
                  title="Popularne"
                  icon={<TrendingUp className="h-4 w-4" />}
                />
                <NavigationItem
                  href={myPosts}
                  title="Moje Posty"
                  icon={<UserRound className="h-4 w-4" />}
                />
              </nav>
            </SheetContent>
          </Sheet>
          <div />
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href={signIn}>
              <Button>Zaloguj</Button>
            </Link>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}
