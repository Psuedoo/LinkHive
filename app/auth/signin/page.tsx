"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

function CustomInput(props: any) {
  return (
    <input
      className="p-2 bg-background hover:border hover:border-primary focus:border-primary text-text rounded-lg"
      {...props}
    />
  );
}

export default function SignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    signIn("credentials", {
      username: formData.username,
      password: formData.password,
      callbackUrl: "/profile",
    });
  };

  return (
    <div className="flex justify-center items-center bg-background h-screen">
      <div className="flex flex-col h-100 w-100 p-5 rounded-xl bg-secondary">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-text">Username</label>
          <CustomInput
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
          />
          <label className="text-text">Password</label>
          <CustomInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />
          <button className="bg-accent rounded-xl mt-5 p-2" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
