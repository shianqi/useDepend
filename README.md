# React 数据依赖管理

### 目的

业务中很多情况会有复杂依赖的情况出现，一对多联动、多对一联动、多对多联动、链式联动等多种复杂联动。为了方便管理这些复杂依赖，提出此方案。

### 思路

首先将依赖树结构展开，平铺到一个 Object 中，并显式的将依赖，和上一次的值注入到 getValue 函数中，用来获取最新值。useDepend 函数会递归分析各个依赖，计算出最终的调和结果。

### Example

```javascript
import React from "react";
import useDepend, { Config } from "../src";

const config: Config = {
  radian: {
    depend: ["angle"],
    getValue: ({ targetValue, dependsValues }) =>
      targetValue != null ? targetValue : dependsValues[0] / (180 / Math.PI),
  },
  angle: {
    depend: ["radian"],
    getValue: ({ targetValue, dependsValues }) =>
      targetValue != null ? targetValue : dependsValues[0] * (180 / Math.PI),
  },
};

const App: React.FC = () => {
  const [value, setValue] = useDepend(config, {
    radian: 1,
  });

  return (
    <div>
      <label>Radian: </label>
      <input
        type="number"
        value={value.radian}
        onChange={(e) => {
          setValue({ radian: Number(e.target.value) });
        }}
      />
      <br />
      <label>Angle: </label>
      <input
        type="number"
        value={value.angle}
        onChange={(e) => {
          setValue({ angle: Number(e.target.value) });
        }}
      />
    </div>
  );
};

export default App;
```
