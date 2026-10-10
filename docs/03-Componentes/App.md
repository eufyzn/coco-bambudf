# Componente App

## O que é
O **App** (`src/App.jsx`) é o componente contêiner raiz da aplicação React Coco Bambu.

## Para que serve
Atua como orquestrador principal da aplicação. Gerencia o estado do colaborador autenticado (`currentUser`), a aba ativa de navegação (`currentTab`), a lista de notificações do usuário, a central de avisos (toasts) e a renderização condicional entre a tela de [[Login]] e o layout principal com a [[Sidebar]].

## Onde está
Arquivo: `src/App.jsx`.

## Do que depende
- **React Core**: `useState`, `useEffect`.
- **Lucide React**: Ícones `Bell`, `GraduationCap`, `X`, `Check`.
- **[[Supabase Service]]**: `supabase` (para checagem de sessão e listener de auth).
- **Componentes Filhos**: [[Login]], [[Sidebar]], [[EmployeeDashboard]], [[ManagerDashboard]], [[AdminDashboard]].
- **Estilos**: Variables de CSS em `src/index.css` e `src/App.css`.

## Quem depende dele
- `src/main.jsx`: Importa e renderiza o `<App />` dentro do elemento `root` do DOM HTML.

## Como funciona
1. **Hook Inicial (`useEffect`)**:
   - Executa `supabase.auth.getSession()` para carregar a sessão salva.
   - Se autenticado, consulta a tabela `profiles` juntamente com as relações de `units`, `departments` e `positions`. Se o perfil estiver `active`, define `currentUser`.
   - Inscreve um listener `supabase.auth.onAuthStateChange`. Caso ocorra evento `SIGNED_OUT`, limpa o usuário e reseta a aba para `dashboard`.
2. **Navegação & Notificações**:
   - Carrega as notificações do usuário logado na tabela `notifications` do Supabase.
   - Fornece funções para marcar todas as notificações como lidas ou apagar notificações individuais.
3. **Renderização Condicional**:
   - Se `!currentUser`, renderiza o componente `<Login onLoginSuccess={handleLoginSuccess} />`.
   - Se `currentUser` estiver presente:
     - Renderiza o layout principal com `<Sidebar />` no lado esquerdo.
     - Renderiza o topo com o título da aba atual, botão de notificações com badge numérico e avatar do perfil.
     - Avalia `currentUser.role` para renderizar a dashboard adequada:
       - `funcionario` -> `<EmployeeDashboard />`
       - `gestor` -> `<ManagerDashboard />`
       - `admin` -> `<AdminDashboard />`

## O que pode quebrar se ele for alterado
- Se a prop `currentTab` ou `setCurrentTab` deixar de ser repassada aos componentes filhos, a navegação entre abas ficará travada.
- Erros na lógica de verificação da role (`currentUser.role`) podem impedir a renderização da dashboard correta ou causar telas em branco.
- A remoção do listener de `onAuthStateChange` pode manter dados da sessão anterior visíveis após o logout.

## Arquivos relacionados
- `src/main.jsx`
- `src/App.jsx`
- `src/components/Login.jsx`
- `src/components/Sidebar.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/components/ManagerDashboard.jsx`
- `src/components/AdminDashboard.jsx`
- `src/services/supabase.js`
- [[Supabase Service]]
