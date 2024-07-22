"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useSession } from "next-auth/react";
import { Separator } from "./separator";

export default function HomePageGreeting() {
  const { data: session } = useSession();
  console.log(session, "is the data recieved")

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

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString("en-US");
    const timeString = currentDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    return `${dateString} ${timeString}`;
  };

  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
  useEffect(
    () => {
      const intervalId = setInterval(() => {
        setCurrentDateTime(getCurrentDateTime());
      }, 1000);
    } // Update every second
  );

  // Render the card
  return (
    <div>
      <Card className="border-none -mt-4">
        <CardHeader className="flex flex-row items-center">
          <Avatar className="size-20 md:size-28 mr-4">
            <AvatarImage src={session?.user?.img || "/noavatar.png"} />
            <AvatarFallback className="text-3xl md:text-5xl">
              {session?.user?.username.charAt(0)}
            </AvatarFallback>
          </Avatar>{" "}
          <CardTitle className="text-2xl md:text-5xl">
            <span className="font-normal">{getGreeting()}</span>,{" "}
            {session?.user?.username}
          </CardTitle>
        </CardHeader>
        <div className="flex-col">
          <CardContent className="flex flex-row justify-between">
            <CardDescription className="mr-10">
         Welcome to the dashboard
            </CardDescription>
            <CardDescription className="flex-end">
              {currentDateTime}
            </CardDescription>
          </CardContent>
        </div>
      </Card>
      <Separator className="space-y-2"/>
    </div>
  );
}
