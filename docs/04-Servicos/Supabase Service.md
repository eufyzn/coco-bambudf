# Supabase Service

## O que é
O **Supabase Service** (`src/services/supabase.js`) é o módulo de integração que inicializa e exporta a instância do cliente JavaScript oficial do Supabase (`@supabase/supabase-js`).

## Para que serve
Fornece o ponto único de conexão para serviços de autenticação remota (`supabase.auth`) e operações de consulta no banco de dados em nuvem PostgreSQL (`supabase.from('profiles')`).

## Onde está
Arquivo: `src/services/supabase.js`.

## Do que depende
- Biblioteca npm `@supabase/supabase-js`.
- Variáveis de ambiente declaradas no arquivo `.env`:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## Quem depende dele
- `src/App.jsx`: Para verificação de sessão (`getSession`), inscrição em eventos de auth (`onAuthStateChange`) e logout (`signOut`).
- `src/components/Login.jsx`: Para autenticação por senha (`signInWithPassword`) e solicitação de redefinição de senha (`resetPasswordForEmail`).

## Como funciona
1. Lê as variáveis de ambiente utilizando a sintaxe do Vite: `import.meta.env.VITE_SUPABASE_URL` e `import.meta.env.VITE_SUPABASE_ANON_KEY`.
2. Valida se ambas as variáveis estão presentes. Caso alguma esteja indefinida ou vazia, lança um erro amigável: `"Variaveis de ambiente do Supabase nao encontradas. Verifique o arquivo .env na raiz do projeto."`.
3. Instancia e exporta o cliente:
   ```javascript
   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

## O que pode quebrar se ele for alterado
- Se as chaves no arquivo `.env` estiverem incorretas ou trocadas entre URL e Anon Key, qualquer requisição de login ou verificação de sessão resultará em falhas de rede ou erro `401 Unauthorized`.
- Alterações na exportação nomeada `supabase` impedirão a compilação do projeto em `App.jsx` e `Login.jsx`.

## Arquivos relacionados
- `src/services/supabase.js`
- `.env`
- `src/App.jsx`
- `src/components/Login.jsx`
- [[Módulo de Autenticação e Sessão]]
- [[Fluxo de Autenticação]]
