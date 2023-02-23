import React, { FC, useState, useEffect, useRef } from "react";

import { useEffectAfterMount } from "hooks/useEffectAfterMount";

import styles from "./Textarea.module.scss";

export type TextareaType = {
  name: string;
  id?: string;
  disabled?: boolean;
  rows?: number;
  placeholder?: string;
  error?: boolean;
  onChange: (
    evt: React.ChangeEvent<HTMLTextAreaElement> | {},
    value: string,
    areaName: string
  ) => void;
  onBlur?: (
    evt: React.FocusEvent<HTMLTextAreaElement>,
    value: string,
    areaName: string
  ) => void;
  onFocus?: (
    evt: React.FocusEvent<HTMLTextAreaElement>,
    value: string,
    areaName: string
  ) => void;
  areaRef?:
    | React.MutableRefObject<HTMLTextAreaElement>
    | React.MutableRefObject<null>
    | null;
  defaultValue?: string;
  value?: string;
  className?: string;
  resize?: "both" | "none" | "horizontal" | "vertical";
};

const Textarea: FC<TextareaType> = ({
  name,
  id = String(new Date().getTime()),
  disabled = false,
  rows = 8,
  placeholder = "",
  error = false,
  onChange,
  onBlur,
  onFocus,
  areaRef,
  defaultValue,
  value,
  className: userClass = "",
  resize = "both",
}) => {
  const onChangeEvent = useRef<HTMLTextAreaElement | {}>({});

  const [areaValue, setAreaValue] = useState(defaultValue ? defaultValue : "");

  const errorStyle = error ? styles.area_error : "";
  const mainAreaStyle = `${styles.area} ${errorStyle} ${userClass}`;

  useEffectAfterMount(() => {
    onChange(onChangeEvent.current, areaValue, name);
  }, [areaValue]);

  useEffect(() => {
    value && setAreaValue(value);
  }, [value]);

  return (
    <textarea
      className={mainAreaStyle}
      id={id}
      value={value ? value : areaValue}
      onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAreaValue(evt.target.value);
        onChangeEvent.current = evt;
      }}
      onBlur={(evt: React.FocusEvent<HTMLTextAreaElement>) => {
        onBlur ? onBlur(evt, areaValue, name) : null;
      }}
      onFocus={(evt: React.FocusEvent<HTMLTextAreaElement>) => {
        onFocus ? onFocus(evt, areaValue, name) : null;
      }}
      ref={areaRef}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      style={{ resize }}
    />
  );
};

export { Textarea };
