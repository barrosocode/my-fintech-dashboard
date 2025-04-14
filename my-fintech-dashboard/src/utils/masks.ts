export function moneyMask(value: string): string {
    // Remove tudo que não é número
    const cleaned = value.replace(/\D/g, "");

    // Limita a 10 dígitos no total (incluindo centavos)
    const limited = cleaned.slice(0, 10);

    // Converte para número e divide por 100 para centavos
    const numericValue = Number(limited) / 100;

    // Formata no padrão brasileiro
    return numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function parseCurrency(formattedValue: string): number {
    if (!formattedValue) return 0;

    // Remove tudo que não é número ou vírgula
    const cleaned = formattedValue
        .replace(/\s/g, "") // Remove espaços
        .replace(/[R$]/g, "") // Remove símbolo de real
        .replace(/\./g, "") // Remove pontos dos milhares
        .replace(/,/g, "."); // Troca vírgula por ponto decimal

    return parseFloat(cleaned);
}

export function formatCurrencyFromNumber(value: number | string): string {
    if (value === null || value === undefined || isNaN(Number(value))) return "R$ 0,00";

    const number = typeof value === "string" ? parseFloat(value) : value;

    return number.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
