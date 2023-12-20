import { useCallback, useState } from 'react';
import Select from './Select/Select';
import { SelectOption } from './Select/types';

const items = [
  {
    label: 'Rick Sanchez',
    value: 'Rick Sanchez ',
  },
  {
    label: 'Rick Sanchez 2',
    value: 'Rick Sanchez 2',
  },
  {
    label: 'Rick Sanchez 8',
    value: 'Rick Sanchez 8',
  },
  {
    label: 'Rick Sanchez 3',
    value: 'Rick Sanchez 3',
  },
  {
    label: 'Rick Sanchez 4',
    value: 'Rick Sanchez 4',
  },
  {
    label: 'Rick Sanchez 5',
    value: 'Rick Sanchez 5',
  },
  {
    label: 'Rick Sanchez 6',
    value: 'Rick Sanchez 6',
  },
  {
    label: 'Rick Sanchez 7',
    value: 'Rick Sanchez 7',
  },
];

const SelectTestBase = () => {
  const [selectedItems, setSelectedItems] = useState<SelectOption[]>([]);

  const onChange = useCallback(
    (item: SelectOption) => {
      const index = selectedItems.findIndex((x) => x.value === item.value);

      if (index === -1) {
        setSelectedItems([...selectedItems, item]);
        return;
      }

      const newSelectedItems = [...selectedItems];
      newSelectedItems.splice(index, 1);
      setSelectedItems(newSelectedItems);
    },
    [selectedItems]
  );

  return (
    <Select items={items} onChange={onChange} selectedItems={selectedItems} />
  );
};

export default SelectTestBase;
