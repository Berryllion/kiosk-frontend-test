import { Table as ChakraTable } from "@chakra-ui/react";
import type { TableQuestion } from "~/domain/csrd-form/Question";
import { useState } from "react";
import React from "react";
import NumberInput from "~/components/number-input";
import Table from "~/components/table";
import QuestionTitle from "./question-title";

function EmployeesByRegion({
  id,
  label,
  relatedQuestions,
  unit,
}: TableQuestion) {
  const [regionList, setRegionList] = useState(["Île-de-France"]);

  const rowsByCountry = (countryCode: string) =>
    (relatedQuestions || []).map((relatedQuestion) => (
      <>
        <ChakraTable.Cell>
          <QuestionTitle
            isRelatedQuestion
            label={relatedQuestion.labelFr}
            id={relatedQuestion.id}
          />
        </ChakraTable.Cell>
        <ChakraTable.Cell maxW={100}>
          <NumberInput
            key={`input-${id}-${countryCode}-${relatedQuestion.id}`}
            name={`${relatedQuestion.id}.${countryCode}`}
            unit={unit}
          />
        </ChakraTable.Cell>
      </>
    ));

  const body = regionList.map((countryCode) => (
    <React.Fragment key={`table-${relatedQuestions}-row-${countryCode}`}>
      <ChakraTable.Row>
        <ChakraTable.Cell rowSpan={2}>{countryCode}</ChakraTable.Cell>
        {rowsByCountry(countryCode)[0]}
      </ChakraTable.Row>
      <ChakraTable.Row>{rowsByCountry(countryCode)[1]}</ChakraTable.Row>
    </React.Fragment>
  ));

  return (
    <Table
      addRowFooter
      addRowLabel="Ajouter une région"
      key={`table-${id}`}
      title={<QuestionTitle id={id} label={label} />}
      body={body}
      columnNumber={3}
      columnsSize={["10%", "80%"]}
    />
  );
}

export default EmployeesByRegion;
