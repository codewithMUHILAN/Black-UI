import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
const TooltipContext = React.createContext(undefined);
const Tooltip = ({ children, content, defaultOpen = false, open: controlledOpen, onOpenChange, delayDuration = 300, hideDelay = 100, side = "top", align = "center", sideOffset = 8, variant = "default", hideArrow = false, maxWidth = "20rem", asChild = false, disabled = false, }) => {
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
    const showTimeoutRef = React.useRef(null);
    const hideTimeoutRef = React.useRef(null);
    // Define default configuration
    const config = React.useMemo(() => ({
        side,
        align,
        sideOffset,
        variant,
        hideArrow,
        maxWidth,
    }), [side, align, sideOffset, variant, hideArrow, maxWidth]);
    // Clean up timeouts on component unmount
    React.useEffect(() => {
        return () => {
            if (showTimeoutRef.current)
                clearTimeout(showTimeoutRef.current);
            if (hideTimeoutRef.current)
                clearTimeout(hideTimeoutRef.current);
        };
    }, []);
    // Create and provide context value
    const contextValue = React.useMemo(() => ({
        open,
        setOpen,
        content,
        config,
    }), [open, setOpen, content, config]);
    return (_jsxs(TooltipContext.Provider, { value: contextValue, children: [disabled ? children : (_jsx(TooltipTrigger, { delayDuration: delayDuration, hideDelay: hideDelay, asChild: asChild, children: children })), _jsx(TooltipContentDisplay, {})] }));
};
const TooltipTrigger = React.forwardRef(({ children, delayDuration, hideDelay, asChild = false }, ref) => {
    const context = React.useContext(TooltipContext);
    if (!context) {
        throw new Error("TooltipTrigger must be used within a Tooltip");
    }
    const { setOpen } = context;
    const showTimeoutRef = React.useRef(null);
    const hideTimeoutRef = React.useRef(null);
    const handleMouseEnter = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        showTimeoutRef.current = setTimeout(() => {
            setOpen(true);
        }, delayDuration);
    };
    const handleMouseLeave = () => {
        if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = null;
        }
        hideTimeoutRef.current = setTimeout(() => {
            setOpen(false);
        }, hideDelay);
    };
    const triggerProps = {
        ref,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleMouseEnter,
        onBlur: handleMouseLeave,
    };
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, triggerProps);
    }
    return (_jsx("div", { className: "inline-block", ...triggerProps, children: children }));
});
TooltipTrigger.displayName = "TooltipTrigger";
// Renamed from "TooltipContent" to "TooltipContentDisplay" to avoid name collision
const TooltipContentDisplay = () => {
    const context = React.useContext(TooltipContext);
    if (!context) {
        throw new Error("TooltipContentDisplay must be used within a Tooltip");
    }
    const { open, content, config } = context;
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const contentRef = React.useRef(null);
    // Get position based on element placement in DOM
    const updatePosition = React.useCallback(() => {
        if (!contentRef.current)
            return;
        const triggerElement = contentRef.current.parentElement;
        if (!triggerElement)
            return;
        const triggerRect = triggerElement.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        let x = 0;
        let y = 0;
        const { side, align, sideOffset } = config;
        // X-axis positioning based on alignment
        switch (align) {
            case "start":
                x = triggerRect.left;
                break;
            case "end":
                x = triggerRect.right - contentRect.width;
                break;
            default: // center
                x = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2);
                break;
        }
        // Y-axis positioning based on side
        switch (side) {
            case "top":
                y = triggerRect.top - contentRect.height - sideOffset;
                break;
            case "bottom":
                y = triggerRect.bottom + sideOffset;
                break;
            case "left":
                x = triggerRect.left - contentRect.width - sideOffset;
                y = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2);
                break;
            case "right":
                x = triggerRect.right + sideOffset;
                y = triggerRect.top + (triggerRect.height / 2) - (contentRect.height / 2);
                break;
        }
        // Ensure tooltip stays within viewport
        const padding = 5;
        x = Math.max(padding, Math.min(x, window.innerWidth - contentRect.width - padding));
        y = Math.max(padding, Math.min(y, window.innerHeight - contentRect.height - padding));
        setPosition({ x, y });
    }, [config]);
    // Update position when the tooltip becomes visible
    React.useEffect(() => {
        if (open) {
            // Allow content to render first
            setTimeout(updatePosition, 10);
            // Update position on resize
            window.addEventListener('resize', updatePosition);
            return () => window.removeEventListener('resize', updatePosition);
        }
    }, [open, updatePosition]);
    // Arrow positioning based on side
    const getArrowStyle = React.useCallback(() => {
        const { side, align } = config;
        const arrowSize = 8;
        let style = { position: 'absolute' };
        switch (side) {
            case "top":
                style = {
                    ...style,
                    bottom: -arrowSize / 2,
                    left: align === 'center' ? '50%' :
                        align === 'start' ? '10%' : '90%',
                    transform: 'translateX(-50%) rotate(45deg)'
                };
                break;
            case "bottom":
                style = {
                    ...style,
                    top: -arrowSize / 2,
                    left: align === 'center' ? '50%' :
                        align === 'start' ? '10%' : '90%',
                    transform: 'translateX(-50%) rotate(45deg)'
                };
                break;
            case "left":
                style = {
                    ...style,
                    right: -arrowSize / 2,
                    top: align === 'center' ? '50%' :
                        align === 'start' ? '10%' : '90%',
                    transform: 'translateY(-50%) rotate(45deg)'
                };
                break;
            case "right":
                style = {
                    ...style,
                    left: -arrowSize / 2,
                    top: align === 'center' ? '50%' :
                        align === 'start' ? '10%' : '90%',
                    transform: 'translateY(-50%) rotate(45deg)'
                };
                break;
        }
        return style;
    }, [config]);
    // Animation variants based on side
    const getAnimationVariants = React.useCallback(() => {
        const { side } = config;
        const distance = 5;
        return {
            hidden: {
                opacity: 0,
                x: side === 'left' ? distance : side === 'right' ? -distance : 0,
                y: side === 'top' ? distance : side === 'bottom' ? -distance : 0,
            },
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.15, ease: "easeOut" }
            },
            exit: {
                opacity: 0,
                transition: { duration: 0.1, ease: "easeIn" }
            }
        };
    }, [config]);
    // Get variant-based background and text colors
    const getVariantClasses = React.useCallback(() => {
        const { variant } = config;
        switch (variant) {
            case 'info':
                return 'bg-blue-500 text-white';
            case 'success':
                return 'bg-green-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            default:
                return 'bg-popover text-popover-foreground';
        }
    }, [config]);
    if (!open)
        return null;
    return (_jsx(_Fragment, { children: _jsx("div", { className: "fixed z-50 left-0 top-0 h-0", children: _jsx(AnimatePresence, { children: _jsxs(motion.div, { ref: contentRef, style: {
                        position: 'absolute',
                        top: position.y,
                        left: position.x,
                        maxWidth: config.maxWidth,
                    }, initial: "hidden", animate: "visible", exit: "exit", variants: getAnimationVariants(), className: cn("z-50 rounded px-3 py-1.5 text-xs shadow-md", getVariantClasses()), children: [!config.hideArrow && (_jsx("div", { className: cn("w-2 h-2 absolute", getVariantClasses()), style: getArrowStyle() })), content] }) }) }) }));
};
// Reexport as named export
export { Tooltip, TooltipTrigger };
// For legacy compatibility
export const Tooltips = Tooltip;
// Using a different name to avoid redeclaration
export const TooltipContent = React.forwardRef((props, _ref) => {
    console.warn("TooltipContent is deprecated. Use the Tooltip component with content prop instead.");
    return _jsx("div", { ...props });
});
TooltipContent.displayName = "TooltipContent";
// Backward compatibility
export const TooltipProvider = ({ children }) => {
    return _jsx(_Fragment, { children: children });
};
