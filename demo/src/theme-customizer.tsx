"use client"

import template from "lodash/template"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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

export function ThemeCustomizer({ className }: React.ComponentProps<"div">) {
  const [activeTheme, setActiveTheme] = React.useState("default")

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("activeTheme") || "default"
    setActiveTheme(savedTheme)
  }, [])
  React.useEffect(() => {
   const previewElement = document.querySelector("#preview")
    if (previewElement) {
      previewElement.setAttribute("style",
        getThemeCodeOKLCH(
          baseColorsOKLCH[activeTheme as keyof typeof baseColorsOKLCH],
          0.25
        )
      )
    }
    localStorage.setItem("activeTheme", activeTheme)
  }, [activeTheme])
  return (
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
              backgroundColor: `hsl(${theme.cssVars.light["primary"]})`,
            }}
          />
          <Label
            className={cn(
              "text-xs text-center mt-1 font-medium",
              activeTheme === theme.name ? "text-primary" : "text-muted-foreground"
            )}
            htmlFor={theme.name}
          >
            {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
          </Label>
        </div>
      ))}
    </div>
  )
}



function CustomizerCode({ themeName }: { themeName: string }) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const [tailwindVersion, setTailwindVersion] = React.useState("v4")
  const activeTheme = React.useMemo(
    () => baseColors.find((theme) => theme.name === themeName),
    [themeName]
  )
  const activeThemeOKLCH = React.useMemo(
    () => baseColorsOKLCH[themeName as keyof typeof baseColorsOKLCH],
    [themeName]
  )

  React.useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false)
      }, 2000)
    }
  }, [hasCopied])

  return (
    <>

    </>
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