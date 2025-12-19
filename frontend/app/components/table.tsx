import { Button, Center, Heading } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Table as ChakraTable } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

interface AddRowFooterProps {
  label?: string;
}

function AddRowFooter({ label }: AddRowFooterProps) {
  return (
    <ChakraTable.Row>
      <ChakraTable.Cell colSpan={1000}>
        <Center>
          <Button size="xs" colorPalette="blue" variant="ghost">
            <LuPlus />
            {label}
          </Button>
        </Center>
      </ChakraTable.Cell>
    </ChakraTable.Row>
  );
}

interface TableProps {
  title: ReactNode;
  columnNumber?: number;
  body?: ReactNode;
  addRowFooter?: boolean;
  addRowLabel?: string;
  columnsSize?: Array<string>;
}

function Table({
  title,
  columnNumber = 1,
  body,
  addRowFooter = false,
  addRowLabel,
  columnsSize,
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
      <ChakraTable.Cell>Pas de données disponibles.</ChakraTable.Cell>
    </ChakraTable.Row>
  );

  const footer = addRowFooter ? (
    <ChakraTable.Footer>
      <AddRowFooter label={addRowLabel} />
    </ChakraTable.Footer>
  ) : null;

  return (
    <ChakraTable.Root {...props} showColumnBorder size="sm" variant="outline">
      {columnSizing}
      <ChakraTable.Header>{tableHeader}</ChakraTable.Header>
      <ChakraTable.Body>{body || emptyBody}</ChakraTable.Body>
      {footer}
    </ChakraTable.Root>
  );
}

export default Table;
