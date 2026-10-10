# Coco Bambu — Mapa do Projeto

## Visão Geral

O projeto **Coco Bambu - Sistema de Gestão, Capacitação e Operações Internas** é uma aplicação web Single Page Application (SPA) voltada exclusivamente para a gestão operacional, alinhamento de equipes e treinamento de colaboradores da rede de restaurantes Coco Bambu. 

O sistema organiza as operações em 3 níveis de privilégios (`funcionario`, `gestor`, `admin`), fornecendo ferramentas para realização de avaliações operacionais (quizzes), acompanhamento de manuais e fichas técnicas de produtos, gestão de escalas mensais de trabalho, controle de briefings pré-turno ("Esquenta") e consolidação de relatórios de desempenho por unidade e setor.

- **Objetivo Principal**: Garantir o padrão de atendimento e higiene operacional em todas as filiais da rede através de capacitação contínua e alinhamento diário de equipes.
- **Público-Alvo**: Colaboradores operacionais (garçons, cozinheiros, barmans), gestores de restaurante/unidade e administradores corporativos.

---

## Stack Tecnológica

- **Frontend Core**: React 19 (`react` 19.2.8, `react-dom` 19.2.8)
- **Build Tool / Dev Server**: Vite 8 (`vite` 8.2.2, `@vitejs/plugin-react` 6.1.0)
- **Estilização**: Vanilla CSS com variáveis de design system global (`src/index.css`, `src/App.css`) e estilos inline escopados nos componentes React.
- **Ícones**: Lucide React (`lucide-react` 1.34.0)
- **Backend & Banco de Dados Primário**: Supabase Client JS (`@supabase/supabase-js` 2.117.2) integrado em [[Supabase Service]] para autenticação de usuários e consulta de perfis.
- **Banco de Dados Mock / Local Storage**: Singleton `LocalSupabaseMock` em [[DB Service Mock]] responsável pela persistência off-line e fornecimento de dados mockados para as regras de negócio de escala, atividades, guias e estatísticas.
- **Linter & Qualidade**: Oxlint (`oxlint` 1.79.0) com configuração em `.oxlintrc.json`.

---

## Arquitetura

O sistema adota uma arquitetura SPA baseada em React com controle de fluxo orientado a estado global de autenticação e navegação por abas em memória (sem roteador HTTP externo).

Consulte o documento dedicado com o diagrama Mermaid da solução em:
- [[Arquitetura Geral]]

---

## Módulos

A aplicação é subdividida nos seguintes módulos de negócio:

1. [[Módulo de Autenticação e Sessão]]: Autenticação de usuários, controle de sessão ativa e gerenciamento de perfis no Supabase Auth.
2. [[Módulo de Gestão de Conteúdo e Conhecimento]]: Biblioteca centralizada de manuais operacionais, fichas técnicas e procedimentos padrão.
3. [[Módulo de Avaliações e Quizzes]]: Criação, aplicação, resposta e correção automatizada de provas técnicas por setor.
4. [[Módulo de Escalas de Trabalho]]: Matriz mensal interativa de alocação de turnos e folgas dos funcionários por unidade.
5. [[Módulo de Alinhamentos e Esquenta]]: Registro e acompanhamento de briefings operacionais diários pré-turno.
6. [[Módulo de Relatórios e Desempenho]]: Dashboards analíticos de aderência, notas médias e pontos de atenção por questão e setor.

---

## Componentes

A interface é construída com os seguintes componentes React principais:

- [[App]]: Componente raiz responsável pelo gerenciamento de sessão, roteamento por estado `currentTab` e bar de navegação/notificações superiores.
- [[Sidebar]]: Menu de navegação lateral responsivo adaptado dinamicamente para o perfil do usuário logado.
- [[Login]]: Tela de autenticação com suporte a Supabase Auth, recuperação de senha e painel de credenciais rápidas para teste.
- [[AdminDashboard]]: Painel do Administrador Geral com gestão CRUD completa de usuários, unidades, setores, cargos, relatórios globais e escalas.
- [[ManagerDashboard]]: Painel do Gestor de Unidade para criação de Esquenta, elaboração de atividades/quizzes (com auxílio de IA ou importação), gestão de equipe e escalas.
- [[EmployeeDashboard]]: Interface do Colaborador para realização de exames, leitura de guias de conhecimento, visualização de escala pessoal e histórico de progresso.
- [[MonthlyScheduleMatrix]]: Componente reutilizável de matriz mensal de horários e folgas para visualização e edição direta.

---

## Serviços

