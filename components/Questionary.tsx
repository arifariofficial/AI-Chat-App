"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";

interface Answer {
  text: string;
  nextQuestionId: number | null;
}

interface Question {
  id: number;
  question: string;
  answers?: Answer[];
  statement?: JSX.Element;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Traffic accident happened? when did it happen?",
    answers: [
      { text: "At free time", nextQuestionId: 2 },
      { text: "During school / work", nextQuestionId: 3 },
      { text: "Work / school travel", nextQuestionId: 4 },
    ],
  },
  {
    id: 2,
    question: "Were you or your belongings hurt?",
    answers: [
      { text: "Yes", nextQuestionId: 5 },
      { text: "No", nextQuestionId: null },
    ],
    statement: (
      <div>
        <h4>
          We advise you to contact the insurance company of the vehicle in case
          any harm is recognized later.
        </h4>
        <div className="grid place-content-center pt-8">
          <Link href="/">
            <Button variant="outline" className="w-[300px]">
              Home
            </Button>
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    question: "",
    answers: [
      { text: "Yes", nextQuestionId: null },
      { text: "No", nextQuestionId: null },
    ],
    statement: (
      <div>
        <h4>
          Contact your Work/School insurance. You should aslo contact your
          private insurance company to find out what compensation you can
          receive in relation to the car and any personal injuries.
        </h4>
        <div className="grid place-content-center pt-8">
          <Link href="/">
            <Button variant="outline" className="w-[300px]">
              Home
            </Button>
          </Link>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    question: "",
    statement: (
      <>
        <h4>
          You should contact the customer service of Kela, municipal social
          services and your insurance company for more detailed instructions and
          to start the claim process.
        </h4>
        <div>
          <Link href="/">
            <Button variant="outline" className="w-[300px]">
              Home
            </Button>
          </Link>
        </div>
      </>
    ),
  },
  {
    id: 5,
    question: "",
    statement: (
      <div className="">
        <h4 className="pb-4 text-left">
          The insurance of the vehicle may cover all costs caused by the
          accident, including:
        </h4>
        <ol className="ml-5 flex list-decimal flex-col gap-2 text-left text-base">
          <li>
            Treatment costs: Reimbures the costs of treatment required in a
            traffic accident.
          </li>
          <li>Loss of earnings: Comensates for income lost due to injury.</li>
          <li>
            Rehabilitation allowances: Covers rehabilitation need to restore or
            imporve functional capacity after an injury.
          </li>
          <li>
            Compensation for permanent handicap: Paid if the traffic accident
            leaves permanent harm.
          </li>
          <li>
            Personal injury compensation (compensatin for suffering):
            Compensation for suffering caused by personal injury.
          </li>
          <li>
            Reimbursement of expenses: Reimbursement of allowances incurred as a
            result of a traffic accident.
          </li>
        </ol>
        <div className="grid place-content-center pt-8">
          <Link href="/">
            <Button variant="outline" className="w-[300px]">
              Home
            </Button>
          </Link>
        </div>
      </div>
    ),
  },
];

const Questionary: React.FC = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(1);
  const [finalAnswer, setFinalAnswer] = useState<boolean>(false);

  // Get the current question
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  //Questionary logic
  const handleAnswer = (answer: Answer) => {
    switch (answer.text) {
      case "At free time":
        setCurrentQuestionId(answer.nextQuestionId);
        break;
      case "During school / work":
        setCurrentQuestionId(answer.nextQuestionId);
        setFinalAnswer(true);
        break;
      case "Work / school travel":
        setCurrentQuestionId(answer.nextQuestionId);
        setFinalAnswer(true);
        break;
      case "Yes":
        setFinalAnswer(true);
        setCurrentQuestionId(answer.nextQuestionId);
        break;
      case "No":
        setFinalAnswer(true);
        break;
    }
  };

  return (
    <>
      <div>
        {!finalAnswer && (
          <div className=" relative m-10 grid ">
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white/90">
              {!finalAnswer && currentQuestion?.question}
            </h1>
            <div className="mt-5 flex flex-col items-center justify-center gap-1 ">
              {currentQuestion?.answers &&
                currentQuestion?.answers.map((answer) => (
                  <Button
                    variant="outline"
                    key={answer.text}
                    onClick={() => handleAnswer(answer)}
                    className="w-[300px]"
                  >
                    {answer.text}
                  </Button>
                ))}
            </div>
          </div>
        )}
        {finalAnswer && (
          <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-4 text-center text-xl font-semibold ">
            {currentQuestion?.statement}
          </div>
        )}
      </div>
    </>
  );
};

export default Questionary;
