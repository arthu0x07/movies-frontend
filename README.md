# Projeto Front End - Cubos

Sistema completo de interface para gerenciamento de filmes com notificações automáticas <br /><br />

### Tecnologias Configuradas:

- Framework: Next.js (App Router)
- Linguagem: TypeScript
- Estilização: Tailwind CSS
- Gerenciamento de Estado: React Context API
- Validação de Formulários: React Hook Form + Zod
- Requisições HTTP: Axios
- Fontes: Montserrat e Roboto (Google Fonts)
- Linting: ESLint + Prettier
- Configuração: Rocketseat ESLint Config
- Autenticação: JWT com cookies HTTP-only
- Upload de Arquivos: Integração com Cloudflare R2
- Responsividade: Design System customizado
- Temas: Dark/Light mode
- Middleware: Proteção de rotas automática

<br /><br />

## Descrição

Interface moderna e responsiva para gerenciamento de filmes com recursos avançados de UX/UI:

- Sistema completo de autenticação com proteção de rotas
- Interface responsiva com design system customizado
- Gerenciamento completo de filmes (CRUD) com upload de imagens
- Sistema de filtros avançados e paginação
- Modais interativos para criação e edição de filmes
- Notificações automáticas para lançamentos futuros
- Tema escuro/claro com persistência de preferência
- Validação de formulários em tempo real
- Upload de arquivos com preview e progresso
- Componentes reutilizáveis e acessíveis
- Integração completa com API backend
- Middleware para controle de acesso e redirecionamentos

<br /><br />

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

