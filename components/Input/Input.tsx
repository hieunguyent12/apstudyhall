import { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...rest }, ref) => (
    <input
      className={`shadow appearance-none border rounded text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      type="text"
      ref={ref}
      {...rest}
    />
  )
);

Input.displayName = "Input";

export default Input;
