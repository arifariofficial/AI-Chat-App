import React from "react";
import { Button } from "./ui/button";
import { Dictionary } from "@/lib/types";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dictionary: Dictionary;
}

const TermsModal = ({ isOpen, onClose, dictionary }: TermsModalProps) => {
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
          aria-label={dictionary.terms_modal.close_button}
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
          {dictionary.terms_modal.title}
        </h2>
        <div id="terms-content" className="space-y-4 text-gray-600">
          <p>
            {dictionary.terms_modal.welcome.replace(
              "{companyName}",
              companyName,
            )}
          </p>

          <h3 className="text-lg font-semibold text-gray-800">
            {dictionary.terms_modal.definitions_title}
          </h3>
          <p>
            {dictionary.terms_modal.definitions_content.replace(
              "{companyName}",
              companyName,
            )}
          </p>

          <h3 className="text-lg font-semibold text-gray-800">
            {dictionary.terms_modal.services_title}
          </h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>{dictionary.terms_modal.services_content.item1}</li>
            <li>{dictionary.terms_modal.services_content.item2}</li>
            <li>{dictionary.terms_modal.services_content.item3}</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800">
            {dictionary.terms_modal.intellectual_property_title}
          </h3>
          <p>
            {dictionary.terms_modal.intellectual_property_content.replace(
              "{companyName}",
              companyName,
            )}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            variant="black"
            onClick={onClose}
            className="px-6 py-2 text-sm"
          >
            {dictionary.terms_modal.close_button}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
