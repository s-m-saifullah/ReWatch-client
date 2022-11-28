import { useState, useEffect } from "react";

const useToken = (email) => {
  const [token, setToken] = useState();
  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_apiUrl}/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};

export default useToken;
