"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { useSignIn } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

interface SignInButtonProps extends ButtonProps {
  text: string;
}

export function SignInButton({ text, ...props }: SignInButtonProps) {
  const { signIn, isLoaded } = useSignIn();
  const path = usePathname();

  if (!isLoaded) return null;

  const signInWithGoogle = () =>
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: path,
    });

  return (
    <Button onClick={signInWithGoogle} {...props}>
      {text}
    </Button>
  );
}
