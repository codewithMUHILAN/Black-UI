import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
const DrawerContext = React.createContext(undefined);
function useDrawerContext() {
    const context = React.useContext(DrawerContext);
    if (!context) {
        throw new Error("useDrawerContext must be used within a Drawer");
    }
    return context;
}
const Drawer = ({ children, defaultOpen = false, open: controlledOpen, onOpenChange }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = React.useCallback((value) => {
        if (!isControlled) {
            setUncontrolledOpen(value);
        }
        if (onOpenChange) {
            const nextValue = typeof value === "function" ? value(open) : value;
            onOpenChange(nextValue);
        }
    }, [isControlled, onOpenChange, open]);
    return (_jsx(DrawerContext.Provider, { value: { open, setOpen }, children: children }));
};
const DrawerTrigger = React.forwardRef(({ children, ...props }, ref) => {
    const { setOpen } = useDrawerContext();
    return (_jsx("button", { ref: ref, type: "button", onClick: () => setOpen(true), ...props, children: children }));
});
DrawerTrigger.displayName = "DrawerTrigger";
const DrawerContent = React.forwardRef(({ children, className, ...props }, ref) => {
    const { open, setOpen } = useDrawerContext();
    if (!open)
        return null;
    return createPortal(_jsxs("div", { className: "fixed inset-0 z-50 flex flex-col items-center justify-end bg-black/80 backdrop-blur-sm p-0 transition-all animate-fade-in", children: [_jsx("div", { className: "absolute inset-0 cursor-pointer", onClick: () => setOpen(false), "aria-hidden": "true" }), _jsxs("div", { ref: ref, className: cn("relative w-full rounded-t-xl bg-background", className), ...props, children: [_jsx("div", { className: "mx-auto my-2 h-1.5 w-16 rounded-full bg-muted" }), children] })] }), document.body);
});
DrawerContent.displayName = "DrawerContent";
// Add the missing exports for the Drawer components
const DrawerClose = React.forwardRef(({ children, ...props }, ref) => {
    const { setOpen } = useDrawerContext();
    return (_jsx("button", { ref: ref, type: "button", onClick: () => setOpen(false), ...props, children: children }));
});
DrawerClose.displayName = "DrawerClose";
const DrawerHeader = ({ className, ...props }) => (_jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left p-4", className), ...props }));
DrawerHeader.displayName = "DrawerHeader";
const DrawerFooter = ({ className, ...props }) => (_jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-4", className), ...props }));
DrawerFooter.displayName = "DrawerFooter";
const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h3", { ref: ref, className: cn("text-lg font-semibold text-foreground", className), ...props })));
DrawerTitle.displayName = "DrawerTitle";
const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("p", { ref: ref, className: cn("text-sm text-muted-foreground", className), ...props })));
DrawerDescription.displayName = "DrawerDescription";
export { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription };
