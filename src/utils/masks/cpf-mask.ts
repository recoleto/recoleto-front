export function cpfApplyMask(cpf : string) : string {
    var cpfMasked = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return cpfMasked;
}