import { useMemo, useState, useCallback } from 'react';

import { Select } from '@/app/lib/select';
import type { SelectTypes } from '@/app/lib/select';

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
  const [query, setQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<SelectTypes.Item[]>([]);

  const onChange = useCallback(
    (item: SelectTypes.Item) => {
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

  const filteredItems = useMemo(() => {
    const datas: SelectTypes.Item[] = [];

    if (!query) {
      return items;
    }

    for (const item of items) {
      if (item.label.includes(query)) {
        datas.push(item);
      }
    }

    return datas;
  }, [query]);

  const value = useMemo(
    () => ({
      state: {
        selectedItems,
        items: filteredItems,
        search: query,
      },
      event: {
        onChange,
        setSearch: setQuery,
      },
    }),
    [selectedItems, query, onChange, filteredItems]
  );

  return (
    <Select.Root value={value}>
      <Select.Header>
        <Select.SelectedItems />
        <Select.Input />
      </Select.Header>
      <Select.Body>
        <Select.Options />
      </Select.Body>
    </Select.Root>
  );
};

export default SelectTestBase;
