# GearGarage - Listagem Publica (Home)

## Endpoint publico utilizado

A Home usa o service `publicCatalogService`, que consome **somente** o endpoint configurado em:
- `NEXT_PUBLIC_GEARGARAGE_PUBLIC_CATALOG_PATH`

Base URL:
- `NEXT_PUBLIC_GEARGARAGE_API_BASE_URL`

Importante:
- nenhum endpoint interno protegido por JWT foi utilizado
- a camada de acesso esta centralizada em `geargarage-front/src/services/publicCatalogService.ts`

## Filtros suportados na implementacao

Implementados via `publicFiltersAdapter`:
- `search` (busca textual)
- `marca`
- `modelo`
- `tipo`
- `precoMin`
- `precoMax`
- `anoMin`
- `anoMax`
- `cambio`
- `combustivel`
- `cidade` e `estado` (somente quando presentes no contexto atual)

## Ordenacoes suportadas na UI

Implementadas no `SortSelect`:
- `recentes`
- `preco-menor`
- `preco-maior`
- `ano-mais-novo`
- `km-menor`

Observacao:
- os valores exatos de `sort` devem ser alinhados com `docs/geargarage/backend-public-api.md` quando o arquivo estiver versionado.
- suporte de localizacao no frontend e controlado por `NEXT_PUBLIC_GEARGARAGE_SUPPORTS_LOCATION`.

## Componentes da listagem

Criados em `geargarage-front/src/components/listing/`:
- `SearchBar`
- `FiltersSidebar`
- `MobileFiltersSheet`
- `VehicleGrid`
- `VehicleCard`
- `SortSelect`
- `Pagination`
- `EmptyState`
- `ErrorState`
- `ListingSkeleton`

## Estados implementados

- loading: `geargarage-front/src/app/loading.tsx`
- erro: `geargarage-front/src/app/error.tsx` + `ErrorState`
- vazio: `EmptyState`

## Regras funcionais atendidas

- listagem publica consumida por service dedicado
- filtros e ordenacao com querystring na URL
- botao de limpar filtros
- paginacao no final
- navegacao para detalhe (`/veiculos/[id]`)
- filtro defensivo para `status = DISPONIVEL` quando o campo vier na resposta

## Limitacoes reais encontradas

- `docs/geargarage/backend-public-api.md` ainda nao existe no repositorio atual
- por isso, paths de API e parametros exatos de ordenacao/filtros seguem configuracao via env e precisam de alinhamento final com o contrato oficial
- filtro de localizacao foi implementado com comportamento elegante: aparece quando houver uso no contexto atual; sem contrato oficial versionado, nao foi forcado como obrigatorio

## Itens para ajuste na v2 desta etapa

- alinhar enums oficiais de ordenacao e filtros com contrato backend publicado
- consumir metadados do backend (quando existir) para habilitacao dinamica de filtros como localizacao
