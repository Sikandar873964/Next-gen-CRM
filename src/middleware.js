import NextAuth from "next-auth";
// Import the authentication configuration from a custom file
import { authConfig } from "@/authconfig";

// Export the default NextAuth handler, passing in the custom authentication configuration
export default NextAuth(authConfig).auth;

// Export a config object that specifies URL matching patterns for middleware
export const config = {
  // Define a matcher array to exclude certain paths from the NextAuth middleware
  matcher: [
    // This pattern excludes paths starting with "api", "static", or "_next"
    // It also excludes paths containing a dot (.) indicating a file extension (e.g., .js, .css)
    '/((?!api|static|.*\\..*|_next).*)'
  ],
};