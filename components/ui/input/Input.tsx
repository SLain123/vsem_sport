import React, { FC, useState, useEffect, useRef } from "react";

import { useEffectAfterMount } from "hooks/useEffectAfterMount";

import styles from "./Input.module.scss";

export type InputType = {
  name: string;
  id?: string;
  disabled?: boolean;
  height?: number;
  placeholder?: string;
  error?: boolean;
  onChange: (
    evt: React.ChangeEvent<HTMLInputElement> | {},
    value: string,
    inputName: string
  ) => void;
  onBlur?: (
    evt: React.FocusEvent<HTMLInputElement>,
    value: string,
    inputName: string
  ) => void;
  onFocus?: (
    evt: React.FocusEvent<HTMLInputElement>,
    value: string,
    inputName: string
  ) => void;
  inputRef?:
    | React.MutableRefObject<HTMLInputElement>
    | React.MutableRefObject<null>
    | null;
  defaultValue?: string;
  value?: string;
  className?: string;
  type?: "text" | "password";
};

const Input: FC<InputType> = ({
  name,
  id = String(new Date().getTime()),
  disabled = false,
  height = 48,
  placeholder = "",
  error = false,
  onChange,
  onBlur,
  onFocus,
  inputRef,
  defaultValue,
  value,
  className: userClass = "",
  type = "text",
}) => {
  const onChangeEvent = useRef<HTMLInputElement | {}>({});

  const [inputValue, setInputValue] = useState(
    defaultValue ? defaultValue : ""
  );

  const errorStyle = error ? styles.input_error : "";
  const mainInputStyle = `${styles.input} ${errorStyle} ${userClass}`;

  useEffectAfterMount(() => {
    onChange(onChangeEvent.current, inputValue, name);
  }, [inputValue]);

  useEffect(() => {
    value && setInputValue(value);
  }, [value]);

  return (
    <input
      className={mainInputStyle}
      id={id}
      value={value ? value : inputValue}
      onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(evt.target.value);
        onChangeEvent.current = evt;
      }}
      onBlur={(evt: React.FocusEvent<HTMLInputElement>) => {
        onBlur ? onBlur(evt, inputValue, name) : null;
      }}
      onFocus={(evt: React.FocusEvent<HTMLInputElement>) => {
        onFocus ? onFocus(evt, inputValue, name) : null;
      }}
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      style={{ height }}
    />
  );
};

export { Input };
