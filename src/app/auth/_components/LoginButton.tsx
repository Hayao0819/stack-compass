"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

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
