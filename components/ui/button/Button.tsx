import React, { FC } from "react";
import { ClipLoader } from "react-spinners";

import Styles from "./Button.module.scss";

export type ButtonType = {
  children: string | React.ReactElement | React.ReactNode;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: "large" | "medium" | "small" | "max";
  className?: string;
  loading?: boolean;
};

const Button: FC<ButtonType> = ({
  children,
  type = "button",
  disabled = false,
  onClick = () => {
    false;
  },
  size = "medium",
  className = "",
  loading,
}) => {
  const mainButtonStyle = `${Styles.btn} ${Styles[size]} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={mainButtonStyle}
    >
      {loading ? <ClipLoader color="white" size={20} /> : children}
    </button>
  );
};

export { Button };
