import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
const MenubarContext = React.createContext(undefined);
function useMenubarContext() {
    const context = React.useContext(MenubarContext);
    if (!context) {
        throw new Error("useMenubarContext must be used within a MenubarProvider");
    }
    return context;
}
function Menubar({ className, children, ...props }) {
    const [openMenu, setOpenMenu] = React.useState(null);
    // Click outside handler
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (openMenu && !(e.target.closest('[role="menubar"]'))) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMenu]);
    return (_jsx(MenubarContext.Provider, { value: { openMenu, setOpenMenu }, children: _jsx("div", { className: cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className), role: "menubar", ...props, children: children }) }));
}
function MenubarMenu({ value, children }) {
    const menuId = value || React.useId();
    return (_jsx("div", { className: "relative", "data-value": menuId, children: children }));
}
function MenubarTrigger({ className, children, ...props }) {
    const { openMenu, setOpenMenu } = useMenubarContext();
    const menuItem = React.useRef(null);
    const menuId = menuItem.current?.parentElement?.getAttribute("data-value") || "";
    const isOpen = openMenu === menuId;
    const handleClick = (e) => {
        e.stopPropagation();
        setOpenMenu(isOpen ? null : menuId);
    };
    return (_jsx("button", { ref: menuItem, type: "button", role: "menuitem", className: cn("flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", className), "aria-expanded": isOpen, "data-state": isOpen ? "open" : "closed", onClick: handleClick, ...props, children: children }));
}
function MenubarContent({ className, children, ...props }) {
    const { openMenu } = useMenubarContext();
    const menuItem = React.useRef(null);
    const menuId = menuItem.current?.parentElement?.getAttribute("data-value") || "";
    const isOpen = openMenu === menuId;
    if (!isOpen)
        return null;
    return (_jsx("div", { ref: menuItem, className: cn("absolute left-0 top-0 z-50 mt-10 flex min-w-[8rem] flex-col rounded-md border bg-popover p-1 text-popover-foreground shadow-md", className), role: "menu", ...props, children: children }));
}
function MenubarItem({ className, inset, children, ...props }) {
    const { setOpenMenu } = useMenubarContext();
    return (_jsx("div", { className: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className), role: "menuitem", onClick: () => setOpenMenu(null), ...props, children: children }));
}
export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, };
