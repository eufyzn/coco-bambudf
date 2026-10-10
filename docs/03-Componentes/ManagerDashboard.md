# Componente ManagerDashboard

## O que é
O **ManagerDashboard** (`src/components/ManagerDashboard.jsx`) é o painel de operações e liderança de unidade para o perfil `gestor` (Gerentes de Restaurante e Chefes de Setor).

## Para que serve
Fornece ferramentas de liderança diária: criação e acompanhamento dos briefings de "Esquenta", elaboração de atividades/quizzes (com opções de criação manual, importação via texto ou geração automatizada via IA), acompanhamento do desempenho da equipe, cadastro de avaliações de desempenho e gestão da escala mensal.

## Onde está
Arquivo: `src/components/ManagerDashboard.jsx`.

## Do que depende
- **React Core**: `useState`, `useEffect`.
- **Lucide React**: Ícones operacionais (`Flame`, `ClipboardList`, `Users`, `TrendingUp`, `AlertTriangle`, `Plus`, `Trash2`, `Cpu`, `FileCheck`, etc.).
- **[[DB Service Mock]]**: Instância `db` para buscar dados da equipe e calcular os estatísticos da unidade (`getManagerStats`).
- **Componente Filho**: [[MonthlyScheduleMatrix]].

## Quem depende dele
- [[App]]: Renderiza o `<ManagerDashboard />` quando `currentUser.role === 'gestor'`.

## Como funciona
1. **Carregamento de Dados (`loadData`)**:
   - Filtra os colaboradores da equipe que pertençam à unidade do gestor (`currentUser.unit_id`).
   - Carrega as estatísticas consolidadas via `db.getManagerStats(currentUser.id)`.
2. **Criação de Esquenta (`showWarmupModal`)**:
   - Permite cadastrar a pauta do alinhamento diário, selecionando o setor, turno e o manual operacional de apoio.
3. **Criação de Atividades/Quizzes (`showActivityModal`)**:
   - Permite inserir perguntas manualmente com alternativas A, B, C, D e gabarito.
   - Suporta **Gerador por IA**: gera automaticamente rascunhos de perguntas a partir de um tema escolhido.
   - Suporta **Importador por Texto**: analisa um bloco de texto formatado e extrai perguntas e alternativas automaticamente.
4. **Visão de Equipe & Avaliações (`equipe`, `avaliacoes`)**:
   - Exibe cards dos colaboradores com histórico de notas em exames e formulário de avaliação de desempenho periódica.
5. **Escala**: Renderiza a matriz `<MonthlyScheduleMatrix currentUser={currentUser} canEdit={true} />`.

## O que pode quebrar se ele for alterado
- Erros nos utilitários de parser de texto para importação de questões podem corromper a inclusão de alternativas ou deixar o gabarito inconsistente.
- A alteração na regra de filtragem de colaboradores por `unit_id` pode permitir que um gestor visualize ou edite dados de outra filial.

## Arquivos relacionados
- `src/App.jsx`
- `src/components/ManagerDashboard.jsx`
- `src/components/MonthlyScheduleMatrix.jsx`
- `src/services/db.js`
- [[DB Service Mock]]
- [[Módulo de Alinhamentos e Esquenta]]
- [[Módulo de Avaliações e Quizzes]]
