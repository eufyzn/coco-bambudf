# Componente Sidebar

## O que é
O **Sidebar** (`src/components/Sidebar.jsx`) é o componente de menu de navegação lateral e cabeçalho responsivo para dispositivos móveis.

## Para que serve
Fornece acesso rápido às funcionalidades da aplicação, adaptando dinamicamente as opções exibidas no menu com base no perfil (`role`) do usuário logado (`funcionario`, `gestor`, `admin`), além de exibir a marca da rede Coco Bambu, os dados do perfil do usuário e a ação de logout.

## Onde está
Arquivo: `src/components/Sidebar.jsx`.

## Do que depende
- **React Core**: `useState`, `useEffect`.
- **Lucide React**: 20+ ícones (`LayoutDashboard`, `ClipboardList`, `BookOpen`, `CalendarDays`, `Award`, `TrendingUp`, `User`, `Users`, `Flame`, `FileText`, `Settings`, `Building2`, `Grid`, `Briefcase`, `BarChart3`, `LogOut`, `Menu`, `X`, `Bell`).
- **Assets Públicos**: Logo `/logos_transparent.png`.

## Quem depende dele
- [[App]]: Instancia o `<Sidebar />` no layout principal passando `currentUser`, `currentTab`, `setCurrentTab`, `onLogout`, `notificationsCount`, etc.

## Como funciona
1. **Configuração do Menu por Role (`getMenuItems`)**:
   - `funcionario`: Dashboard, Atividades, Conhecimento, Escala, Capacitações, Meu Progresso, Meu Perfil.
   - `gestor`: Dashboard, Esquenta, Atividades, Minha Equipe, Conhecimento, Escala, Capacitações, Avaliações, Meu Perfil.
   - `admin`: Dashboard, Usuários, Unidades, Setores, Cargos, Conhecimento, Atividades, Capacitações, Escalas, Relatórios, Configurações.
2. **Navegação**: Ao clicar em uma opção, chama `handleTabClick(tabId)` que dispara `setCurrentTab(tabId)` em [[App]] e fecha o menu mobile se aberto.
3. **Responsividade Mobile**:
   - Em telas <= 768px, renderiza uma barra de topo escura (`mobileHeader`) com botão hambúrguer.
   - O menu lateral converte-se em um gaveteiro deslizante (`drawer`) controlado pelo estado `mobileOpen`.
4. **Rodapé do Perfil**: Exibe avatar com as iniciais do nome, badge colorido correspondente ao nível de privilégio (ADMIN/GESTOR/FUNC), nome da unidade e botão de logout.

## O que pode quebrar se ele for alterado
- Se os IDs dos itens de menu (`tabId`) forem renomeados sem ajustar as verificações equivalentes em [[App]], [[AdminDashboard]], [[ManagerDashboard]] e [[EmployeeDashboard]], a troca de abas deixará de carregar as telas correspondentes.
- Alterações nas regras de CSS responsivo podem ocultar a navegação em telas móveis.

## Arquivos relacionados
- `src/App.jsx`
- `src/components/Sidebar.jsx`
- [[App]]
- [[Decisão de Controle de Acesso Baseado em Roles]]
