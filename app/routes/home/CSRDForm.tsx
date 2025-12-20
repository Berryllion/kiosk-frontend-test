import React from "react";
import {
  useLoaderData,
  Form as ReactRouterForm,
  useActionData,
} from "react-router";
import type { Question } from "~/domain/csrd-form/Question";
import type { DisclosureRequirement } from "~/domain/csrd-form/DisclosureRequirement";
import FormQuestion from "./question";
import { Button, VStack } from "@chakra-ui/react";
import { LuSendHorizontal } from "react-icons/lu";

function CSRDForm() {
  const actionData = useActionData();

  const { requirements } = useLoaderData<{
    requirements: DisclosureRequirement;
  }>();

  if (!requirements) {
    return null;
  }

  const questionToFormQuestion = (question: Question) => (
    <React.Fragment key={`question-${question.id}`}>
      <FormQuestion
        type={question.type}
        id={question.id}
        label={question.labelFr}
        relatedQuestions={question.relatedQuestions}
        unit={question.unit}
      />
    </React.Fragment>
  );

  const formQuestions = requirements.questions.map(questionToFormQuestion);

  return (
    <ReactRouterForm method="post">
      <VStack alignItems="flex-start" rowGap={5}>
        {formQuestions}
        <Button type="submit">
          Envoyer
          <LuSendHorizontal />
        </Button>
      </VStack>
    </ReactRouterForm>
  );
}

export default CSRDForm;
