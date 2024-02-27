import React from "react";
import DateInput from "./DateInput";
import { useData } from "../Context/DataContext";

const DateRange = () => {
  const { setFinal, setStart, start, final } = useData();
  return (
    <form className="box flex" onSubmit={(e) => e.preventDefault()}>
      <DateInput
        id="start"
        label="Inicio"
        value={start}
        onChange={({ target }) => setStart(target.value)}
      />
      <DateInput
        id="final"
        label="Final"
        value={final}
        onChange={({ target }) => setFinal(target.value)}
      />
    </form>
  );
};

export default DateRange;
