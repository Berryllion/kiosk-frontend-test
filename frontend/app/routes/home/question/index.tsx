import {
  type FormQuestion as FormQuestionType,
  type TableQuestion,
} from "~/domain/csrd-form/Question";
import QuestionTitle from "./question-title";
import Table from "~/components/table";
import GlobalEmployees from "./global-employees";
import EmployeesByCountry from "./employees-by-country";
import EmployeesByContractAndGender from "./employees-by-contract-and-gender";
import EmployeesByRegion from "./employees-by-region";
import EmployeesByCategory from "./employees-by-category";
import Select from "~/components/select";
import TextArea from "~/components/text-area";
import React from "react";

function questionToTable(tableProps: TableQuestion) {
  switch (tableProps.id) {
    case "S1-6_01":
      return <GlobalEmployees {...tableProps} />;
    case "S1-6_04":
      return <EmployeesByCountry {...tableProps} />;
    case "S1-6_07":
      return <EmployeesByContractAndGender {...tableProps} />;
    case "S1-6_08":
      return <EmployeesByRegion {...tableProps} />;
    case "S1-6_18":
      return <EmployeesByCategory {...tableProps} />;
    default:
      return (
        <Table
          title={<QuestionTitle id={tableProps.id} label={tableProps.label} />}
          columnNumber={1}
        />
      );
  }
}

function relatedQuestionToInput({
  type,
  id,
  label,
  enumValues,
}: FormQuestionType) {
  let input = null;

  if (type === "enum" && enumValues && enumValues.length) {
    const options = enumValues.map((value) => ({
      id: value,
      name: value,
    }));

    input = <Select name={id} options={options} />;
  } else if (type === "text") {
    input = <TextArea name={id} />;
  }

  return (
    <>
      <QuestionTitle isRelatedQuestion id={id} label={label} />
      {input}
    </>
  );
}

function FormQuestion({
  type,
  id,
  label,
  unit,
  relatedQuestions,
}: FormQuestionType) {
  if (type === "table") {
    return questionToTable({
      id,
      label,
      unit,
      relatedQuestions,
    });
  }

  const relatedQuestionsList = (relatedQuestions || []).map(
    (relatedQuestion) => (
      <React.Fragment key={relatedQuestion.id}>
        {relatedQuestionToInput({
          type: relatedQuestion.type,
          id: relatedQuestion.id,
          label: relatedQuestion.labelFr,
          unit: relatedQuestion.unit,
          enumValues: relatedQuestion?.enumValues?.fr,
        })}
      </React.Fragment>
    ),
  );

  return (
    <>
      <QuestionTitle id={id} label={label} />
      {relatedQuestionsList}
    </>
  );
}

export default FormQuestion;
