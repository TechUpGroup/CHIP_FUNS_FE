export function formatAddress(address: string | undefined, first = 5, last = 4) {
  return address ? address.slice(0, first) + '...' + address.slice(-last) : '';
}
