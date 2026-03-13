# 🩺 Doutor Agenda

**Doutor Agenda** é uma plataforma moderna e robusta para gestão de clínicas médicas, permitindo o agendamento de consultas, gestão de pacientes e controle financeiro de forma intuitiva e eficiente.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?style=for-the-badge&labelColor=000&logo=drizzle)](https://orm.drizzle.team/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.5-orange?style=for-the-badge)](https://better-auth.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integration-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)

---

## ✨ Funcionalidades Principais

- 🏢 **Multi-clínicas**: Gestão de múltiplas unidades sob a mesma plataforma.
- 👨‍⚕️ **Gestão de Médicos**: Cadastro de profissionais, especialidades e horários de disponibilidade.
- 📅 **Agendamento Inteligente**: Sistema dinâmico para marcação de consultas com controle de horários.
- 💳 **Assinaturas & Pagamentos**: Integração com Stripe para planos de assinatura e pagamentos recorrentes.
- 📊 **Dashboard de Analytics**: Visualização de dados de atendimentos e faturamento via Recharts.
- 🔐 **Autenticação Segura**: Implementação via Better Auth com suporte a múltiplos provedores.

---

## 🚀 Tecnologias Utilizadas

O projeto utiliza o que há de mais moderno no ecossistema JavaScript/TypeScript:

### Core Frameworks
- **Next.js 16 (App Router)**: Framework React para produção com otimização de performance.
- **React 19**: Versão mais recente do React com suporte a Server Components.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.

### Frontend & UI
- **Tailwind CSS 4**: Estilização moderna e ultra-rápida.
- **Shadcn UI & Radix UI**: Componentes acessíveis e altamente customizáveis.
- **Lucide React**: Conjunto de ícones consistentes.
- **Recharts**: Gráficos dinâmicos para o dashboard.
- **TanStack React Query**: Gestão de estado assíncrono e cache.
- **nuqs**: Gestão de estado baseada em URL.

### Backend & Database
- **Drizzle ORM**: ORM TypeScript-first para interações rápidas e seguras com o banco.
- **PostgreSQL**: Banco de dados relacional robusto.
- **Better Auth**: Framework de autenticação moderno e flexível.
- **Next-safe-action**: Tipagem segura para Server Actions.

### Validação & Ferramentas
- **Zod**: Validação de esquemas e tipos.
- **React Hook Form**: Gestão eficiente de formulários.
- **Biome**: Ferramenta completa para Linting e Formatação (substituindo ESLint/Prettier).

---

## 🛠️ Como Iniciar o Projeto

### Pré-requisitos
- Node.js (v20 ou superior)
- PostgreSQL
- Gerenciador de pacotes (NPM recomendado)

### 1. Clonar e Instalar
```bash
git clone https://github.com/seu-usuario/doutor-agenda.git
cd doutor-agenda
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
```env
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_ESSENTIAL_PLAN_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL=
```

### 3. Configurar o Banco de Dados
Execute as migrações do Drizzle:
```bash
npx drizzle-kit push
```

### 4. Rodar o Desenvolvimento
```bash
npm run dev
```

---

## 📂 Estrutura de Pastas

```text
src/
├── actions/     # Server Actions (Mutations & Logic)
├── app/         # Next.js App Router (Páginas e Layouts)
├── components/  # Componentes UI (Reutilizáveis)
├── data/        # Camada de acesso a dados (Queries)
├── db/          # Configuração e Schemas do Drizzle
├── helpers/     # Funções utilitárias
├── hooks/       # Hooks customizados
├── lib/         # Configurações de bibliotecas externas (Stripe, Auth)
└── provides/    # Providers de contexto (React Query, Themes)
```

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

Desenvolvido com ❤️ por [Lurram Santos]
