import { useState } from "react";

export interface Config {
  [key: string]: {
    depend?: string[];
    value: (value: any, dependValue: any[]) => any;
  };
}

export interface InitState {
  [key: string]: any;
}

const useOptions = (options: Config, initState: InitState) => {
  const [preValue, setPreValue] = useState(initState);

  const cache = {};
  const getValue = (key: string) => {
    const { value: getValueFunc, depend = [] } = options[key];
    const dependsValue = depend.map((dependKey) => {
      if (cache[dependKey]) {
        return cache[dependKey];
      }
      return getValue(dependKey);
    });
    const valueRes = getValueFunc(preValue[key], dependsValue);
    cache[key] = valueRes;
    return valueRes;
  };

  const value = Object.keys(options).reduce(
    (obj, key) => ({ ...obj, [key]: getValue(key) }),
    {}
  );

  return [value, setPreValue];
};

export default useOptions;
