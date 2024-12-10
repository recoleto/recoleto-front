export function telNumberMask(telNumber: string): string {
  const telNumberMasked = telNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  return telNumberMasked;
}