import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
const CollapsibleContext = React.createContext(undefined);
const Collapsible = React.forwardRef(({ children, open, defaultOpen = false, disabled = false, onOpenChange, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    const isControlled = open !== undefined;
    const currentOpen = isControlled ? open : isOpen;
    const handleOpenChange = React.useCallback((value) => {
        if (disabled)
            return;
        if (!isControlled) {
            setIsOpen(value);
        }
        onOpenChange?.(value);
    }, [disabled, isControlled, onOpenChange]);
    return (_jsx(CollapsibleContext.Provider, { value: { open: currentOpen, onOpenChange: handleOpenChange, disabled }, children: _jsx("div", { ref: ref, className: cn("", className), "data-state": currentOpen ? "open" : "closed", "data-disabled": disabled ? "" : undefined, ...props, children: children }) }));
});
Collapsible.displayName = "Collapsible";
const CollapsibleTrigger = React.forwardRef(({ className, children, asChild = false, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);
    if (!context) {
        throw new Error("CollapsibleTrigger must be used within a Collapsible");
    }
    const { open, onOpenChange, disabled } = context;
    const handleClick = () => {
        onOpenChange(!open);
    };
    if (asChild) {
        return (_jsx(_Fragment, { children: React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        ...child.props,
                        ref,
                        onClick: (e) => {
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
            }) }));
    }
    return (_jsx("button", { ref: ref, type: "button", disabled: disabled, "data-state": open ? "open" : "closed", "data-disabled": disabled ? "" : undefined, "aria-expanded": open, className: cn("", className), onClick: handleClick, ...props, children: children }));
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";
const CollapsibleContent = React.forwardRef(({ className, children, forceMount, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);
    if (!context) {
        throw new Error("CollapsibleContent must be used within a Collapsible");
    }
    const { open } = context;
    if (!forceMount && !open) {
        return null;
    }
    return (_jsx("div", { ref: ref, "data-state": open ? "open" : "closed", className: cn("overflow-hidden", open ? "animate-accordion-down" : "animate-accordion-up", className), ...props, children: children }));
});
CollapsibleContent.displayName = "CollapsibleContent";
export { Collapsible, CollapsibleTrigger, CollapsibleContent };
