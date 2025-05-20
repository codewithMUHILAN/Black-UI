import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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

export const InteractiveGradient = ({
  color = "#1890ff",
  glowColor = "#107667ed",
  width = "",
  height = "",
  borderRadius = "2.25rem",
  className = "",
  children,
  followMouse = true,
  hoverOnly = false,
  intensity = 100, 
  backgroundColor = "#000"
}: GradientCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Calculate normalized intensity
  const normalizedIntensity = Math.max(0, Math.min(100, intensity)) / 100;
  
  // Handle mouse movement
  useEffect(() => {
    if (!followMouse) return;
    
    const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.current) return;
        if (hoverOnly && !isHovering) return;
      
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
      
        setPosition({ x, y });
      };
      

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [followMouse, hoverOnly, isHovering]);

  // Calculate dynamic style
  const getBackgroundStyle = () => {
    if (!followMouse || (hoverOnly && !isHovering)) {
      // Default centered gradient when not following mouse
      return {
        background: `radial-gradient(circle at center, ${glowColor} 0%, ${backgroundColor} ${45 * normalizedIntensity}%, ${backgroundColor} 100%)`
      };
    }

    // Dynamic gradient based on mouse position
    return {
      background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${glowColor} 0%, ${backgroundColor} ${45 * normalizedIntensity}%, ${backgroundColor} 100%)`
    };
  };

  // Calculate border style
  const getBorderStyle = () => {
    // Compute a slightly darker color for the border gradient
    const colorWithOpacity = color;
    
    return {
      "--gradient-border": `linear-gradient(45deg, ${backgroundColor}, ${backgroundColor}, ${backgroundColor}, ${backgroundColor}, ${colorWithOpacity})`,
    } as React.CSSProperties;
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        `relative grid place-content-center place-items-center
         text-center shadow-[1px_12px_25px_rgba(0,_0,_0,_0.78)] 
         transition-all duration-300 interactive-gradient-card`,
        className
      )}
      style={{
        ...getBackgroundStyle(),
        ...getBorderStyle(),
        width,
        height,
        borderRadius,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <style>
        {`
        .interactive-gradient-card::before {
          position: absolute;
          content: "";
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: ${borderRadius};
          z-index: -1;
          border: 0.155rem solid transparent;
          background: var(--gradient-border) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
        }
        `}
      </style>
      {children}
    </div>
  );
};

export default InteractiveGradient;