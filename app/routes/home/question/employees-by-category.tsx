import { Table as ChakraTable } from "@chakra-ui/react";
import type { TableQuestion } from "~/domain/csrd-form/Question";
import { useState } from "react";
import React from "react";
import NumberInput from "~/components/number-input";
import QuestionTitle from "./question-title";
import Table from "~/components/table";
import type { EmployeeCategoryType } from "~/domain/employee/EmployeeCategory";

const categoryList: { [key in EmployeeCategoryType]: string } = {
  executive: "Cadre",
  employee: "Employé",
  supervisor: "Agent de maîtrise",
  technician: "Technicien",
};

function InputRow({
  id,
  relatedQuestions,
  unit,
  categoryId,
}: TableQuestion & {
  categoryId: string;
}) {
  const rowsByCategory = (categoryId: string) =>
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
            key={`input-${id}-${categoryId}-${relatedQuestion.id}`}
            name={`${relatedQuestion.id}.${categoryId}`}
            unit={unit}
          />
        </ChakraTable.Cell>
      </>
    ));

  return (
    <>
      <ChakraTable.Row>
        <ChakraTable.Cell rowSpan={2}>
          {categoryList[categoryId as EmployeeCategoryType]}
        </ChakraTable.Cell>
        {rowsByCategory(categoryId)[0]}
      </ChakraTable.Row>
      <ChakraTable.Row>{rowsByCategory(categoryId)[1]}</ChakraTable.Row>
    </>
  );
}

function EmployeesByCategory({
  id,
  label,
  relatedQuestions,
  unit,
}: TableQuestion) {
  const [selectedCategories, setSelectedCategories] = useState<
    Array<EmployeeCategoryType>
  >(["executive", "employee"]);

  const body = selectedCategories.map((categoryId) => (
    <React.Fragment key={`table-${relatedQuestions}-row-${categoryId}`}>
      <InputRow
        id={id}
        label={label}
        relatedQuestions={relatedQuestions}
        unit={unit}
        categoryId={categoryId}
      />
    </React.Fragment>
  ));

  const categoryOptions = Object.entries(categoryList).map(([key, value]) => ({
    id: key,
    name: value,
  }));

  const addRowFooter = {
    addButtonText: "Ajouter catégorie",
    options: categoryOptions,
    selectedRows: selectedCategories,
    onAddRow: (value: string) =>
      setSelectedCategories((previous) => [
        ...previous,
        value as EmployeeCategoryType,
      ]),
  };

  return (
    <Table
      title={<QuestionTitle id={id} label={label} />}
      body={body}
      columnNumber={3}
      columnsSize={["10%", "80%"]}
      isEmpty={selectedCategories.length === 0}
      addRowFooter={addRowFooter}
    />
  );
}

export default EmployeesByCategory;
