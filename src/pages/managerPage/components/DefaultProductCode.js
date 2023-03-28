function defaultProductCode({ code, setValue }) {
  code === "racket"
    ? setValue("code", "p-a-")
    : code === "shoe"
    ? setValue("code", "p-b-")
    : code === "shirt"
    ? setValue("code", "p-c-")
    : code === "shorts"
    ? setValue("code", "p-d-")
    : code === "sportDress"
    ? setValue("code", "p-e-")
    : code === "accessory"
    ? setValue("code", "p-f-")
    : setValue("code", "");
}

export default defaultProductCode;
