import { NativeSelect as ChakraSelect } from "@chakra-ui/react";
import { useMemo, type ChangeEvent } from "react";

interface SelectProps {
  defaultValue?: string;
  options: Array<{ id: string; name: string }>;
  onChange?: (value: string) => void;
  name?: string;
}

function Select({ defaultValue, options, onChange, name }: SelectProps) {
  const items = useMemo(
    () =>
      options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      )),
    [options],
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    console.log("value", value);
    onChange?.(value);
  };

  return (
    <ChakraSelect.Root>
      <ChakraSelect.Field
        name={name}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {items}
      </ChakraSelect.Field>
      <ChakraSelect.Indicator />
    </ChakraSelect.Root>
  );
}

export default Select;
