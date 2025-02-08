export const regexAmount = /^\d{1,}(\.\d{0,18})?$/;
export const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>, setAmount: (amount: string) => void) => {
  const valueParsed = e.target.value.replace(/,$/g, '.');
  if (valueParsed === '' || regexAmount.test(valueParsed)) {
    setAmount(valueParsed);
  }
};
