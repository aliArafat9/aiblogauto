import React from "react";
import {Button} from "@/components/ui/button";

export default function HomePage(){
  return(
    <div className="flex justify-center items-center h-screen">
      <Button className="cursor-pointer" variant="outline">Login</Button>
    </div>
  );
}