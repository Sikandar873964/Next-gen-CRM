import { ThemeToggle } from "@/components/theme-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  BoxesIcon,
  LucideUsers2,
  MessageCircleQuestionIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <div className="absolute top-0 left-0 p-6">
        <ThemeToggle />
      </div>
      <header className="shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">CRM Application</h1>
          <nav>
            <Link href="/login">
              <Button variant="secondary" className="mr-4">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button>Signup</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="bg-white shadow sm:rounded-lg">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-4xl">
                    Welcome to the CRM Application
                  </CardTitle>
                  <CardDescription className="text-center text-xl mt-4">
                    Manage your customers, products, and more with ease.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FeatureCard
                      title="Customer Management"
                      description="Easily manage all your customer information in one place."
                      icon={<LucideUsers2 className="size-12 mx-auto" />}
                    />
                    <FeatureCard
                      title="Product Management"
                      description="Keep track of your products and their details effortlessly."
                      icon={<BoxesIcon className="size-12 mx-auto" />}
                    />
                    <FeatureCard
                      title="Enquiry Management"
                      description="Manage and track customer enquiries efficiently."
                      icon={
                        <MessageCircleQuestionIcon className="size-12 mx-auto" />
                      }
                    />
                    <FeatureCard
                      title="User Management"
                      description="Control user access and permissions within the application."
                      icon={<User2Icon className="size-12 mx-auto" />}
                    />
                  </div>
                </CardContent>
                <CardFooter className="mt-8 flex justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        href="/signup"
                        className="text-lg mx-auto text-center"
                      >
                        Get Started
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>How to get started?</AlertDialogHeader>
                      <AlertDialogDescription>
                        <Link href="/login" className="w-1/3">
                          <Card className="hover:bg-primary/10 dark:hover:bg-primary-foreground/50 transition-colors">
                            <CardHeader className="font-bold text-2xl">
                              Login
                            </CardHeader>
                            <CardContent>
                              Login as an existing user to the CRM system
                            </CardContent>
                          </Card>
                        </Link>
                      </AlertDialogDescription>
                      <AlertDialogDescription>
                        {/* Signup card */}
                        <Link href="/signup" className="w-1/3 mt-2">
                          <Card className="hover:bg-primary/10 dark:hover:bg-primary-foreground/50 transition-colors">
                            <CardHeader className="font-bold text-2xl">
                              Signup
                            </CardHeader>
                            <CardContent>
                              Sign up as a new company into the CRM
                            </CardContent>
                          </Card>
                        </Link>
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <Card className="text-center p-6 border border-gray-200 rounded-lg hover:bg-primary/10 dark:hover:bg-primary-foreground/50 transition-colors">
      <div className="text-6xl mb-4">{icon}</div>
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      <CardDescription className="mt-2">{description}</CardDescription>
    </Card>
  );
}
