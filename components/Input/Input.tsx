import * as React from "react";
import { cn } from "../../utils/cn";

export const Input = ({
    className,
    withShadow,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { withShadow?: boolean }) => {
    return (
        <input
            className={cn(
                "input",
                withShadow ? "inputWithShadow" : "",
                className ? "className" : ""
            )}
            {...props}
        />
    );
};
