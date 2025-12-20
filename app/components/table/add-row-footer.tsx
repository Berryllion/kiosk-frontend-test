import { useContext, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { Button, HStack, Table as ChakraTable } from "@chakra-ui/react";
import Select from "../select";
import { AddRowTableContext } from "./add-row-context";
import { toaster } from "../toaster";

export interface AddRowFooterProps {
  options: Array<{ id: string; name: string }>;
}

function AddRowFooter({ options }: AddRowFooterProps) {
  const [rowToAdd, setRowToAdd] = useState<string>(options[0].id);

  const addRowContext = useContext(AddRowTableContext);

  const handleAddRow = () => {
    const rowAlreadyExists =
      addRowContext?.selectedRows &&
      addRowContext.selectedRows.findIndex((row) => row === rowToAdd) !== -1;

    if (rowAlreadyExists) {
      toaster.create({
        description: "Déjà ajouté.",
        type: "error",
        closable: true,
      });
    } else {
      addRowContext?.onAddRow(rowToAdd);
    }
  };

  return (
    <ChakraTable.Row>
      <ChakraTable.Cell colSpan={100}>
        <HStack>
          <Select
            onChange={setRowToAdd}
            options={options}
            defaultValue={options[0].id}
          />
          <Button
            onClick={handleAddRow}
            colorPalette="blue"
            variant="subtle"
            disabled={!rowToAdd}
          >
            <LuPlus />
            {addRowContext?.addButtonText}
          </Button>
        </HStack>
      </ChakraTable.Cell>
    </ChakraTable.Row>
  );
}

export default AddRowFooter;
