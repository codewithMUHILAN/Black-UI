"use client";
import React from "react";

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  gradientColors?: string[];
  animationSpeed?: number;
  glowEffect?: boolean;
  glowSize?: number;
  variant?: "default" | "outline" | "ghost";
}

export function GradientButton({
  children,
  size = "md",
  className = "",
  gradientColors = [
    "#ff6d1b",
    "#ffee55",
    "#5bff89",
    "#4d8aff",
    "#6b5fff",
    "#ff64f9",
    "#ff6565",
  ],
  animationSpeed = 2,
  glowEffect = true,
  glowSize = 4,
  variant = "default",
  ...props
}: GradientButtonProps) {
  // Generate gradient string from colors
  const gradientString = gradientColors.join(", ");

  // Size classes mapping
  const sizeClasses = {
    sm: "text-sm px-4 py-2 rounded-xl",
    md: "text-base px-6 py-2 rounded-2xl",
    lg: "text-lg px-8 py-3 rounded-2xl",
    xl: "text-2xl px-10 py-4 rounded-[2.8rem]",
  };

  // Border styles based on variant
  const borderStyles = {
    default: "border-transparent",
    outline: "border-current",
    ghost: "border-transparent bg-opacity-10",
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .btn-gradient::before {
            content: "";
            background: linear-gradient(90deg, ${gradientString});
            height: 30%;
            width: 60%;
            position: absolute;
            bottom: -20%;
            z-index: 0;
            background-size: 200%;
            animation: gradient-animate ${animationSpeed}s infinite linear;
            filter: blur(calc(${glowSize} * 0.2rem));
          }

          .btn-gradient:hover,
          .btn-gradient:hover::before {
            animation: gradient-animate ${animationSpeed / 4}s infinite linear;
          }

          @keyframes gradient-animate {
            0% {
              background-position: 0;
            }
            100% {
              background-position: 200%;
            }
          }

          .btn-gradient {
            animation: gradient-animate ${animationSpeed}s infinite linear;
          }
        `,
        }}
      />

      <button
        className={`
          btn-gradient relative text-white flex items-center justify-center 
          border-[0.15rem] Z-20 ${borderStyles[variant]} ${sizeClasses[size]} 
          ${className}
        `}
        style={{
          background:
            variant === "ghost"
              ? `linear-gradient(90deg, ${gradientString})`
              : `
              linear-gradient(#121213, #121213),
              linear-gradient(#121213 50%, rgba(18, 18, 19, 0.6) 80%, rgba(18, 18, 19, 0)),
              linear-gradient(90deg, ${gradientString})
            `,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box, border-box",
          backgroundSize: "200%",
        }}
        {...props}
      >
        {glowEffect && (
          <div
            className="absolute bottom-[-20%] h-[30%] w-[60%] z-[-1] blur-3xl"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              background: `linear-gradient(90deg, ${gradientString})`,
              backgroundSize: "200%",
              animation: `gradient-animate ${animationSpeed}s infinite linear`,
            }}
          />
        )}

        {children}
      </button>
    </>
  );
}

export default GradientButton;
