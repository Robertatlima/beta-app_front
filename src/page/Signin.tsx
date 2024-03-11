import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface UserData {
  username: string;
  password: string;
}

interface SigninProps {}

const Signin: React.FC<SigninProps> = () => {
  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { logar, erro, isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleForm = (data: UserData) => {
    logar(data);
  };
  return (
    <form onSubmit={handleSubmit(handleForm)} className="space-y-10">
      <div className="flex items-center justify-center flex-col h-screen">
        {erro && (
          <div className="bg-red-600 text-gray-50 p-2.5 rounded-lg">{erro}</div>
        )}
        <label className="text-lg font-semibold text-gray-700">BETA APP</label>
        <div className="flex items-center justify-center flex-col max-w-sm p-6 bg-white shadow-md rounded-md space-y-10">
          <TextField
            id="Username"
            label="Username"
            {...register("username")}
            error={!!errors.username}
            variant="outlined"
            color="warning"
            helperText={errors.username?.message}
          />
          <TextField
            id="password"
            type="password"
            label="Senha"
            {...register("password")}
            error={!!errors.password}
            variant="outlined"
            color="warning"
            helperText={errors.password?.message}
          />
          <Button variant="contained" type="submit">
            Entrar
          </Button>
          <label className="text-sm text-gray-700">
            Não tem uma conta?
            <span className="font-semibold">
              <Link to="/" className="text-blue-500 ml-1">
                Registre-se
              </Link>
            </span>
          </label>
        </div>
      </div>
    </form>
  );
};

export default Signin;
