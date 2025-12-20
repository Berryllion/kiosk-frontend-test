import { useContext, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useDebounce } from "use-debounce";
import { Button, HStack, Table as ChakraTable, Input } from "@chakra-ui/react";
import Select from "../select";
import { AddRowTableContext } from "./add-row-context";
import { toaster } from "../toaster";

function AddRowFooter() {
  const addRowContext = useContext(AddRowTableContext);

  const options = addRowContext?.options ? addRowContext.options : null;

  const [rowToAdd, setRowToAdd] = useState<string>(
    options ? options[0].id : "",
  );

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

  const input = options ? (
    <Select
      onChange={setRowToAdd}
      options={options}
      defaultValue={options ? options[0].id : ""}
    />
  ) : (
    <Input
      placeholder="..."
      onChange={(event) => setRowToAdd(event.target.value)}
    />
  );

  return (
    <ChakraTable.Row>
      <ChakraTable.Cell colSpan={100}>
        <HStack>
          {input}
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
