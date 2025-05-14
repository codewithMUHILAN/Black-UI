import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { createPortal } from "react-dom";
const SelectContext = React.createContext(undefined);
const Select = ({ children, defaultValue = "", value, onValueChange, defaultOpen = false, open, onOpenChange, disabled = false, placeholder, }) => {
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue);
    const [isOpen, setIsOpen] = React.useState(open || defaultOpen);
    const triggerRef = React.useRef(null);
    React.useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);
    React.useEffect(() => {
        if (open !== undefined) {
            setIsOpen(open);
        }
    }, [open]);
    const handleValueChange = React.useCallback((newValue) => {
        if (value === undefined) {
            setSelectedValue(newValue);
        }
        onValueChange?.(newValue);
    }, [onValueChange, value]);
    const handleOpenChange = React.useCallback((newOpen) => {
        if (disabled)
            return;
        if (open === undefined) {
            setIsOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    }, [onOpenChange, open, disabled]);
    return (_jsx(SelectContext.Provider, { value: {
            value: selectedValue,
            onValueChange: handleValueChange,
            open: isOpen,
            setOpen: handleOpenChange,
            triggerRef
        }, children: children }));
};
const SelectGroup = ({ children, ...props }) => {
    return _jsx("div", { className: "px-1 py-1.5", ...props, children: children });
};
SelectGroup.displayName = "SelectGroup";
const SelectValue = React.forwardRef(({ className, placeholder, children, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectValue must be used within a Select");
    }
    const content = children || context.value || placeholder;
    return _jsx("span", { ref: ref, className: cn("text-sm", className), ...props, children: content || _jsx("span", { className: "text-muted-foreground", children: "Select an option" }) });
});
SelectValue.displayName = "SelectValue";
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectTrigger must be used within a Select");
    }
    const { open, setOpen, triggerRef } = context;
    React.useImperativeHandle(ref, () => triggerRef.current);
    return (_jsxs("button", { ref: triggerRef, type: "button", "data-state": open ? "open" : "closed", "data-select-trigger": "true", className: cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className), onClick: () => setOpen(!open), "aria-expanded": open, ...props, children: [children, _jsx(ChevronDown, { className: cn("h-4 w-4 opacity-50 transition-transform duration-200", open && "rotate-180") })] }));
});
SelectTrigger.displayName = "SelectTrigger";
const SelectScrollUpButton = ({ className, ...props }) => (_jsx("div", { className: cn("flex cursor-default items-center justify-center py-1 text-primary/70 hover:text-primary transition-colors", className), ...props, children: _jsx(ChevronUp, { className: "h-4 w-4" }) }));
SelectScrollUpButton.displayName = "SelectScrollUpButton";
const SelectScrollDownButton = ({ className, ...props }) => (_jsx("div", { className: cn("flex cursor-default items-center justify-center py-1 text-primary/70 hover:text-primary transition-colors", className), ...props, children: _jsx(ChevronDown, { className: "h-4 w-4" }) }));
SelectScrollDownButton.displayName = "SelectScrollDownButton";
const SelectContent = React.forwardRef(({ className, children, position = "popper", align = "center", sideOffset = 4, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectContent must be used within a Select");
    }
    const { open, setOpen, triggerRef } = context;
    const contentRef = React.useRef(null);
    const [contentStyles, setContentStyles] = React.useState({
        top: 0,
        left: 0,
        width: 0,
        maxHeight: 300,
    });
    React.useEffect(() => {
        if (open && triggerRef.current) {
            const updatePosition = () => {
                const triggerRect = triggerRef.current?.getBoundingClientRect();
                if (!triggerRect)
                    return;
                const viewportHeight = window.innerHeight;
                const spaceBelow = viewportHeight - triggerRect.bottom;
                const spaceAbove = triggerRect.top;
                const showBelow = spaceBelow >= Math.min(300, spaceAbove) || spaceBelow >= 150;
                const maxHeight = showBelow
                    ? Math.min(300, spaceBelow - 20)
                    : Math.min(300, spaceAbove - 20);
                let left = triggerRect.left;
                if (align === "center") {
                    left = triggerRect.left + (triggerRect.width / 2) - (triggerRect.width / 2);
                }
                else if (align === "end") {
                    left = triggerRect.right - triggerRect.width;
                }
                const top = showBelow
                    ? triggerRect.bottom + window.scrollY + sideOffset
                    : triggerRect.top + window.scrollY - maxHeight - sideOffset;
                setContentStyles({
                    top,
                    left: left + window.scrollX,
                    width: triggerRect.width,
                    maxHeight,
                });
            };
            updatePosition();
            window.addEventListener("resize", updatePosition);
            window.addEventListener("scroll", updatePosition, true);
            return () => {
                window.removeEventListener("resize", updatePosition);
                window.removeEventListener("scroll", updatePosition, true);
            };
        }
    }, [open, align, sideOffset]);
    React.useEffect(() => {
        if (!open)
            return;
        const handleClickOutside = (e) => {
            if (contentRef.current &&
                !contentRef.current.contains(e.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        const handleSelectItem = (e) => {
            const target = e.target;
            const selectItem = target.closest('[role="option"]');
            if (selectItem) {
                setTimeout(() => setOpen(false), 50);
            }
        };
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("click", handleSelectItem);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("click", handleSelectItem);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open, setOpen, triggerRef]);
    const animationClasses = open
        ? "animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 transition-all duration-200"
        : "animate-out fade-out-0 zoom-out-95 transition-all duration-200";
    if (!open)
        return null;
    return createPortal(_jsx("div", { ref: (node) => {
            if (typeof ref === "function") {
                ref(node);
            }
            else if (ref) {
                ref.current = node;
            }
            contentRef.current = node;
        }, style: {
            position: "absolute",
            top: `${contentStyles.top}px`,
            left: `${contentStyles.left}px`,
            width: `${contentStyles.width}px`,
            zIndex: 100,
            transformOrigin: "var(--radix-dropdown-menu-content-transform-origin)",
        }, className: cn("z-[100] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md", animationClasses, className), ...props, children: _jsx("div", { className: "p-1 overflow-auto custom-scrollbar", style: { maxHeight: `${contentStyles.maxHeight}px` }, children: children }) }), document.body);
});
SelectContent.displayName = "SelectContent";
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (_jsx("span", { ref: ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props })));
SelectLabel.displayName = "SelectLabel";
const SelectItem = React.forwardRef(({ className, children, value, disabled = false, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("SelectItem must be used within a Select");
    }
    const { value: selectedValue, onValueChange, setOpen } = context;
    const isSelected = selectedValue === value;
    const handleSelect = (e) => {
        if (disabled)
            return;
        e.preventDefault();
        e.stopPropagation();
        onValueChange(value);
        setTimeout(() => setOpen(false), 50);
    };
    return (_jsxs("div", { ref: ref, className: cn("relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors", isSelected ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground", disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer", className), onClick: handleSelect, "aria-selected": isSelected, "data-disabled": disabled, role: "option", tabIndex: disabled ? -1 : 0, ...props, children: [_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: isSelected && _jsx(Check, { className: "h-4 w-4" }) }), _jsx("span", { className: "text-sm", children: children })] }));
});
SelectItem.displayName = "SelectItem";
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props })));
SelectSeparator.displayName = "SelectSeparator";
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton, };
