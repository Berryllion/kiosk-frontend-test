import { type ReactNode } from "react";
import { Table as ChakraTable, Text } from "@chakra-ui/react";
import AddRowFooter from "./add-row-footer";
import {
  AddRowTableContext,
  type AddRowTableContextType,
} from "./add-row-context";

interface TableProps {
  title: ReactNode;
  columnNumber?: number;
  body?: ReactNode;
  addRowFooter?: AddRowTableContextType;
  columnsSize?: Array<string>;
  isEmpty?: boolean;
}

function Table({
  title,
  columnNumber = 1,
  body,
  addRowFooter,
  columnsSize,
  isEmpty = false,
  ...props
}: TableProps) {
  const columnSizing = columnsSize?.length ? (
    <ChakraTable.ColumnGroup>
      {columnsSize.map((size, index) => (
        // TODO: replace index in key
        <ChakraTable.Column
          key={`table-column-sizing-${index}`}
          htmlWidth={size !== "" ? size : undefined}
        />
      ))}

      <ChakraTable.Column htmlWidth="40%" />
      <ChakraTable.Column />
    </ChakraTable.ColumnGroup>
  ) : null;

  const tableHeader = (
    <ChakraTable.Row>
      <ChakraTable.ColumnHeader colSpan={columnNumber}>
        {title}
      </ChakraTable.ColumnHeader>
    </ChakraTable.Row>
  );

  const emptyBody = (
    <ChakraTable.Row>
      <ChakraTable.Cell textAlign="center" colSpan={100}>
        <Text textStyle="xs" color="grey">
          Veuillez ajouter des données.
        </Text>
      </ChakraTable.Cell>
    </ChakraTable.Row>
  );

  const footer = addRowFooter ? (
    <ChakraTable.Footer>
      <AddRowFooter {...addRowFooter} />
    </ChakraTable.Footer>
  ) : null;

  return (
    <AddRowTableContext.Provider value={addRowFooter || null}>
      <ChakraTable.Root {...props} showColumnBorder size="sm" variant="outline">
        {columnSizing}
        <ChakraTable.Header>{tableHeader}</ChakraTable.Header>
        <ChakraTable.Body>
          {isEmpty || !body ? emptyBody : body}
        </ChakraTable.Body>
        {footer}
      </ChakraTable.Root>
    </AddRowTableContext.Provider>
  );
}

export default Table;
