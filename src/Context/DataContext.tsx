import React from "react";
import useFetch from "../Hooks/useFetch";

interface IDataContext {
  data: IVenda[] | null;
  error: string | null;
  loading: boolean;
}

interface IVenda {
  id: string;
  preco: number;
  status: "processando" | "pago" | "falha";
  pagamento: "boleto" | "cartao" | "pix";
  parcela: number | null;
  data: string;
}

const DataContext = React.createContext<IDataContext | null>(null);

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const { data, error, loading } = useFetch<IVenda[]>(
    "https://data.origamid.dev/vendas/",
  );
  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) throw new Error("useData precisa estar em DataContextProvider");
  return context;
};
