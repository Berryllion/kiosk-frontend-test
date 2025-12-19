import { HStack, Badge, Heading } from "@chakra-ui/react";
import type { TitleQuestion } from "~/domain/csrd-form/Question";

function QuestionTitle({
  id,
  label,
  isRelatedQuestion = false,
}: TitleQuestion) {
  const headingSize = isRelatedQuestion ? "sm" : "lg";
  const badgeSize = isRelatedQuestion ? "xs" : "sm";

  return (
    <HStack>
      <Heading size={headingSize}>{label}</Heading>
      <Badge size={badgeSize}>{id}</Badge>
    </HStack>
  );
}

export default QuestionTitle;
