# Decisão de Controle de Acesso Baseado em Roles

## O que é
A **Decisão de Controle de Acesso Baseado em Roles** (RBAC - Role-Based Access Control) estabelece a divisão estrita de privilégios e visibilidade da aplicação em 3 papéis distintos: `funcionario`, `gestor` e `admin`.

## Contexto
Por tratar-se de um sistema abrangente que envolve desde o treinamento de garçons até a análise estratégica de unidades, o controle de visibilidade deve impedir que colaboradores acessem dados sigilosos ou alterem configurações administrativas.

## Níveis de Acesso Definidos

1. **`funcionario` (Colaborador Operacional)**:
   - Acesso restrito a exames atribuídos, manuais do seu setor, calendário de treinamentos, mural de Esquenta da sua unidade e sua escala pessoal.
   - Não possui permissão para criar ou editar conteúdos.
2. **`gestor` (Gerente de Restaurante / Chefe de Setor)**:
   - Permissão de criação de exames/quizzes, registro de Esquenta, avaliação de desempenho e edição de escala de trabalho para os membros da sua unidade (`unit_id`).
   - Acesso a estatísticas e relatórios de atenção da sua filial.
3. **`admin` (Administrador Geral Corporativo)**:
   - Acesso irrestrito a todas as unidades e setores da rede.
   - Permissão para cadastrar/editar/excluir usuários, filiais, setores, cargos e manuais de conhecimento.

## Justificativa e Razoes da Decisão
- Assegura a integridade operacional e evita contaminação de dados entre filiais (ex: gestor de Teresina não altera escalas da Matriz).
- Simplifica a experiência do usuário, exibindo apenas as ferramentas relevantes para o seu trabalho diário.

## Consequências
- **Positivas**: Interface limpa e segurança de dados reforçada por perfil.
- **Negativas**: Exige validação constante do atributo `role` em todos os níveis de componentes React.

## Arquivos Relacionados
- `src/App.jsx`
- `src/components/Sidebar.jsx`
- `src/components/AdminDashboard.jsx`
- `src/components/ManagerDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- [[App]]
- [[Sidebar]]
