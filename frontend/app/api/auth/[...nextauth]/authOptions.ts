import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { 
          label: "Username", 
          type: "text", 
          placeholder: "your-cool-username" 
        },
        password: { 
          label: "Password", 
          type: "password",
          placeholder: "your-awesome-password"
        }
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Deon", password: "password" };
        if (credentials?.username === user.name && credentials?.password === user.password) {
          localStorage.setItem('name', credentials.username)
          return {...user, name: user.name};
        } else {
          return null;
        }
      }
    })
  ],
}
