export type Item = {
  label: string;
  value: string | number;
  data?: any;
};

export type ContextProps = {
  state: {
    items: Item[];
    selectedItems: Item[];
    search?: string;
  };
  event: {
    onChange: (item: Item) => void;
    setSearch: (search: string) => void;
    onSearch?: (search: string) => void;
  };
};

export type Props = {
  children: React.ReactNode;
  value: ContextProps;
};