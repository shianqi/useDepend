import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import useDepend, { Config } from "../src";

const config: Config = {
  select1: {
    getValue: ({ value }) => value,
  },
  select2: {
    depend: ["select1"],
    getValue: ({ value, dependsValues: [select1Value] }) => {
      return {
        ...value,
        show: select1Value.value,
      };
    },
  },
  select3: {
    depend: ["select1"],
    getValue: ({ value }) => value,
  },
};

const Hidden: React.FC = () => {
  const [selectOptions, setValue] = useDepend(config, {
    select1: { options: [true, false], value: false },
    select2: {
      options: [1, 2, 3, 4, 5],
      show: false,
    },
    select3: {},
  });

  console.log(selectOptions);
  console.log(selectOptions.select1.value);

  return (
    <div>
      <Select
        value={selectOptions.select1.value}
        onChange={(e) => {
          setValue({
            select1: { ...selectOptions.select1, value: e.target.value },
          });
        }}
      >
        {selectOptions.select1.options.map((item) => (
          <MenuItem value={item}>{item ? "显示" : "隐藏"}</MenuItem>
        ))}
      </Select>
      <Select
        value={selectOptions.select2.value}
        disabled={!selectOptions.select2.show}
        onChange={(e) => {
          setValue({
            select2: { ...selectOptions.select2, value: e.target.value },
          });
        }}
      >
        {selectOptions.select2.options.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Hidden;
