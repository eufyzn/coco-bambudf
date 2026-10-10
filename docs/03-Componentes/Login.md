# Componente Login

## O que é
O **Login** (`src/components/Login.jsx`) é a tela de autenticação e acesso inicial do usuário à aplicação.

## Para que serve
Permite que os colaboradores façam login utilizando e-mail e senha, solicitem a recuperação de senha via e-mail e possibilita a rápida comutação entre credenciais de teste para fins de avaliação através de um painel demonstrativo oculto.

## Onde está
Arquivo: `src/components/Login.jsx`.

## Do que depende
- **React Core**: `useState`.
- **Lucide React**: Ícones `Mail`, `Lock`, `Eye`, `EyeOff`, `X`, `CheckCircle`, `ArrowRight`, `User`, `Sparkles`, `ShieldCheck`, `Users`.
- **[[Supabase Service]]**: `supabase` (para os métodos `signInWithPassword` e `resetPasswordForEmail`).
- **Assets Públicos**: `/cocobambu_hero_pro.jpg`, `/logos_transparent.png`.

## Quem depende dele
- [[App]]: Exibe o `<Login />` como tela primária caso não exista um usuário autenticado em `currentUser`.

## Como funciona
1. **Fluxo de Login (`handleLogin`)**:
   - Valida o preenchimento dos campos de e-mail e senha.
   - Executa `supabase.auth.signInWithPassword({ email, password })`.
   - Em caso de sucesso, consulta a tabela `profiles` no Supabase via `supabase.from('profiles').select('*, units(name), departments(name), positions(name)').eq('id', data.user.id).single()`.
   - Se o perfil for retornado e possuir `status === 'active'`, dispara o callback `onLoginSuccess(profile)`.
2. **Esqueci Minha Senha (`handleForgotPassword`)**:
   - Solicita o e-mail cadastrado e executa `supabase.auth.resetPasswordForEmail(forgotEmail, { redirectTo: window.location.origin })`.
3. **Painel Flutuante Demo (`showDemoPanel`)**:
   - Ao clicar no ícone circular verde de usuário no card de login, abre um painel superior com credenciais pré-configuradas para os papéis de `admin@cocobambu.com`, `gerente.teresina@cocobambu.com`, `gerente.matriz@cocobambu.com` e `garcom1@cocobambu.com`.

## O que pode quebrar se ele for alterado
- Se o formato de retorno da consulta da tabela `profiles` for modificado (ex: nomes de colunas alterados no Supabase), o login pode falhar com a mensagem "Perfil não encontrado".
- Modificações na chamada de `onLoginSuccess` em [[App]] impedirão a transição de estado após o login bem-sucedido.

## Arquivos relacionados
- `src/App.jsx`
- `src/components/Login.jsx`
- `src/services/supabase.js`
- [[Supabase Service]]
- [[Fluxo de Autenticação]]
