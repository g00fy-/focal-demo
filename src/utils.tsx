import { useCallback, useState } from "react";

export function formatDateTime(value: string | null | undefined) {
  if (typeof value !== "string") return "";
  const date = new Date(value);
  return date.toLocaleString();
}

export function formatValue(value: number, digits: number = 2) {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}


export function useToggle(initial: boolean = false) {
  const [value, setValue] = useState(initial);
  const close = useCallback(() => setValue(false), [setValue])
  const open = useCallback(() => setValue(true), [setValue])
  return { value, close, open };
}
