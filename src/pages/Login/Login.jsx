import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const { login, createGoogleUser } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [token] = useToken(loginUserEmail);
  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    console.log(data);
    login(data.email, data.password)
      .then((result) => {
        const newUser = result.user;
        console.log(newUser);
        setLoginUserEmail(newUser.email);
        toast.success("Login Successful");
      })
      .catch((err) => console.log(err));
  };

  //   Google Sign In
  const handleGoogleLogin = () => {
    createGoogleUser()
      .then((result) => {
        const newUser = result.user;
        setLoginUserEmail(newUser.email);
        saveUser(newUser.displayName, newUser.email, newUser.photoURL);
      })
      .catch((err) => console.log(err));
  };

  //   Save user to DB
  const saveUser = (name, email, image, role = "buyer") => {
    const user = { name, email, image, role };
    fetch(`${import.meta.env.VITE_apiUrl}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setCreatedUserEmail(email);
        toast.success("Registration Successful");
      });
  };

  return (
    <div className="container mx-auto min-h-[900px] flex place-items-center">
      <div className="w-11/12 md:w-1/3 lg:w-1/4 mx-auto">
        <div className="space-y-4">
          <h2 className="mb-3 text-2xl font-bold">Login</h2>

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              />
              {errors.email && (
                <p role="alert" className="text-red-600">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              />
              {errors.password && (
                <p role="alert" className="text-red-600">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full hover:opacity-90 text-base xl:text-base py-4 bg-indigo-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg"
            >
              LOGIN
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-4 my-5">
          <hr className="w-full border border-gray-300" />
          <div className="font-semibold text-gray-400">OR</div>
          <hr className="w-full border border-gray-300" />
        </div>
        <div
          onClick={handleGoogleLogin}
          className="w-full text-center rounded-lg border-b-2 border-b-gray-300 bg-white py-2.5 px-4 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200 cursor-pointer"
        >
          <FaGoogle className="inline mr-2" /> Continue with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