### API Backend
`NEXT_PUBLIC_API_URL` - _URL da API backend (padrão: http://localhost:3000)_

### Upload de Arquivos (Cloudflare R2)
`NEXT_PUBLIC_R2_PUBLIC_URL` - _URL pública do bucket R2 para exibição de imagens_

### Configurações Opcionais
`NEXT_PUBLIC_APP_URL` - _URL da aplicação frontend (padrão: http://localhost:3001)_

<br /><br />

## Instalação

#### Versões recomendadas:

- Node: 20.12.1
- npm: 10.x ou superior

<br /><br />

#### Passo a Passo:

```bash
  git clone https://github.com/arthu0x07/movies-frontend.git

  npm install

  npm run dev
```

<br />

#### Build para Produção:

```bash
  npm run build
  npm run start
```

<br /><br />

## Scripts Disponíveis

```bash
npm run dev          # Modo desenvolvimento (hot reload)
npm run build        # Build para produção
npm run start        # Iniciar aplicação em produção
npm run lint         # Verificar problemas de linting
npm run lint:fix     # Corrigir problemas de linting automaticamente
```

<br /><br />

## Estrutura do Projeto

### Diretórios Principais

#### 📱 **src/app** - App Router (Next.js 14)
- `layout.tsx` - Layout principal da aplicação
- `page.tsx` - Página inicial (lista de filmes)
- `globals.css` - Estilos globais
- `login/` - Página de login
- `register/` - Página de registro
- `movies/[slug]/` - Página de detalhes do filme

#### 🧩 **src/components** - Componentes Reutilizáveis
- `ui/` - Componentes base do design system
- `forms/` - Formulários de autenticação
- `layout/` - Componentes de layout
- `AddMovieModal/` - Modal de criação de filmes
- `EditMovieModal/` - Modal de edição de filmes
- `FiltersModal/` - Modal de filtros avançados
- `MovieCard/` - Card de exibição de filmes
- `Pagination/` - Componente de paginação
- `SearchInput/` - Campo de busca

#### 🎣 **src/hooks** - Custom Hooks
- `auth/` - Hooks de autenticação e formulários
- `useMovies.ts` - Hook para gerenciamento de filmes

#### 🌐 **src/contexts** - Gerenciamento de Estado
- `AuthContext.tsx` - Contexto de autenticação
- `ThemeContext.tsx` - Contexto de tema (dark/light)
- `GenresContext.tsx` - Contexto de gêneros

#### 🔧 **src/services** - Integração com API
- `api.ts` - Configuração do Axios e endpoints
- `auth.ts` - Serviços de autenticação

#### 📝 **src/@types** - Definições de Tipos
- `movie.ts` - Tipos relacionados a filmes
- `auth.ts` - Tipos de autenticação

#### ✅ **src/schemas** - Validação Zod
- `auth.ts` - Schemas de validação para autenticação

#### 🛠️ **src/utils** - Utilitários
- `fonts.tsx` - Configuração de fontes
- `imageUrl.ts` - Utilitários para URLs de imagem

<br /><br />

## Design System

### Componentes UI Base

#### **Button**
- Variantes: primary, secondary, outline, ghost
- Estados: default, hover, disabled, loading
- Tamanhos: sm, md, lg

#### **Input**
- Tipos: text, email, password, number, date
- Estados: default, error, disabled
- Suporte a ícones e labels

#### **Select**
- Single e multiple selection
- Busca integrada
- Placeholder customizável

#### **Modal**
- Overlay com backdrop
- Fechamento por ESC ou clique fora
- Animações suaves

#### **FileUpload**
- Drag & drop
- Preview de imagens
- Barra de progresso
- Validação de tipos

#### **CircularRating**
- Exibição visual de ratings
- Animações CSS
- Cores dinâmicas

<br /><br />

## Sistema de Cores

### Paleta Principal
- **Purple**: Tons primários da marca
- **Purple Dark**: Variações para tema escuro
- **Mauve**: Tons neutros e de fundo
- **Mauve Dark**: Neutros para tema escuro

### Breakpoints Responsivos
- **xs**: 320px (mobile pequeno)
- **sm**: 640px (mobile)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (desktop grande)
- **xxl**: 1536px (desktop extra grande)

### Tipografia
- **Montserrat**: Títulos e elementos de destaque
- **Roboto**: Textos corridos e interface

<br /><br />

## Funcionalidades Principais

### 🔐 **Autenticação**
- Login e registro de usuários
- Proteção de rotas com middleware
- Persistência de sessão com cookies HTTP-only
- Redirecionamentos automáticos
- Validação de formulários em tempo real

### 🎬 **Gerenciamento de Filmes**
- Listagem com paginação e filtros
- Criação de filmes com upload de poster e banner
- Edição completa de informações
- Exclusão com confirmação
- Busca por título
- Filtros por gênero, data, duração, status e idioma

### 📧 **Sistema de Notificações**
- Inscrição automática em filmes com data futura
- Interface para gerenciar notificações
- Status visual de inscrições

### 🎨 **Interface e UX**
- Design responsivo para todos os dispositivos
- Tema escuro/claro com persistência
- Animações e transições suaves
- Feedback visual para todas as ações
- Loading states e error handling
- Acessibilidade (ARIA labels, navegação por teclado)

### 📱 **Responsividade**
- Layout adaptativo para mobile, tablet e desktop
- Componentes otimizados para touch
- Navegação mobile-friendly
- Imagens otimizadas para diferentes resoluções

<br /><br />

## Rotas da Aplicação

### Públicas
```
/                    - Página inicial (redireciona para /movies se autenticado)
/login               - Página de login
/register            - Página de registro
```

### Protegidas (Requer Autenticação)
```
/movies              - Lista de filmes com filtros
/movies/[slug]       - Detalhes do filme
```

### Redirecionamentos Automáticos
- Usuários autenticados em `/login` ou `/register` → `/movies`
- Usuários não autenticados em rotas protegidas → `/login`
- Usuários autenticados em `/` → `/movies`

<br /><br />

## Middleware de Autenticação

### Funcionalidades
- Verificação automática de token JWT
- Proteção de rotas sensíveis
- Redirecionamentos baseados no estado de autenticação
- Headers de estado para debugging
- Configuração otimizada para performance

### Rotas Protegidas
- Todas as rotas que começam com `/movies`
- Automaticamente expandível para novas rotas

<br /><br />

## Hooks Customizados

### **useLoginForm**
- Gerenciamento de estado do formulário de login
- Validação com Zod
- Integração com AuthContext
- Tratamento de erros

### **useRegisterForm**
- Formulário de registro com validação
- Confirmação de senha
- Feedback de erros em tempo real

### **useEditMovieForm**
- Formulário complexo de edição de filmes
- Upload de múltiplos arquivos
- Validação de dados
- Integração com API

### **useMovies**
- Gerenciamento de estado da lista de filmes
- Filtros e paginação
- Cache de dados
- Loading states

<br /><br />

## Configurações Avançadas

### **Next.js Config**
- Build directory customizado (`build/`)
- Otimização de imagens desabilitada (para Cloudflare R2)
- Configurações de performance

### **Tailwind CSS**
- Design system completo
- Cores customizadas para tema escuro/claro
- Tipografia responsiva
- Breakpoints personalizados

### **TypeScript**
- Configuração strict habilitada
- Path mapping para imports limpos (`@/*`)
- Tipos customizados para toda a aplicação

### **ESLint & Prettier**
- Configuração Rocketseat
- Formatação automática
- Plugin Tailwind CSS para ordenação de classes
- Regras customizadas para Next.js

<br /><br />

## Integração com Backend

### **Configuração Axios**
- Base URL configurável via environment
- Interceptors para autenticação automática
- Tratamento global de erros
- Serialização de parâmetros para arrays

### **Endpoints Utilizados**
```
POST   /auth/login                           - Autenticação
POST   /auth/register                        - Registro
GET    /movies                               - Lista de filmes
POST   /movies                               - Criar filme
GET    /movies/genres                        - Listar gêneros
GET    /movies/:slug                         - Detalhes do filme
PATCH  /movies/:id                           - Atualizar filme
DELETE /movies/:id                           - Deletar filme
POST   /upload                               - Upload de arquivos
POST   /notifications/movies/:movieId        - Inscrever notificação
DELETE /notifications/movies/:movieId        - Cancelar notificação
GET    /notifications/movies/:movieId/status - Status da notificação
```

<br /><br />

## Performance e Otimizações

### **Next.js Features**
- App Router para roteamento otimizado
- Server Components onde aplicável
- Otimização automática de bundles
- Code splitting por rotas

### **Carregamento de Dados**
- Loading states em todos os componentes
- Error boundaries para tratamento de erros
- Cache de dados em contextos
- Lazy loading de componentes pesados

### **Imagens e Assets**
- Integração com Cloudflare R2
- Preview de imagens antes do upload
- Validação de tipos de arquivo
- Compressão automática

<br /><br />

## Funcionalidades Avançadas

- Sistema de validação robusto com Zod e React Hook Form
- Upload de arquivos com drag & drop e preview
- Filtros avançados com persistência de estado
- Paginação otimizada com controles intuitivos
- Modais acessíveis com foco management
- Tema escuro/claro com transições suaves
- Middleware de autenticação automático
- Componentes totalmente tipados com TypeScript
- Design system consistente e escalável
- Responsividade completa para todos os dispositivos
- Integração seamless com API backend
- Tratamento de erros contextual e informativo
- Loading states e feedback visual em todas as operações
- Navegação intuitiva com breadcrumbs e estados visuais
- Acessibilidade seguindo padrões WCAG 
