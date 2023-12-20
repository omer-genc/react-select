import { useCallback, useState } from 'react';
import Select from './Select/Select';
import { SelectOption } from './Select/types';
import useSWR from 'swr';
import service from '@/app/service';
import useDebounceChange from '@/app/hooks/useDebounceChange';

const SelectApiTest = () => {
  const [selectedItems, setSelectedItems] = useState<SelectOption[]>([]);
  const [search, setSearch] = useState<string>('');
  const handleSearch = useDebounceChange(setSearch, 500);

  const { data, isLoading, error } = useSWR(`/character?${search}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

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
  
  return (
    <Select
      items={data?.results.map((x) => ({
        label: x.name,
        value: x.id,
        data: {
          image: x.image,
          episodes: x.episode.length,
        },
      }))}
      onChange={onChange}
      selectedItems={selectedItems}
      onSearch={handleSearch}
      renderFallback={renderState}
      renderLabel={(item) => (
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
    />
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

  return res;
};
