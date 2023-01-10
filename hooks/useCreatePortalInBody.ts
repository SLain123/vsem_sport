import { useLayoutEffect, useRef, ReactNode, ReactElement } from "react";
import { createPortal } from "react-dom";

const useCreatePortalInBody = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  if (wrapperRef.current === null && typeof document !== "undefined") {
    const div = document.createElement("div");
    div.setAttribute("data-body-portal", "");
    wrapperRef.current = div;
  }
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }
    document.body.appendChild(wrapper);
    return () => {
      document.body.removeChild(wrapper);
    };
  }, []);

  return (children: ReactNode | ReactElement) =>
    wrapperRef.current && createPortal(children, wrapperRef.current);
};

export { useCreatePortalInBody };
