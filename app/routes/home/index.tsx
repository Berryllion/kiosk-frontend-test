import React from "react";
import { Form as ReactRouterForm } from "react-router";
import { LuSendHorizontal } from "react-icons/lu";
import { Button, VStack } from "@chakra-ui/react";
import { CSRDFormService } from "~/application/services/CSRDFormService";
import type { Question } from "~/domain/csrd-form/Question";
import type { DisclosureRequirement } from "~/domain/csrd-form/DisclosureRequirement";
import type { Route } from "../../+types/root";
import Header from "./header";
import FormQuestion from "./question";
import { toaster } from "~/components/toaster";

export async function loader() {
  const formService = new CSRDFormService();
  const requirements = formService.getDisclosureRequirement();

  return requirements;
}

export async function action({ request }: Route.ClientActionArgs) {
  const formService = new CSRDFormService();
  const formData = await request.formData();

  const answers = formService.formDataToQuestionAnswerDTO(formData);

  const result = await formService.saveAnswers(answers).catch((error) => {
    return error;
  });

  return result;
}

export default function CSRDFormPage({
  loaderData,
}: {
  loaderData: DisclosureRequirement;
}) {
  const { questions } = loaderData;

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

  const formQuestions = questions.map(questionToFormQuestion);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.currentTarget.reset();

    toaster.create({
      description: "Envoyé !",
      type: "success",
      closable: true,
    });
  };

  return (
    <div style={{ width: "90vw", margin: "3rem auto", maxWidth: "60rem" }}>
      <Header />
      <main>
        <ReactRouterForm method="post" onSubmit={onSubmit}>
          <VStack alignItems="flex-start" rowGap={5}>
            {formQuestions}
            <Button type="submit">
              Envoyer
              <LuSendHorizontal />
            </Button>
          </VStack>
        </ReactRouterForm>
      </main>
    </div>
  );
}
