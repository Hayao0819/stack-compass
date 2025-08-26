import NextAuth, { type Account, type Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,

      authorization: {
        params: {
          scope: "repo user:email read:user",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Add accessToken to session (型拡張)
      (session as Session & { accessToken?: string }).accessToken =
        token.accessToken as string;
      if (session.user) {
        (session.user as typeof session.user & { id?: string }).id =
          token.id as string;
      }
      return {
        ...session,
        token: token,
      };
    },
  },
});
