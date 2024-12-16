import { Textarea } from "../ui/textarea";
import { IconEdit } from "../ui/icons";
import { Button } from "../ui/button";

interface EditableFieldProps {
  label: string;
  value: string;
  purpose?: string;
  placeholder?: string;
  editable: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  onChange: (value: string) => void;
}

export function EditableField({
  label,
  value,
  purpose,
  editable,
  placeholder = "Not set",
  onToggleEdit,
  onSave,
  onChange,
}: EditableFieldProps) {
  return (
    <div className="group flex flex-col space-y-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold">{label}</h1>
          <p>{purpose}</p>
        </div>
        {editable ? (
          <div className="space-x-1">
            <Button variant="outline" onClick={onToggleEdit} size="sm">
              Peruuta
            </Button>
            <Button variant="outline" onClick={onSave} size="sm">
              Tallenna
            </Button>
          </div>
        ) : (
          <IconEdit
            className="size-5 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
            onClick={onToggleEdit}
          />
        )}
      </div>
      {editable ? (
        <Textarea
          className="resize-none overflow-hidden border border-border/20 p-2 text-sm focus:border-border/40 focus-visible:ring-0"
          value={value}
          onChange={(e) => {
            onChange(e.target.value); // Update the value
            e.target.style.height = "auto"; // Reset height
            e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
          }}
          placeholder={placeholder}
          rows={1}
          ref={(textarea) => {
            if (textarea) {
              textarea.style.height = "auto"; // Reset the height
              textarea.style.height = `${textarea.scrollHeight}px`; // Set the height based on content
            }
          }}
        />
      ) : (
        <div className="mt-1 whitespace-pre-wrap rounded-sm border border-border/20 bg-foreground/5 p-2 text-sm">
          {value || placeholder}
        </div>
      )}
    </div>
  );
}
