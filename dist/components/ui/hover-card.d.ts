import * as React from "react";
interface HoverCardProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    openDelay?: number;
    closeDelay?: number;
}
declare const HoverCard: React.FC<HoverCardProps>;
interface HoverCardTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
}
declare const HoverCardTrigger: React.FC<HoverCardTriggerProps>;
interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    align?: "center" | "start" | "end";
    sideOffset?: number;
}
declare const HoverCardContent: React.ForwardRefExoticComponent<HoverCardContentProps & React.RefAttributes<HTMLDivElement>>;
export { HoverCard, HoverCardTrigger, HoverCardContent };
