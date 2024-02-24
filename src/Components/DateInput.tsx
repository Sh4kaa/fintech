import React from "react";

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  id: string;
};

const DateInput = ({ label, id, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...props} type="date" id={id} name={id} />
    </div>
  );
};

export default DateInput;
