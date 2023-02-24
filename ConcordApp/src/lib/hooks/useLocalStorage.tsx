import React, {useEffect, useRef, useState} from "react";

interface HookReturnProps<T> {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
}

export function useLocalStorage<T, TDefault = T>(itemName: string, itemValue: T) {
    const [value, setValue] = useState<T | TDefault>(itemValue);
    const isFirstRun = useRef<boolean>(true);

    useEffect(() => {
        if (isFirstRun.current) {
            const item = localStorage.getItem(itemName);
            if (item) {
                setValue(JSON.parse(item));
            }
            isFirstRun.current = false;
            return;
        }
        localStorage.setItem(itemName, JSON.stringify(value));
    }, [value]);

    return { value, setValue };
}
