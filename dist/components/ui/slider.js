import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
const Slider = React.forwardRef(({ className, defaultValue = [0], value, min = 0, max = 100, step = 1, onValueChange, disabled = false, showTooltip = false, showLabels = false, thumbClassName = "", trackClassName = "", ...props }, ref) => {
    const [values, setValues] = React.useState(value !== undefined ? value : defaultValue);
    const [dragging, setDragging] = React.useState(null);
    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const trackRef = React.useRef(null);
    // Update internal values when controlled value changes
    React.useEffect(() => {
        if (value !== undefined) {
            setValues(value);
        }
    }, [value]);
    // Calculate the percentage position for a value
    const getValuePercent = (val) => {
        return ((val - min) / (max - min)) * 100;
    };
    // Calculate the value based on position percentage with smooth continuous values
    const getValueFromPosition = (position) => {
        const trackRect = trackRef.current?.getBoundingClientRect();
        if (!trackRect)
            return min;
        const percent = Math.max(0, Math.min(1, position / trackRect.width));
        const rawValue = min + percent * (max - min);
        // Apply stepping only if step is greater than 0
        const steppedValue = step > 0
            ? Math.round(rawValue / step) * step
            : rawValue;
        return Math.max(min, Math.min(max, steppedValue));
    };
    // Handle mouse/touch events for dragging with smooth transitions
    const handlePointerDown = (e, index) => {
        if (disabled)
            return;
        e.preventDefault();
        setDragging(index);
        setTooltipVisible(true);
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp);
        // Set pointer capture to handle events outside the element
        e.target.setPointerCapture(e.pointerId);
    };
    const handlePointerMove = React.useCallback((e) => {
        if (dragging === null || !trackRef.current)
            return;
        const trackRect = trackRef.current.getBoundingClientRect();
        const position = Math.max(0, Math.min(trackRect.width, e.clientX - trackRect.left));
        const newValue = getValueFromPosition(position);
        if (newValue !== values[dragging]) {
            const newValues = [...values];
            newValues[dragging] = newValue;
            // Update internal state
            setValues(newValues);
            // Notify parent if needed
            onValueChange?.(newValues);
        }
    }, [dragging, values, onValueChange, min, max, step]);
    const handlePointerUp = React.useCallback((e) => {
        if (dragging !== null) {
            // Release pointer capture
            e.target.releasePointerCapture(e.pointerId);
        }
        setDragging(null);
        setTooltipVisible(false);
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
    }, [handlePointerMove, dragging]);
    // Clean up event listeners on unmount
    React.useEffect(() => {
        return () => {
            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerup", handlePointerUp);
        };
    }, [handlePointerMove, handlePointerUp]);
    // Handle track clicks for immediate value change
    const handleTrackClick = (e) => {
        if (disabled)
            return;
        const trackRect = trackRef.current?.getBoundingClientRect();
        if (!trackRect)
            return;
        const position = e.clientX - trackRect.left;
        const newValue = getValueFromPosition(position);
        // Find the closest thumb to update
        const closestThumbIndex = values.reduce((closest, value, index) => {
            const closestDiff = Math.abs(values[closest] - newValue);
            const currentDiff = Math.abs(value - newValue);
            return currentDiff < closestDiff ? index : closest;
        }, 0);
        const newValues = [...values];
        newValues[closestThumbIndex] = newValue;
        // Update internal state
        setValues(newValues);
        // Notify parent if needed
        onValueChange?.(newValues);
    };
    // Handle keyboard controls for accessibility
    const handleKeyDown = (e, index) => {
        if (disabled)
            return;
        let newValue = values[index];
        const smallStep = step || (max - min) / 100;
        const largeStep = ((max - min) / 10);
        switch (e.key) {
            case "ArrowRight":
            case "ArrowUp":
                newValue = Math.min(max, newValue + smallStep);
                break;
            case "ArrowLeft":
            case "ArrowDown":
                newValue = Math.max(min, newValue - smallStep);
                break;
            case "PageUp":
                newValue = Math.min(max, newValue + largeStep);
                break;
            case "PageDown":
                newValue = Math.max(min, newValue - largeStep);
                break;
            case "Home":
                newValue = min;
                break;
            case "End":
                newValue = max;
                break;
            default:
                return;
        }
        const newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);
        onValueChange?.(newValues);
        e.preventDefault();
    };
    // Handle mouse enter/leave for tooltips
    const handleThumbMouseEnter = () => {
        if (!disabled) {
            setTooltipVisible(true);
        }
    };
    const handleThumbMouseLeave = () => {
        if (dragging === null) {
            setTooltipVisible(false);
        }
    };
    return (_jsxs("div", { ref: ref, className: cn("relative flex w-full touch-none select-none items-center", disabled && "opacity-50 cursor-not-allowed", className), ...props, children: [showLabels && (_jsxs("div", { className: "absolute w-full flex justify-between text-xs text-muted-foreground -top-6", children: [_jsx("span", { children: min }), _jsx("span", { children: max })] })), _jsx("div", { ref: trackRef, className: cn("relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", trackClassName), onClick: handleTrackClick, children: _jsx("div", { className: cn("absolute h-full bg-primary transition-all", values.length > 1 ? "bg-transparent" : ""), style: {
                        left: 0,
                        width: `${getValuePercent(Math.max(...values))}%`
                    } }) }), values.map((value, index) => (_jsx("div", { className: cn("absolute z-10 flex items-center justify-center", tooltipVisible && showTooltip ? "opacity-100" : "opacity-0", "transition-opacity duration-200", "pointer-events-none -top-8"), style: {
                    left: `calc(${getValuePercent(value)}% - 10px)`,
                }, children: showTooltip && (_jsx("div", { className: "px-2 py-1 text-xs font-semibold text-white bg-primary rounded shadow-sm whitespace-nowrap", children: Math.round(value * 100) / 100 })) }, index))), values.map((value, index) => (_jsx("div", { className: cn("absolute block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-sm transition-all", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "hover:scale-110", dragging === index && "scale-110 cursor-grabbing", disabled ? "cursor-not-allowed" : "cursor-grab", thumbClassName), style: {
                    left: `calc(${getValuePercent(value)}% - 10px)`,
                    top: "50%",
                    transform: "translateY(-50%)",
                    touchAction: "none"
                }, onPointerDown: (e) => handlePointerDown(e, index), onMouseEnter: handleThumbMouseEnter, onMouseLeave: handleThumbMouseLeave, onKeyDown: (e) => handleKeyDown(e, index), role: "slider", "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": value, tabIndex: disabled ? -1 : 0, "data-disabled": disabled ? "" : undefined }, index)))] }));
});
Slider.displayName = "Slider";
export { Slider };
