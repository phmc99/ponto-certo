export const isValidCpf = (cpf: string) => {
  const numbers = cpf.replace(/\D/g, '');
  if (numbers.length !== 11) {
    return false;
  }
  return true;
};
