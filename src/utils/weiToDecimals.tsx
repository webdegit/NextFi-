export const weiToDecimals = (weiValue: bigint | undefined) => {
  const decimals = 18;
  const weiToDecimals = weiValue ? Number(weiValue) / decimals : 0;
  return Number(Number(weiToDecimals)?.toFixed(3));
};
