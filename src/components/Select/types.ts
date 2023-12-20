export type SelectOption = {
  label: string;
  value: string | number;
  data?: any;
};

export type SelectProps = {
  items?: SelectOption[];
  selectedItems: SelectOption[];
  onChange: (item: SelectOption) => void;
  onSearch?: (query: string) => void;
  renderLabel?: (item: SelectOption) => React.ReactNode;
  renderFallback?: () => React.ReactNode;
};