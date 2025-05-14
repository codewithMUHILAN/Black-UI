import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "success" | "warning" | "info" | "secondary" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
    shape?: "default" | "rounded" | "square" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
    withDot?: boolean;
    dotColor?: string;
    interactive?: boolean;
    highlighted?: boolean;
}
declare function Badge({ className, variant, size, shape, withDot, dotColor, interactive, highlighted, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
