"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <Button
      onClick={async () => await signIn("github")}
      type="submit"
      className="w-full"
    >
      GitHubでログイン
    </Button>
  );
}
