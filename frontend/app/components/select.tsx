import { NativeSelect as ChakraSelect } from "@chakra-ui/react";
import { useMemo } from "react";

interface SelectProps {
  name: string;
  placeholder?: string;
  label?: string;
  options: Array<{ id: string; name: string }>;
}

function Select({ name, options }: SelectProps) {
  const items = useMemo(
    () =>
      options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      )),
    [],
  );

  return (
    <ChakraSelect.Root>
      <ChakraSelect.Field name={name}>{items}</ChakraSelect.Field>
      <ChakraSelect.Indicator />
    </ChakraSelect.Root>
  );
}

export default Select;
