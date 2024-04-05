"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(""); // Reset message

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message || "Signup successful!");
        setEmail("");
        setPassword("");
        alert("Signup successful!");
        router.push("/");
      } else {
        const errorResult = await response.json();
        setMessage(errorResult.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label className="formLabel">
          Email:
          <input
            type="email"
            name="email"
            className="formInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="formLabel">
          Password:
          <input
            type="password"
            name="password"
            className="formInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <input
          type="submit"
          value="Sign up"
          className="submitButton bg-[#2d4242]h-[50px] w-[150px] rounded-md border border-transparent bg-gray-600 font-semibold  text-[#F5EFD1] hover:bg-gray-500 active:bg-gray-400"
        />
      </form>
      {/* Inline css style */}
      <style jsx>
        {`
          .form {
            display: flex;
            flex-direction: column;
            max-width: 400px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            color: #333;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 60px;
          }

          .formLabel {
            display: block;
            margin-bottom: 5px;
          }

          .formInput {
            width: 100%;
            padding: 8px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .submitButton {
            padding: 10px 20px;
            font-size: 1rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            align-self: center;
            justify-self: center;
          }
        `}
      </style>
    </>
  );
};

export default SignupPage;
