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
import { toast } from "../ui/use-toast";
import { EditableField } from "./prompt-edited-field";
import { Slider } from "../ui/slider";

interface PromptModalProps {
  showPromptModal: boolean;
  handlePromptModalClose: () => void;
}

export default function PromptModal({
  showPromptModal,
  handlePromptModalClose,
}: PromptModalProps) {
  const dispatch = useAppDispatch();
  const { prompt, loading } = useAppSelector(
    (state: RootState) => state.prompt,
  );

  const [promptData, setPromptData] = useState({
    id: "",
    temperature: "0.7",
    roleDefinition: "",
    userContext: "",
    guidelines: "",
    instructions: "",
    keyPointers: "",
    responseLimitations: "",
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

  // Fetch prompt on component mount
  useEffect(() => {
    dispatch(fetchPrompt());
  }, [dispatch]);

  // Update local state when prompt changes
  useEffect(() => {
    if (prompt) {
      setPromptData((prev) => ({
        ...prev,
        id: prompt.id || "",
        temperature:
          prompt.temperature?.toString() || prev.temperature || "0.7",
        roleDefinition: prompt.roleDefinition || "",
        userContext: prompt.userContext || "",
        guidelines: prompt.guidelines || "",
        instructions: prompt.instructions || "",
        keyPointers: prompt.keyPointers || "",
        responseLimitations: prompt.responseLimitations || "",
      }));
    }
  }, [prompt]);

  // Update the backend with the latest temperature value
  const handleUpdateTemperature = () => {
    const temperatureValue = parseFloat(promptData.temperature);
    if (!validateTemperature(promptData.temperature)) {
      toast({
        title: "Validation Error",
        description: "Temperature must be between 0.3 and 0.9",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      updatePromptToDB({
        ...promptData,
        temperature: temperatureValue,
      }),
    );

    toast({
      title: "Saved",
      description: "Temperature updated successfully",
      variant: "default",
      duration: 3000,
    });
  };

  const handleEdit = async (field: keyof typeof enableEdit) => {
    try {
      if (
        field === "temperature" &&
        !validateTemperature(promptData.temperature)
      ) {
        toast({
          title: "Validation Error",
          description: "Temperature must be between 0.3 and 0.9",
          variant: "destructive",
        });
        return;
      }

      dispatch(
        setPrompt({
          ...promptData,
          temperature: parseFloat(promptData.temperature),
          createdAt: "",
          updatedAt: "",
        }),
      );

      await dispatch(
        updatePromptToDB({
          ...promptData,
          temperature: parseFloat(promptData.temperature),
        }),
      );

      toast({
        title: `Saved`,
        description: `${field} updated successfully`,
        variant: "default",
        duration: 3000,
      });

      setEnableEdit((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error("Error updating prompt: ", error);
      toast({
        title: "Update Failed",
        description:
          "An error occurred while saving changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const validateTemperature = (value: string): boolean => {
    const temp = parseFloat(value);
    return !isNaN(temp) && temp >= 0.3 && temp <= 0.9;
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="spinner"></div> {/* Add spinner styles */}
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center px-4 ${
        showPromptModal ? "overflow-hidden" : ""
      }`}
      role="dialog"
      aria-labelledby="prompt-modal-title"
      aria-hidden={!showPromptModal}
    >
      <div className="flex h-[70vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border/40 bg-backgroundSecondary p-6 shadow-2xl">
        {/* Header */}
        <h1
          id="prompt-modal-title"
          className="mb-4 text-center text-2xl font-bold"
        >
          System Prompt
        </h1>

        {/* Scrollable Content */}
        <div className="flex-grow space-y-4 overflow-y-auto p-4">
          {/* Temperature Slider */}
          <div className="flex w-full flex-col items-center">
            <div className="mx-auto flex w-full flex-row items-center justify-center space-x-3">
              <span>Less Creative</span>
              <div className="relative w-[60%]">
                <Slider
                  className="z-50 w-full border-foreground/40"
                  sliderClassName="bg-foreground/40"
                  value={[parseFloat(promptData.temperature) || 0.7]}
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
                />
                {/* Markers */}
                <div className="absolute left-0 right-0 top-3">
                  {[0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((val) => {
                    const leftPercent = ((val - 0.292) / (0.904 - 0.285)) * 100;
                    return (
                      <div
                        key={val}
                        className="absolute"
                        style={{ left: `${leftPercent}%` }}
                      >
                        <div className="h-2 w-px bg-foreground" />
                        <span className="absolute left-1/2 -translate-x-1/2 transform text-xs">
                          {val}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <span>More Creative</span>
            </div>

            <Button
              variant="outline"
              className="mt-10 rounded"
              onClick={handleUpdateTemperature}
            >
              Update Temperature:
              <span className="ml-1 font-semibold">
                {promptData.temperature}
              </span>
            </Button>
          </div>
          {/* Editable Fields */}
          <EditableField
            label="Role Definition"
            value={promptData.roleDefinition}
            editable={enableEdit.roleDefinition}
            onToggleEdit={() =>
              setEnableEdit((prev) => ({ ...prev, roleDefinition: true }))
            }
            onSave={() => handleEdit("roleDefinition")}
            onChange={(value) =>
              setPromptData((prev) => ({ ...prev, roleDefinition: value }))
            }
          />
          {/* Additional Editable Fields */}
          <EditableField
            label="User Context"
            value={promptData.userContext}
            editable={enableEdit.userContext}
            onToggleEdit={() =>
              setEnableEdit((prev) => ({ ...prev, userContext: true }))
            }
            onSave={() => handleEdit("userContext")}
            onChange={(value) =>
              setPromptData((prev) => ({ ...prev, userContext: value }))
            }
          />
          <EditableField
            label="Guidelines"
            value={promptData.guidelines}
            editable={enableEdit.guidelines}
            onToggleEdit={() =>
              setEnableEdit((prev) => ({ ...prev, guidelines: true }))
            }
            onSave={() => handleEdit("guidelines")}
            onChange={(value) =>
              setPromptData((prev) => ({ ...prev, guidelines: value }))
            }
          />
          <EditableField
            label="Instructions"
            value={promptData.instructions}
            editable={enableEdit.instructions}
            onToggleEdit={() =>
              setEnableEdit((prev) => ({ ...prev, instructions: true }))
            }
            onSave={() => handleEdit("instructions")}
            onChange={(value) =>
              setPromptData((prev) => ({ ...prev, instructions: value }))
            }
          />
          <EditableField
            label="Key Pointers"
            value={promptData.keyPointers}
            editable={enableEdit.keyPointers}
            onToggleEdit={() =>
              setEnableEdit((prev) => ({ ...prev, keyPointers: true }))
            }
            onSave={() => handleEdit("keyPointers")}
            onChange={(value) =>
              setPromptData((prev) => ({ ...prev, keyPointers: value }))
            }
          />
          <EditableField
            label="Response Limitations"
            value={promptData.responseLimitations}
            editable={enableEdit.responseLimitations}
            onToggleEdit={() =>
              setEnableEdit((prev) => ({
                ...prev,
                responseLimitations: true,
              }))
            }
            onSave={() => handleEdit("responseLimitations")}
            onChange={(value) =>
              setPromptData((prev) => ({
                ...prev,
                responseLimitations: value,
              }))
            }
          />
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            className="w-[150px]"
            onClick={handlePromptModalClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
