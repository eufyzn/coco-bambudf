# Módulo de Gestão de Conteúdo e Conhecimento

## O que é
O **Módulo de Gestão de Conteúdo e Conhecimento** é a biblioteca centralizada de documentação técnica, procedimentos operacionais padrão (POPs), manuais de atendimento, regras de segurança alimentar e guias de boas práticas do restaurante.

## Para que serve
Permite que administradores e gestores publiquem manuais e guias de referência para a equipe, garantindo fácil acesso aos padrões operacionais e servindo de base para o cadastramento de quizzes e briefings de Esquenta.

## Onde está
Localizado nos componentes:
- `src/components/AdminDashboard.jsx` (aba `conhecimento`: CRUD completo de documentos)
- `src/components/ManagerDashboard.jsx` (aba `conhecimento`: visualização e associação em treinamentos/atividades)
- `src/components/EmployeeDashboard.jsx` (aba `conhecimento`: leitura e busca de guias do seu setor)
- `src/services/db.js` (tabela `documents`)

## Do que depende
- **Tabela `documents`** em [[DB Service Mock]]: Armazena `id`, `name`, `sector_id`, `unit_id`, `category`, `version`, `date`, `status`, `author_id` e `fileContent`.
- **Tabela `departments`**: Para vinculação dos manuais aos setores (Atendimento, Cozinha, Bar, RH, Gestão).

## Quem depende dele
- [[Módulo de Avaliações e Quizzes]]: Cada questão técnica (`questions`) pode vincular um `guide_id` para explicar o gabarito.
- [[Módulo de Alinhamentos e Esquenta]]: Cada sessão de Esquenta vincula um `guide_id` estudado no turno.
- [[EmployeeDashboard]]: Funcionários leem esses guias para tirar dúvidas operacionais.

## Como funciona
1. **Administradores** podem criar, editar, alterar versão e excluir manuais operacionais através da modal de CRUD em [[AdminDashboard]].
2. **Gestores** acessam a biblioteca para selecionar o guia que apoiará a pauta do Esquenta do dia ou criar perguntas de quiz baseadas no texto do guia.
3. **Funcionários** filtram os manuais disponíveis para seu setor (ou globais) usando a barra de busca em [[EmployeeDashboard]], podendo abrir e ler o conteúdo na íntegra.

## O que pode quebrar se ele for alterado
- A remoção de um documento (`doc-1`, `doc-2`) pode deixar referências órfãs nos campos `guide_id` das tabelas `questions` e `warmups`.
- Alterações no filtro por `sector_id` podem ocultar manuais relevantes para determinados colaboradores.

## Arquivos relacionados
- `src/components/AdminDashboard.jsx`
- `src/components/ManagerDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/services/db.js`
- [[DB Service Mock]]
- [[Modelo de Dados e Tabelas]]
