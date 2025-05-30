import * as React from "react";
interface DropdownMenuProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    hoverMode?: boolean;
}
declare const DropdownMenu: React.FC<DropdownMenuProps>;
interface DropdownMenuTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
}
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "start" | "center" | "end";
    alignOffset?: number;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    variant?: "default" | "contextMenu";
}
declare const DropdownMenuContent: React.ForwardRefExoticComponent<DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const DropdownMenuLabel: React.ForwardRefExoticComponent<DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    inset?: boolean;
    disabled?: boolean;
}
declare const DropdownMenuItem: React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuGroup, };
