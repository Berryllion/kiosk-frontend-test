import { useRef, useState } from "react";
import { Textarea as ChakraTextArea, Field } from "@chakra-ui/react";

interface TextAreaProps {
  placeholder?: string;
  name: string;
  required?: boolean;
}

function TextArea({
  name,
  placeholder,
  required = true,
  ...props
}: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const onChange = () => {
    setIsEmpty(ref.current?.value === "");
  };

  return (
    <Field.Root invalid={isEmpty}>
      <ChakraTextArea
        {...props}
        required={required}
        name={name}
        placeholder={placeholder || "..."}
        onChange={onChange}
        ref={ref}
      />
    </Field.Root>
  );
}

export default TextArea;
