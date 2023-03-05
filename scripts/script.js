"use strict";
const fs = require("fs");
const ips = require("../ips.json");

const cleanIPs = {};

for (const item of ips) {
  if (!cleanIPs[item.ip]) {
    cleanIPs[item.ip] = [];
  }
  cleanIPs[item.ip].push(...item.operators);
}

const result = JSON.stringify(
  Object.keys(cleanIPs).map((key) => ({
    ip: key,
    operators: [...new Set(cleanIPs[key])],
  })),
  null,
  2
);

fs.writeFileSync("output.json", result);
console.log("JSON file has been saved.");
