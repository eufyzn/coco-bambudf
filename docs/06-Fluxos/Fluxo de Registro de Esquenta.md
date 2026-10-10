# Fluxo de Registro de Esquenta

## O que é
O **Fluxo de Registro de Esquenta** detalha a rotina de elaboração e acompanhamento dos briefings diários realizados pelas lideranças com as equipes operacionais.

## Para que serve
Garante o alinhamento de procedimentos e metas antes da abertura dos turnos de almoço e jantar.

## Onde está
Mapeado em:
- `src/components/ManagerDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/services/db.js`

## Passo a Passo do Fluxo

```
Gestor de Restaurante / Chefe de Setor
  ↓
Acessa Aba Esquenta (ManagerDashboard.jsx)
  ↓
Clica em "Novo Esquenta"
  ↓
Preenche Título, Tema, Setor, Turno (Almoço/Jantar), Duração e Observações
  ↓
Seleciona Guia de Conhecimento de Apoio (guide_id)
  ↓
Clica em "Salvar Esquenta"
  ↓
Gravação em DB (warmups com status = 'completed') -> db.save('warmups', newWarmup)
  ↓
Feed do Gestor exibe o card do alinhamento realizado
  ↓
Mural do Colaborador (EmployeeDashboard.jsx) exibe o Esquenta do seu setor/unidade
```

1. **Abertura do Formulário**: O gestor clica no botão de inclusão na aba Esquenta de [[ManagerDashboard]].
2. **Definição de Pauta**: Informa o tema da reunião (ex: "Velocidade no Serviço de Bebidas"), o setor alvo (ex: Atendimento) e o turno (Almoço ou Jantar).
3. **Vínculo com o Conhecimento**: Seleciona o manual operacional de referência cadastrado na biblioteca `documents`.
4. **Gravação**: O sistema grava o registro com `unit_id = currentUser.unit_id` e `status = 'completed'` no banco `warmups`.
5. **Disponibilização**: Os colaboradores daquela unidade e setor conseguem visualizar as observações e o manual estudado em seu painel.

## O que pode quebrar se ele for alterado
- Se o campo `guide_id` for omitido ou apontar para um manual inexistente, a tentativa de abrir o guia associado na interface do colaborador resultará em erro.

## Arquivos relacionados
- `src/components/ManagerDashboard.jsx`
- `src/components/EmployeeDashboard.jsx`
- `src/services/db.js`
- [[Módulo de Alinhamentos e Esquenta]]
