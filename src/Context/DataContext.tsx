import React from "react";
import useFetch from "../Hooks/useFetch";

interface IDataContext {
  data: IVenda[] | null;
  error: string | null;
  loading: boolean;
  start: string;
  final: string;
  setStart: React.Dispatch<React.SetStateAction<string>>;
  setFinal: React.Dispatch<React.SetStateAction<string>>;
}

export interface IVenda {
  id: string;
  nome: string;
  preco: number;
  status: "processando" | "pago" | "falha";
  pagamento: "boleto" | "cartao" | "pix";
  parcela: number | null;
  data: string;
}

function getDateDaysAgo(n: number) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const DataContext = React.createContext<IDataContext | null>(null);

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const [start, setStart] = React.useState(getDateDaysAgo(30));
  const [final, setFinal] = React.useState(getDateDaysAgo(0));
  const { data, error, loading } = useFetch<IVenda[]>(
    `https://data.origamid.dev/vendas/?inicio=${start}&final=${final}`,
  );
  return (
    <DataContext.Provider
      value={{ data, loading, error, start, setStart, final, setFinal }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) throw new Error("useData precisa estar em DataContextProvider");
  return context;
};
