import { useState, useEffect } from "react";

// 4 - custom hook
export const useFetch = (url) => {
  const [data, setdata] = useState(null);

  //5 - refatorando post
  const [config, setConfig] = useState(null);
  const [method, setMehod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  //6 - loading
  const [loading, setLoading] = useState(false);

  // 7 - tratando erros
  const [error, setError] = useState(null);


  const httpConfig = (data, method) => {
    if (method === "POST") {
        setConfig({
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        setMehod(method);
    }
  }

  useEffect(() => {
    const fectData = async () => {

        // 6 loading
      setLoading(true);

      // 7 tratando error
      try {

        const res = await fetch(url);

        const json = await res.json();
  
        setdata(json);
        
      } catch (error) {
        console.log(error);

        setError("Houve algum erro ao carregar os dados!");
      }

      setLoading(false);

    };

    fectData();
  }, [url, callFetch]);

  // 5 - refatorando post
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);

        const json = await res.json();

        setCallFetch(json);
      };
    };

    httpRequest();

  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};
