// import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

async function FineTune() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  /*   try {
    const response = await openai.files.create({
      file: fs.createReadStream("fine_tune_data.jsonl"),
      purpose: "fine-tune",
    });

    console.log("File uploaded:", response);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
 */

  /*   const fineTune = await openai.fineTuning.jobs.create({
    training_file: "file-FYie8r62guPpvSWh5bFL2a",
    model: "gpt-4o-mini-2024-07-18",
  });

  console.log("Fine-tuning job created:", fineTune);
 */

  let fineTune = await openai.fineTuning.jobs.retrieve(
    "ftjob-tOcHMXO7s92pcmuDykCLhKeW",
  );
  console.log("Fine-tuning job state:", fineTune);

  /*   let events = await openai.fineTuning.jobs.listEvents(fineTune.id, {
    limit: 10,
  });
  console.log("Fine-tuning job events:", events); */
}

// Call the async function
FineTune();
