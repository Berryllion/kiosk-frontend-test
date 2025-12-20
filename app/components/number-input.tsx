import { useRef, useState } from "react";
import { NumberInput as ChakraNumberInput } from "@chakra-ui/react";
import type { UnitType } from "~/domain/csrd-form/Question";

interface NumberInputProps {
  unit: UnitType;
  min?: number;
  max?: number;
  name: string;
  required?: boolean;
}

function NumberInput({
  unit,
  min = 0,
  max,
  name,
  required = true,
  ...props
}: NumberInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("0");
  const isPercentage = unit === "%";

  return (
    <ChakraNumberInput.Root
      {...props}
      size="sm"
      formatOptions={{
        style: isPercentage ? "percent" : "decimal",
      }}
      value={value}
      onValueChange={(event) => setValue(event.value)}
      invalid={value === ""}
    >
      <ChakraNumberInput.Control />
      <ChakraNumberInput.Input
        ref={ref}
        min={min}
        max={max}
        name={name}
        required={required}
      />
    </ChakraNumberInput.Root>
  );
}

export default NumberInput;
