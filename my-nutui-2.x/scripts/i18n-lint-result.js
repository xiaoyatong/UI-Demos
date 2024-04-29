// 扫描文档，生成所有 lint log 的 key-value-path 表格，以 JSON 格式输出，可由在线工具转为 EXCEL

const path = require("path");
const fs = require("fs");
const filename = require("minimist")(process.argv.slice(2))["filename"];
const basePath = path.resolve(__dirname, filename);

console.log("__dirname", basePath);
// /Users/UI-Demos/my-nutui-2.x/assets/components/header.tsx
// Using Chinese characters: "圆角设置 0"                                  i18n/no-chinese-character
// 对以上数据进行 正则匹配，并提取引号内的数据

const uniqueJsonArrByField = (jsonArr, field) => {
  // 数组长度小于2 或 没有指定去重字段 或 不是json格式数据
  if (jsonArr.length < 2 || !field || typeof jsonArr[0] !== "object")
    return jsonArr;
  const uniqueArr = jsonArr.reduce(
    (all, next) =>
      all.some((item) => item[field] == next[field]) ? all : [...all, next],
    []
  );
  return uniqueArr;
};

const genarateLintLogs = () => {
  const logs = [];
  if (!fs.existsSync(basePath)) {
    console.error("文件不存在，请确保路径正确");
    return;
  }
  console.log("开始读取文件");
  const fileData = fs.readFileSync(basePath, "utf8");
  // 处理 data
  console.log("开始提取中文数据");
  // 数据结构：key、value、path
  console.log("fileData", `${fileData.split(/\r?\n/).length}行`);
  const regex = /^(\/([a-zA-Z0-9_-]+)*)*\/?([a-zA-Z0-9_-]+\.[a-zA-Z0-9]+)/i;
  const files = [];
  fileData.split(/\r?\n/).forEach((line) => {
    if (regex.test(line)) {
      files.push(line);
    } else {
      if (line.match(/[\u4e00-\u9fa5]+/g)) {
        console.log("line", line.match(/[\u4e00-\u9fa5]+/g));
        logs.push(
          Object.assign(
            {},
            {
              path: files[files.length - 1],
              value: line.match(/[\u4e00-\u9fa5]+/g).join(),
            }
          )
        );
      }
    }
  });
  console.log("共有文件数量", logs.length);
  return uniqueJsonArrByField(logs, "value");
};

const writeLintLogs = () => {
  const data = genarateLintLogs();
  const innerText = `${JSON.stringify(data, null, 2)}`;
  const logsJson = path.resolve(__dirname, `./lint-log-${Math.random()}.json`);
  fs.writeFileSync(logsJson, innerText);
};

writeLintLogs();
