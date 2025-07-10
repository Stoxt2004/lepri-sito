import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-500 text-text-primary shadow-gold hover:bg-primary-400 hover:shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0 active:shadow-gold-sm',
        destructive:
          'bg-red-600 text-white shadow-brown-soft hover:bg-red-700 hover:shadow-brown-dark hover:-translate-y-0.5 active:translate-y-0',
        outline:
          'border-2 border-primary-500 bg-transparent text-primary-600 shadow-gold-sm hover:bg-primary-50 hover:shadow-gold hover:-translate-y-0.5 dark:text-text-gold dark:border-text-gold dark:hover:bg-neutral-800',
        secondary:
          'bg-secondary-500 text-neutral-50 shadow-brown-soft hover:bg-secondary-400 hover:shadow-brown-dark hover:-translate-y-0.5 active:translate-y-0',
        ghost:
          'hover:bg-primary-50 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-text-gold transition-colors',
        link:
          'text-primary-600 underline-offset-4 hover:underline hover:text-accent-gold',
        gold:
          'bg-primary-500 text-text-primary shadow-gold hover:shadow-gold-glow hover:bg-primary-400 hover:-translate-y-0.5 active:translate-y-0 active:shadow-gold-sm',
        'gold-outline':
          'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:shadow-gold hover:-translate-y-0.5 dark:text-text-gold dark:border-text-gold dark:hover:bg-neutral-800',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-2xl px-3',
        lg: 'h-11 rounded-3xl px-8',
        xl: 'h-12 rounded-3xl px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }