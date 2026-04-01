## GearGarage Front

Frontend publico B2C do GearGarage, separado do GearSales Front, focado em:
- listagem publica de veiculos
- detalhe do veiculo
- contato via WhatsApp

Stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react

## Rodando localmente

1. Instale dependencias:

```bash
npm install
```

2. Configure ambiente:

```bash
cp .env.example .env.local
```

3. Suba a aplicacao:

```bash
npm run dev
```

Aplicacao em [http://localhost:3000](http://localhost:3000).

## Validacao

```bash
npm run lint
npm run typecheck
npm run build
npm run test
```

## API publica

Este frontend deve consumir somente a camada publica do backend GearGarage.

Preencha os endpoints de ambiente conforme:
- `docs/geargarage/backend-public-api.md`

Nao usar endpoints internos protegidos por JWT.

## Estrutura

- `src/app` - app router e layout base
- `src/components` - UI e layout
- `src/services` - services da API publica
- `src/types` - tipos de dominio publico
- `src/lib` - env/http/helpers base
- `src/hooks` - hooks de adaptacao
- `src/utils` - utilitarios
- `src/styles` - tokens visuais

Detalhes adicionais em `docs/geargarage/frontend-setup.md`.
