# Componente EmployeeDashboard

## O que é
O **EmployeeDashboard** (`src/components/EmployeeDashboard.jsx`) é a interface operacional para o perfil `funcionario` (garçons, cozinheiros, barmans, recepcionistas).

## Para que serve
Permite que o colaborador realize provas técnicas e quizzes pendentes, consulte a biblioteca de conhecimento e manuais do seu setor, acompanhe os treinamentos agendados, veja as pautas dos alinhamentos de Esquenta, consulte sua escala de trabalho pessoal e acompanhe seu histórico de progresso.

## Onde está
Arquivo: `src/components/EmployeeDashboard.jsx`.

## Do que depende
- **React Core**: `useState`, `useEffect`.
- **Lucide React**: Ícones de aprendizagem (`Award`, `BookOpen`, `Calendar`, `CheckCircle`, `Clock`, `FileText`, `HelpCircle`, `Play`, `Search`, `TrendingUp`, etc.).
- **[[DB Service Mock]]**: Instância `db` para obter exames (`getEmployeeActivities`), submeter respostas (`submitActivity`) e buscar guias e escalas.
- **Componente Filho**: [[MonthlyScheduleMatrix]].

## Quem depende dele
- [[App]]: Renderiza o `<EmployeeDashboard />` quando `currentUser.role === 'funcionario'`.

## Como funciona
1. **Atividades e Provas (`startExam`)**:
   - Ao iniciar uma prova, carrega as perguntas ordenadas pela propriedade `question_index`.
   - Apresenta uma tela de exame passo a passo (uma questão por vez).
   - Registra a alternativa selecionada no estado `selectedAnswers`.
   - Ao finalizar, invoca `db.submitActivity(currentUser.id, activity.id, answersList)`, exibindo imediatamente o resultado obtido (nota ex: 9/10) e a explicação de cada alternativa incorreta.
2. **Biblioteca de Conhecimento (`conhecimento`)**:
   - Filtra os manuais (`documents`) que pertençam ao setor do funcionário (`sector_id === currentUser.department_id`) ou que sejam globais (`sector_id === ''`).
   - Permite visualizar o documento completo na tela.
3. **Minha Escala (`escala`)**:
   - Renderiza `<MonthlyScheduleMatrix currentUser={currentUser} canEdit={false} />`, desabilitando edições de células.

## O que pode quebrar se ele for alterado
- Se o método `submitActivity` for modificado ou falhar, a tentativa de submissão do exame deixará o colaborador preso na tela de prova.
- Mudanças no filtro de permissões de documentos podem impedir que garçons ou cozinheiros acessem os manuais do seu próprio setor.

## Arquivos relacionados
- `src/App.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/components/MonthlyScheduleMatrix.jsx`
- `src/services/db.js`
- [[DB Service Mock]]
- [[Módulo de Avaliações e Quizzes]]
