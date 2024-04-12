import Questionary from "@components/Questionary";
import { ThemeProvider } from "@mui/material";
import theme from "@providers/theme";

export default function QuestionaryComponent() {
  return (
    <div className="grid h-screen place-content-center">
      <Questionary />
    </div>
  );
}
