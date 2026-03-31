# GearGarage - Regras do Projeto (Fonte de Verdade)

## 1. Objetivo deste documento

Este documento consolida as regras oficiais do GearGarage e deve ser tratado como **fonte de verdade** para as fases do MVP.

Qualquer implementação deve respeitar este conteúdo antes de adicionar novas funcionalidades.

---

## 2. Visão do produto

O **GearGarage** e um portal **B2C publico** para descoberta de veiculos, reutilizando o backend do GearSales.

Objetivo principal:
- exibir anuncios publicos de carros e motos
- permitir descoberta por filtros
- permitir acesso a pagina de detalhe do veiculo
- permitir contato direto com a loja via WhatsApp

Importante:
- o GearGarage **nao e** o painel administrativo do GearSales
- o GearGarage possui UX propria e foco no comprador final

---

## 3. Escopo do MVP (obrigatorio)

O MVP contempla **somente duas paginas**:

### Pagina 1 - Home / Listagem publica
- listagem de anuncios disponiveis
- filtros
- ordenacao
- paginacao
- navegacao para detalhe

### Pagina 2 - Detalhe do veiculo
- fotos
- dados do veiculo
- descricao
- dados publicos da loja
- botao de WhatsApp

---

## 4. Fora do escopo do MVP (nao implementar agora)

Nao faz parte desta fase:
- login
- cadastro
- favoritos
- comparacao de veiculos
- geracao de lead
- formulario de contato
- agendamento
- financiamento
- proposta online
- analytics avancado
- painel da loja
- dashboard
- area administrativa
- busca por placa
- multi-tenant com subdominio por loja
- SEO avancado
- chat

Se houver ideias desses itens no codigo, manter fora desta etapa.

---

## 5. Regra de negocio principal (critica)

Todo anuncio com status `DISPONIVEL` deve ser considerado publico no GearGarage.

Regra obrigatoria do MVP:
- `DISPONIVEL` = publico
- qualquer outro status = nao exibir

Nao criar regra paralela de "publicado" nesta fase.

---

## 6. Contato com a loja no detalhe

Na pagina de detalhe, exibir:
- nome da loja
- telefone publico
- cidade
- descricao da loja (quando houver campo apropriado)
- botao de WhatsApp

Campos publicos existentes no backend:
- `whatsappPublico`
- `telefonePublico`

Regra do CTA WhatsApp:
- priorizar `whatsappPublico`
- fallback apenas se existir regra clara e segura
- sem contato valido, CTA deve ficar desabilitado

Nao implementar:
- geracao de lead
- formulario de contato

---

## 7. Cobertura do catalogo

O portal cobre:
- carros
- motos

A listagem e nacional (Brasil inteiro), com filtro por localizacao quando suportado.

---

## 8. Arquitetura (decisao obrigatoria)

O GearGarage deve ser um frontend separado do GearSales.

Separacao esperada:
- GearSales Front -> sistema interno / B2B
- GearGarage Front -> portal publico / B2C
- mesmo backend (Ktor)
- mesmo banco
- mesma base de anuncios, veiculos e lojas

Regra:
- nao misturar codigo do portal publico com o frontend principal do GearSales

---

## 9. Stack obrigatoria do frontend

Tecnologias obrigatorias:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react

Objetivos da stack:
- facilitar execucao no Cursor
- facilitar manutencao
- garantir SEO basico
- garantir velocidade e responsividade

---

## 10. Direcao de UX/UI

Linha visual obrigatoria:
- sobria
- automotiva
- premium
- simples
- confiavel
- mobile-first

Evitar:
- visual experimental
- excesso de animacao
- layout "startup generico"

Prioridades:
- clareza
- conversao
- legibilidade
- confianca

---

## 11. Paleta oficial de cores

Usar esta base:
- vermelho principal: `#B70000`
- branco: `#FFFFFF`
- preto: `#040404`
- azul escuro: `#23262F`

Regras de uso:
- vermelho para CTA e destaque
- branco como base principal
- preto para textos fortes e titulos
- azul escuro para fundos secundarios, header, footer e elementos neutros

Diretriz:
- nao usar vermelho em excesso; aplicar com intencao

---

## 12. Padrao de implementacao

A implementacao deve ser:
- simples
- limpa
- componentizada
- organizada
- pronta para crescer

Evitar:
- overengineering
- abstracoes desnecessarias
- arquitetura excessivamente complexa
- estado global desnecessario
- hooks genericos demais
- helpers obscuros

Prioridades:
- clareza de leitura
- previsibilidade
- manutencao

---

## 13. Contratos de API (regra critica)

Nao inventar contratos de API.

Toda integracao deve obedecer:
1. o que ja existe no backend
2. ou o que for explicitamente criado na nova camada publica

Se endpoint ainda nao existir:
- documentar claramente
- propor criacao minima necessaria
- implementar apenas o minimo necessario

---

## 14. Seguranca de dados publicos (regra critica)

Nao reutilizar DTOs internos do backend para exposicao publica quando houver risco de dados sensiveis.

Criar DTO publico quando necessario, especialmente para dados de loja.

Nao expor:
- documento
- email interno
- telefone interno
- dados administrativos
- dados financeiros
- dados de backoffice

---

## 15. Regras de qualidade obrigatorias por etapa

Cada etapa de implementacao deve terminar com:
1. lint
2. typecheck (frontend)
3. build
4. testes minimos quando aplicavel
5. correcao de tudo que quebrar

Se houver erro de compilacao ao final, a tarefa nao esta concluida.

---

## 16. Documentacao obrigatoria

Tudo que for implementado deve ser documentado em `docs/geargarage/`.

Cada etapa relevante deve deixar claro:
- o que foi criado
- quais endpoints usa
- quais services usa
- quais componentes usa
- o que depende do backend
- o que ficou para v2

---

## 17. Ordem correta de execucao

Nao inverter a ordem:
1. consolidar regras do projeto
2. criar camada publica minima no backend
3. criar projeto frontend GearGarage
4. implementar listagem publica
5. implementar detalhe publico
6. refinar UX, SEO basico e qualidade

---

## 18. Delimitacao desta etapa

Nesta etapa, o entregavel e somente:
- criar `docs/geargarage/project-rules.md`
- consolidar regras de produto, MVP, negocio, stack, UX/UI, arquitetura, limites e ordem
- revisar consistencia com a auditoria disponivel

Restricao:
- nao implementar telas nesta etapa
- nao codar funcionalidades alem da documentacao

---

## 19. Resultado da revisao de consistencia (etapa atual)

Status da revisao nesta base:
- repositorio atual sem documentacao previa de auditoria encontrada
- conteudo consolidado integralmente conforme diretrizes fornecidas
- sem divergencias internas entre escopo, arquitetura, regras de negocio e limites do MVP

Caso exista documento de auditoria externo ainda nao versionado neste repositorio, este arquivo deve ser atualizado para refletir eventuais diferencas formais.
