import React from "react";
import { Button } from "./ui/button";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Our Company";

  if (!isOpen) return null;

  return (
    <div
      aria-hidden={!isOpen}
      role="dialog"
      aria-labelledby="terms-title"
      aria-describedby="terms-content"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
    >
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg sm:p-8">
        <button
          aria-label="Close Terms Modal"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2
          id="terms-title"
          className="mb-4 text-center text-2xl font-bold text-gray-800"
        >
          Terms and Conditions
        </h2>
        <div id="terms-content" className="space-y-4 text-gray-600">
          <p>
            Welcome to <strong>{companyName}</strong>! These terms and
            conditions outline the rules and regulations for the use of our
            website.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">
            1. Definitions
          </h3>
          <p>
            <strong>“Company”</strong> refers to {companyName}, its employees,
            agents, and affiliates.
            <br />
            <strong>“User”</strong> refers to any person accessing our website
            or using our services.
          </p>

          <h3 className="text-lg font-semibold text-gray-800">
            2. Use of Our Services
          </h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Users must be at least 18 years old or have parental consent to
              use our services.
            </li>
            <li>
              Users agree not to use the website in any way that may damage or
              impair its functionality.
            </li>
            <li>Users agree not to use our services for illegal activities.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800">
            3. Intellectual Property
          </h3>
          <p>
            All content on this website, including text, images, and software,
            is owned by {companyName} or its licensors. Users are prohibited
            from reproducing or redistributing any content without prior written
            permission.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Button onClick={onClose} className="px-6 py-2 text-sm">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
