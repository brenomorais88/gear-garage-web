export type VehicleType = "CARRO" | "MOTO" | "DESCONHECIDO";

export type PublicCatalogFilters = {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  marca?: string;
  modelo?: string;
  cidade?: string;
  estado?: string;
  tipo?: VehicleType | string;
  precoMin?: number;
  precoMax?: number;
  anoMin?: number;
  anoMax?: number;
  cambio?: string;
  combustivel?: string;
};

export type PublicCatalogItem = {
  id: string;
  titulo: string;
  marca: string | null;
  modelo: string | null;
  preco: number | null;
  anoFabricacao: number | null;
  anoModelo: number | null;
  quilometragem: number | null;
  cambio: string | null;
  combustivel: string | null;
  cidade: string | null;
  estado: string | null;
  tipo: VehicleType;
  lojaNome: string | null;
  status: string | null;
  imagemPrincipal: string | null;
};

export type PublicCatalogResult = {
  items: PublicCatalogItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type PublicStoreInfo = {
  nome: string | null;
  cidade: string | null;
  descricao: string | null;
  whatsappPublico: string | null;
  telefonePublico: string | null;
  contatoPrincipal: string | null;
};

export type PublicVehicleDetail = {
  anuncioId: string;
  titulo: string;
  descricao: string | null;
  preco: number | null;
  anoFabricacao: number | null;
  anoModelo: number | null;
  quilometragem: number | null;
  cambio: string | null;
  combustivel: string | null;
  cor: string | null;
  tipo: VehicleType;
  imagens: string[];
  imagemPrincipal: string | null;
  loja: PublicStoreInfo;
  especificacoes: Record<string, string | number | null>;
};