- [[Supabase Service]]: Instância do cliente Supabase configurada via variáveis de ambiente (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- [[DB Service Mock]]: Camada de persistência local baseada em `localStorage` que simula tabelas relacionais, seeding de dados iniciais e consultas agregadas de estatísticas.

---

## Banco de Dados

Consulte o documento completo com o mapeamento de tabelas, atributos e relacionamentos:
- [[Modelo de Dados e Tabelas]]

Tabelas identificadas no código:
- `companies`, `units`, `departments`, `positions`, `profiles` / `users`, `documents`, `trainings`, `warmups`, `activities`, `questions`, `activity_assignments`, `answers`, `work_schedules`, `evaluations`, `notifications`.

---

## Fluxos

Principais fluxos operacionais mapeados na aplicação:

1. [[Fluxo de Autenticação]]: Login -> Obtenção de Perfil -> Renderização da Dashboard por Role.
2. [[Fluxo de Atividade e Quiz]]: Criação da Atividade -> Notificação -> Resposta pelo Funcionário -> Correção e Feedback -> Atualização de Estatísticas.
3. [[Fluxo de Gestão de Escala]]: Seleção de Mês/Ano/Unidade -> Edição na Matriz -> Salvamento no Banco.
4. [[Fluxo de Registro de Esquenta]]: Briefing Diário -> Seleção de Guia -> Registro de Observações -> Disponibilização para a Equipe.

---

## Decisões Arquiteturais

Decisões de projeto registradas:

- [[Decisão de Roteamento por Estado]]: Opção por controle de abas via estado `currentTab` em vez de biblioteca de rotas como React Router.
- [[Decisão de Transição Supabase x Mock]]: Coexistência temporária de Supabase Auth para controle de usuários com `localStorage` mock para dados operacionais.
- [[Decisão de Controle de Acesso Baseado em Roles]]: Renderização condicional rigorosa de componentes com base nos papéis `admin`, `gestor` e `funcionario`.

---

## Pontos Críticos do Sistema

1. **Dependência do LocalStorage para Dados Operacionais**: Mudanças no `localStorage` do navegador ou limpeza do cache apagam dados inseridos localmente se não estiverem persistidos no Supabase.
2. **Duplicidade de Estado de Autenticação**: O login valida dados no Supabase em `Login.jsx` e `App.jsx`, mas componentes internos ainda leem coleções de `users` do `db.js`.
3. **Falta de Validação de Input Estrita no Mock**: Métodos em `db.js` realizam atribuição direta sem tratamento profundo de concorrência ou rollback.
4. **Acoplamento de Estilos Inline**: A estilização via objetos JavaScript inline dificulta a sobrescrita global de temas sem alteração direta dos componentes.

---

## Como Começar a Entender o Projeto

Para um desenvolvedor novato assumir o projeto rapidamente:

1. Leia primeiro o documento de [[Arquitetura Geral]].
2. Entenda o ponto de entrada principal lendo a documentação do componente [[App]].
3. Compreenda como o controle de usuários e permissões é feito lendo [[Decisão de Controle de Acesso Baseado em Roles]] e [[Supabase Service]].
4. Analise as telas principais no diretório `docs/03-Componentes/`: [[Login]], [[EmployeeDashboard]], [[ManagerDashboard]] e [[AdminDashboard]].
5. Estude os dados mockados e o modelo relacional lendo [[Modelo de Dados e Tabelas]] e [[DB Service Mock]].

---

## Mapa de Dependências

```
                        +--------------------+
                        |     main.jsx       |
                        +---------+----------+
                                  |
                                  v
                        +--------------------+
                        |      App.jsx       |
                        +----+----------+----+
                             |          |
              +--------------+          +---------------+
              |                                         |
              v                                         v
     +-----------------+                       +-----------------+
     |    Login.jsx    |                       |   Sidebar.jsx   |
     +--------+--------+                       +--------+--------+
              |                                         |
              +-------------------+---------------------+
                                  |
            +---------------------+---------------------+
            |                     |                     |
            v                     v                     v
  +------------------+  +------------------+  +------------------+
  | EmployeeDash.jsx |  | ManagerDash.jsx  |  |  AdminDash.jsx   |
  +--------+---------+  +--------+---------+  +--------+---------+
           |                     |                     |
           +---------------------+---------------------+
                                 |
                                 v
                  +------------------------------+
                  | MonthlyScheduleMatrix.jsx    |
                  +--------------+---------------+
                                 |
                                 v
                  +------------------------------+
                  |    db.js / supabase.js       |
                  +------------------------------+
```

- **[[App]]** depende de [[Supabase Service]], [[Login]], [[Sidebar]], [[EmployeeDashboard]], [[ManagerDashboard]], [[AdminDashboard]].
- **[[AdminDashboard]]**, **[[ManagerDashboard]]** e **[[EmployeeDashboard]]** dependem de [[MonthlyScheduleMatrix]] e [[DB Service Mock]].
- Todos os componentes leem variáveis de estilo em `src/index.css`.
