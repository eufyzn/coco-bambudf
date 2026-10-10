# Fluxo de Autenticação

## O que é
O **Fluxo de Autenticação** descreve a sequência detalhada de passos desde o momento em que o usuário acessa a aplicação, insere suas credenciais de login, até a resolução do seu perfil e exibição da dashboard correspondente.

## Para que serve
Garante a validação segura da identidade do colaborador, estabelecendo a sessão ativa e carregando seus dados de papel (`role`), unidade e setor para autorização de recursos.

## Onde está
Mapeado nos componentes:
- `src/App.jsx`
- `src/components/Login.jsx`
- `src/services/supabase.js`

## Do que depende
- **Supabase Auth API** (`signInWithPassword`, `getSession`, `onAuthStateChange`).
- **Tabela `profiles`** no Supabase.

## Quem depende dele
- Todo o ciclo de vida da aplicação depende do sucesso deste fluxo para liberar a navegação.

## Passo a Passo do Fluxo

```
Usuário (Navegador)
  ↓
Interface Login (Login.jsx)
  ↓
Valida E-mail e Senha
  ↓
Supabase Auth Service (signInWithPassword)
  ↓
Consulta Tabela profiles (select com joins de unit, department, position)
  ↓
Valida status do usuário (status === 'active')
  ↓
App.jsx (setCurrentUser com dados do perfil)
  ↓
Sidebar.jsx (Renderiza itens da Role) + Dashboard Específica (Employee / Manager / Admin)
```

1. **Tentativa de Acesso**: O usuário abre a aplicação. O componente [[App]] verifica se há uma sessão persistida no Supabase via `getSession()`.
2. **Formulário de Login**: Se não houver sessão, a tela [[Login]] é exibida. O usuário digita seu e-mail e senha.
3. **Autenticação no Supabase**: A função `handleLogin` invoca `supabase.auth.signInWithPassword({ email, password })`.
4. **Resolução de Perfil**: Em caso de credenciais válidas, consulta a tabela `profiles` onde `id` equivale ao `user.id` retornado pelo Auth.
5. **Verificação de Status**: Confirma se `profile.status === 'active'`. Se estiver inativo, encerra a sessão com `signOut()` e exibe alerta.
6. **Definição de Estado Global**: Executa o callback `onLoginSuccess(profile)`, definindo `currentUser` no componente [[App]].
7. **Redirecionamento**: A interface renderiza a [[Sidebar]] e a dashboard adequada ao papel (`funcionario`, `gestor` ou `admin`).

## O que pode quebrar se ele for alterado
- Credenciais inválidas exibem a mensagem `"E-mail ou senha inválidos."`.
- Ausência de perfil na tabela `profiles` bloqueia o login com a mensagem `"Perfil não encontrado. Contate o administrador."`.

## Arquivos relacionados
- `src/App.jsx`
- `src/components/Login.jsx`
- `src/services/supabase.js`
- [[Supabase Service]]
- [[Módulo de Autenticação e Sessão]]
