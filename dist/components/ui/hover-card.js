import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
const HoverCardContext = React.createContext(undefined);
const HoverCard = ({ children, defaultOpen = false, open: controlledOpen, onOpenChange, openDelay = 700, closeDelay = 300, }) => {
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
    const openTimerRef = React.useRef(null);
    const closeTimerRef = React.useRef(null);
    const handleOpen = React.useCallback(() => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
        if (!open) {
            openTimerRef.current = setTimeout(() => {
                setOpen(true);
            }, openDelay);
        }
    }, [open, openDelay, setOpen]);
    const handleClose = React.useCallback(() => {
        if (openTimerRef.current) {
            clearTimeout(openTimerRef.current);
            openTimerRef.current = null;
        }
        if (open) {
            closeTimerRef.current = setTimeout(() => {
                setOpen(false);
            }, closeDelay);
        }
    }, [open, closeDelay, setOpen]);
    React.useEffect(() => {
        return () => {
            if (openTimerRef.current)
                clearTimeout(openTimerRef.current);
            if (closeTimerRef.current)
                clearTimeout(closeTimerRef.current);
        };
    }, []);
    return (_jsx(HoverCardContext.Provider, { value: { open, setOpen }, children: _jsx("div", { onMouseEnter: handleOpen, onMouseLeave: handleClose, onFocus: handleOpen, onBlur: handleClose, children: children }) }));
};
const HoverCardTrigger = ({ children, asChild = false }) => {
    if (asChild) {
        return _jsx(_Fragment, { children: children });
    }
    return _jsx("div", { children: children });
};
const HoverCardContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    const context = React.useContext(HoverCardContext);
    if (!context) {
        throw new Error("HoverCardContent must be used within a HoverCard");
    }
    const { open } = context;
    if (!open)
        return null;
    return (_jsx("div", { ref: ref, className: cn("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), style: {
            position: "absolute",
            left: align === "center" ? "50%" : align === "start" ? "0" : "auto",
            right: align === "end" ? "0" : "auto",
            transform: align === "center" ? "translateX(-50%)" : "none",
            top: `calc(100% + ${sideOffset}px)`,
        }, ...props }));
});
HoverCardContent.displayName = "HoverCardContent";
export { HoverCard, HoverCardTrigger, HoverCardContent };
