import * as React from "react";
interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    delayDuration?: number;
    hideDelay?: number;
    side?: "top" | "right" | "bottom" | "left";
    align?: "center" | "start" | "end";
    sideOffset?: number;
    variant?: "default" | "info" | "success" | "warning" | "error";
    hideArrow?: boolean;
    maxWidth?: string | number;
    asChild?: boolean;
    disabled?: boolean;
}
declare const Tooltip: React.FC<TooltipProps>;
interface TooltipTriggerProps {
    children: React.ReactNode;
    delayDuration: number;
    hideDelay: number;
    asChild?: boolean;
}
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipTriggerProps & React.RefAttributes<HTMLDivElement>>;
export { Tooltip, TooltipTrigger };
export declare const Tooltips: React.FC<TooltipProps>;
export declare const TooltipContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const TooltipProvider: React.FC<{
    children: React.ReactNode;
}>;
