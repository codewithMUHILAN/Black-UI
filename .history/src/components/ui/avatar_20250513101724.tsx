import * as React from "react";
import { cn } from "../lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  status?: "online" | "offline" | "away" | "busy" | null;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, status, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const handleImgError = () => {
      setImgError(true);
    };

    const handleImgLoad = () => {
      setIsLoaded(true);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          "transition-all duration-300 ease-in-out",
          "hover:scale-105",
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt || "Avatar"}
          className={cn(
            "aspect-square h-full w-full object-cover",
            "transition-opacity duration-300 ease-in-out",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onError={handleImgError}
          onLoad={handleImgLoad}
        />

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            {fallback || (
              <span className="text-xl font-semibold text-muted-foreground">
                {alt?.charAt(0) || "A"}
              </span>
            )}
          </div>
        )}

        {status && (
          <div
            className={cn(
              "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
              status === "online" && "bg-green-500",
              status === "offline" && "bg-gray-500",
              status === "away" && "bg-yellow-500",
              status === "busy" && "bg-red-500"
            )}
          >
            {status === "online" && (
              <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></span>
            )}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    return (
      <img
        ref={ref}
        className={cn(
          "aspect-square h-full w-full object-cover",
          "transition-opacity duration-300 ease-in-out",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        "animate-in fade-in-0 zoom-in-0 duration-300",
        className
      )}
      {...props}
    />
  )
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
