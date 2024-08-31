import styles from "./input.module.scss";
import {FormikProps} from "formik";

// Define the props for the Input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  label?: string;
  className?: string;
  id?: string;
  name: string;
  formik?: FormikProps<any>;
  msg?: string;
}

// Input component
const Input: React.FC<InputProps> = ({
  type = "text",
  onClick,
  label,
  className = "",
  id,
  name,
  formik,
  msg,
  ...rest
}) => {
  const error = formik?.touched[name] && formik.errors?.[name];
  let classes = `${styles.input__con} ${className}`;
  if (error) classes += ` ${styles.error}`;

  const {placeholder, ...otherRest} = rest;
  const finalRest = {...otherRest};

  if (formik) {
    finalRest.onChange = formik.handleChange;
    finalRest.onBlur = formik.handleBlur;
    finalRest.value = formik.values[name];
  }

  return (
    <div className={classes}>
      {label && (
        <label className="" htmlFor={name}>
          {label}
        </label>
      )}
      {msg && <span className={`hidden md:block ${styles.msg}`}>{msg}</span>}
      <input id={id ?? name} name={name ?? id} type={type} onClick={onClick} {...finalRest} placeholder={placeholder} />
      {error && <span className={`${styles["error-message"]}`}>{error as any}</span>}
    </div>
  );
};

export {Input};
