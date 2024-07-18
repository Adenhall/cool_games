import clsx from "clsx";
import { HTMLAttributes } from "react";
import { createPortal } from "react-dom";

const Modal = (
  { children, className, ...props }: HTMLAttributes<HTMLDivElement>,
) => {
  return createPortal(
    <div
      className={clsx(
        "absolute top-0 left-0 w-screen h-screen flex items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
};

export default Modal;
