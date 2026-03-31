# GearGarage - Detalhe Publico do Anuncio

## Endpoint publico consumido

A rota publica de detalhe (`/veiculos/[id]`) consome somente:
- `publicVehicleDetailService.getByListingId(id)`

Com base nas variaveis:
- `NEXT_PUBLIC_GEARGARAGE_API_BASE_URL`
- `NEXT_PUBLIC_GEARGARAGE_PUBLIC_VEHICLE_DETAIL_PATH` (com token `{id}`)

Nenhum endpoint interno protegido por JWT foi utilizado.

## SEO basico

No detalhe foram adicionados:
- `title` dinamico por anuncio
- `description` dinamica quando possivel
- Open Graph basico com imagem principal
- canonical da pagina do anuncio

## Estrutura de dados exibida

Campos exibidos na tela quando disponiveis:
- imagens (foto principal + miniaturas)
- titulo do veiculo
- preco
- ano/modelo
- quilometragem
- cambio
- combustivel
- cor
- descricao do anuncio
- nome da loja
- telefone publico
- cidade da loja
- descricao da loja

## Regra do botao de WhatsApp

Implementacao no componente `WhatsAppCTA`:
1. prioridade para `whatsappPublico`
2. fallback seguro para `telefonePublico` quando `whatsappPublico` nao existir
3. se nao houver contato valido, CTA fica desabilitado

Formato da mensagem:
- com nome do veiculo: "Ola! Tenho interesse no veiculo [nome] que encontrei no GearGarage. Pode me passar mais informacoes?"
- sem nome resolvido: mensagem generica equivalente

## Fallback de ausencia de contato

Sem `whatsappPublico` e sem `telefonePublico`:
- renderiza botao desabilitado "WhatsApp indisponivel"

## Estados de UX implementados

- loading: `src/app/veiculos/[id]/loading.tsx` + `DetailSkeleton`
- error: `src/app/veiculos/[id]/error.tsx`
- not found: `src/app/veiculos/[id]/not-found.tsx` + `NotFoundState`
- fallback de imagem: `/images/vehicle-fallback.svg`

## Limitacoes encontradas

- `docs/geargarage/backend-public-api.md` ainda nao existe no repositorio atual
- por isso, mapeamentos e path final dependem da configuracao de ambiente e devem ser alinhados 1:1 com o contrato oficial quando versionado
