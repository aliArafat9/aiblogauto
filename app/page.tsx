import React from "react";
import {Button} from "@/components/ui/button";
import LoginModal from "@/components/modal/login-modal";

export default function HomePage(){
  return(
    <div className="flex justify-center items-center h-screen">
      <Button className="cursor-pointer" variant="outline">Login</Button>
      <LoginModal/>
    </div>
  );
}

