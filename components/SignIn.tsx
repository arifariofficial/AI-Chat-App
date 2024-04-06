"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleCredentialsSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const result: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      // Handle the error
      console.log(result.error);
    } else {
      // Optionally handle the success case, such as redirecting
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleCredentialsSubmit}
        className="mx-auto mt-8 flex w-full max-w-md flex-col items-center space-y-4 rounded-lg border border-gray-200 bg-white p-12 shadow-lg"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-lg font-semibold">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1 block w-[300px] rounded-md border border-gray-300 bg-gray-50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-lg font-semibold">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="mt-1 block w-[300px] rounded-md border border-gray-300 bg-gray-50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input
          type="submit"
          value="Sign up"
          className="h-[50px] w-[200px] rounded-md border border-transparent bg-gray-600 font-semibold text-[#F5EFD1]  hover:bg-gray-500 active:bg-gray-400"
        />
        <div className="text-center">
          <p className="text-md text-gray-600">
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;
