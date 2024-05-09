export const jsonSerialize = (param) => {
  return JSON.parse(
    JSON.stringify(
      param,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );
};
