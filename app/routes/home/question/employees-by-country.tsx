import { Table as ChakraTable } from "@chakra-ui/react";
import type { TableQuestion } from "~/domain/csrd-form/Question";
import { useState } from "react";
import React from "react";
import NumberInput from "~/components/number-input";
import Table from "~/components/table";
import QuestionTitle from "./question-title";

const countryList: { [key: string]: string } = {
  fra: "France",
  deu: "Allemagne",
  esp: "Espagne",
};

function EmployeesByCountry({
  id,
  label,
  relatedQuestions,
  unit,
}: TableQuestion) {
  const [selectedCountries, setSelectedCountries] = useState<Array<string>>([
    "fra",
  ]);

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

  const body = selectedCountries.map((countryCode) => (
    <React.Fragment key={`table-${relatedQuestions}-row-${countryCode}`}>
      <ChakraTable.Row>
        <ChakraTable.Cell rowSpan={2}>
          {countryList[countryCode]}
        </ChakraTable.Cell>
        {rowsByCountry(countryCode)[0]}
      </ChakraTable.Row>
      <ChakraTable.Row>{rowsByCountry(countryCode)[1]}</ChakraTable.Row>
    </React.Fragment>
  ));

  const countryOptions = Object.entries(countryList).map(([key, value]) => ({
    id: key,
    name: value,
  }));

  const addRowFooter = {
    addButtonText: "Ajouter pays",
    options: countryOptions,
    selectedRows: selectedCountries,
    onAddRow: (value: string) =>
      setSelectedCountries((previous) => [...previous, value]),
  };

  return (
    <Table
      title={<QuestionTitle id={id} label={label} />}
      body={body}
      columnNumber={3}
      columnsSize={["10%", "80%"]}
      isEmpty={selectedCountries.length === 0}
      addRowFooter={addRowFooter}
    />
  );
}

export default EmployeesByCountry;
