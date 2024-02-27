import React from "react";
import DateInput from "./DateInput";

const DateRange = () => {
  const [start, setStart] = React.useState("");
  const [final, setFinal] = React.useState("");
  return (
    <form className="box flex" onSubmit={(e) => e.preventDefault()}>
      <DateInput
        id="start"
        label="Inicio"
        onChange={({ target }) => setStart(target.value)}
      />
      <DateInput
        id="final"
        label="Final"
        onChange={({ target }) => setFinal(target.value)}
      />
    </form>
  );
};

export default DateRange;
