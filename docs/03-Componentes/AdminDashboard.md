# Componente AdminDashboard

## O que é
O **AdminDashboard** (`src/components/AdminDashboard.jsx`) é o painel de controle executivo para o perfil `admin` (Administrador Geral).

## Para que serve
Centraliza a gestão corporativa e administrativa da rede Coco Bambu, permitindo cadastrar e gerenciar usuários, unidades (filiais), setores, cargos, manuais de conhecimento, atividades, relatórios analíticos globais e a matriz de escalas de trabalho de toda a organização.

## Onde está
Arquivo: `src/components/AdminDashboard.jsx`.

## Do que depende
- **React Core**: `useState`, `useEffect`.
- **Lucide React**: Ícones de navegação e relatórios (`Users`, `Building2`, `Grid`, `Briefcase`, `BookOpen`, `BarChart3`, `Plus`, `Edit3`, `Trash2`, `Search`, etc.).
- **[[DB Service Mock]]**: Método singleton `db` para operações CRUD e leitura de estatísticas gerais (`getAdminStats`).
- **Componente Filho**: [[MonthlyScheduleMatrix]].

## Quem depende dele
- [[App]]: Renderiza o `<AdminDashboard />` quando `currentUser.role === 'admin'`.

## Como funciona
1. **Carregamento de Dados (`loadData`)**:
   - Dispara ao mudar a aba ativa (`currentTab`), buscando dados das tabelas `users`, `units`, `departments`, `positions`, `documents`, `activities`, `activity_assignments`, `trainings` e `work_schedules`.
   - Recupera os indicadores consolidados através de `db.getAdminStats()`.
2. **Gerenciador Generico de CRUD (`handleOpenCreate`, `handleOpenEdit`, `handleDelete`)**:
   - Abre uma modal genérica configurada dinamicamente para a tabela selecionada (`users`, `units`, `departments`, `positions`, `documents`).
   - Salva e atualiza itens através do método `db.save(table, data)`.
3. **Visões da Interface (`currentTab`)**:
   - `dashboard`: Cards com KPIs gerais (colaboradores ativos, gestores, unidades, exames concluídos e média geral da rede).
   - `usuarios`, `unidades`, `setores`, `cargos`, `conhecimento`: Tabelas com buscas, filtros e ações CRUD.
   - `escala`: Renderiza o componente `<MonthlyScheduleMatrix currentUser={currentUser} canEdit={true} />`.
   - `relatorios`: Exibe tabelas comparativas de desempenho e percentual de exames por unidade.

## O que pode quebrar se ele for alterado
- Se as estruturas dos objetos inseridos nas tabelas `users` ou `positions` forem alteradas sem manter a compatibilidade com a tabela `profiles` no Supabase, inconsistências de dados ocorrerão entre a autenticação e a administração.

## Arquivos relacionados
- `src/App.jsx`
- `src/components/AdminDashboard.jsx`
- `src/components/MonthlyScheduleMatrix.jsx`
- `src/services/db.js`
- [[DB Service Mock]]
- [[Módulo de Relatórios e Desempenho]]
