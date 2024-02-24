"use client";
import Questionnaire from "@components/Query";

const Home = () => {
  const handleQuestionnaireCompletion = (answers: {
    hasInsurance: string;
    happenedInFreeTime: string;
  }) => {
    console.log("Questionnaire Answers:", answers);
  };
  return (
    <>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Legal AI Assistant
          <br />
          <span className="orange_gradient text-3xl">
            Easing legal processes and counseling through AI
          </span>
        </h1>
        <p className="desc text-center">
          Counseling for the average person and high focus on the individual&apos;s rights in
          insurance cases
        </p>
      </section>
      <Questionnaire onCompletion={handleQuestionnaireCompletion} />
    </>
  );
};

export default Home;
