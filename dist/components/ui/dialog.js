import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
import { X } from "lucide-react";
const DialogContext = React.createContext(undefined);
const Dialog = ({ children, defaultOpen = false, open: controlledOpen, onOpenChange, }) => {
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
    return (_jsx(DialogContext.Provider, { value: { open, setOpen }, children: children }));
};
const DialogTrigger = React.forwardRef(({ children, asChild = false, ...props }, ref) => {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error("DialogTrigger must be used within a Dialog");
    }
    const { setOpen } = context;
    const handleClick = (e) => {
        e.preventDefault();
        setOpen(true);
        // Call the original onClick if it exists
        if (props.onClick) {
            props.onClick(e);
        }
    };
    // Remove onClick from props to avoid duplicate handlers
    const { onClick, ...otherProps } = props;
    if (asChild) {
        return (_jsx("div", { ref: ref, onClick: handleClick, ...otherProps, children: React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        ...child.props
                    });
                }
                return child;
            }) }));
    }
    return (_jsx("div", { ref: ref, onClick: handleClick, ...otherProps, children: children }));
});
DialogTrigger.displayName = "DialogTrigger";
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error("DialogContent must be used within a Dialog");
    }
    const { open, setOpen } = context;
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm", children: _jsxs("div", { ref: ref, className: cn("relative w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg animate-in fade-in-0 zoom-in-95", className), ...props, children: [children, _jsxs("button", { onClick: () => setOpen(false), className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [_jsx(X, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Close" })] })] }) }));
});
DialogContent.displayName = "DialogContent";
const DialogHeader = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props })));
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h2", { ref: ref, className: cn("text-lg font-semibold leading-none tracking-tight", className), ...props })));
DialogTitle.displayName = "DialogTitle";
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("p", { ref: ref, className: cn("text-sm text-muted-foreground", className), ...props })));
DialogDescription.displayName = "DialogDescription";
const DialogFooter = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props })));
DialogFooter.displayName = "DialogFooter";
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter };
