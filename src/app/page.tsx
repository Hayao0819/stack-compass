import { auth } from "@/auth";
import { SignedIn } from "./_components/SignedIn";
import { Welcome } from "./_components/Welcome";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();

  return session?.user ? <SignedIn session={session} /> : <Welcome />;
}
