# Decisão de Roteamento por Estado

## O que é
A **Decisão de Roteamento por Estado** documenta a escolha arquitetural de alternar telas e abas na aplicação utilizando o estado React `currentTab` gerenciado no componente raiz [[App]], em vez de utilizar uma biblioteca de roteamento baseada em URLs HTTP (como React Router ou TanStack Router).

## Contexto
O projeto é um portal de aplicação estritamente interna (intranet corporativa e totem de capacitação) para uso dentro das unidades do restaurante Coco Bambu. 

## Justificativa e Razoes da Decisão
1. **Simplicidade de Implantação**: A aplicação opera em ambiente SPA de página única, eliminando a necessidade de tratar reescritas de URL no servidor Web (fallback para `index.html`).
2. **Navegação Síncrona Instantânea**: A troca de abas via estado React permite transições de tela com latência zero e preservação imediata de filtros em memória.
3. **Segurança de Acesso Interno**: Evita a exposição de endpoints ou URLs profundas acessíveis diretamente pela barra de endereços do navegador que pudessem burlar a validação de perfil.

## Consequências
- **Positivas**: Redução de complexidade do projeto (menos dependências no `package.json`), maior controle sobre a renderização condicional por perfil (`role`) e código-fonte compacto.
- **Negativas**: O usuário não consegue compartilhar links diretos para uma aba específica (ex: não existe a URL `/escala`), e o botão "Voltar" do navegador fecha a aplicação ou retorna à página anterior fora do sistema.

## Arquivos Relacionados
- `src/App.jsx`
- `src/components/Sidebar.jsx`
- [[App]]
- [[Sidebar]]
