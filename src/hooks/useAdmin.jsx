import { useState, useEffect } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  //   useEffect(() => {
  //     if (email) {
  //       fetch(`${import.meta.env.VITE_apiUrl}/users/admin/${email}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setIsAdmin(data.isAdmin);
  //           setIsAdminLoading(false);
  //         });
  //     }
  //   }, [email]);
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
