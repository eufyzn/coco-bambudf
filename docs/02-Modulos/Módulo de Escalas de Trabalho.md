# Módulo de Escalas de Trabalho

## O que é
O **Módulo de Escalas de Trabalho** é o componente de gestão de turnos, jornadas de trabalho e folgas dos colaboradores de cada unidade do restaurante.

## Para que serve
Permite que gestores e administradores organizem a alocação mensal dos funcionários (almoço, jantar, folgas), e que os colaboradores acompanhem seus dias de trabalho e folga em uma grade visual responsiva.

## Onde está
Localizado em:
- `src/components/MonthlyScheduleMatrix.jsx` (componente reutilizável de matriz de escala)
- `src/components/ManagerDashboard.jsx` (aba `escala`)
- `src/components/AdminDashboard.jsx` (aba `escala`)
- `src/components/EmployeeDashboard.jsx` (aba `escala`)
- `src/services/db.js` (tabela `work_schedules` e método `saveWorkSchedules`)

## Do que depende
- **Tabela `work_schedules`** em [[DB Service Mock]]: Armazena `id`, `user_id`, `date`, `shift`, `hours` e `off_day`.
- **Tabelas `users` e `units`**: Para filtragem de colaboradores por unidade e setor.

## Quem depende dele
- [[ManagerDashboard]] e [[AdminDashboard]]: Utilizam o módulo para planejamento operacional mensal.
- [[EmployeeDashboard]]: Exibe o calendário pessoal de trabalho do colaborador logado.

## Como funciona
1. O componente [[MonthlyScheduleMatrix]] calcula dinamicamente os dias do mês selecionado (`selectedYear`, `selectedMonth`), identificando fins de semana, domingos e o dia atual.
2. Renderiza uma tabela matricial onde cada linha representa um colaborador e cada coluna representa um dia do mês.
3. Se o usuário tiver permissão de edição (`canEdit = true`), ao clicar em uma célula abre-se uma janela modal para alterar o turno (Almoço, Jantar, Intermediário), horário específico (ex: `08:00 - 16:00`) ou marcar Folga.
4. Ao salvar, as alterações são persistidas no `localStorage` pelo método `saveWorkSchedules` em `db.js`.

## O que pode quebrar se ele for alterado
- Inconsistências na formatação de datas (`YYYY-MM-DD`) entre o componente visual e os registros da tabela `work_schedules` podem impedir a associação de horários ao dia correto.
- Alterações no cálculo do ano/mês em `useMemo` podem corromper a renderização do número de dias no mês (ex: anos bissextos ou meses de 28/30/31 dias).

## Arquivos relacionados
- `src/components/MonthlyScheduleMatrix.jsx`
- `src/components/ManagerDashboard.jsx`
- `src/components/AdminDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/services/db.js`
- [[Fluxo de Gestão de Escala]]
