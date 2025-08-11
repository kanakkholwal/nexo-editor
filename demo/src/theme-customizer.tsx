"use client"

import template from "lodash/template"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  BaseColor,
  baseColors,
  baseColorsOKLCH,
} from "./colors"
import { Label } from "./components/ui/label"
interface BaseColorOKLCH {
  light: Record<string, string>
  dark: Record<string, string>
}

const THEMES = baseColors.filter(
  (theme) => !["slate", "stone", "gray", "zinc"].includes(theme.name)
)

const updateTheme = (themeName: string) => {
  const previewElement = document.querySelector("#nexo-editor-preview-style")
  if (previewElement) {
    previewElement.innerHTML =
      getThemeCodeOKLCH(
        baseColorsOKLCH[themeName as keyof typeof baseColorsOKLCH],
        0.625
      )
    localStorage.setItem("activeTheme", themeName)
  }
}
export function ThemeCustomizer({ className }: React.ComponentProps<"div">) {
  const [activeTheme, setActiveTheme] = React.useState("zinc")
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("activeTheme")
    if (savedTheme && THEMES.some((theme) => theme.name === savedTheme)) {
      setActiveTheme(savedTheme)
    }
  }, [])
  React.useEffect(() => {
    updateTheme(activeTheme)
  }, [activeTheme])
  const currentTheme = (THEMES.find((theme) => theme.name === activeTheme) || THEMES[0]) as BaseColor


  return <Dialog>
    <DialogTrigger asChild>
      <Button
        key={currentTheme.name}
        variant="outline"
        size="sm"
        data-active={activeTheme === currentTheme.name}
      >
        <span
          className="size-5 aspect-square rounded-full cursor-pointer"
          style={{
            backgroundColor: `hsl(${currentTheme.activeColor[resolvedTheme as "light" | "dark"]})`,
          }} />
        {currentTheme.label}
      </Button>

    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Theme Customizer
        </DialogTitle>
        <DialogDescription>
          Choose a theme for the Nexo Editor preview.
        </DialogDescription>
      </DialogHeader>
      <div className={cn("grid w-full gap-2 grid-cols-3 lg:grid-cols-4", className)}>
        {THEMES.map((theme) => (
          <div key={theme.name} className="flex items-center justify-center flex-col">
            <Button
              key={theme.name}
              variant="outline"
              size="sm"
              data-active={activeTheme === theme.name}
              onClick={() => setActiveTheme(theme.name)}
              className="size-8 text-xs font-medium aspect-square rounded-full cursor-pointer"
              style={{
                backgroundColor: `hsl(${theme.activeColor[resolvedTheme as "light" | "dark"]})`,
              }}
            />
            <Label
              className={cn(
                "text-xs text-center mt-1 font-medium",
                activeTheme === theme.name ? "text-primary" : "text-muted-foreground"
              )}
              htmlFor={theme.name}
            >
              {theme.label}
            </Label>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>

}

export function ThemeToggler({
  className,
}: React.ComponentProps<"div">) {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 p-0", className)}
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {resolvedTheme === "light" ? <Moon /> : <Sun />}
    </Button>
  )
}



function getThemeCodeOKLCH(theme: BaseColorOKLCH | undefined, radius: number) {
  if (!theme) {
    return ""
  }

  const rootSection =
    ":root {\n  --radius: " +
    radius +
    "rem;\n" +
    Object.entries(theme.light)
      .map((entry) => "  --" + entry[0] + ": " + entry[1] + ";")
      .join("\n") +
    "\n}\n\n.dark {\n" +
    Object.entries(theme.dark)
      .map((entry) => "  --" + entry[0] + ": " + entry[1] + ";")
      .join("\n") +
    "\n}\n"

  return rootSection
}

function getThemeCode(theme: BaseColor | undefined, radius: number) {
  if (!theme) {
    return ""
  }

  return template(BASE_STYLES_WITH_VARIABLES)({
    colors: theme.cssVars,
    radius: radius.toString(),
  })
}

const BASE_STYLES_WITH_VARIABLES = `
@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: <%- radius %>rem;
    --chart-1: <%- colors.light["chart-1"] %>;
    --chart-2: <%- colors.light["chart-2"] %>;
    --chart-3: <%- colors.light["chart-3"] %>;
    --chart-4: <%- colors.light["chart-4"] %>;
    --chart-5: <%- colors.light["chart-5"] %>;
  }

  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
    --chart-1: <%- colors.dark["chart-1"] %>;
    --chart-2: <%- colors.dark["chart-2"] %>;
    --chart-3: <%- colors.dark["chart-3"] %>;
    --chart-4: <%- colors.dark["chart-4"] %>;
    --chart-5: <%- colors.dark["chart-5"] %>;
  }
}
`