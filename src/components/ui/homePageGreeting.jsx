import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

import { Separator } from "./separator";
import { auth } from "@/auth";

export default async function HomePageGreeting() {


const { user } = await auth();
console.log(user, "is the recieved user");

  const getGreeting = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  // Render the card
  return (
    <div>
      <Card className="border-none -mt-4">
        <CardHeader className="flex flex-row items-center">
          <Avatar className="size-20 md:size-28 mr-4">
            <AvatarImage src={user?.img || "/noavatar.png"} />
            <AvatarFallback className="text-3xl md:text-5xl">
              {user?.username.charAt(0)}
            </AvatarFallback>
          </Avatar>{" "}
          <CardTitle className="text-2xl md:text-5xl">
            <span className="font-normal">{getGreeting()}</span>,{" "}
            {user?.username}
          </CardTitle>
        </CardHeader>
        <div className="flex-col">
          <CardContent className="flex flex-row justify-between">
            <CardDescription className="mr-10">
              Welcome to the dashboard
            </CardDescription>
            <CardDescription className="flex-end">
              {/* {currentDateTime} */}
              Authorisation Level: {user?.role === true ? "Administrator" : "Standard"}
            </CardDescription>
          </CardContent>
        </div>
      </Card>
      <Separator className="space-y-2"/>
    </div>
  );
}
