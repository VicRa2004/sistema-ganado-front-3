import { Search, X } from "lucide-react";
import { Button } from "@/ui/components/ui/button";
import { Input } from "@/ui/components/ui/input";
import { Label } from "@/ui/components/ui/label";

interface SelectionInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onOpen: () => void;
  onClear: () => void;
}

export const SelectionInput = ({
  label,
  placeholder = "Seleccionar...",
  value,
  onOpen,
  onClear,
}: SelectionInputProps) => {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <div className="relative w-full">
          <Input
            readOnly
            value={value || ""}
            placeholder={placeholder}
            className="pr-8 cursor-pointer bg-muted/50 focus-visible:ring-0"
            onClick={onOpen}
          />
          {value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="absolute right-2 top-2.5 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="button" variant="secondary" onClick={onOpen}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
