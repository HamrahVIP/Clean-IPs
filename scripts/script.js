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

const result = Object.keys(cleanIPs).map((key) => ({
  ip: key,
  operators: [...new Set(cleanIPs[key])],
}));

fs.writeFileSync(
  "output.json",
  JSON.stringify(
    result.sort((a, b) => {
      return b.operators.length - a.operators.length;
    }),
    null,
    2
  )
);
