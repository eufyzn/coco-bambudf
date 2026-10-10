# Decisão de Transição Supabase x Mock

## O que é
A **Decisão de Transição Supabase x Mock** registra a estratégia arquitetural híbrida adotada no projeto, onde a camada de Autenticação e Gestão de Usuários já utiliza o banco real Supabase Cloud PostgreSQL, enquanto as tabelas de domínio operacional continuam utilizando o serviço mock local em `localStorage` (`LocalSupabaseMock`).

## Contexto
O projeto evoluiu a partir de um protótipo local com dados mockados em `localStorage`. Para implantar um controle de acesso corporativo real sem interromper as funcionalidades em teste, optou-se pela migração progressiva em etapas.

## Justificativa e Razoes da Decisão
1. **Segurança no Acesso de Usuários**: A autenticação real via Supabase Auth garante que senhas não fiquem expostas em texto plano e permite controle de recuperação via e-mail.
2. **Desenvolvimento Agil sem Bloqueio**: Permite que a equipe teste e valide a experiência do usuário em exames, relatórios e escalas com dados semente ricamente populados em `db.js` sem exigir infraestrutura completa de produção configurada para todas as 15 tabelas no Supabase inicial.
3. **Plano de Migração Transparente**: O esquema relacional do `schema_completo.sql` foi desenhado com 100% de paridade em relação às estruturas do `db.js`, facilitando a substituição futura das chamadas `db.getAll()` por chamadas `supabase.from()`.

## Consequências
- **Positivas**: Agilidade no desenvolvimento e flexibilidade para demonstrações off-line.
- **Negativas**: Apenas o login e o perfil são sincronizados na nuvem. Dados operacionais (atividades criadas, escalas editadas) ficam restritos ao armazenamento do navegador em que foram inseridos.

## Arquivos Relacionados
- `src/services/supabase.js`
- `src/services/db.js`
- `src/App.jsx`
- `src/components/Login.jsx`
- [[Supabase Service]]
- [[DB Service Mock]]
- [[Modelo de Dados e Tabelas]]
