import { forwardRef, useImperativeHandle, useRef } from "react";

interface Props {
  className: string;
  id: string;
  label: string;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onBlur: VoidFunction;
  inputClassName: string;
}

interface Ref {
    focus: VoidFunction;
}

const Input = forwardRef<Ref, Props>(
  (props, ref) => {
    const { className, id, label, value, onChange, onBlur, inputClassName } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
        return {
            focus() {
                inputRef.current?.focus();
            },
        }
    }, []);

    return (
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClassName}
        />
      </div>
    );
  }
);

export default Input;
