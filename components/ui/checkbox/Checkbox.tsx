import React, { useState, useEffect } from "react";

import Styles from "./Checkbox.module.scss";

export type CheckboxType = {
  checkboxName: string | number;
  label?: string | React.ReactElement | React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  labelColor?: "black" | "grey";
  onChange: (status: boolean, checkboxName: string | number) => void;
  className?: string;
  checkboxPosition?: "flex-start" | "flex-end" | "center";
};

const Checkbox: React.FC<CheckboxType> = ({
  checkboxName,
  label = "",
  isActive = false,
  disabled = false,
  labelColor = "black",
  onChange,
  className = "",
  checkboxPosition = "center",
}) => {
  const [isChecked, setChecked] = useState(isActive);

  const disabledStyle = disabled ? Styles.disabled : "";
  const labelColorGrey = labelColor === "grey" ? Styles.label_grey : "";

  useEffect(() => {
    setChecked(isActive);
  }, [isActive]);

  return (
    <div className={`${Styles.container} ${className}`}>
      <input
        id={String(checkboxName)}
        type="checkbox"
        onChange={() => {
          if (!disabled) {
            setChecked(!isChecked);
            onChange(!isChecked, checkboxName);
          }
        }}
        className={`${Styles.checkbox}`}
        checked={isChecked}
      />
      <label
        htmlFor={String(checkboxName)}
        className={`${Styles.label} ${disabledStyle} ${labelColorGrey}`}
        style={{ alignItems: checkboxPosition }}
        tabIndex={0}
        onKeyDown={(evt: React.KeyboardEvent<HTMLLabelElement>) => {
          evt.preventDefault();
          if (evt.code === "Space") {
            setChecked(!isChecked);
            onChange(!isChecked, checkboxName);
          }
        }}
      >
        {label}
      </label>
    </div>
  );
};

export { Checkbox };
