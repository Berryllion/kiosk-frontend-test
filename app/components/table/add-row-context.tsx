import { createContext } from "react";

export type AddRowTableContextType = {
  addButtonText: string;
  options?: Array<{ id: string; name: string }>;
  selectedRows: Array<string>;
  onAddRow: (value: string) => void;
} | null;

export const AddRowTableContext = createContext<AddRowTableContextType>(null);
