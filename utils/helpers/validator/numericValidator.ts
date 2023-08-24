const numericValidator = (v: string) =>
  !isNaN(Number(v)) || "Your passcode should be numeric.";

export { numericValidator };
