import { ThemeToggle } from "@/components/theme-button";
import LoginForm from "./loginForm";

export const metadata = {
  title: "Login | CRM App",
  description: "Login to your account to access the CRM App",
};

// This is the Login component
export default function Login() {
  return (
    <div className="flex justify-center h-screen">
      {/* ThemeToggle component */}
      <div className="absolute top-0 right-0 p-6">
        <ThemeToggle />
      </div>
      {/* LoginForm component */}
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
