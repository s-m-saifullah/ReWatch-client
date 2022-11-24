import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const Register = () => {
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const { createUser, updateUser, createGoogleUser } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //   Set Access Token
  const [token] = useToken(createdUserEmail);

  //   Navigate Registered User to Home
  const navigate = useNavigate();
  if (token) {
    navigate("/");
  }

  const handleSignUp = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbb_apiKey
    }`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const uploadedImg = imgData.data.display_url;
        createUser(data.email, data.password)
          .then((result) => {
            const newUser = result.user;
            console.log(newUser);
            updateUser(data.name, uploadedImg)
              .then(() => {
                saveUser(
                  newUser.displayName,
                  newUser.email,
                  data.userRole,
                  uploadedImg
                );
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  //   Google Sign In
  const handleGoogleLogin = () => {
    createGoogleUser()
      .then((result) => {
        const newUser = result.user;
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
        setCreatedUserEmail(email);
        toast.success("Registration Successful");
      });
  };

  return (
    <div className="container mx-auto min-h-[900px] flex place-items-center">
      <div className="w-1/4 mx-auto">
        <div className="space-y-4">
          <h2 className="mb-3 text-2xl font-bold">Create your profile</h2>

          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 mb-5">
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Name"
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              />
              {errors.name && (
                <p role="alert" className="text-red-600">
                  {errors.name?.message}
                </p>
              )}
            </div>

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

            <div className="ml-3 mb-5">
              <label className="inline-block mb-3">Chooser User Role</label>
              <div className="flex gap-10">
                <div className="flex items-center gap-2">
                  <input
                    {...register("userRole", {
                      required: "User role is required",
                    })}
                    id="buyer"
                    type="radio"
                    name="userRole"
                    className="radio"
                    value="buyer"
                    checked
                  />
                  <label htmlFor="buyer">Buyer</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    {...register("userRole", {
                      required: "User role is required",
                    })}
                    id="seller"
                    type="radio"
                    name="userRole"
                    value="seller"
                    className="radio"
                  />{" "}
                  <label htmlFor="seller">Seller</label>
                </div>
              </div>
              {errors.userRole && (
                <p role="alert" className="text-red-600">
                  {errors.userRole?.message}
                </p>
              )}
            </div>

            <div className="w-full ml-3 mb-5">
              <label htmlFor="">Photo</label>
              <input
                {...register("image", {
                  required: "Image is required",
                })}
                type="file"
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              />
              {errors.image && (
                <p role="alert" className="text-red-600">
                  {errors.image?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full hover:opacity-90 text-base xl:text-base py-4 bg-indigo-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-lg"
            >
              REGISTER
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

export default Register;
