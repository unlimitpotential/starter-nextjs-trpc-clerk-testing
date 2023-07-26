import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate6 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-slate1 hover:bg-slate12 dark:bg-white",
        destructive: "bg-red9 hover:bg-red10",
        outline: "border border-slate7 hover:border-slate8 hover:bg-slate4",
        secondary:
          "border border-slate7 bg-slate3 hover:border-slate8 hover:bg-slate4",
        ghost: "hover:bg-slate4",
        link: "text-slate11 underline decoration-slate7 underline-offset-2 hover:text-slate12 hover:decoration-slate8",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1",
        xsm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
