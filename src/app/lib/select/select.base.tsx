import { ChangeEvent, useCallback } from 'react';
import { Popover } from '../popover';

import type { Item, Props } from './select.types';
import { useSelectContext, Context } from './select.context';

export const Root: React.FC<Props> = ({ children, value }) => {
  return (
    <Context.Provider value={value}>
      <Popover.Root>{children}</Popover.Root>
    </Context.Provider>
  );
};

export const Trigger = Popover.Trigger;
export const Body = Popover.Content;

export const Input = () => {
  const { onSearch, setSearch } = useSelectContext().event;

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onSearch) {
        onSearch(e.target.value);
      }
      setSearch(e.target.value);
    },
    [onSearch, setSearch]
  );

  return (
    <input
      className="w-full border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-blue-500"
      placeholder="Search..."
      onChange={handleSearch}
    />
  );
};

export const Header: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Trigger>
      <button className="flex gap-4 flex-wrap border-2 border-gray-500 rounded-md p-2">
        {children}
      </button>
    </Trigger>
  );
};

export const SelectedItems = () => {
  const { state, event } = useSelectContext();

  return (
    <>
      {state.selectedItems.map((x) => (
        <button
          key={x.value}
          onClick={() => event.onChange(x)}
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
    </>
  );
};

export const CheckBox: React.FC<{ item: Item }> = ({ item }) => {
  const { state, event } = useSelectContext();
  const { selectedItems } = state;
  const { onChange } = event;

  const checked = selectedItems.some((x) => x.value === item.value);

  return (
    <input
      type="checkbox"
      className="mr-2"
      checked={checked}
      onChange={() => onChange(item)}
    />
  );
};

export const Option: React.FC<{ item: Item }> = ({ item }) => {
  const { state, event } = useSelectContext();
  const renderMatch = (label: string) => {
    if (!state.search) return label;

    return label.replace(
      state.search,
      `<span class="font-bold">${state.search}</span>`
    );
  };
  return (
    <button
      onClick={() => event.onChange(item)}
      className="w-full flex items-center border-b-2 border-gray-400 last:border-0 relative py-2 px-4 gap-4"
    >
      <div className="w-full flex items-center border-b-2 border-gray-400 last:border-0 relative py-2 px-4 gap-4">
        <CheckBox item={item} />
        <span dangerouslySetInnerHTML={{ __html: renderMatch(item.label) }} />
      </div>
    </button>
  );
};

export const Options: React.FC = () => {
  const { state } = useSelectContext();
  return (
    <div className="bg-white w-full max-h-64 overflow-auto border-2 border-gray-400 rounded-md">
      {state.items.map((x) => (
        <Option item={x} key={x.value} />
      ))}
    </div>
  );
};
