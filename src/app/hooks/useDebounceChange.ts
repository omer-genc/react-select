const useDebounceChange = <T>(cb: (value: T) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  
  return (value: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(value);
    }, delay);
  };
};

export default useDebounceChange;
