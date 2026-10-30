import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// Shapes and colours follow /DESIGN.md (button-primary, button-secondary). Sizes set --btn-px so the
// secondary underline lines up with the label padding.
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding px-(--btn-px) text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,opacity,transform] duration-(--duration-hover) ease-out outline-none select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-accent-strong hover:text-on-accent-strong [&_[data-icon=inline-end]]:transition-transform [&_[data-icon=inline-end]]:duration-(--duration-hover) motion-safe:hover:[&_[data-icon=inline-end]]:translate-x-1",
        outline:
          "border-border bg-background text-foreground after:absolute after:inset-x-(--btn-px) after:bottom-[calc(50%-0.75em)] after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-(--duration-hover) after:ease-out hover:after:scale-x-100 motion-reduce:after:transition-none aria-expanded:after:scale-x-100",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        // Same resting underline as inline links: colour alone cannot mark a link (WCAG 1.4.1).
        link: "link",
      },
      size: {
        default: "h-11 gap-2 [--btn-px:--spacing(5)] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-7 gap-1 text-xs [--btn-px:--spacing(3)] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 [--btn-px:--spacing(4)] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 [--btn-px:--spacing(6)] has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-11 [--btn-px:0]",
        "icon-xs": "size-7 [--btn-px:0] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 [--btn-px:0]",
        "icon-lg": "size-12 [--btn-px:0]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
