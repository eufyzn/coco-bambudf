# DB Service Mock

## O que é
O **DB Service Mock** (`src/services/db.js`) é a camada de persistência local e simulação de banco de dados orientada a `localStorage` que gerencia a maior parte dos dados operacionais da aplicação.

## Para que serve
Fornece métodos síncronos de leitura, gravação, exclusão, seeding inicial de dados e agregação de estatísticas para todas as funcionalidades de negócio (atividades, manuais, escalas, esquenta, avaliações) sem depender exclusivamente de chamadas HTTP.

## Onde está
Arquivo: `src/services/db.js`.

## Do que depende
- API nativa `localStorage` do navegador.
- Prefixo constante de chave `DB_KEY_PREFIX = 'capybara_academy_'`.

## Quem depende dele
- [[AdminDashboard]]: Para relatórios globais (`getAdminStats`), CRUD de usuários, unidades, setores e cargos.
- [[ManagerDashboard]]: Para métricas da unidade (`getManagerStats`), criação de atividades e registro de Esquenta.
- [[EmployeeDashboard]]: Para busca de exames (`getEmployeeActivities`), envio de respostas (`submitActivity`) e leitura de manuais.
- [[MonthlyScheduleMatrix]]: Para consulta e gravação das escalas de trabalho (`saveWorkSchedules`).

## Como funciona
1. **Classe `LocalSupabaseMock`**:
   - No construtor, executa `init()` que verifica a existência das 15 tabelas mock no `localStorage`.
   - Caso uma chave não exista, popula com o array de dados default (`checkAndSeed`).
2. **Métodos Genéricos CRUD**:
   - `getAll(table)`: Retorna a lista de registros gravados.
   - `getById(table, id)`: Busca um elemento pelo ID.
   - `save(table, item)`: Cria um novo registro com ID gerado via timestamp se não existir, ou atualiza o registro existente.
   - `delete(table, id)`: Remove o elemento da coleção.
3. **Regras de Negócio e Relacionamentos Complexos**:
   - `getEmployeeActivities(userId)`: Faz join entre atividades publicadas e o status da atribuição do colaborador.
   - `submitActivity(userId, activityId, answersList)`: Calcula o score da prova (ex: 8/10), grava cada resposta em `answers`, altera o status para `completed` e envia uma notificação para o gestor.
   - `getManagerStats(managerId)`: Agrega o engajamento da equipe e identifica os 5 maiores pontos de atenção (questões com maior erro).
   - `getAdminStats()`: Calcula promediadas gerais da rede e desmembramento por unidade.

## O que pode quebrar se ele for alterado
- Limpar o `localStorage` do navegador forçará a execução do `seed` inicial, substituindo dados criados manualmente durante os testes.
- Alterar o nome das tabelas manipuladas pelos métodos internos interromperá os joins de dados nas dashboards.

## Arquivos relacionados
- `src/services/db.js`
- `src/components/AdminDashboard.jsx`
- `src/components/ManagerDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/components/MonthlyScheduleMatrix.jsx`
- [[Modelo de Dados e Tabelas]]
