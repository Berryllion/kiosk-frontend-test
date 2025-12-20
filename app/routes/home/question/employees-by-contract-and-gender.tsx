import React, { useState } from "react";
import { Table as ChakraTable } from "@chakra-ui/react";
import type { TableQuestion } from "~/domain/csrd-form/Question";
import Table from "~/components/table";
import NumberInput from "~/components/number-input";
import type { ContractType } from "~/domain/employee/Contract";
import type { GenderType } from "~/domain/employee/Gender";
import QuestionTitle from "./question-title";

const contractList: { [key in ContractType]: string } = {
  cdi: "CDI",
  cdd: "CDD",
};

const genders: { [key in GenderType]: string } = {
  female: "Femme",
  male: "Homme",
  other: "Autre",
};

function EmployeesByContractAndGender({
  id,
  label,
  relatedQuestions,
  unit,
}: TableQuestion) {
  const [selectedContracts, setSelectedContract] = useState<Array<string>>([
    "cdi",
    "cdd",
  ]);

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
          {contractList[contractCode as ContractType]}
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

  const contractOptions = Object.entries(contractList).map(([key, value]) => ({
    id: key,
    name: value,
  }));
  const addRowFooter = {
    addButtonText: "Ajouter contrat",
    options: contractOptions,
    selectedRows: selectedContracts,
    onAddRow: (value: string) =>
      setSelectedContract((previous) => [...previous, value]),
  };

  return (
    <Table
      title={<QuestionTitle id={id} label={label} />}
      body={body}
      columnNumber={7}
      isEmpty={selectedContracts.length === 0}
      columnsSize={["10%", "60%", "10%", "10%", "10%"]}
      addRowFooter={addRowFooter}
    />
  );
}

export default EmployeesByContractAndGender;
