import { Popover } from '@/app/lib/popover';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import type { SelectProps, SelectOption } from './types';

const Select: React.FC<SelectProps> = ({
  items = [],
  onChange,
  selectedItems,
  onSearch,
  renderLabel,
  renderFallback,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onSearch) {
        onSearch(e.target.value);
      }

      setQuery(e.target.value);
    },
    [onSearch]
  );

  const filteredItems = useMemo(() => {
    const datas: SelectOption[] = [];

    if (!query) {
      return items;
    }

    if (onSearch) {
      for (const item of items) {
        datas.push(item);
      }
    }

    for (const item of items) {
      if (item.label.includes(query)) {
        datas.push(item);
      }
    }

    return datas;
  }, [onSearch, items, query]);

  const renderMatch = (label: string) => {
    return label.replace(query, `<span class="font-bold">${query}</span>`);
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="flex gap-4 flex-wrap border-2 border-gray-500 rounded-md p-2">
          {selectedItems.map((x) => (
            <button
              key={x.value}
              onClick={() => onChange(x)}
              className="flex items-center gap-2 bg-gray-300 py-1 px-2 rounded-md text-nowrap"
            >
              <span>{x.label}</span>
              <span className="block text-2xl bg-gray-400 rounded-md text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </span>
            </button>
          ))}

          <input
            type="text"
            placeholder="Search..."
            className="outline-none h-8 bg-transparent p-2"
            onChange={handleSearch}
          />
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="bg-white w-full max-h-64 overflow-auto border-2 border-gray-400 rounded-md">
          {renderFallback ? renderFallback() : null}
          {filteredItems.map((item) => (
            <div
              key={item.value}
              className="w-full flex items-center border-b-2 border-gray-400 last:border-0 relative py-2 px-4 gap-4"
            >
              <input
                id={item.value.toString()}
                checked={selectedItems.some((x) => x.value === item.value)}
                onChange={() => onChange(item)}
                type="checkbox"
              />
              {item.value}
              {renderLabel ? (
                renderLabel(item)
              ) : (
                <label
                  dangerouslySetInnerHTML={{
                    __html: renderMatch(item.label),
                  }}
                  htmlFor={item.value.toString()}
                />
              )}
            </div>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default Select;
