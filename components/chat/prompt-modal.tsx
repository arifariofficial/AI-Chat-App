"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import {
  fetchPrompt,
  setPrompt,
  updatePromptToDB,
} from "@/lib/store/promptSlice";
import { RootState } from "@/lib/store/store";
import { useEffect, useState } from "react";
import { IconCheck, IconEdit } from "../ui/icons";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import { toast } from "../ui/use-toast";

interface PromptModalProps {
  showPromptModal: boolean;
  handlePromptModalClose: () => void;
}

export default function PromptModal({
  showPromptModal,
  handlePromptModalClose,
}: PromptModalProps) {
  const dispatch = useAppDispatch();
  const [promptData, setPromptData] = useState({
    id: "",
    temperature: "",
    roleDefinition: "",
    roleDefinitionPurpose: "",
    userContext: "",
    userContextPurpose: "",
    guidelines: "",
    guidelinesPurpose: "",
    instructions: "",
    instructionsPurpose: "",
    keyPointers: "",
    keyPointersPurpose: "",
    responseLimitations: "",
    responseLimitationsPurpose: "",
    createdAt: "",
    updatedAt: "",
  });
  const [enableEdit, setEnableEdit] = useState({
    temperature: false,
    roleDefinition: false,
    userContext: false,
    guidelines: false,
    instructions: false,
    keyPointers: false,
    responseLimitations: false,
  });

  const { prompt, loading } = useAppSelector(
    (state: RootState) => state.prompt,
  );

  useEffect(() => {
    dispatch(fetchPrompt());
  }, [dispatch]);

  useEffect(() => {
    setPromptData({
      id: prompt?.id || "",
      temperature: prompt?.temperature?.toString() || "",
      roleDefinition: prompt?.roleDefinition || "",
      roleDefinitionPurpose: prompt?.roleDefinitionPurpose || "",
      userContext: prompt?.userContext || "",
      userContextPurpose: prompt?.userContextPurpose || "",
      guidelines: prompt?.guidelines || "",
      guidelinesPurpose: prompt?.guidelinesPurpose || "",
      instructions: prompt?.instructions || "",
      instructionsPurpose: prompt?.instructionsPurpose || "",
      keyPointers: prompt?.keyPointers || "",
      keyPointersPurpose: prompt?.keyPointersPurpose || "",
      responseLimitations: prompt?.responseLimitations || "",
      responseLimitationsPurpose: prompt?.responseLimitationsPurpose || "",
      createdAt: prompt?.createdAt || "",
      updatedAt: prompt?.updatedAt || "",
    });
  }, [prompt]);

  const handleEdit = async (field: keyof typeof enableEdit) => {
    try {
      // Dispatch updates to Redux and the database
      await dispatch(
        setPrompt({
          ...promptData,
          temperature: parseFloat(promptData.temperature),
        }),
      );
      await dispatch(
        updatePromptToDB({
          ...promptData,
          temperature: parseFloat(promptData.temperature),
        }),
      );

      // Show success toast
      toast({
        title: `Saved`,
        description: "",
        variant: "default",
        duration: 3000,
      });

      // Disable edit mode
      setEnableEdit((prev) => ({
        ...prev,
        [field]: false,
      }));
    } catch (error) {
      console.log("Error updating prompt: ", error);
      toast({
        title: "Failed to update. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  if (loading) {
    return null;
  }

  return (
    <div className="relative inset-x-0 top-0 mx-auto flex w-screen max-w-screen-lg bg-transparent">
      {showPromptModal && (
        <div className="pb-[100px]md:mt-auto absolute inset-x-0 z-50 flex h-[calc(100vh-150px)] w-full items-center justify-center px-2 sm:px-[100px]">
          <div className="flex size-full flex-col items-center justify-center rounded-xl border border-border/20 bg-backgroundSecondary p-4 text-foreground shadow-2xl">
            <div className="flex size-full flex-col text-sm">
              <h1 className="mx-auto mt-4 w-full pt-2 text-center text-2xl font-bold text-foreground">
                System Prompt
              </h1>
              <p className="mx-auto mb-2">
                Only &quot;Role Defination&quot; must have a value. Other flieds
                are optional.
              </p>
              <div className="flex flex-col space-y-4 overflow-auto p-4">
                <div className="flex w-full flex-col items-center">
                  <div className="mx-auto flex w-full flex-row items-center justify-center space-x-3">
                    <span>Less Creative</span>
                    <Slider
                      className="w-[50%] border-foreground/40"
                      sliderClassName="bg-foreground/40"
                      defaultValue={[parseFloat(promptData.temperature)]}
                      min={0.3}
                      max={0.9}
                      step={0.1}
                      onValueChange={(values: number[]) => {
                        const newTemperature = values[0].toString();
                        setPromptData((prev) => ({
                          ...prev,
                          temperature: newTemperature,
                        }));
                      }}
                      onValueCommit={(values: number[]) => {
                        const newTemperature = values[0].toString();
                        const updatedPromptData = {
                          ...promptData,
                          temperature: newTemperature,
                        };
                        // Update the state
                        setPromptData(updatedPromptData);
                        // Dispatch the updated data to the database
                        dispatch(
                          updatePromptToDB({
                            ...updatedPromptData,
                            temperature: parseFloat(newTemperature),
                          }),
                        );
                      }}
                    />
                    <span>More Creative</span>
                  </div>
                  <h1 className="mx-auto mt-1 w-full text-center font-semibold">
                    Temperature: {promptData.temperature}
                  </h1>
                </div>
                <div>
                  <div className="mr-2 flex flex-row justify-between">
                    <h1 className="font-semibold">Role Defination</h1>
                    {!enableEdit.roleDefinition ? (
                      <IconEdit
                        onClick={() =>
                          setEnableEdit((prev) => ({
                            ...prev,
                            roleDefinition: true,
                          }))
                        }
                      />
                    ) : (
                      <IconCheck
                        className="size-5"
                        onClick={() => handleEdit("roleDefinition")}
                      />
                    )}
                  </div>
                  <p>{prompt?.roleDefinitionPurpose}</p>
                  {enableEdit.roleDefinition ? (
                    <Textarea
                      className="flex-grow resize-none overflow-hidden p-1 text-sm focus:border-foreground/20"
                      value={promptData.roleDefinition}
                      onChange={(e) => {
                        setPromptData((prev) => ({
                          ...prev,
                          roleDefinition: e.target.value,
                        }));
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      rows={1}
                      ref={(textarea) => {
                        if (textarea) {
                          textarea.style.height = "auto"; // Reset the height
                          textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
                        }
                      }}
                    />
                  ) : (
                    <div className="mt-1 rounded-sm border border-foreground/20 bg-foreground/5 p-2">
                      {prompt?.roleDefinition}
                    </div>
                  )}
                </div>
                <div>
                  <div className="mr-2 flex flex-row justify-between">
                    <h1 className="font-semibold">User Context</h1>
                    {!enableEdit.userContext ? (
                      <IconEdit
                        onClick={() =>
                          setEnableEdit((prev) => ({
                            ...prev,
                            userContext: true,
                          }))
                        }
                      />
                    ) : (
                      <IconCheck
                        className="size-5"
                        onClick={() => handleEdit("userContext")}
                      />
                    )}
                  </div>
                  <p>{prompt?.userContextPurpose}</p>
                  {enableEdit.userContext ? (
                    <Textarea
                      className="flex-grow resize-none overflow-hidden p-1 text-sm focus:border-foreground/20"
                      value={promptData.userContext}
                      onChange={(e) => {
                        setPromptData((prev) => ({
                          ...prev,
                          userContext: e.target.value,
                        }));
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      rows={1}
                      ref={(textarea) => {
                        if (textarea) {
                          textarea.style.height = "auto"; // Reset the height
                          textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
                        }
                      }}
                    />
                  ) : (
                    <div className="mt-1 rounded-sm border border-foreground/20 bg-foreground/5 p-2">
                      {prompt?.userContext}
                    </div>
                  )}
                </div>
                <div>
                  <div className="mr-2 flex flex-row justify-between">
                    <h1 className="font-semibold">Guidelines</h1>
                    {!enableEdit.guidelines ? (
                      <IconEdit
                        onClick={() =>
                          setEnableEdit((prev) => ({
                            ...prev,
                            guidelines: true,
                          }))
                        }
                      />
                    ) : (
                      <IconCheck
                        className="size-5"
                        onClick={() => handleEdit("guidelines")}
                      />
                    )}
                  </div>
                  <p>{prompt?.guidelinesPurpose}</p>
                  {enableEdit.guidelines ? (
                    <Textarea
                      className="flex-grow resize-none overflow-hidden p-1 text-sm focus:border-foreground/20"
                      value={promptData.guidelines}
                      onChange={(e) => {
                        setPromptData((prev) => ({
                          ...prev,
                          guidelines: e.target.value,
                        }));
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      rows={1}
                      ref={(textarea) => {
                        if (textarea) {
                          textarea.style.height = "auto"; // Reset the height
                          textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
                        }
                      }}
                    />
                  ) : (
                    <div className="mt-1 rounded-sm border border-foreground/20 bg-foreground/5 p-2">
                      {prompt?.guidelines}
                    </div>
                  )}
                </div>
                {/* Instructions */}
                <div>
                  <div className="mr-2 flex flex-row justify-between">
                    <h1 className="font-semibold">Instructions</h1>
                    {!enableEdit.instructions ? (
                      <IconEdit
                        onClick={() =>
                          setEnableEdit((prev) => ({
                            ...prev,
                            instructions: true,
                          }))
                        }
                      />
                    ) : (
                      <IconCheck
                        className="size-5"
                        onClick={() => handleEdit("instructions")}
                      />
                    )}
                  </div>
                  <p>{prompt?.instructionsPurpose}</p>
                  {enableEdit.instructions ? (
                    <Textarea
                      className="flex-grow resize-none overflow-hidden p-1 text-sm focus:border-foreground/20"
                      value={promptData.instructions}
                      onChange={(e) => {
                        setPromptData((prev) => ({
                          ...prev,
                          instructions: e.target.value,
                        }));
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      rows={1}
                      ref={(textarea) => {
                        if (textarea) {
                          textarea.style.height = "auto"; // Reset the height
                          textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
                        }
                      }}
                    />
                  ) : (
                    <div className="mt-1 rounded-sm border border-foreground/20 bg-foreground/5 p-2">
                      {prompt?.instructions
                        ?.split("-")
                        .filter((item) => item.trim() !== "")
                        .map((item, index) => (
                          <div key={index}>
                            - {item.trim().replace(/^"(.*)"$/, "$1")}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                {/* Key Pointers */}
                <div>
                  <div className="mr-2 flex flex-row justify-between">
                    <h1 className="font-semibold">Key Pointers</h1>
                    {!enableEdit.keyPointers ? (
                      <IconEdit
                        onClick={() =>
                          setEnableEdit((prev) => ({
                            ...prev,
                            keyPointers: true,
                          }))
                        }
                      />
                    ) : (
                      <IconCheck
                        className="size-5"
                        onClick={() => handleEdit("keyPointers")}
                      />
                    )}
                  </div>
                  <p>{prompt?.keyPointersPurpose}</p>
                  {enableEdit.keyPointers ? (
                    <Textarea
                      className="flex-grow resize-none overflow-hidden p-1 text-sm focus:border-foreground/20"
                      value={promptData.keyPointers}
                      onChange={(e) => {
                        setPromptData((prev) => ({
                          ...prev,
                          keyPointers: e.target.value,
                        }));
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      rows={1}
                      ref={(textarea) => {
                        if (textarea) {
                          textarea.style.height = "auto"; // Reset the height
                          textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
                        }
                      }}
                    />
                  ) : (
                    <div className="mt-1 rounded-sm border border-foreground/20 bg-foreground/5 p-2">
                      {prompt?.keyPointers
                        ?.split("- ")
                        .filter((item) => item.trim() !== "")
                        .map((item, index) => (
                          <div key={index}>
                            - {item.trim().replace(/^"(.*)"$/, "$1")}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                {/* Response Limitations */}
                <div>
                  <div className="mr-2 flex flex-row justify-between">
                    <h1 className="font-semibold">Response Limitations</h1>
                    {!enableEdit.responseLimitations ? (
                      <IconEdit
                        onClick={() =>
                          setEnableEdit((prev) => ({
                            ...prev,
                            responseLimitations: true,
                          }))
                        }
                      />
                    ) : (
                      <IconCheck
                        className="size-5"
                        onClick={() => handleEdit("responseLimitations")}
                      />
                    )}
                  </div>
                  <p>{prompt?.responseLimitationsPurpose}</p>
                  {enableEdit.responseLimitations ? (
                    <Textarea
                      className="flex-grow resize-none overflow-hidden p-1 text-sm focus-visible:ring-foreground/40"
                      value={promptData.responseLimitations}
                      onChange={(e) => {
                        setPromptData((prev) => ({
                          ...prev,
                          responseLimitations: e.target.value,
                        }));
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      rows={1}
                      ref={(textarea) => {
                        if (textarea) {
                          textarea.style.height = "auto"; // Reset the height
                          textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
                        }
                      }}
                    />
                  ) : (
                    <div className="mt-1 rounded-sm border border-foreground/20 bg-foreground/5 p-2">
                      {prompt?.responseLimitations}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              {/* Both Button does same thing */}
              <Button
                variant="outline"
                className="mb-6 mt-2 w-[150px] font-bold"
                onClick={handlePromptModalClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
