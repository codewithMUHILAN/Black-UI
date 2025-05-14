import React from "react";
export interface GradientCardProps {
    /** Base color for the gradient */
    color: string;
    /** Secondary color (used in border and inner glow) */
    glowColor: string;
    /** Card width */
    width?: string;
    /** Card height */
    height?: string;
    /** Card border radius */
    borderRadius?: string;
    /** Custom CSS class name */
    className?: string;
    /** Content to render inside the card */
    children?: React.ReactNode;
    /** Whether to follow mouse movement */
    followMouse?: boolean;
    /** Whether to animate on hover only */
    hoverOnly?: boolean;
    /** Gradient intensity (0-100) */
    intensity?: number;
    /** Background color */
    backgroundColor?: string;
}
export declare const InteractiveGradient: ({ color, glowColor, width, height, borderRadius, className, children, followMouse, hoverOnly, intensity, backgroundColor }: GradientCardProps) => import("react/jsx-runtime").JSX.Element;
export default InteractiveGradient;
