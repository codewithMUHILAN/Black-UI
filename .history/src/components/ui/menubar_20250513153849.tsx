
import * as React from "react";
import { cn } from "../lib/utils";

interface MenubarContextValue {
  openMenu: string | null;
  setOpenMenu: React.Dispatch<React.SetStateAction<string | null>>;
}

const MenubarContext = React.createContext<MenubarContextValue | undefined>(undefined);

function useMenubarContext() {
  const context = React.useContext(MenubarContext);
  if (!context) {
    throw new Error("useMenubarContext must be used within a MenubarProvider");
  }
  return context;
}

interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {}

function Menubar({ className, children, ...props }: MenubarProps) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  // Click outside handler
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenu && !((e.target as HTMLElement).closest('[role="menubar"]'))) {
        setOpenMenu(null);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <MenubarContext.Provider value={{ openMenu, setOpenMenu }}>
      <div
        className={cn(
          "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
          className
        )}
        role="menubar"
        {...props}
      >
        {children}
      </div>
    </MenubarContext.Provider>
  );
}

interface MenubarMenuProps {
  value?: string;
  children: React.ReactNode;
}

function MenubarMenu({ value, children }: MenubarMenuProps) {
  const menuId = value || React.useId();
  
  return (
    <div className="relative" data-value={menuId}>
      {children}
    </div>
  );
}

interface MenubarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function MenubarTrigger({ className, children, ...props }: MenubarTriggerProps) {
  const { openMenu, setOpenMenu } = useMenubarContext();
  const menuItem = React.useRef<HTMLButtonElement>(null);
  const menuId = menuItem.current?.parentElement?.getAttribute("data-value") || "";
  const isOpen = openMenu === menuId;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenMenu(isOpen ? null : menuId);
  };

  return (
    <button
      ref={menuItem}
      type="button"
      role="menuitem"
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      )}
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function MenubarContent({ className, children, ...props }: MenubarContentProps) {
  const { openMenu } = useMenubarContext();
  const menuItem = React.useRef<HTMLDivElement>(null);
  const menuId = menuItem.current?.parentElement?.getAttribute("data-value") || "";
  const isOpen = openMenu === menuId;

  if (!isOpen) return null;

  return (
    <div
      ref={menuItem}
      className={cn(
        "absolute left-0 top-0 z-50 mt-10 flex min-w-[8rem] flex-col rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      role="menu"
      {...props}
    >
      {children}
    </div>
  );
}

interface MenubarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

function MenubarItem({ className, inset, children, ...props }: MenubarItemProps) {
  const { setOpenMenu } = useMenubarContext();

  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      role="menuitem"
      onClick={() => setOpenMenu(null)}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
};
