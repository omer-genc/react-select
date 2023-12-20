import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import { Select } from '@/app/lib/select';

import service from '@/app/service';
import useDebounceChange from '@/app/hooks/useDebounceChange';

import type {  SelectTypes } from '@/app/lib/select';

const SelectApiTest = () => {
  const [selectedItems, setSelectedItems] = useState<SelectTypes.Item[]>([]);
  const [search, setSearch] = useState<string>('');
  const onSearch = useDebounceChange(setSearch, 500);

  const { data, isLoading, error } = useSWR(`/character?${search}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    fallbackData: [],
  });

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

  const renderState = () => {
    if (isLoading) {
      return <p className="h-32 bg-red-200 w-full">Loading...</p>;
    }

    if (error) {
      return <p className="h-32 bg-red-200 w-full">Error: {error.message}</p>;
    }

    if (!data) {
      return <p className="h-32 bg-red-200 w-full">No data</p>;
    }
  };

  const renderMatch = (label: string) => {
    if (!search) {
      return label;
    }

    return label.replace(
      search,
      `<span class="font-bold text-black">${search}</span>`
    );
  };

  const value = useMemo(
    () => ({
      event: {
        onChange,
        setSearch,
        onSearch,
      },

      state: {
        selectedItems,
        items: data,
        search,
      },
    }),
    [data, onChange, onSearch, search, selectedItems]
  );
  return (
    <Select.Root value={value}>
      <Select.Header>
        <Select.SelectedItems />
        <Select.Input />
      </Select.Header>
      <Select.Body>
        {renderState()}
        <div className="bg-white w-full max-h-64 overflow-auto border-2 border-gray-400 rounded-md">
          {data.map((item) => (
            <div
              onClick={() => onChange(item)}
              key={item.value}
              className="w-full flex items-center border-b-2 border-gray-400 last:border-0 relative py-2 px-4 gap-4 text-start"
            >
              <Select.CheckBox item={item} />
              <div className="flex">
                <img
                  src={item.data.image}
                  alt={item.label}
                  className="w-8 h-8 rounded-md"
                />
                <p className="flex flex-col ml-2 text-gray-500">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderMatch(item.label),
                    }}
                  />
                  <span className="text-xs">{item.data.episodes} episodes</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Select.Body>
    </Select.Root>
  );
};

export default SelectApiTest;

const fetcher = async (url: string) => {
  const name = url.split('?')[1];
  const [res, err] = await service.character.list({
    params: {
      name,
    },
  });

  if (err) {
    throw err;
  }

  return res.results.map((x) => ({
    label: x.name,
    value: x.id,
    data: {
      image: x.image,
      episodes: x.episode.length,
    },
  }));
};

/**
 * 
 * renderLabel={(item) => (
        <div key={item.value} className="flex">
          <img
            src={item.data.image}
            alt={item.label}
            className="w-8 h-8 rounded-md"
          />
          <p className="flex flex-col">
            <span
              className="ml-2 text-gray-500"
              dangerouslySetInnerHTML={{
                __html: renderMatch(item.label),
              }}
            />
            <span className="ml-2 text-xs text-gray-500">
              {item.data.episodes} episodes
            </span>
          </p>
        </div>
      )}
 */
