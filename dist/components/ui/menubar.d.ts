import * as React from "react";
interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare function Menubar({ className, children, ...props }: MenubarProps): import("react/jsx-runtime").JSX.Element;
interface MenubarMenuProps {
    value?: string;
    children: React.ReactNode;
}
declare function MenubarMenu({ value, children }: MenubarMenuProps): import("react/jsx-runtime").JSX.Element;
interface MenubarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}
declare function MenubarTrigger({ className, children, ...props }: MenubarTriggerProps): import("react/jsx-runtime").JSX.Element;
interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare function MenubarContent({ className, children, ...props }: MenubarContentProps): import("react/jsx-runtime").JSX.Element | null;
interface MenubarItemProps extends React.HTMLAttributes<HTMLDivElement> {
    inset?: boolean;
}
declare function MenubarItem({ className, inset, children, ...props }: MenubarItemProps): import("react/jsx-runtime").JSX.Element;
export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, };
