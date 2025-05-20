
import * as React from "react";
import { cn } from "../lib/utils";

interface TooltipContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined);

interface TooltipProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

const Tooltips: React.FC<TooltipProps> = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  delayDuration = 700,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  
  const setOpen = React.useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    if (!isControlled) {
      setUncontrolledOpen(value);
    }
    if (onOpenChange) {
      const newValue = typeof value === "function" ? value(open) : value;
      onOpenChange(newValue);
    }
  }, [isControlled, onOpenChange, open]);

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      {children}
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ children, asChild = false, ...props }, ref) => {
    const context = React.useContext(TooltipContext);
    if (!context) {
      throw new Error("TooltipTrigger must be used within a Tooltip");
    }
    
    const { setOpen } = context;
    
    const handleMouseEnter = () => {
      setOpen(true);
    };
    
    const handleMouseLeave = () => {
      setOpen(false);
    };
    
    if (asChild) {
      return (
        <div 
          ref={ref}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                ...child.props
              });
            }
            return child;
          })}
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, align = "center", sideOffset = 4, side = "bottom", ...props }, ref) => {
    const context = React.useContext(TooltipContext);
    if (!context) {
      throw new Error("TooltipContent must be used within a Tooltip");
    }
    
    const { open } = context;
    
    if (!open) return null;
    
    // Determine position based on side
    let style: React.CSSProperties = {
      position: "absolute",
      zIndex: 100, // Increased z-index to ensure tooltip appears above other elements
    };
    
    switch (side) {
      case "top":
        style = {
          ...style,
          bottom: `calc(100% + ${sideOffset}px)`,
          left: align === "center" ? "50%" : align === "start" ? "0" : "auto",
          right: align === "end" ? "0" : "auto",
          transform: align === "center" ? "translateX(-50%)" : "none",
        };
        break;
      case "right":
        style = {
          ...style,
          left: `calc(100% + ${sideOffset}px)`,
          top: align === "center" ? "50%" : align === "start" ? "0" : "auto",
          bottom: align === "end" ? "0" : "auto",
          transform: align === "center" ? "translateY(-50%)" : "none",
        };
        break;
      case "bottom":
        style = {
          ...style,
          top: `calc(100% + ${sideOffset}px)`,
          left: align === "center" ? "50%" : align === "start" ? "0" : "auto",
          right: align === "end" ? "0" : "auto",
          transform: align === "center" ? "translateX(-50%)" : "none",
        };
        break;
      case "left":
        style = {
          ...style,
          right: `calc(100% + ${sideOffset}px)`,
          top: align === "center" ? "50%" : align === "start" ? "0" : "auto",
          bottom: align === "end" ? "0" : "auto",
          transform: align === "center" ? "translateY(-50%)" : "none",
        };
        break;
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "z-50 rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);
TooltipContent.displayName = "TooltipContent";

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ children, delayDuration = 300 }) => {
  return <>{children}</>;
};

export { Tooltips, TooltipTrigger, TooltipContent, TooltipProvider };
