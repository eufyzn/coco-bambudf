# Fluxo de Atividade e Quiz

## O que é
O **Fluxo de Atividade e Quiz** descreve todo o ciclo de vida de uma prova técnica: desde a criação pelo gestor, notificação dos funcionários, realização interativa pelo colaborador, até a gravação das respostas, correção automatizada e exibição de relatórios.

## Para que serve
Garante a padronização do processo de treinamento e avaliação operacional do restaurante Coco Bambu.

## Onde está
Mapeado em:
- `src/components/ManagerDashboard.jsx` (criação e acompanhamento)
- `src/components/EmployeeDashboard.jsx` (execução da prova e feedback)
- `src/services/db.js` (processamento síncrono no banco mock)

## Passo a Passo do Fluxo

```
Gestor (ManagerDashboard.jsx)
  ↓
Cria Atividade + Cadastra Questões (Manual / Importação / IA)
  ↓
Salva em DB (activities com status = 'published' + questions)
  ↓
Gera Notificações na Tabela (notifications)
  ↓
Funcionário (EmployeeDashboard.jsx -> Aba Atividades)
  ↓
Clica em "Iniciar Prova" (startExam)
  ↓
Responde Questões de Múltipla Escolha (A, B, C, D)
  ↓
Submete Prova (submitActivity em db.js)
  ↓
Gravação em activity_assignments e answers + Cálculo de Nota
  ↓
Exibição de Resultado com Explicação Pedagógica + Notificação para o Gestor
```

1. **Criação da Atividade**: O gestor define título, setor, prazo e inclui as questões no componente [[ManagerDashboard]].
2. **Publicação**: Ao salvar, a atividade é gravada no banco `activities` e gera notificações para os funcionários alvos.
3. **Notificação**: O colaborador visualiza o alerta numérico no botão de notificações no topo do app.
4. **Execução**: No [[EmployeeDashboard]], o colaborador clica em "Iniciar Prova". O app recupera as questões de `questions` filtrando por `activity_id`.
5. **Seleção de Opções**: O colaborador responde cada pergunta. As respostas são armazenadas temporariamente no estado `selectedAnswers`.
6. **Submissão e Correção (`submitActivity`)**:
   - O objeto `db` compara a opção escolhida pelo colaborador com o gabarito `correct_option`.
   - Grava cada tentativa na tabela `answers`.
   - Registra a nota final em `activity_assignments` (ex: `score = 9`, `status = 'completed'`).
   - Grava notificação automática para o gestor informando a nota obtida pelo funcionário.
7. **Feedback e Estatísticas**: A tela exibe a nota final do colaborador com explicações pedagógicas. Os resultados são consolidados no dashboard do gestor em "Pontos de Atenção".

## O que pode quebrar se ele for alterado
- Se uma prova for excluída enquanto um colaborador a estiver realizando, a submissão final falhará com erro de chave estrangeira em `submitActivity`.

## Arquivos relacionados
- `src/components/ManagerDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/services/db.js`
- [[DB Service Mock]]
- [[Módulo de Avaliações e Quizzes]]
