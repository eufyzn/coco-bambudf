# Fluxo de Gestão de Escala

## O que é
O **Fluxo de Gestão de Escala** mapeia a consulta, alocação e alteração da matriz mensal de horários e folgas dos colaboradores de cada unidade.

## Para que serve
Assegura a cobertura operacional adequada do restaurante (almoço, jantar, intermediário) e garante transparência para os colaboradores consultarem suas jornadas.

## Onde está
Mapeado em:
- `src/components/MonthlyScheduleMatrix.jsx`
- `src/components/ManagerDashboard.jsx`
- `src/components/AdminDashboard.jsx`
- `src/services/db.js`

## Passo a Passo do Fluxo

```
Gestor ou Administrador
  ↓
Acessa Aba Escala (ManagerDashboard / AdminDashboard)
  ↓
Selecione Mês / Ano / Unidade (MonthlyScheduleMatrix.jsx)
  ↓
Matriz calcula dias do mês (daysInMonth) e carrega colaboradores (filteredUsers)
  ↓
Clique na célula do Colaborador + Dia desejado
  ↓
Modal de Edição (Define Turno, Horário, Folga ou Nota)
  ↓
Confirma Alteração
  ↓
Gravação em DB (saveWorkSchedules em db.js) -> Atualização do LocalStorage
  ↓
Funcionário (EmployeeDashboard.jsx -> Aba Escala)
  ↓
Visualiza matriz atualizada em modo de leitura (canEdit = false)
```

1. **Seleção de Período**: O usuário seleciona o ano e o mês desejados nos controles do topo de [[MonthlyScheduleMatrix]].
2. **Cálculo da Grade**: O componente calcula a lista de dias do mês e filtra os colaboradores pertencentes àquela unidade.
3. **Edição Interativa**: Se `canEdit === true`, ao clicar em uma célula abre-se a modal de ajuste de horário.
4. **Persistência**: Ao clicar em salvar, executa `db.saveWorkSchedules`, que atualiza ou insere o registro correspondente na tabela `work_schedules`.
5. **Consulta do Colaborador**: O colaborador acessa sua aba de escala em [[EmployeeDashboard]] para consultar seus horários e folgas.

## O que pode quebrar se ele for alterado
- Se a chave única composta (`user_id` + `date`) não for respeitada na gravação, registros duplicados de escala poderão ser criados para o mesmo colaborador no mesmo dia.

## Arquivos relacionados
- `src/components/MonthlyScheduleMatrix.jsx`
- `src/components/ManagerDashboard.jsx`
- `src/components/AdminDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/services/db.js`
- [[Módulo de Escalas de Trabalho]]
