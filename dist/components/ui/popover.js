import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
const PopoverContext = React.createContext(undefined);
const Popover = ({ children, defaultOpen = false, open: controlledOpen, onOpenChange, }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = React.useCallback((value) => {
        if (!isControlled) {
            setUncontrolledOpen(value);
        }
        if (onOpenChange) {
            const newValue = typeof value === "function" ? value(open) : value;
            onOpenChange(newValue);
        }
    }, [isControlled, onOpenChange, open]);
    // Close popover when clicking outside
    React.useEffect(() => {
        if (!open)
            return;
        const handleClickOutside = (event) => {
            // Check if the click is outside any popover content
            const popoverContents = document.querySelectorAll('[data-popover-content]');
            let isClickInside = false;
            popoverContents.forEach(content => {
                if (content.contains(event.target)) {
                    isClickInside = true;
                }
            });
            if (!isClickInside) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, setOpen]);
    return (_jsx(PopoverContext.Provider, { value: { open, setOpen }, children: children }));
};
const PopoverTrigger = ({ onClick, asChild, children, }) => {
    const context = React.useContext(PopoverContext);
    if (!context) {
        throw new Error("PopoverTrigger must be used within a Popover");
    }
    const { open, setOpen } = context;
    const handleClick = (e) => {
        setOpen(!open);
        onClick?.(e);
    };
    if (asChild) {
        return (_jsx(_Fragment, { children: React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    const childProps = {
                        ...child.props,
                        onClick: (e) => {
                            handleClick(e);
                            if (child.props.onClick)
                                child.props.onClick(e);
                        }
                    };
                    return React.cloneElement(child, childProps);
                }
                return child;
            }) }));
    }
    return (_jsx("button", { type: "button", onClick: handleClick, "aria-expanded": open, children: children }));
};
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    const context = React.useContext(PopoverContext);
    if (!context) {
        throw new Error("PopoverContent must be used within a Popover");
    }
    const { open } = context;
    if (!open)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity", style: { opacity: open ? 1 : 0 } }), _jsx("div", { ref: ref, "data-popover-content": true, className: cn("fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[90vw] rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className), ...props })] }));
});
PopoverContent.displayName = "PopoverContent";
export { Popover, PopoverTrigger, PopoverContent };
