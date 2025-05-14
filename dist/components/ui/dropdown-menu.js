import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
import { cva } from "class-variance-authority";
const DropdownMenuContext = React.createContext(undefined);
const DropdownMenu = ({ children, defaultOpen = false, open: controlledOpen, onOpenChange, hoverMode = false, }) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const triggerRef = React.useRef(null);
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
    return (_jsx(DropdownMenuContext.Provider, { value: { open, setOpen, hoverMode, triggerRef }, children: children }));
};
const DropdownMenuTrigger = React.forwardRef(({ children, asChild, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        throw new Error("DropdownMenuTrigger must be used within a DropdownMenu");
    }
    const { setOpen, hoverMode, triggerRef } = context;
    const handleClick = (e) => {
        e.stopPropagation();
        setOpen(prev => !prev);
        if (props.onClick) {
            props.onClick(e);
        }
    };
    const handleMouseEnter = (e) => {
        if (hoverMode) {
            setOpen(true);
        }
        if (props.onMouseEnter) {
            props.onMouseEnter(e);
        }
    };
    const { onClick, onMouseEnter, ...otherProps } = props;
    React.useImperativeHandle(ref, () => {
        return triggerRef.current;
    });
    if (asChild) {
        return (_jsx(_Fragment, { children: React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        ...child.props,
                        ref: (node) => {
                            if (node) {
                                triggerRef.current = node;
                            }
                            if (typeof ref === 'function') {
                                ref(node);
                            }
                            else if (ref) {
                                ref.current = node;
                            }
                            if (React.isValidElement(child)) {
                                const childRef = child.ref;
                                if (childRef) {
                                    if (typeof childRef === 'function') {
                                        childRef(node);
                                    }
                                    else if ('current' in childRef) {
                                        childRef.current = node;
                                    }
                                }
                            }
                        },
                        onClick: (e) => {
                            handleClick(e);
                            if (child.props.onClick)
                                child.props.onClick(e);
                        },
                        onMouseEnter: (e) => {
                            handleMouseEnter(e);
                            if (child.props.onMouseEnter)
                                child.props.onMouseEnter(e);
                        },
                    });
                }
                return child;
            }) }));
    }
    return (_jsx("button", { ref: (node) => {
            if (node) {
                triggerRef.current = node;
            }
            if (typeof ref === 'function') {
                ref(node);
            }
            else if (ref) {
                ref.current = node;
            }
        }, type: "button", onClick: handleClick, onMouseEnter: handleMouseEnter, ...otherProps, children: children }));
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
const dropdownMenuContentVariants = cva("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", {
    variants: {
        variant: {
            default: "",
            contextMenu: "min-w-0",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const DropdownMenuContent = React.forwardRef(({ className, children, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, variant, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        throw new Error("DropdownMenuContent must be used within a DropdownMenu");
    }
    const { open, setOpen, hoverMode, triggerRef } = context;
    const menuRef = React.useRef(null);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    React.useEffect(() => {
        if (!open)
            return;
        const handleClickOutside = (e) => {
            if (menuRef.current &&
                !menuRef.current.contains(e.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, setOpen, triggerRef]);
    const handleMouseLeave = (e) => {
        if (hoverMode) {
            setOpen(false);
        }
        if (props.onMouseLeave) {
            props.onMouseLeave(e);
        }
    };
    React.useEffect(() => {
        if (!open || !triggerRef.current)
            return;
        const updatePosition = () => {
            if (!triggerRef.current)
                return;
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const menuRect = menuRef.current?.getBoundingClientRect() || { width: 0, height: 0 };
            let top = 0;
            let left = 0;
            if (side === "bottom") {
                top = triggerRect.bottom + sideOffset;
            }
            else if (side === "top") {
                top = triggerRect.top - (menuRect.height || 0) - sideOffset;
            }
            else if (side === "left" || side === "right") {
                top = triggerRect.top + (triggerRect.height / 2) - ((menuRect.height || 0) / 2);
            }
            if (side === "right") {
                left = triggerRect.right + sideOffset;
            }
            else if (side === "left") {
                left = triggerRect.left - (menuRect.width || 0) - sideOffset;
            }
            else {
                if (align === "start") {
                    left = triggerRect.left + alignOffset;
                }
                else if (align === "center") {
                    left = triggerRect.left + (triggerRect.width / 2) - ((menuRect.width || 0) / 2) + alignOffset;
                }
                else if (align === "end") {
                    left = triggerRect.right - (menuRect.width || 0) - alignOffset;
                }
            }
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            if (left + (menuRect.width || 0) > windowWidth) {
                left = windowWidth - (menuRect.width || 0) - 8;
            }
            if (left < 8) {
                left = 8;
            }
            if (top + (menuRect.height || 0) > windowHeight) {
                if (side === "bottom" && triggerRect.top > (menuRect.height || 0) + sideOffset) {
                    top = triggerRect.top - (menuRect.height || 0) - sideOffset;
                }
                else {
                    const maxHeight = windowHeight - top - 8;
                    if (menuRef.current) {
                        menuRef.current.style.maxHeight = `${maxHeight}px`;
                    }
                }
            }
            setPosition({ top, left });
        };
        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [open, align, alignOffset, side, sideOffset, triggerRef]);
    if (!open)
        return null;
    const { onMouseLeave, ...otherProps } = props;
    return (_jsx("div", { ref: (node) => {
            if (typeof ref === "function") {
                ref(node);
            }
            else if (ref) {
                ref.current = node;
            }
            menuRef.current = node;
        }, className: cn(dropdownMenuContentVariants({ variant }), "dropdown-scrollbar", className), style: {
            position: "fixed",
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 50,
            maxHeight: "calc(90vh - 60px)",
            overflowY: "auto"
        }, onMouseLeave: handleMouseLeave, ...otherProps, children: children }));
});
DropdownMenuContent.displayName = "DropdownMenuContent";
const DropdownMenuLabel = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("px-2 py-1.5 text-sm font-semibold", className), ...props })));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
const DropdownMenuItem = React.forwardRef(({ className, inset, disabled = false, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        throw new Error("DropdownMenuItem must be used within a DropdownMenu");
    }
    const { setOpen } = context;
    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        setOpen(false);
        if (props.onClick) {
            props.onClick(e);
        }
    };
    const { onClick, ...otherProps } = props;
    return (_jsx("div", { ref: ref, className: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className), onClick: handleClick, "data-disabled": disabled ? "" : undefined, ...otherProps }));
});
DropdownMenuItem.displayName = "DropdownMenuItem";
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props })));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
const DropdownMenuGroup = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("space-y-1", className), ...props })));
DropdownMenuGroup.displayName = "DropdownMenuGroup";
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuGroup, };
