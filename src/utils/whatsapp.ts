export function buildWhatsAppLink(phone: string | null, vehicleName: string | null): string | null {
  if (!phone) return null;
  const text = vehicleName
    ? `Ola! Tenho interesse no veiculo ${vehicleName} que encontrei no GearGarage. Pode me passar mais informacoes?`
    : "Ola! Tenho interesse em um veiculo que encontrei no GearGarage. Pode me passar mais informacoes?";
  return `https://wa.me/55${phone}?text=${encodeURIComponent(text)}`;
}
