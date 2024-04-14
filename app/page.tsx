"use client";
import { Button } from "@/components/ui/button";
import { routes } from "@/routing";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ShieldIcon, UsersIcon, AccessibilityIcon, ScalingIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const { popular, myPosts, signIn } = routes;

export default function Landing() {
  const { user } = useUser();

  return (
    <>
      <section className="container grid lg:grid-cols-2 place-items-center py-20 px-20 gap-10 min-h-screen">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                Witaj
              </span>{" "}
              w miejscu,
            </h1>{" "}
            gdzie każdy głos ma{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                znaczenie
              </span>{" "}
            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Nasza społeczność jest twoją przestrzenią do dzielenia się doświadczeniami,
            znajdowania wsparcia i celebracji sukcesów.
          </p>

          <div className="flex gap-2 items-center space-y-4 md:space-y-0 md:space-x-4">
            <Link href={popular} className="flex-1">
              <Button className="w-full">Sprawdź</Button>
            </Link>

            {!user ? (
              <Link href={signIn} className="flex-1" style={{ margin: 0 }}>
                <Button className="w-full" variant="outline">
                  Zaloguj
                </Button>
              </Link>
            ) : (
              <Link href={myPosts} className="flex-1" style={{ margin: 0 }}>
                <Button className="w-full" variant="outline">
                  Moje Posty
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center min-h-[500px] bg-slate-900">
        <div className="bg-muted/50  rounded-lg py-12">
          <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
            <Image src="/wheelchair.jpg" alt="" width={440} height={330} />
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl text-white font-bold">
                <span>O nas</span>
              </h2>
              <p className="text-xl text-white mt-4">
                Nasza społeczność to miejsce, gdzie różnorodność i dostępność stoją na
                pierwszym miejscu. Zbudowaliśmy przestrzeń, w której osoby niepełnosprawne
                i ich sojusznicy mogą dzielić się wiedzą, doświadczeniami i wsparciem.
                Jesteśmy tu, aby słuchać, uczyć się od siebie nawzajem i pracować na rzecz
                tworzenia bardziej inkluzywnego świata. Dołącz do naszego forum, gdzie
                każdy ma głos, a każda historia zasługuje na wysłuchanie. Razem możemy
                przekształcić wyzwania w możliwości i świętować każde osiągnięcie na
                drodze do pełnej akceptacji i integracji
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container text-center py-24 sm:py-32">
        <h2 className="text-3xl md:text-4xl mb-8 font-bold ">Krok po kroku</h2>
        <p className="mx-auto mt-4 mb-8 text-xl text-muted-foreground">
          Twoje nowe centrum wsparcia, gdzie każdy krok jest prosty i intuicyjny.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }) => (
            <Card key={title} className="bg-muted/50">
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center">
                  <span className="bg-slate-900 my-4 text-white p-4 rounded-md">
                    {icon}
                  </span>
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

const features = [
  {
    icon: <AccessibilityIcon />,
    title: "Dostępność",
    description:
      "Tworzymy przestrzeń, gdzie wszystkie funkcje są łatwo dostępne. Przyjazny dla użytkownika interfejs i wsparcie technologii asystujących gwarantują, że każdy może w pełni korzystać z naszego forum.",
  },
  {
    icon: <UsersIcon />,
    title: "Społeczność",
    description:
      "Nasza społeczność to serce forum, miejsce, gdzie wsparcie i solidarność to fundament. Łączymy ludzi, umożliwiając dzielenie się doświadczeniami i wzajemną pomoc.",
  },
  {
    icon: <ScalingIcon />,
    title: "Skalowalność",
    description:
      "Forum jest zaprojektowane z myślą o przyszłości. Elastyczność naszej platformy pozwala na rozszerzanie funkcjonalności, aby nadążyć za rosnącymi potrzebami naszych użytkowników.",
  },
  {
    icon: <ShieldIcon />,
    title: "Inkluzywność",
    description:
      "Zaangażowanie w inkluzywność to nasz priorytet. Dążymy do stworzenia środowiska, w którym każdy czuje się zrozumiany, akceptowany i doceniany, bez względu na swoje indywidualne wyzwania.",
  },
];
