import { useData } from "../Context/DataContext";

function monthsAgo(n: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + n);
  return new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date);
}

function formatDate(date: Date) {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const btnStyle: React.CSSProperties = {
  padding: "var(--gap) var(--gap-s)",
  backgroundColor: "var(--color-3)",
  border: "none",
  borderRadius: "var(--gap)",
  color: "var(--color-2)",
  fontWeight: "600",
  textTransform: "capitalize",
};

const MonthBtn = ({ n }: { n: number }) => {
  const { setStart, setFinal } = useData();

  function setMonth(n: number) {
    const date = new Date();
    date.setMonth(date.getMonth() + n);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    setStart(formatDate(firstDay));
    setFinal(formatDate(lastDay));
  }

  return (
    <button onClick={() => setMonth(n)} style={btnStyle}>
      Mês: {monthsAgo(n)}{" "}
    </button>
  );
};

export default MonthBtn;
