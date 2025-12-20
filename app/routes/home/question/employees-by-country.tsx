import { Table as ChakraTable } from "@chakra-ui/react";
import type { TableQuestion } from "~/domain/csrd-form/Question";
import { useState } from "react";
import React from "react";
import NumberInput from "~/components/number-input";
// import Select from "~/components/select";
import Table from "~/components/table";
import QuestionTitle from "./question-title";

const countryList: { [key: string]: string } = {
  FRA: "France",
  DEU: "Allemagne",
};

function EmployeesByCountry({
  id,
  label,
  relatedQuestions,
  unit,
}: TableQuestion) {
  const [selectedCountries, setSelectedCountries] = useState(["FRA", "DEU"]);

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
          {/*<Select placeholder="Sélectionner un pays" options={countries} />*/}
        </ChakraTable.Cell>
        {rowsByCountry(countryCode)[0]}
      </ChakraTable.Row>
      <ChakraTable.Row>{rowsByCountry(countryCode)[1]}</ChakraTable.Row>
    </React.Fragment>
  ));

  return (
    <Table
      addRowFooter
      addRowLabel="Ajouter un pays"
      key={`table-${id}`}
      title={<QuestionTitle id={id} label={label} />}
      body={body}
      columnNumber={3}
      columnsSize={["10%", "80%"]}
    />
  );
}

export default EmployeesByCountry;
