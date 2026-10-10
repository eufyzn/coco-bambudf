# Módulo de Avaliações e Quizzes

## O que é
O **Módulo de Avaliações e Quizzes** é o mecanismo de ensino e verificação de conhecimentos operacionais. Permite a criação de exames teóricos com múltiplas escolhas, atribuição para colaboradores, execução interativa e cálculo de notas com justificativa pedagógica.

## Para que serve
Capacita e avalia os colaboradores em tópicos cruciais da operação (como atendimento, vendas sugestivas, higienização e segurança alimentar), gerando notas individuais e estatísticas de erros para os gestores.

## Onde está
Localizado em:
- `src/components/ManagerDashboard.jsx` (criação de exames, questões, importação de texto e geração por IA)
- `src/components/EmployeeDashboard.jsx` (interface de realização do quiz e visualização de resultados)
- `src/components/AdminDashboard.jsx` (visão geral de atividades publicadas e relatórios)
- `src/services/db.js` (tabelas `activities`, `questions`, `activity_assignments`, `answers` e método `submitActivity`)

## Do que depende
- **Tabelas do Banco Mock**: `activities`, `questions`, `activity_assignments`, `answers`.
- **[[DB Service Mock]]**: Métodos `getEmployeeActivities`, `submitActivity`, `getAssignmentDetails`.

## Quem depende dele
- [[Módulo de Relatórios e Desempenho]]: Consome as notas de `activity_assignments` e a taxa de erro em `answers` para gerar indicadores de atenção.
- [[EmployeeDashboard]]: Renderiza a prova questão por questão e exibe o feedback final.

## Como funciona
1. **Criação**: O gestor abre a modal de criação em [[ManagerDashboard]], define título, prazo, setor e cadastra as questões (ou importa via texto/IA).
2. **Atribuição & Notificação**: A atividade é salva com `status = 'published'`, gerando notificações na tabela `notifications` para a equipe.
3. **Execução**: O funcionário acessa a aba "Atividades" em [[EmployeeDashboard]], seleciona a prova e responde as perguntas de múltipla escolha (A, B, C, D).
4. **Submissão & Correção**: Ao finalizar, o método `submitActivity` em `db.js` compara as respostas com `correct_option`, grava os registros em `answers`, calcula a nota total (ex: 8/10), marca o status como `completed` e cria notificação para o gestor.
5. **Revisão Pedagogica**: O colaborador visualiza o resultado e a explicação detalhada de cada questão baseada no manual de referência.

## O que pode quebrar se ele for alterado
- Incompatibilidades entre o índice da questão (`question_index`) ou chave das alternativas (A, B, C, D) e o gabarito `correct_option` podem gerar correções errôneas.
- Se o método `submitActivity` falhar ao salvar `answers`, os relatórios de pontos de atenção do gestor ficarão em branco.

## Arquivos relacionados
- `src/components/ManagerDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/services/db.js`
- [[DB Service Mock]]
- [[Fluxo de Atividade e Quiz]]
