import { ReactNode } from "react";

export type ContainerProps = {
    children: ReactNode;
    className?: string;
    fluid?: boolean;
    width?: 910 | 1280 | 1440 | 1920  
}