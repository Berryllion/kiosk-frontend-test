import { Table as ChakraTable } from "@chakra-ui/react";
import NumberInput from "~/components/number-input";
import Table from "~/components/table";
import type { TableQuestion } from "~/domain/csrd-form/Question";
import QuestionTitle from "./question-title";

function GlobalEmployeesTable({ id, label, relatedQuestions }: TableQuestion) {
  const body = (relatedQuestions || []).map((relatedQuestion, rowIndex) => (
    <ChakraTable.Row key={`table-${id}-body-row-${rowIndex}`}>
      <ChakraTable.Cell>
        <QuestionTitle
          isRelatedQuestion
          label={relatedQuestion.labelFr}
          id={relatedQuestion.id}
        />
      </ChakraTable.Cell>
      <ChakraTable.Cell maxW={50}>
        <NumberInput
          key={`input-${relatedQuestion.id}`}
          name={relatedQuestion.id}
          unit={relatedQuestion.unit}
        />
      </ChakraTable.Cell>
    </ChakraTable.Row>
  ));

  return (
    <Table
      title={<QuestionTitle id={id} label={label} />}
      body={body}
      columnNumber={2}
      columnsSize={["90%"]}
    />
  );
}

export default GlobalEmployeesTable;
