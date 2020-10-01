import { useState } from "react";

export type getValueType = (option: {
  value: any;
  preValue: any;
  targetValue: any;

  dependsValue: any[];
}) => any;

export interface Config {
  [key: string]: {
    depend?: string[];
    getValue: getValueType;
  };
}

export interface InitState {
  [key: string]: any;
}

export interface ValueType {
  [key: string]: any;
}

const useOptions: (
  options: Config,
  initState: InitState
) => [ValueType, (value: any) => void] = (options, initState) => {
  const [{ values, targetValues, preValues }, setValue] = useState({
    values: initState,
    targetValues: initState,
    preValues: initState,
  });

  const cache = {};
  const tryGetValues = new Set();

  const getValueByDepends = (key: string) => {
    if (tryGetValues.has(key)) {
      throw new Error("Dependent reference cycle");
    }
    tryGetValues.add(key);

    const { getValue, depend = [] } = options[key];
    const dependsValues = depend.map((dependKey) => {
      if (cache[dependKey]) {
        return cache[dependKey] || values[dependKey];
      }
      // 循环依赖获取初始值
      if (tryGetValues.has(key)) {
        return targetValues[dependKey] || values[dependKey];
      }
      return getValueByDepends(dependKey);
    });

    const valueRes = getValue({
      value: values[key],
      preValue: preValues[key],
      targetValue: targetValues[key],
      dependsValue: dependsValues,
    });

    cache[key] = valueRes;
    tryGetValues.delete(key);
    return valueRes;
  };

  const result = Object.keys(options).reduce(
    (obj, key) => ({ ...obj, [key]: getValueByDepends(key) }),
    {}
  );

  const updateValue = (newTargetvalue: any) => {
    setValue({
      values: { ...result, ...newTargetvalue },
      targetValues: newTargetvalue,
      preValues: values,
    });
  };

  return [result, updateValue];
};

export default useOptions;
