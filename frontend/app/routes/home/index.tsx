import { CSRDFormService } from "~/application/services/CSRDFormService";
import Header from "./header";
import CSRDForm from "./CSRDForm";
import type { Route } from "../../+types/root";

export async function loader() {
  const formService = new CSRDFormService();
  const requirements = formService.getDisclosureRequirement();

  return {
    requirements,
  };
}

export async function action({ request }: Route.ClientActionArgs) {
  const formService = new CSRDFormService();
  const formData = await request.formData();

  const answers = formService.formDataToQuestionAnswers(formData);

  return formService.saveAnswers(answers);
}

export default function CSRDFormPage() {
  return (
    <div style={{ width: "90vw", margin: "3rem auto", maxWidth: "60rem" }}>
      <Header />
      <main>
        <CSRDForm />
      </main>
    </div>
  );
}
