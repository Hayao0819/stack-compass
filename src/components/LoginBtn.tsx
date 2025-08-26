import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function LoginBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button type="submit" className="w-full">
        GitHubでログイン
      </Button>
    </form>
  );
}
