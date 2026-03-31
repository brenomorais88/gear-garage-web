# GearGarage Frontend - Setup Inicial

## Objetivo

Este documento descreve a estrutura inicial do frontend separado do GearGarage, preparado para o MVP publico B2C.

Base obrigatoria utilizada:
- `docs/geargarage/project-rules.md`
- `docs/geargarage/backend-public-api.md` (dependencia de contrato publico)

## Stack adotada

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- lucide-react

## Estrutura criada

Frontend separado criado em:
- `geargarage-front/`

Arquitetura principal em `geargarage-front/src/`:
- `app/` - rotas e layout raiz
- `components/` - componentes reutilizaveis e layout
- `services/` - integracao com API publica
- `types/` - tipos publicos do frontend
- `lib/` - utilitarios de infra (env/http)
- `hooks/` - hooks de apoio para filtros
- `utils/` - funcoes utilitarias e normalizacao
- `styles/` - tokens de design

## Shell base do portal

Componentes base:
- `components/layout/portal-shell.tsx`
- `components/layout/site-header.tsx`
- `components/layout/site-footer.tsx`
- `components/layout/page-container.tsx`

Responsabilidades:
- layout root com header e footer
- area de conteudo central padronizada
- estrutura visual mobile-first e sobria

## Sistema visual base

Paleta oficial aplicada em tokens CSS:
- `#B70000` (CTA e destaque)
- `#FFFFFF` (base)
- `#040404` (texto forte)
- `#23262F` (areas neutras/header/footer)

Itens base definidos:
- cores semanticas
- radius padrao
- sombras (`--shadow-soft`, `--shadow-card`)
- tipografia consistente com `Inter`

## Services da camada publica

Criados em `geargarage-front/src/services/`:

1. `publicCatalogService`
   - busca listagem publica
   - aceita filtros, paginacao e ordenacao
   - mapeia retorno da API para formato do frontend

2. `publicVehicleDetailService`
   - busca detalhe publico por id do anuncio
   - retorna estrutura com anuncio, loja e imagens

3. `publicStoreInfoMapper`
   - normaliza dados publicos da loja
   - prioriza `whatsappPublico`, depois `telefonePublico`

4. `publicFiltersAdapter`
   - converte querystring de URL para filtros
   - converte filtros para querystring de API/URL

5. `publicImageResolver`
   - resolve imagem principal
   - resolve galeria
   - aplica fallback em ausencia de imagem

## Variaveis de ambiente

Arquivo de referencia:
- `geargarage-front/.env.example`

Variaveis obrigatorias:
- `NEXT_PUBLIC_GEARGARAGE_API_BASE_URL`
- `NEXT_PUBLIC_GEARGARAGE_PUBLIC_CATALOG_PATH`
- `NEXT_PUBLIC_GEARGARAGE_PUBLIC_VEHICLE_DETAIL_PATH` (deve conter `{id}`)
- `NEXT_PUBLIC_GEARGARAGE_SUPPORTS_LOCATION` (`true` ou `false`)
- `NEXT_PUBLIC_SITE_URL` (base para canonical/Open Graph)

Importante:
- os paths devem ser preenchidos estritamente com base em `docs/geargarage/backend-public-api.md`
- nao usar endpoint interno protegido por JWT
- nao criar contrato paralelo

## Como rodar

No diretorio `geargarage-front/`:

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Qualidade e validacao

Validacoes obrigatorias da etapa:
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Dependencias de backend para proxima etapa

Para conectar integralmente listagem e detalhe sem ajustes, este frontend depende da especificacao oficial da API publica em:
- `docs/geargarage/backend-public-api.md`

Quando este documento estiver versionado, os valores de ambiente e mapeamentos de resposta devem ser alinhados 1:1 com o contrato oficial.
