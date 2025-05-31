import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-6 w-6 shrink-0 rounded-md border-2 border-[rgba(138,111,183,0.7)] bg-[rgba(28,13,54,0.95)] shadow focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 data-[state=checked]:border-accent-gold data-[state=checked]:bg-[rgba(74,43,123,0.7)] data-[state=checked]:text-accent-gold",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-accent-gold")}
    >
      <Check className="h-5 w-5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
