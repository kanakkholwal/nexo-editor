"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ThemeCustomizer } from "./theme-customizer";

export function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-3">
          <h2 className="mb-4 font-bold text-lg">Settings</h2>
          <div className="flex items-center gap-2">
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("light")}
              className={theme === "light" ? "bg-gray-200" : ""}
            >
              <Sun className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("dark")}
              className={theme === "dark" ? "bg-gray-200" : ""}
            >
              <Moon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setTheme("system")}
              className={theme === "system" ? "bg-gray-200" : ""}
            >
              System
            </Button>
          </div>
          <ThemeCustomizer/>
        </SheetContent>
      </Sheet>
    </div>
  );
}
