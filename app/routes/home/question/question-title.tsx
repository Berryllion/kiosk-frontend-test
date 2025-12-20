import { HStack, Badge, Heading } from "@chakra-ui/react";
import type { QuestionTitle as QuestionTitleType } from "~/domain/csrd-form/QuestionTitle";

function QuestionTitle({
  id,
  label,
  isRelatedQuestion = false,
}: QuestionTitleType) {
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
