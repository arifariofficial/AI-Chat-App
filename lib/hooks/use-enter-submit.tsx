import React, { useRef, type RefObject } from "react";

export function useEnterSubmit(): {
  formRef: RefObject<HTMLFormElement>;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  handleButtonClick: () => void;
} {
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit();
      event.preventDefault();
    }
  };

  const handleButtonClick = () => {
    formRef.current?.requestSubmit();
  };

  return { formRef, onKeyDown: handleKeyDown, handleButtonClick };
}
