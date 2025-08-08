import "@/components/tiptap-ui-primitive/input/input.scss"
import { cn } from "@/lib/tiptap-utils"
import * as React from "react"
import { useId } from "react"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const id = useId()
  return (
    <input type={type} className={cn("tiptap-input", className)} {...props} id={id} name={id} />
  )
}

function InputGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("tiptap-input-group", className)} {...props}>
      {children}
    </div>
  )
}

export { Input, InputGroup }
