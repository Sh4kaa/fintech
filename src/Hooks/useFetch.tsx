import React from "react";

function useFetch<T>(url: RequestInfo | URL, options?: RequestInit) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const refOptions = React.useRef(options);
  refOptions.current = options;

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchData = async () => {
      setLoading(true);
      setData(null);
      try {
        const response = await fetch(url, { signal, ...refOptions.current });
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const json = (await response.json()) as T;
        if (!signal.aborted) setData(json);
      } catch (error) {
        if (!signal.aborted && error instanceof Error) setError(error.message);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}

export default useFetch;
