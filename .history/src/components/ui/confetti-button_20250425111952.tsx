import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

// Define TypeScript type for confetti options
type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
};

// Add window.confetti type definition
declare global {
  interface Window {
    confetti?: (options?: ConfettiOptions) => void;
  }
}

const confettiButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-md",
        sm: "h-8 px-3 py-1 rounded-md text-sm",
        lg: "h-12 px-6 py-3 rounded-md text-lg",
        xl: "h-14 px-8 py-4 rounded-md text-xl",
        icon: "h-10 w-10 rounded-full",
        pill: "h-10 px-6 py-2 rounded-full",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:animate-bounce",
        scale: "active:scale-95",
        shake: "hover:animate-[wiggle_0.3s_ease-in-out]",
        glow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]",
        expand: "active:scale-110 transition-transform",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "scale",
    },
  }
);

export interface ConfettiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof confettiButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  confettiOptions?: ConfettiOptions;
  autoConfetti?: boolean;
  triggerOnHover?: boolean;
}

const ConfettiButton = React.forwardRef<HTMLButtonElement, ConfettiButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      asChild = false,
      children,
      icon,
      iconPosition = "left",
      loading = false,
      confettiOptions = {
        particleCount: 100,
        spread: 70,
      },
      autoConfetti = false,
      triggerOnHover = false,
      ...props
    },
    ref
  ) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      // Dynamically load the confetti script if not already loaded
      if (!window.confetti) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js";
        script.async = true;
        script.onload = () => {
          setScriptLoaded(true);
        };
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      } else {
        setScriptLoaded(true);
      }
    }, []);

    useEffect(() => {
      if (scriptLoaded && autoConfetti && window.confetti && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        window.confetti({
          ...confettiOptions,
          origin: { x, y }
        });
      }
    }, [scriptLoaded, autoConfetti, confettiOptions]);

    const triggerConfetti = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.confetti && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        window.confetti({
          ...confettiOptions,
          origin: { x, y }
        });
      }
    };

    return (
      <button
        ref={(node) => {
          // Merge refs
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          // Safe assignment to mutable ref
          buttonRef.current = node;
        }}
        className={cn(confettiButtonVariants({ variant, size, animation }), className)}
        onClick={(e) => {
          triggerConfetti(e);
          props.onClick?.(e);
        }}
        onMouseEnter={triggerOnHover ? (e) => triggerConfetti(e as unknown as React.MouseEvent<HTMLButtonElement>) : undefined}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : icon && iconPosition === "left" ? (
          <span className="mr-1">{icon}</span>
        ) : null}
        {children}
        {icon && iconPosition === "right" && !loading ? (
          <span className="ml-1">{icon}</span>
        ) : null}
      </button>
    );
  }
);

ConfettiButton.displayName = "ConfettiButton";

export { ConfettiButton, confettiButtonVariants };
