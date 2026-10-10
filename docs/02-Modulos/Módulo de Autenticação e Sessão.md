# Módulo de Autenticação e Sessão

## O que é
O **Módulo de Autenticação e Sessão** é o subsistema responsável por gerenciar a entrada de usuários na aplicação, verificação de credenciais, manutenção da sessão ativa, recuperação de senhas e desconexão segura.

## Para que serve
Garante que apenas colaboradores autorizados da Rede Coco Bambu acessem as informações internas, restringindo as funcionalidades e dados visualizados conforme o nível de acesso (`funcionario`, `gestor`, `admin`).

## Onde está
Está distribuído nos arquivos:
- `src/components/Login.jsx` (interface de login e recuperação de senha)
- `src/App.jsx` (listener de sessão do Supabase)
- `src/services/supabase.js` (cliente HTTP do Supabase Auth)
- `src/services/db.js` (fallback mock de autenticação em `localStorage`)

## Do que depende
- **Supabase Auth API**: Métodos `signInWithPassword`, `signOut`, `getSession`, `onAuthStateChange` e `resetPasswordForEmail`.
- **Tabela `profiles`**: Tabela no banco Supabase que vincula o `id` do usuário Auth com a unidade (`unit_id`), setor (`department_id`), cargo (`position_id`) e papel (`role`).

## Quem depende dele
- [[App]]: Necessita do objeto `currentUser` para decidir se exibe a tela de login ou a estrutura principal da aplicação.
- [[Sidebar]]: Depende do atributo `role` e `unit_id` de `currentUser` para filtrar os itens do menu.
- [[AdminDashboard]], [[ManagerDashboard]] e [[EmployeeDashboard]]: Todos consomem o `currentUser` como prop para filtrar dados de unidade e setor.

## Como funciona
1. Ao carregar a aplicação, [[App]] executa `supabase.auth.getSession()`.
2. Se houver uma sessão válida, consulta a tabela `profiles` via `supabase.from('profiles').select('*, units(name), departments(name), positions(name)')`.
3. Se o perfil estiver com status `active`, armazena no estado `currentUser`.
4. Caso não haja sessão, a tela [[Login]] é exibida.
5. Em [[Login]], o formulário envia credenciais para `supabase.auth.signInWithPassword({ email, password })`. Se for bem-sucedido, busca o perfil correspondente e aciona a callback `onLoginSuccess`.
6. Ao clicar em "Sair do Portal" na [[Sidebar]], a função `handleLogout` em [[App]] executa `supabase.auth.signOut()` e reseta `currentUser` para `null`.

## O que pode quebrar se ele for alterado
- Credenciais inválidas ou ausência das variáveis `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` impedem o login.
- Alterações no esquema da tabela `profiles` ou no campo `status` podem bloquear o acesso de usuários ativos.
- Falhas no evento `onAuthStateChange` podem deixar a interface em estado inconsistente após o logout.

## Arquivos relacionados
- `src/components/Login.jsx`
- `src/App.jsx`
- `src/services/supabase.js`
- `src/services/db.js`
- [[Supabase Service]]
- [[Fluxo de Autenticação]]
