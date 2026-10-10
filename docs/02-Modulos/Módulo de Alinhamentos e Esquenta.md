# Módulo de Alinhamentos e Esquenta

## O que é
O **Módulo de Alinhamentos e Esquenta** é a ferramenta de registro de reuniões diárias rápidas ("Esquenta") realizadas pelos gestores com as equipes de salão, cozinha e bar antes do início de cada turno.

## Para que serve
Registra as orientações operacionais, metas do dia, pratos em destaque, lembretes de higiene e alinhamentos de velocidade de atendimento, mantendo um histórico auditável do que foi trabalhado com os colaboradores.

## Onde está
Localizado nos componentes:
- `src/components/ManagerDashboard.jsx` (aba `esquenta`: formulário de criação e lista de registros)
- `src/components/EmployeeDashboard.jsx` (visualização de reuniões concluídas do seu setor)
- `src/services/db.js` (tabela `warmups`)

## Do que depende
- **Tabela `warmups`** em [[DB Service Mock]]: Armazena `id`, `title`, `theme`, `sector_id`, `date`, `shift`, `duration`, `content`, `guide_id`, `notes`, `manager_id`, `status`, `unit_id`, `date_created`.
- **[[Módulo de Gestão de Conteúdo e Conhecimento]]**: Para vinculação opcional a um manual operacional (`guide_id`).

## Quem depende dele
- [[ManagerDashboard]]: Gestores utilizam este módulo diariamente no início dos turnos de Almoço e Jantar.
- [[EmployeeDashboard]]: Colaboradores consultam as pautas do Esquenta para relembrar as metas e direcionamentos combinados.

## Como funciona
1. O gestor acessa a aba "Esquenta" em [[ManagerDashboard]] e clica em "Novo Esquenta".
2. Preenche título, tema, setor responsável, turno (Almoço/Jantar), duração (ex: 10 min), resumo da conversa e seleciona o Guia Operacional de referência.
3. Ao salvar, o sistema grava o registro com `status = 'completed'` na coleção `warmups`.
4. O registro passa a ser exibido no feed do gestor e nos murais dos colaboradores pertencentes àquele setor e unidade.

## O que pode quebrar se ele for alterado
- A ausência do campo `unit_id` ou `sector_id` no cadastro do Esquenta fará com que o registro não seja exibido nos filtros de funcionários da unidade correspondente.

## Arquivos relacionados
- `src/components/ManagerDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/services/db.js`
- [[DB Service Mock]]
- [[Fluxo de Registro de Esquenta]]
