import React from "react";

interface FormattedTextProps {
  text: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  const formatSipeText = (inputText: string): string => {
    inputText = inputText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    const lines: string[] = inputText.split("\n").map((line) => {
      const match = line.match(/^(\d+)\.\s*(.*)$/);
      if (match) {
        return `<li style="display: flex;  margin-left: 8px; margin-top: 10px;margin-bottom: 10px;"><span style="margin-right: 8px;">${match[1]}.</span><span style="flex: 1; ">${match[2]}</span></li>`;
      }
      return line; // Return the line unchanged if it doesn't start with a number
    });

    return lines.join("");
  };

  const htmlContent = formatSipeText(text);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default FormattedText;
