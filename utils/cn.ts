// Create a concatenated classname from parameters
// @example
// cn("test", null, false, "second") => "test second"

export const cn = (...params: (string | boolean)[]): string =>
    params
        .reduce<string>((classes, current) => {
            if (current && typeof current === "string") {
                return `${classes} ${current}`;
            } else {
                return classes;
            }
        }, "")
        .trimStart();
