"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

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
      router.push("/");
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="my-6 flex flex-col items-center justify-center sm:my-16">
      {/* Sign in form container */}
      <form
        onSubmit={handleCredentialsSubmit}
        className="border-color-primary  mx-auto flex w-[300px] max-w-md flex-col items-center space-y-4 rounded-lg border  bg-white p-4 shadow-lg md:w-full md:p-12"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-lg font-semibold">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1 block rounded-md border border-gray-300 bg-gray-50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 md:w-[300px]"
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
            className="mt-1 block rounded-md border border-gray-300 bg-gray-50 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 md:w-[300px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Sign in" className="btn-primary" />
        <div className="text-center">
          <p className=" font-semibold text-gray-700">
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="pl-1 font-bold text-blue-600 hover:text-blue-500 hover:drop-shadow-lg"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>

      {/* Google and Facebook button */}
      <div className="border-color-primary mx-auto mt-8 flex w-[300px] max-w-md flex-col items-center space-y-4 rounded-lg  border bg-white p-12 shadow-2xl md:w-full">
        <button
          type="button"
          onClick={() => handleOAuthSignIn("google")}
          className="btn-primary"
        >
          <GoogleIcon />
          <p className="ml-3">Sign in with Google</p>
        </button>
        <button
          type="button"
          onClick={() => handleOAuthSignIn("facebook")}
          className="btn-primary"
        >
          <FacebookIcon />
          <p className="ml-3">Sign in with Facebook</p>
        </button>
      </div>
    </div>
  );
};

export default SigninPage;
