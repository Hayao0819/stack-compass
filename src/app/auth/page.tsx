import Link from "next/link";
import { LoginButton } from "./_components/LoginButton";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-card p-8 rounded-lg border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">StackCompass</h1>
            <p className="text-muted-foreground">
              GitHubでログインして、リポジトリを分析しましょう
            </p>
          </div>

          <LoginButton />

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ログインすることで、
              <Link href="/terms" className="text-primary hover:underline">
                利用規約
              </Link>
              と
              <Link href="/privacy" className="text-primary hover:underline">
                プライバシーポリシー
              </Link>
              に同意したものとみなされます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
