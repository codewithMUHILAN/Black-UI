import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";
const SidebarContext = React.createContext(undefined);
export function SidebarProvider({ defaultExpanded = true, expanded: controlledExpanded, onExpandedChange, children, }) {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const [activeMenuItem, setActiveMenuItem] = React.useState(null);
    const menuItemPosition = React.useRef({ left: 0, width: 0, top: 0, height: 0 });
    const menuItemRefs = React.useRef(new Map());
    const menuRef = React.useRef(null);
    const isControlled = controlledExpanded !== undefined;
    const actualExpanded = isControlled ? controlledExpanded : expanded;
    const onExpandedChangeRef = React.useRef(onExpandedChange);
    React.useEffect(() => {
        onExpandedChangeRef.current = onExpandedChange;
    }, [onExpandedChange]);
    const handleExpandedChange = React.useCallback((value) => {
        if (!isControlled) {
            setExpanded(value);
        }
        onExpandedChangeRef.current?.(value);
    }, [isControlled]);
    // This effect runs when activeMenuItem changes to update the indicator position
    React.useEffect(() => {
        if (activeMenuItem && menuRef.current) {
            const selectedItem = menuItemRefs.current.get(activeMenuItem);
            if (selectedItem) {
                const menuRect = menuRef.current.getBoundingClientRect();
                const rect = selectedItem.getBoundingClientRect();
                menuItemPosition.current = {
                    left: rect.left - menuRect.left,
                    width: rect.width,
                    top: rect.top - menuRect.top,
                    height: rect.height
                };
                // Find and update the indicator element
                const indicator = menuRef.current.querySelector('.tabs-bg-indicator');
                if (indicator) {
                    indicator.style.left = `${menuItemPosition.current.left}px`;
                    indicator.style.width = `${menuItemPosition.current.width}px`;
                    indicator.style.top = `${menuItemPosition.current.top}px`;
                    indicator.style.height = `${menuItemPosition.current.height}px`;
                    indicator.style.opacity = '1';
                }
            }
        }
    }, [activeMenuItem]);
    return (_jsx(SidebarContext.Provider, { value: {
            expanded: actualExpanded,
            onChange: handleExpandedChange,
            activeMenuItem,
            setActiveMenuItem,
            menuItemPosition,
            menuItemRefs,
            menuRef
        }, children: children }));
}
export function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
export function Sidebar({ className, children, ...props }) {
    const { expanded } = useSidebar();
    return (_jsx("div", { className: cn("h-full min-h-screen transition-all duration-300 z-40", expanded ? "w-56" : "w-16", "bg-background border-r shadow-sm", "fixed md:sticky top-0 md:top-0", expanded ? "left-0" : "md:left-0 -left-full", className), role: "complementary", "data-collapsed": !expanded, ...props, children: children }));
}
export function SidebarTrigger({ className, ...props }) {
    const { expanded, onChange } = useSidebar();
    return (_jsxs("button", { type: "button", className: cn("inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "fixed md:static z-50 left-4 top-20", "transition-all duration-300", className), onClick: () => onChange(!expanded), "aria-label": expanded ? "Close sidebar" : "Open sidebar", ...props, children: [_jsx("span", { className: "sr-only", children: expanded ? "Close sidebar" : "Open sidebar" }), expanded ? (_jsx(ChevronLeft, { className: "h-4 w-4" })) : (_jsx(ChevronRight, { className: "h-4 w-4" }))] }));
}
export function SidebarHeader({ className, children, ...props }) {
    const { expanded } = useSidebar();
    return (_jsx("div", { className: cn("flex h-16 items-center border-b px-4", expanded ? "justify-between" : "justify-center", className), ...props, children: children }));
}
export function SidebarContent({ className, children, ...props }) {
    return (_jsx("div", { className: cn("flex-1 overflow-hidden h-[calc(100vh-4rem)]", className), ...props, children: _jsx("div", { className: "h-full pb-12 overflow-auto no-scrollbar", children: children }) }));
}
export function SidebarGroup({ className, children, ...props }) {
    return (_jsx("div", { className: cn("px-2 py-2", className), ...props, children: children }));
}
export function SidebarGroupLabel({ className, children, ...props }) {
    const { expanded } = useSidebar();
    if (!expanded) {
        return null;
    }
    return (_jsx("div", { className: cn("mb-2 px-2 text-xs font-semibold tracking-tight", className), ...props, children: children }));
}
export function SidebarGroupContent({ className, children, ...props }) {
    return (_jsx("div", { className: cn("space-y-1", className), ...props, children: children }));
}
export function SidebarFooter({ className, children, ...props }) {
    const { expanded } = useSidebar();
    return (_jsx("div", { className: cn("flex border-t p-4", expanded ? "flex-row items-center justify-between" : "flex-col justify-center", className), ...props, children: children }));
}
export function SidebarMenu({ className, children, ...props }) {
    const { menuRef } = useSidebar();
    return (_jsxs("div", { ref: menuRef, className: cn("relative", className), ...props, children: [_jsx("div", { className: "tabs-bg-indicator opacity-0 absolute transition-all duration-300 ease-in-out rounded-md bg-primary/10 border border-primary/20" }), children] }));
}
export function SidebarMenuItem({ className, children, value, ...props }) {
    const itemRef = React.useRef(null);
    const { activeMenuItem, setActiveMenuItem, menuItemRefs, menuItemPosition, menuRef } = useSidebar();
    const menuItemId = value || React.useId();
    const isActive = activeMenuItem === menuItemId;
    // Register this menu item when it mounts
    React.useEffect(() => {
        if (itemRef.current) {
            menuItemRefs.current.set(menuItemId, itemRef.current);
            // If this is the active menu item, update position
            if (isActive && menuRef.current) {
                const menuRect = menuRef.current.getBoundingClientRect();
                const rect = itemRef.current.getBoundingClientRect();
                menuItemPosition.current = {
                    left: rect.left - menuRect.left,
                    width: rect.width,
                    top: rect.top - menuRect.top,
                    height: rect.height
                };
                // Find and update the indicator element
                const indicator = menuRef.current.querySelector('.tabs-bg-indicator');
                if (indicator) {
                    indicator.style.left = `${menuItemPosition.current.left}px`;
                    indicator.style.width = `${menuItemPosition.current.width}px`;
                    indicator.style.top = `${menuItemPosition.current.top}px`;
                    indicator.style.height = `${menuItemPosition.current.height}px`;
                    indicator.style.opacity = '1';
                }
            }
        }
        return () => {
            menuItemRefs.current.delete(menuItemId);
        };
    }, [isActive, menuItemRefs, menuItemId, menuRef]);
    return (_jsx("div", { ref: itemRef, className: cn("mb-1", className), "data-value": menuItemId, "data-state": isActive ? "active" : "inactive", ...props, children: children }));
}
export function SidebarMenuButton({ className, children, asChild = false, value, ...props }) {
    const { expanded, activeMenuItem, setActiveMenuItem, menuItemRefs, menuRef } = useSidebar();
    const menuItemId = value || React.useId();
    const isActive = activeMenuItem === menuItemId;
    const handleClick = React.useCallback(() => {
        setActiveMenuItem(menuItemId);
        // Update position immediately on click
        const selectedItem = menuItemRefs.current.get(menuItemId);
        if (selectedItem && menuRef.current) {
            const menuRect = menuRef.current.getBoundingClientRect();
            const rect = selectedItem.getBoundingClientRect();
            // Find and update the indicator element
            const indicator = menuRef.current.querySelector('.tabs-bg-indicator');
            if (indicator) {
                // First make it invisible
                indicator.style.opacity = '0';
                // Add a tiny delay before repositioning and showing
                setTimeout(() => {
                    indicator.style.left = `${rect.left - menuRect.left}px`;
                    indicator.style.width = `${rect.width}px`;
                    indicator.style.top = `${rect.top - menuRect.top}px`;
                    indicator.style.height = `${rect.height}px`;
                    indicator.style.opacity = '1';
                }, 50);
            }
        }
        // Call original onClick if it exists
        if (props.onClick && typeof props.onClick === 'function') {
            props.onClick(new MouseEvent('click'));
        }
    }, [menuItemId, setActiveMenuItem, menuItemRefs, menuRef, props.onClick]);
    const sharedClassName = "flex cursor-pointer items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-300";
    if (!expanded) {
        if (asChild) {
            return (_jsx("div", { className: className, "data-active": isActive ? "true" : "false", onClick: handleClick, ...props, children: React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            ...child.props,
                            className: cn(sharedClassName, "justify-center p-2", "hover:bg-primary/10 hover:scale-110", isActive ? "text-primary font-medium" : "", child.props?.className),
                        });
                    }
                    return child;
                }) }));
        }
        return (_jsx("div", { className: cn(sharedClassName, "justify-center p-2", "hover:bg-primary/10 hover:scale-110", isActive ? "text-primary font-medium" : "", className), "data-active": isActive ? "true" : "false", onClick: handleClick, ...props, children: React.Children.toArray(children).filter((child) => React.isValidElement(child) && typeof child.type !== "string") }));
    }
    if (asChild) {
        return (_jsx("div", { className: className, "data-active": isActive ? "true" : "false", onClick: handleClick, ...props, children: React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        ...child.props,
                        className: cn(sharedClassName, "justify-start gap-2", "hover:bg-primary/10 hover:translate-x-1", isActive ? "text-primary font-medium" : "", child.props?.className),
                        ...props,
                    });
                }
                return child;
            }) }));
    }
    return (_jsx("div", { className: cn(sharedClassName, "justify-start gap-2", "hover:bg-primary/10 hover:translate-x-1", isActive ? "text-primary font-medium" : "", className), "data-active": isActive ? "true" : "false", onClick: handleClick, ...props, children: children }));
}
export { Sidebar as SidebarRoot, };
