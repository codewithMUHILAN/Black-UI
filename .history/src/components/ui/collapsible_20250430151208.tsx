
import * as React from "react";
import { cn } from "../../lib/utils";

interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled?: boolean;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | undefined>(undefined);

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ children, open, defaultOpen = false, disabled = false, onOpenChange, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    
    const isControlled = open !== undefined;
    const currentOpen = isControlled ? open : isOpen;
    
    const handleOpenChange = React.useCallback((value: boolean) => {
      if (disabled) return;
      if (!isControlled) {
        setIsOpen(value);
      }
      onOpenChange?.(value);
    }, [disabled, isControlled, onOpenChange]);
    
    return (
      <CollapsibleContext.Provider
        value={{ open: currentOpen!, onOpenChange: handleOpenChange, disabled }}
      >
        <div
          ref={ref}
          className={cn("", className)}
          data-state={currentOpen ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);
Collapsible.displayName = "Collapsible";

interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);
    if (!context) {
      throw new Error("CollapsibleTrigger must be used within a Collapsible");
    }
    
    const { open, onOpenChange, disabled } = context;
    
    const handleClick = () => {
      onOpenChange(!open);
    };
    
    if (asChild) {
      return (
        <>
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                ...child.props,
                ref,
                onClick: (e: React.MouseEvent) => {
                  handleClick();
                  if (child.props.onClick) {
                    child.props.onClick(e);
                  }
                },
                disabled: disabled || child.props.disabled,
                "data-state": open ? "open" : "closed",
                "data-disabled": disabled ? "" : undefined,
                "aria-expanded": open,
              });
            }
            return child;
          })}
        </>
      );
    }
    
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        data-state={open ? "open" : "closed"}
        data-disabled={disabled ? "" : undefined}
        aria-expanded={open}
        className={cn("", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
}

const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, forceMount, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);
    if (!context) {
      throw new Error("CollapsibleContent must be used within a Collapsible");
    }
    
    const { open } = context;
    
    if (!forceMount && !open) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        data-state={open ? "open" : "closed"}
        className={cn(
          "overflow-hidden",
          open ? "animate-accordion-down" : "animate-accordion-up",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
