import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/authconfig";
import { connectToDB } from "@/app/lib/utils";
import { User } from "@/app/lib/models";
import bcrypt from "bcrypt";

// Function to handle user login
const login = async (credentials) => {
  try {
    connectToDB();

    // First, check if the company exists
    const userWithCompany = await User.findOne({
      companyID: credentials.companyid,
    });
    if (!userWithCompany) {
      throw new Error("INVALID_COMPANY");
    }

    // Then, check if the user exists within that company
    const user = await User.findOne({
      username: credentials.username,
      companyID: credentials.companyid,
    });

    if (!user) {
      throw new Error("INVALID_USERNAME");
    }

    // Finally, check the password
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("INVALID_PASSWORD");
    }

    return user;
  } catch (err) {
    console.log(err);
    throw err; // Propagate the error
  }
};

// Exported functions for sign in, sign out, and authentication
export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          console.log("Authentication error:", err.message);
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
        token.companyID = user.companyID;
        token.role = user.isAdmin;
      }
      console.log(token, "is the token");
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
        session.user.companyID = token.companyID;
        session.user.role = token.role;
      }
      console.log(session, "is the session");
      return session;
    },
  },
});
