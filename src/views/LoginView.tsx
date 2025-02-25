import React, { useState } from "react";
import { useRegisterStore } from "../store/register-store";
import { toast } from "react-toastify";
import { UserLoginForm } from "../types";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

const LoginView = () => {
  const initialLoginForm: UserLoginForm = {
    username: "",
    password: "",
  };

  const { authenticateEmployee } = useRegisterStore();

  const [credentials, setCredentials] = useState(initialLoginForm);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: ({ username, password }: UserLoginForm) =>
      authenticateEmployee({ username, password }),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.message || "Error en la autenticación");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ username: credentials.username, password: credentials.password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-400 to-yellow-600">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="absolute top-4 left-4">
          <img
            src="logo_terraviva.png"
            alt="Logo de la tienda"
            className="flex-shrink-0 w-40 sm:w-40 md:w-48 lg:w-56"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Bienvenido a TerraViva
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="Ingresa tu usuario"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-yellow-300 to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
