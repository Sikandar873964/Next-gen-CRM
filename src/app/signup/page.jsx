import { ThemeToggle } from "@/components/theme-button";
import SignInForm from "./signUpForm";

export const metadata = {
  title: "Sign Up | CRM App",
  description: "Sign up to create an account on the CRM App",
};

export default function Signin() {
  return (
    <div className="flex justify-center h-screen">
      <div className="absolute top-0 right-0 p-6">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center">
        <SignInForm />
      </div>
    </div>
  );
}
