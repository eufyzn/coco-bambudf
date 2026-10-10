# Componente MonthlyScheduleMatrix

## O que é
O **MonthlyScheduleMatrix** (`src/components/MonthlyScheduleMatrix.jsx`) é o componente matricial interativo para exibição e edição da escala mensal de trabalho.

## Para que serve
Fornece uma visão em grelha onde as linhas representam os colaboradores e as colunas representam os dias do mês selecionado. Permite que gestores cliquem nas células para alterar turnos e folgas, enquanto colaboradores visualizam seus horários de forma clara.

## Onde está
Arquivo: `src/components/MonthlyScheduleMatrix.jsx`.

## Do que depende
- **React Core**: `useState`, `useEffect`, `useMemo`.
- **Lucide React**: Ícones `ChevronLeft`, `ChevronRight`, `Building2`, `X`, `CheckCircle2`.
- **[[DB Service Mock]]**: Instância `db` para buscar colaboradores, unidades e horários (`work_schedules`), e para salvar alterações com `saveWorkSchedules`.

## Quem depende dele
- [[AdminDashboard]]: Incorpora o componente na aba `escala` com `canEdit={true}`.
- [[ManagerDashboard]]: Incorpora o componente na aba `escala` com `canEdit={true}`.
- [[EmployeeDashboard]]: Incorpora o componente na aba `escala` com `canEdit={false}`.

## Como funciona
1. **Geração dos Dias do Mês (`daysInMonth`)**:
   - Calcula o número de dias no mês com `new Date(selectedYear, selectedMonth + 1, 0).getDate()`.
   - Mapeia um array com número do dia, dia da semana (Dom, Seg, Ter...), flags `isWeekend`, `isSunday`, `isToday` e string formatada de data `YYYY-MM-DD`.
2. **Filtragem de Colaboradores (`filteredUsers`)**:
   - Filtra apenas usuários com role `funcionario` ou `gestor`.
   - Se o usuário for gestor, exibe apenas os membros da sua própria unidade (`unit_id`).
3. **Edição Interativa de Células**:
   - Se `canEdit === true`, o clique em uma célula abre uma modal de edição.
   - O gestor pode alterar o turno (Almoço, Jantar, Intermediário), intervalo de horas (ex: `08:00 - 16:00`), marcar folga (`isOff = true`) e adicionar observações.
   - Ao confirmar, dispara `db.saveWorkSchedules(updatedSchedules)` e atualiza o estado local.

## O que pode quebrar se ele for alterado
- Erros no cálculo do `daysInMonth` podem ocultar os últimos dias do mês (ex: dia 31) ou desalinhar os dias da semana.
- A desativação do parâmetro `canEdit` impede a gravação de alterações feitas por gestores.

## Arquivos relacionados
- `src/components/MonthlyScheduleMatrix.jsx`
- `src/components/AdminDashboard.jsx`
- `src/components/ManagerDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/services/db.js`
- [[Módulo de Escalas de Trabalho]]
