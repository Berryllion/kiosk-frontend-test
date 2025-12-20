import { Table as ChakraTable } from "@chakra-ui/react";
import type { TableQuestion } from "~/domain/csrd-form/Question";
import { useState } from "react";
import React from "react";
import NumberInput from "~/components/number-input";
// import Select from "~/components/select";
import Table from "~/components/table";
import QuestionTitle from "./question-title";
import type { EmployeeCategoryType } from "~/domain/csrd-form/EmployeeCategory";

const categoryList: { [key: string]: string } = {
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
          {/*<Select
              placeholder="Sélectionner une catégorie"
              options={employeeCategories}
            />*/}
          {categoryList[categoryId]}
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
    EmployeeCategoryType[]
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

  return (
    <Table
      addRowFooter
      addRowLabel="Ajouter une catégorie"
      title={<QuestionTitle id={id} label={label} />}
      body={body}
      columnNumber={3}
      columnsSize={["10%", "80%"]}
    />
  );
}

export default EmployeesByCategory;
