import React from "react";
import { marked } from "marked";

interface FormattedTextProps {
  text: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  const formatSipeText = (inputText: string): string => {
    // First, replace Markdown bold syntax with HTML <b> tags
    inputText = inputText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Split the input text by new lines and initialize variables for list handling
    let inList = false;
    const formattedLines: string[] = inputText.split("\n").map((line) => {
      const match = line.match(/^(\d+)\.\s*(.*)$/);

      if (match) {
        if (!inList) {
          inList = true; // Start of a new list
          return `<ol><li style="display: flex; margin-left: 8px; margin-top: 10px; margin-bottom: 10px;"><span style="margin-right: 8px;">${match[1]}.</span><span style="flex: 1;">${match[2]}</span></li>`;
        } else {
          // Continue the current list
          return `<li style="display: flex; margin-left: 8px; margin-top: 10px; margin-bottom: 10px;"><span style="margin-right: 8px;">${match[1]}.</span><span style="flex: 1;">${match[2]}</span></li>`;
        }
      } else {
        if (inList) {
          inList = false; // End of the list
          return `</ol>${line}`;
        }
        return line; // Normal text, not a list item
      }
    });

    if (inList) {
      formattedLines.push("</ol>"); // Close the list if it ends at the document end
    }

    return formattedLines.join("");
  };

  const htmlContent = marked(formatSipeText(text));

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default FormattedText;
