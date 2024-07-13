import React,{useState,useCallback,useEffect} from "react";

export default function useHttp(url, config, initialData) {
    const [error, setError] = useState();
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
  
    async function sendHttpRequest(url, config) {
      const response = await fetch(url, config);
      const resData = await response.json(); // Move this line after the fetch
      if (!response.ok) {
        throw new Error(
          resData.message || "Something went wrong, failed to send request"
        );
      }
      return resData;
    }
  
    const sendRequest = useCallback(async (data) => {
      setLoading(true);
      try {
        const resData = await sendHttpRequest(url, {...config , body:data});
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!!");
      }
      setLoading(false);
    }, [url, config]);
  
    useEffect(() => {
      if (
        (config && (config.method === "GET" || !config.method)) ||
        !config
      ) {
        sendRequest();
      }
    }, [sendRequest, config]);
  
    return {
      data,
      loading,
      error,
      sendRequest,
    };
  }
  