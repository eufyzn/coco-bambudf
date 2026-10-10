# Módulo de Relatórios e Desempenho

## O que é
O **Módulo de Relatórios e Desempenho** é a camada analítica que consolida dados de engajamento, notas obtidas em exames teóricos, taxa de erro por pergunta e progresso dos colaboradores.

## Para que serve
Permite que administradores e gestores monitorem a evolução do conhecimento técnico das equipes, identifiquem gargalos operacionais (ex: perguntas com alta taxa de erro) e tomem decisões de treinamento focadas nas fragilidades das unidades.

## Onde está
Localizado nos componentes:
- `src/components/AdminDashboard.jsx` (aba `relatorios`: KPIs globais por unidade e setor)
- `src/components/ManagerDashboard.jsx` (aba `dashboard`: estatísticas da unidade, média de notas e pontos de atenção)
- `src/services/db.js` (métodos `getManagerStats` e `getAdminStats`)

## Do que depende
- **Tabelas do Banco Mock**: `activity_assignments`, `answers`, `questions`, `activities`, `users`, `units`.
- **[[DB Service Mock]]**: Métodos `getManagerStats(managerId)` e `getAdminStats()`.

## Quem depende dele
- [[AdminDashboard]] e [[ManagerDashboard]]: Apresentação de gráficos de progresso, cards de KPIs e listas de questões problemáticas.

## Como funciona
1. **Relatórios do Gestor (`getManagerStats`)**:
   - Filtra os funcionários pertencentes à mesma unidade do gestor.
   - Calcula o total de exames concluídos versus pendentes.
   - Calcula a nota média da unidade.
   - Analisa todas as respostas da tabela `answers` e identifica as perguntas em que os funcionários mais erraram, ordenando por taxa de erro (`error_rate`). As 5 piores perguntas são exibidas na caixa "Pontos de Atenção".
2. **Relatórios do Administrador (`getAdminStats`)**:
   - Consolida total de funcionários ativos, total de gestores, número de unidades e média geral da rede.
   - Desmembra o percentual de conclusão e média por unidade (ex: Teresina vs. Matriz).

## O que pode quebrar se ele for alterado
- Erros na lógica de divisão por zero (ex: quando `totalGraded === 0` ou `total === 0`) podem quebrar a renderização dos componentes React com exceções `NaN`.
- Se o encadeamento de relacionamentos entre `answers` -> `assignment` -> `activity` em `db.js` não validar a existência de objetos nulos, chamadas de propriedades inexistentes resultarão em `TypeError`.

## Arquivos relacionados
- `src/components/AdminDashboard.jsx`
- `src/components/ManagerDashboard.jsx`
- `src/services/db.js`
- [[DB Service Mock]]
