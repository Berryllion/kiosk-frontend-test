import React, { useState } from "react";
import { Table as ChakraTable } from "@chakra-ui/react";
import type { GenderType, TableQuestion } from "~/domain/csrd-form/Question";
import Table from "~/components/table";
import { useLoaderData } from "react-router";
import NumberInput from "~/components/number-input";
import QuestionTitle from "./question-title";

const contractList: { [key: string]: string } = {
  cdd: "CDD",
  cdi: "CDI",
};

function EmployeesByContractAndGender({
  id,
  label,
  relatedQuestions,
  unit,
}: TableQuestion) {
  const { contracts } = useLoaderData();

  const [selectedContracts, setSelectedContract] = useState(["cdd", "cdi"]);

  const genders: { [key in GenderType]: string } = {
    female: "Femme",
    male: "Homme",
    other: "Autre",
  };

  const rowsByGender = (contractCode: string) =>
    (relatedQuestions || []).map((relatedQuestion) => {
      const gendersCell = Object.keys(genders).map((genderId) => (
        <ChakraTable.Cell
          maxW={100}
          key={`table-${id}-row-${contractCode}-${genderId}`}
        >
          <NumberInput
            name={`${relatedQuestion.id}.${contractCode}.${genderId}`}
            unit={unit}
          />
        </ChakraTable.Cell>
      ));

      return (
        <React.Fragment
          key={`table-${id}-row-${contractCode}-${relatedQuestion.id}`}
        >
          <ChakraTable.Cell key={`table-${id}-row-${contractCode}-label`}>
            <QuestionTitle
              isRelatedQuestion
              label={relatedQuestion.labelFr}
              id={relatedQuestion.id}
            />
          </ChakraTable.Cell>
          {gendersCell}
        </React.Fragment>
      );
    });

  const rowsByContract = selectedContracts.map((contractCode) => (
    <React.Fragment key={`table-${id}-row-${contractCode}`}>
      <ChakraTable.Row>
        <ChakraTable.Cell rowSpan={2} width="1rem">
          {contractList[contractCode]}
        </ChakraTable.Cell>
        {rowsByGender(contractCode)[0]}
      </ChakraTable.Row>
      <ChakraTable.Row>{rowsByGender(contractCode)[1]}</ChakraTable.Row>
    </React.Fragment>
  ));

  const body = (
    <>
      <ChakraTable.Row>
        <ChakraTable.Cell />
        <ChakraTable.Cell />
        <ChakraTable.Cell colSpan={1}>{genders.female}</ChakraTable.Cell>
        <ChakraTable.Cell colSpan={1}>{genders.male}</ChakraTable.Cell>
        <ChakraTable.Cell colSpan={1}>{genders.other}</ChakraTable.Cell>
      </ChakraTable.Row>
      {rowsByContract}
    </>
  );

  return (
    <Table
      addRowFooter
      addRowLabel="Ajouter un type de contrat"
      key={`table-${id}`}
      title={<QuestionTitle id={id} label={label} />}
      body={body}
      columnNumber={7}
      columnsSize={["10%", "60%", "10%", "10%", "10%"]}
    />
  );
}

export default EmployeesByContractAndGender;
