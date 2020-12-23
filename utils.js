export function getFirstNumIdx(str) {
  return str.split("").findIndex(char => {
    const n = parseInt(char, 10);
    return isNumber(n) && n >= 0;
  });
}

export function isNumber(input) {
  return typeof input === "number";
}
