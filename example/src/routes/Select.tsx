import {
  Select,
  SelectItem,
  SelectItemProps,
  SelectProps,
  SelectItemGroup,
} from "@mosheduminer/carbon-solid";

const options: {
  select: Partial<SelectProps>;
  SelectItemGroup: SelectItemProps;
} = {
  select: {
    light: undefined,
    inline: undefined,
    size: undefined,
    disabled: undefined,
    hideLabel: undefined,
    invalid: undefined,
    invalidText: "A valid value is required",
    labelText: "Select",
    helperText: "Optional helper text.",
    warn: undefined,
    warnText: "This will overwrite your current settings",
  },
  SelectItemGroup: {
    disabled: undefined,
  },
};

export default function () {
  return (
    <div style={{ width: 400 }}>
      <Select id="select-1" {...options.select}>
        <SelectItem
          selected
          hidden
          value="placeholder-item"
          text="Choose an option"
        />
        <SelectItemGroup label="Category 1" {...options.SelectItemGroup}>
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </SelectItemGroup>
        <SelectItemGroup label="Category 2">
          <SelectItem value="option-3" text="Option 3" />
          <SelectItem value="option-4" text="Option 4" />
        </SelectItemGroup>
      </Select>
    </div>
  );
}
