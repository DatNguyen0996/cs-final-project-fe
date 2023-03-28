function defaultProductCode({ code, setValue }) {
  code === "racket"
    ? setValue("productCode", "p-a-")
    : code === "shoe"
    ? setValue("productCode", "p-b-")
    : code === "shirt"
    ? setValue("productCode", "p-c-")
    : code === "shorts"
    ? setValue("productCode", "p-d-")
    : code === "sportDress"
    ? setValue("productCode", "p-e-")
    : code === "accessory"
    ? setValue("productCode", "p-f-")
    : setValue("productCode", "");
}

export default defaultProductCode;
