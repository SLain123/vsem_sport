import React, { FC, useState, useEffect } from "react";

import styles from "./Textarea.module.scss";

export type TextareaType = {
  name: string;
  id?: string;
  disabled?: boolean;
  rows?: number;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
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
  errorMessage,
  onChange,
  onBlur,
  onFocus,
  areaRef,
  value,
  defaultValue,
  className: userClass = "",
  resize = "both",
}) => {
  const [areaValue, setAreaValue] = useState(defaultValue ? defaultValue : "");

  const errorStyle = error ? styles.area_error : "";
  const mainAreaStyle = `${styles.area} ${errorStyle} ${userClass}`;

  useEffect(() => {
    value && setAreaValue(value);
  }, [value]);

  return (
    <>
      <textarea
        className={mainAreaStyle}
        id={id}
        value={value ? value : areaValue}
        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
          setAreaValue(evt.target.value);
          onChange(evt, evt.target.value, name);
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
      {error && errorMessage && (
        <span className={styles.area_error_message}>{errorMessage}</span>
      )}
    </>
  );
};

export { Textarea };
