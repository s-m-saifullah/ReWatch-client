import { useEffect, useState } from "react";

const useRole = (email) => {
  const [userRole, setUserRole] = useState("");
  const [isUserRoleLoading, setIsUserRoleLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_apiUrl}/users/userRole/${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          console.log(email);
          setUserRole(data.role);
          setIsUserRoleLoading(false);
        });
    } else {
      setUserRole("");
    }
  }, [email]);
  return [userRole, isUserRoleLoading];
};

export default useRole;
