import { Select } from "antd";
import { Raw } from "../types";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "vlaue" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOption?: string;
  options?: { name: string; id: number }[];
}

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOption, options = [], ...restProps } = props;

  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOption ? (
        <Select.Option value={0}>{defaultOption}</Select.Option>
      ) : null}
      {options.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown): number =>
  isNaN(Number(value)) ? 0 : Number(value);
