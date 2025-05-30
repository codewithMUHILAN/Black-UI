import { MotionValue } from "framer-motion";
interface DockItemProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    mouseX: MotionValue<number>;
    baseItemSize: number;
    magnification: number;
    distance: number;
    spring: {
        mass: number;
        stiffness: number;
        damping: number;
    };
    badgeCount?: number;
}
declare function DockItem({ icon, label, onClick, mouseX, baseItemSize, magnification, distance, spring, badgeCount, }: DockItemProps): import("react/jsx-runtime").JSX.Element;
interface DockItem {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    badgeCount?: number;
}
interface DockProps {
    items: DockItem[];
    className?: string;
    spring?: {
        mass: number;
        stiffness: number;
        damping: number;
    };
    magnification?: number;
    distance?: number;
    panelHeight?: number;
    dockHeight?: number;
    baseItemSize?: number;
}
export default function Dock({ items, className, spring, magnification, distance, panelHeight, dockHeight, baseItemSize, }: DockProps): import("react/jsx-runtime").JSX.Element;
export {};
