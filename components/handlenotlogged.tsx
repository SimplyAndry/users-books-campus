'use client';

import { Button } from "@/components/ui/button";

export function HandleNotLogged(){
    return (
        <div className="flex items-center justify-center h-screen flex-col gap-4">
          <p className="text-lg">U need to login first!</p>
          <Button asChild>
            <a href="/auth/login">Login</a>
          </Button>
        </div>
      );
}