"use client";

import React, { useState } from "react";

interface QuestionnaireProps {
  onCompletion: (answers: { hasInsurance: string; happenedInFreeTime: string }) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onCompletion }) => {
  const [firstQuestionSelected, setFirstQuestionSelected] = useState<boolean>(false);
  const [showFirstQuestion, setShowFirstQuestion] = useState<boolean>(true);
  const [hasInsurance, setHasInsurance] = useState<string>("");
  const [goToKela, setGoToKela] = useState<boolean>(false);
  const [happenedInFreeTime, setHappenedInFreeTime] = useState<string>("");
  const [showSecondQuestion, setShowSecondQuestion] = useState<boolean>(false);
  const [noToSecondQuestion, setNoToSecondQuestion] = useState<boolean>(false);

  const handleFirstQuestion = (answer: string) => {
    setHasInsurance(answer);
    setShowFirstQuestion(answer === "no" ? false : true);
    setGoToKela(answer === "no" ? true : false);
    setShowSecondQuestion(answer === "yes");
    setFirstQuestionSelected(true);
  };

  const handleSecondQuestion = (answer: string) => {
    setNoToSecondQuestion(true);
    setHappenedInFreeTime(answer);
    onCompletion({ hasInsurance, happenedInFreeTime: answer });
  };

  const handleReset = () => {
    const userConfirmation = confirm("Are you sure, you want to reset?");
    if (userConfirmation) {
      setShowFirstQuestion(true);
      setGoToKela(false);
      setShowSecondQuestion(false);
      setFirstQuestionSelected(false);
      setNoToSecondQuestion(false);
    }
  };

  return (
    <div className="question glassmorphism">
      <section>
        <h2>Insurance Questionnaire</h2>
        <button onClick={handleReset}>Reset</button>
      </section>
      <section>
        {showFirstQuestion && (
          <div>
            <p>Do you have an insurance?</p>
            <button
              className={firstQuestionSelected ? "selected" : ""}
              onClick={() => handleFirstQuestion("yes")}
            >
              Yes
            </button>
            <button disabled={firstQuestionSelected} onClick={() => handleFirstQuestion("no")}>
              No
            </button>
          </div>
        )}
        {goToKela && (
          <div>
            <p>Please contact Kela</p>
          </div>
        )}
        {showSecondQuestion && (
          <div>
            <p>Did it happen in your free time?</p>
            <button onClick={() => handleSecondQuestion("yes")}>Yes</button>
            <button onClick={() => handleSecondQuestion("no")}>No</button>
          </div>
        )}
        {noToSecondQuestion && (
          <div>
            <p>Please contact your work or school insurance</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Questionnaire;
