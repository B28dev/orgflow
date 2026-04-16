# ACAMA-STOCK — CONTEXTO MESTRE DO PROJETO

> Documento de contexto canônico do projeto **Acama-Stock**.
>
> Este arquivo foi escrito para servir como **fonte de contexto para humanos, agentes de IA e LLMs**.
> A intenção é que qualquer executor técnico, arquiteto, product designer, engenheiro de software ou modelo de linguagem consiga entender rapidamente:
>
> * o que é o produto;
> * por que ele existe;
> * qual problema resolve;
> * quem usa;
> * o que já foi decidido;
> * o que já foi construído;
> * qual é o roadmap atual;
> * o que está dentro e fora da V1;
> * quais princípios arquiteturais e de UX não devem ser violados.

---

# 1. IDENTIFICAÇÃO DO PROJETO

## Nome do produto

**Acama-Stock**

## Empresa / operação atual

**ACAME**

## Natureza do produto

Sistema interno de **controle de estoque com registro de movimentações operacionais**.

## Estágio atual

Produto em construção, com:

* fundação conceitual definida;
* base visual e navegação criadas;
* domínio ajustado para trabalhar com movimentações;
* tela principal de estoque ainda não implementada de forma funcional completa.

## Visão estratégica

Hoje o Acama-Stock resolve um problema real da **ACAME**.
No futuro, se a solução se provar útil e consistente, ela pode evoluir para um **produto reutilizável e comercializável** para outras empresas e operações.

---

# 2. RESUMO EXECUTIVO

O **Acama-Stock** foi concebido para substituir um cenário em que **não existe controle seguro, simples e confiável sobre o estoque atual**.

O objetivo do sistema é permitir que a equipe responsável pelo depósito registre o fluxo real de materiais, incluindo:

* o que entrou;
* o que saiu;
* o que foi ajustado manualmente;
* qual é o saldo atual de cada item.

Ao mesmo tempo, o sistema deve permitir que gestores acompanhem o estado do estoque com clareza por meio de histórico e dashboard.

O produto **não deve ter cara de ERP pesado**, nem de sistema velho ou burocrático.
Ele deve parecer:

* simples;
* rápido;
* organizado;
* confiável;
* profissional;
* fácil de entender mesmo para pessoas com pouca intimidade com software.

---

# 3. PROBLEMA DE NEGÓCIO

## Situação atual

A operação da ACAME não possui hoje um controle seguro do estoque presente.
Isso implica risco de:

* desorganização;
* perda de rastreabilidade;
* dificuldade para entender o fluxo real dos materiais;
* falha na reposição;
* dificuldade de gestão;
* dependência excessiva de memória ou controles informais.

## Problema principal que o produto resolve

O sistema deve organizar o estoque de forma que a operação consiga:

* ver rapidamente o que existe;
* atualizar quantidades com facilidade;
* documentar entradas e saídas;
* manter histórico do que aconteceu;
* dar ao gestor uma visão clara do fluxo.

## Tradução prática do valor do produto

O Acama-Stock deve responder com clareza perguntas como:

* O que temos em estoque agora?
* O que entrou hoje?
* O que foi distribuído ou usado?
* O que foi ajustado manualmente?
* Quais itens estão em falta ou em alerta?
* Como o item chegou no saldo atual?

---

# 4. VISÃO DE PRODUTO

## Definição curta

O **Acama-Stock** é um sistema de controle de estoque com foco em **operação simples** e **documentação de movimentações**.

## Definição ampliada

O Acama-Stock **não é apenas um contador de quantidades atuais**.
Ele é um sistema que trabalha com duas camadas complementares:

### 4.1 Estado atual

Representa o saldo atual de cada item em estoque.

### 4.2 Fluxo histórico

Representa o conjunto de movimentações que explicam como o item chegou naquele saldo.

Essas movimentações incluem:

* entradas;
* saídas;
* ajustes;
* cadastro inicial;
* remoção ou inativação.

## Tese de produto

A leitura correta do Acama-Stock é:

**“um produto simples para operação diária, mas com espinha dorsal séria o suficiente para sustentar histórico, gestão e futura evolução para produto escalável.”**

---

# 5. USUÁRIOS E CONTEXTOS DE USO

## 5.1 Usuário principal — Operação

Perfil:

* pessoal do depósito;
* equipe que manipula os materiais no dia a dia;
* usuários que precisam registrar entradas, saídas e ajustes.

Necessidades:

* rapidez;
* clareza;
* poucos toques;
* interface intuitiva;
* baixa curva de aprendizado;
* baixa densidade visual no celular.

Contexto de uso provável:

* celular;
* rotina operacional;
* pouco tempo para aprender;
* necessidade de atualizar itens rapidamente.

## 5.2 Usuário secundário — Acompanhamento

Perfil:

* recepção;
* gestor;
* responsável por acompanhamento da situação do estoque.

Necessidades:

* visão resumida e gerencial;
* histórico legível;
* leitura de alertas;
* acompanhamento de fluxo;
* mais contexto no desktop.

Contexto de uso provável:

* computador da recepção;
* desktop ou notebook;
* análise e acompanhamento mais contemplativos do que operacionais.

---

# 6. PRINCÍPIOS DE EXPERIÊNCIA E UX

## 6.1 Mobile-first real

O produto deve ser pensado primeiro para operação em celular.

Isso implica:

* botões grandes;
* poucos elementos por tela;
* uma coluna principal;
* pouca dependência de texto longo;
* interações rápidas;
* baixa carga cognitiva.

## 6.2 Desktop-enhanced

O sistema deve aproveitar o desktop para ampliar a leitura gerencial, mas **sem criar outro produto separado**.

A lógica e o domínio são os mesmos.
O que muda no desktop é:

* densidade de informação;
* distribuição dos blocos;
* composição visual;
* profundidade do acompanhamento.

## 6.3 Um produto, duas densidades de interface

Esta é uma regra importante:

* **não existem dois sistemas independentes**;
* existe um só produto;
* com a mesma base de dados e lógica;
* mas com diferentes níveis de detalhamento conforme o contexto de uso.

## 6.4 Clareza operacional acima de enfeite

O sistema deve ser visualmente bom, moderno e confiável.
Mas nunca pode sacrificar operação em nome de estética.

Deve evitar:

* hero sections desnecessárias;
* aparência conceitual demais;
* painéis cenográficos;
* excesso de informação;
* formulários intimidadoras;
* brilho, glow e efeitos exagerados.

## 6.5 Histórico é parte do produto, não detalhe

Toda decisão futura deve considerar que o valor do produto não está só no saldo atual, mas no fato de que o sistema **documenta o fluxo**.

---

# 7. PRINCÍPIOS ESTRATÉGICOS DE ARQUITETURA

## 7.1 V1 enxuta, mas pronta para crescer

A V1 deve ser simples o suficiente para validar rápido.
Porém, a base não deve ser improvisada a ponto de impedir evolução futura.

## 7.2 Construir para ACAME hoje, sem prender o produto à ACAME amanhã

Mesmo sendo um sistema nascido para um caso real, as decisões devem evitar hardcoding de nicho, linguagem ou modelagem excessivamente específicas.

## 7.3 Regras de domínio devem existir fora da interface

A interface não deve ser a fonte de verdade da lógica.
Regras como:

* estoque baixo;
* tipos de movimentação;
* relação entre saldo e histórico;
* classificação de status;

precisam estar modeladas de forma centralizada e previsível.

## 7.4 Estrutura SaaS-ready sem inflar a V1

Ainda não há multiempresa, billing ou autenticação.
Mesmo assim, a modelagem deve ser limpa o suficiente para suportar no futuro:

* company/tenant;
* usuários;
* autoria de movimentações;
* múltiplos depósitos;
* relatórios;
* camadas de acesso.

---

# 8. DECISÕES DE DOMÍNIO JÁ FECHADAS

## 8.1 O sistema documenta movimentações

O Acama-Stock deve registrar explicitamente movimentações como parte central do modelo.

## 8.2 Tipos de movimentação da V1

Os tipos oficiais de movimentação definidos para a V1 são:

* `entrada`
* `saida`
* `ajuste`
* `cadastro`
* `remocao`

### Significado operacional

* **entrada** = mercadoria recebida / entregue ao estoque
* **saida** = mercadoria distribuída / usada
* **ajuste** = correção manual de quantidade
* **cadastro** = criação inicial do item
* **remocao** = exclusão ou inativação do item

## 8.3 Regra operacional futura da interface

Regra já decidida para a UI funcional:

* botão **+** = registra `entrada`
* botão **-** = registra `saida`
* editar o número manualmente = registra `ajuste`

## 8.4 Saldo atual

O saldo atual do item é entendido como resultado das movimentações.
A interface pode manter `quantidadeAtual` como dado materializado para facilitar operação, mas conceitualmente esse valor deriva do fluxo documentado.

---

# 9. MODELAGEM CONCEITUAL DO DOMÍNIO

## 9.1 Produto

Um produto representa um item controlado no estoque.

### Campos conceituais mínimos

* identificador único;
* nome;
* categoria;
* unidade;
* quantidade atual;
* estoque mínimo;
* observações;
* status ativo/inativo;
* data de criação;
* data de atualização.

### Possíveis extensões futuras

* código interno;
* empresa/tenant;
* localização/deposito;
* fornecedor;
* ponto de reposição avançado;
* rastreio de responsável.

## 9.2 Movimentação

Uma movimentação representa um evento operacional que altera ou documenta o estado de um item.

### Campos mínimos definidos para a V1

* `id`
* `productId`
* `type`
* `quantityChanged`
* `previousQuantity`
* `resultingQuantity`
* `reason` ou `note` (opcional)
* `createdAt`

### Campos previstos para futuro

* `companyId`
* `performedBy`
* `source`
* `metadata`

## 9.3 Categoria

Categoria deve existir como **entidade controlada**, e não como texto livre solto dentro de cada item.

### Decisão importante

As categorias:

* não são rígidas por nicho;
* não devem ser engessadas;
* não devem ser campo livre totalmente descontrolado por item.

### Estratégia adotada

* existem categorias iniciais sugeridas;
* o gestor poderá criar novas categorias;
* categorias serão gerenciáveis;
* o produto não deve nascer preso ao nicho da ACAME.

### Estrutura conceitual mínima da categoria

* `id`
* `name`
* `isActive`
* `createdAt`

---

# 10. REGRAS DE NEGÓCIO IMPORTANTES

## 10.1 Estoque mínimo

Existe uma regra de estoque baixo já definida na fundação.

Regra base:

* item entra em estado crítico/baixo quando `quantidadeAtual <= estoqueMinimo`

## 10.2 Status visual de estoque

A interface futura utilizará sinalização por cor com a seguinte lógica:

* **vermelho** = baixo / crítico
* **amarelo** = atenção
* **verde** = ok

A regra intermediária de “atenção” foi concebida para ser algo próximo de:

* crítico: `currentQuantity <= minimumStock`
* atenção: `currentQuantity > minimumStock && currentQuantity <= minimumStock * 2`
* ok: `currentQuantity > minimumStock * 2`

Essa lógica deve ficar centralizada em helper/util quando a tela funcional for implementada.

## 10.3 Quantidade nunca negativa

Toda interação operacional futura deve respeitar que a quantidade não pode cair abaixo de zero.

## 10.4 Toda alteração relevante deve ser rastreável

A visão de produto assume que qualquer alteração estrutural do saldo deve gerar ou derivar de uma movimentação documentada.

---

# 11. DIREÇÃO VISUAL E ORGANIZACIONAL DECIDIDA

## 11.1 Direção visual oficial

A direção visual oficial do Acame-Stock foi refinada.

### Base visual confirmada

* **fundo principal branco**;
* superfícies claras;
* bordas suaves;
* tipografia escura para leitura forte;
* **verde institucional da ACAME (`#50AC54`) como cor principal de destaque**.

### Regra de cor atual

Neste momento, a identidade deve trabalhar principalmente com:

* **branco**;
* **verde `#50AC54`**.

Ainda não foi decidido abrir uma paleta mais ampla de branding dentro do produto.
O azul institucional e a aplicação da logo ficam para um momento posterior de branding mais fino, se necessário.

### Uso correto do verde

O verde deve aparecer principalmente em:

* botões primários;
* item ativo da navegação;
* títulos e labels importantes;
* focus ring;
* pequenos destaques institucionais;
* badges positivos ou informativos.

### O que evitar

* fundo escuro como base principal;
* grandes áreas chapadas de verde;
* visual gamer/tech dark;
* brilho e glow;
* excesso de peso visual;
* dashboard com aparência dramática.

## 11.2 Direção organizacional oficial

A referência mais recente enviada pelo usuário **não será usada pela estética**, mas sim pela **organização estrutural do dashboard desktop**.

### O que deve ser absorvido da referência

* sidebar estável à esquerda;
* área principal com cabeçalho contextual;
* faixa de resumo no topo;
* grid gerencial abaixo;
* hierarquia clara de leitura;
* sensação de produto organizado e previsível.

### O que NÃO deve ser absorvido da referência

* paleta escura;
* estilo visual futurista;
* glow/vermelho/dark;
* módulos específicos daquele produto;
* clima de dashboard gamer.

## 11.3 Modelo organizacional aprovado para o dashboard desktop

O dashboard desktop deve seguir a seguinte ordem estrutural:

```text
Sidebar esquerda fixa
→ Header contextual da página
→ Linha de cards-resumo
→ Grid principal com blocos gerenciais
→ Conteúdo secundário abaixo, se necessário
```

### Sidebar

A sidebar deve ter 3 zonas claras:

* topo com nome do sistema;
* navegação principal no centro;
* configurações/informações secundárias no rodapé.

### Header da área principal

Cada área principal deve começar com:

* título;
* subtítulo curto;
* possíveis ações secundárias.

### Primeira faixa do dashboard

No desktop, a leitura deve começar com uma linha de resumo rápido, com itens como:

* total de produtos;
* itens em alerta;
* entradas do período;
* saídas do período;
* ajustes do período.

### Grid principal abaixo

Depois dos resumos, o dashboard deve organizar blocos como:

* itens em alerta;
* movimentações recentes;
* resumo por categoria;
* visão geral do estoque;
* produtos mais movimentados.

## 11.4 Nome interno desta direção

Esta organização pode ser entendida internamente como:

**sidebar + header + summary row + analytical grid**

Ou, em linguagem mais simples:

**dashboard administrativo clássico, claro e bem hierarquizado**.

# 12. DIFERENÇA ENTRE MOBILE E DESKTOP

## Regra central

O Acame-Stock é um produto só.
Não devem existir duas aplicações independentes.

## 12.1 Mobile

O mobile deve privilegiar:

* operação rápida;
* busca;
* lista de itens;
* stepper `- / +`;
* edição simples;
* pouco texto;
* poucos blocos por tela.

No mobile, o dashboard deve ser resumido.
Ele não precisa replicar a densidade do desktop.

### Dashboard no mobile

Deve mostrar apenas o essencial, por exemplo:

* total de produtos;
* itens em alerta;
* entradas do período;
* saídas do período;
* atalho claro para ir ao Estoque.

## 12.2 Desktop

O desktop deve privilegiar:

* leitura gerencial;
* visão simultânea de mais blocos;
* dashboard mais completo;
* histórico mais legível;
* melhor uso do espaço horizontal.

## 12.3 Dashboard como área de leitura

Ficou decidido que o dashboard desktop deve ser encarado como uma área de leitura administrativa e gerencial.

Ele deve priorizar:

* ordem estrutural;
* hierarquia clara;
* resumo rápido no topo;
* grid de módulos bem distribuído.

## 12.4 Dashboard futuro como home

Também foi amadurecida a decisão de que o sistema deve futuramente abrir no **Dashboard** como página inicial, e não diretamente no Estoque.

Isso reforça:

* leitura gerencial no desktop;
* percepção de produto mais maduro;
* separação entre home gerencial e área operacional de estoque.

A área de Estoque continua sendo o espaço principal de ação rápida.

# 13. ESTRUTURA DE NAVEGAÇÃO DA V1

As quatro áreas principais da V1 são:

* **Estoque**
* **Cadastrar**
* **Histórico**
* **Dashboard**

## 13.1 Estoque

Tela principal operacional.
Responsável por:

* exibir itens;
* permitir busca;
* permitir filtro;
* permitir ajuste rápido de quantidade;
* mostrar status de estoque.

## 13.2 Cadastrar

Tela de criação/edição de itens.
Responsável por:

* cadastrar produto;
* editar produto;
* remover ou inativar;
* futuramente permitir categoria existente ou criação de nova.

## 13.3 Histórico

Tela de rastreabilidade.
Responsável por:

* mostrar entradas;
* mostrar saídas;
* mostrar ajustes;
* mostrar cadastro e remoção;
* permitir leitura cronológica e filtros.

## 13.4 Dashboard

Tela de acompanhamento gerencial.
Responsável por:

* mostrar situação geral do estoque;
* destacar alertas;
* resumir movimentações;
* ajudar tomada de decisão de reposição e acompanhamento.

---

# 14. ROADMAP V1 ATUALIZADO

## Etapa 0 — Definição base do produto

**Status:** concluída.

### Objetivo

Alinhar a estrutura antes de desenhar telas.

### O que contemplou

* nome do produto/projeto;
* categorias iniciais;
* campos obrigatórios do produto;
* regra de estoque baixo;
* 4 áreas de navegação.

---

## Etapa 0.1 — Ajuste da fundação de movimentações

**Status:** concluída.

### Objetivo

Atualizar a base funcional para refletir o fluxo operacional do estoque.

### O que contemplou

* tipos de movimentação;
* relação entre saldo atual e movimentações;
* regra `+ / - / edição manual`;
* campos de movimentação;
* histórico operacional como parte central da V1;
* nome atualizado do produto para **Acame-Stock**;
* contexto da **ACAME**;
* categorias como sugeridas + gerenciáveis.

---

## Etapa 1 — Base visual + navegação

**Status:** concluída.

### Objetivo

Criar a casca do app sem lógica pesada.

### O que contemplou

* estrutura mobile-first;
* AppShell;
* TopBar;
* navegação inferior mobile;
* sidebar desktop;
* padrão visual base;
* estados de loading, vazio e erro;
* telas base navegáveis.

---

## Etapa 1.1 — Simplificação operacional da interface

**Status:** concluída.

### Objetivo

Ajustar a base visual para linguagem mais operacional.

### O que contemplou

* base visual mais sóbria;
* estoque mais direto;
* cadastro menos técnico;
* histórico mais rastreável visualmente;
* dashboard melhor diferenciado entre mobile e desktop;
* redução da sensação de complexidade.

---

## Etapa 1.2 — Reorganização arquitetural do dashboard/home

**Status:** próxima etapa.

### Objetivo

Melhorar a arquitetura de leitura do dashboard desktop, deixando a home mais organizada, previsível e gerencial.

### Escopo

* reorganizar o dashboard desktop com estrutura clara;
* usar a referência recente apenas como base de organização estrutural;
* estruturar o desktop em:

  * sidebar fixa à esquerda;
  * header contextual na área principal;
  * linha de cards-resumo no topo;
  * grid principal com módulos gerenciais;
* prever o dashboard como home futura do sistema;
* manter a área de Estoque como espaço principal de ação operacional;
* manter o mobile mais resumido e direto.

### Observações importantes

* esta etapa é de **arquitetura organizacional**, não de estética dark;
* a estética escura da referência não deve ser copiada;
* a base visual da ACAME continua sendo clara, branca e com verde `#50AC54` em detalhes.

### Critério de pronto

O desktop deve deixar de parecer solto/jogado e passar a parecer um produto administrativo bem organizado.

---

## Etapa 2 — Tela principal: Estoque / Prateleira

**Status:** próxima após a reorganização do dashboard/home.

### Objetivo

Entregar a parte mais importante do sistema.

### Escopo

* lista de produtos;
* busca por nome;
* filtro por categoria;
* card operacional;
* stepper `- quantidade +`;
* edição do número por toque/clique;
* destaque visual de status;
* empty state contextual;
* feedback visual imediato.

### Critério de pronto

O funcionário deve conseguir olhar para a tela, encontrar um item e atualizar sua quantidade sem esforço.

---

## Etapa 2.1 — Motor de movimentação e saldo

**Status:** futura, logo após Etapa 2.

### Objetivo

Fazer a interface da prateleira gerar movimentações estruturadas.

### Escopo

* `+` registra entrada;
* `-` registra saída;
* edição manual registra ajuste;
* armazenar quantidade anterior e resultante;
* registrar data/hora;
* atualizar saldo;
* preparar integração com histórico.

---

## Etapa 3 — Cadastro e edição de produto

**Status:** futura.

### Objetivo

Permitir manter o estoque vivo.

### Escopo

* criar item;
* editar item;
* remover ou inativar item;
* validar campos;
* feedback de sucesso/erro;
* registrar cadastro e remoção no histórico;
* incluir de forma clara o campo de estoque mínimo / limite crítico por produto.

---

## Etapa 4 — Histórico de movimentações

**Status:** futura.

### Objetivo

Dar rastreabilidade ao estoque.

### Escopo

* exibir entradas;
* exibir saídas;
* exibir ajustes;
* exibir cadastro e remoção;
* busca/filtro;
* ordenação cronológica;
* exibição de quantidade anterior e resultante.

---

## Etapa 5 — Dashboard do gestor

**Status:** futura.

### Objetivo

Transformar operação em leitura gerencial.

### Escopo

* total de produtos;
* total de unidades;
* entradas no período;
* saídas no período;
* ajustes no período;
* itens em alerta;
* movimentações recentes;
* resumo por categoria;
* itens mais movimentados.

### Gráficos previstos para esta etapa

Foi decidido que, no futuro dashboard, poderão existir gráficos como:

* gráfico de barras para entradas vs saídas no período;
* gráfico de linha para evolução do fluxo;
* gráfico de pizza/donut para distribuição por categoria;
* barras horizontais para produtos mais movimentados.

### Observação

Os gráficos só devem entrar quando o histórico real e as movimentações estiverem alimentando o sistema com dados confiáveis.

---

## Etapa 5.1 — Relatório diário / exportação de movimentações

**Status:** opcional pós-V1 núcleo.

### Objetivo

Gerar documentação consolidada do dia.

### Escopo possível

* consolidar movimentações por data;
* mostrar entradas, saídas e ajustes do dia;
* mostrar itens em alerta;
* gerar PDF do resumo diário.

### Observação

Tratar como **V1.1**, não como núcleo obrigatório da primeira entrega.

---

## Etapa 6 — Polimento da V1

**Status:** futura.

### Objetivo

Deixar o sistema pronto para uso real.

### Escopo

* revisão de responsividade;
* revisão de acessibilidade;
* revisão de linguagem;
* revisão dos estados vazios e de erro;
* consistência visual;
* clareza da sinalização por cor;
* preparação para backend futuro;
* preparação para login na V2.

---

## Ordem prática atual

A ordem atual recomendada fica assim:

1. **Etapa 1.2 — Reorganização arquitetural do dashboard/home**
2. **Etapa 2 — Estoque / Prateleira**
3. **Etapa 2.1 — Motor de movimentação e saldo**
4. **Etapa 3 — Cadastro e edição**
5. **Etapa 4 — Histórico**
6. **Etapa 5 — Dashboard do gestor com dados reais**
7. **Etapa 6 — Polimento**
8. **Etapa 5.1 — Relatório diário em PDF**, se for priorizado logo após o núcleo

# 15. O QUE JÁ EXISTE NO FRONTEND

A base atual em `stock-flow/frontend` já contempla:

* React + Vite + TypeScript;
* Tailwind CSS;
* Lucide React;
* React Router;
* AppShell responsivo;
* TopBar;
* navegação inferior mobile-first;
* sidebar desktop;
* 4 telas base navegáveis;
* fonte de verdade sendo consumida pelo frontend;
* design tokens centralizados;
* componentes primitivos reutilizáveis;
* estados reutilizáveis de loading, empty e error;
* refinamento visual mais operacional realizado.

## Situação atual do frontend

A base está pronta para que a **EstoqueScreen** se torne a primeira área realmente funcional do sistema.

---

# 16. O QUE ESTÁ FORA DA V1 NÚCLEO

Os itens abaixo **não fazem parte do núcleo imediato da V1**:

* login;
* perfis de acesso;
* múltiplos depósitos;
* relatórios avançados;
* exportação complexa de Excel/PDF além do relatório diário simples;
* notificações automáticas;
* controle por usuário responsável.

Esses itens podem ser previstos arquiteturalmente, mas não devem inflar a implementação atual.

---

# 17. REGRAS PARA FUTUROS EXECUTORES / LLMs

Qualquer LLM, agente executor ou desenvolvedor que continuar este projeto deve respeitar as seguintes regras:

## 17.1 Não inflar a V1

A simplicidade operacional é um requisito, não uma limitação temporária.

## 17.2 Não transformar o produto em ERP genérico pesado

O produto deve parecer ferramenta de uso diário, e não sistema corporativo burocrático.

## 17.3 Não esquecer que movimentação é parte central do domínio

Qualquer implementação futura da prateleira deve ser preparada para alimentar histórico e dashboard.

## 17.4 Não prender o produto a categorias fixas de um nicho só

Categorias devem continuar gerenciáveis.

## 17.5 Não criar mobile e desktop como aplicações separadas

A regra é um produto só, com densidades de interface diferentes.

## 17.6 Não sacrificar clareza em nome de sofisticação visual

UX operacional vem antes do espetáculo visual.

## 17.7 Centralizar regras importantes

Regras de status, movimentação e domínio não devem ficar espalhadas em JSX ou em várias telas sem critério.

---

# 18. LEITURA RÁPIDA PARA UM LLM QUE ESTÁ ENTRANDO AGORA

Se você é um agente de IA ou LLM recebendo este projeto agora, aqui está o resumo mínimo que precisa ser entendido:

1. O projeto se chama **Acama-Stock** e atende a **ACAME**.
2. É um sistema de estoque com **registro de movimentações**, não apenas contador de itens.
3. O usuário principal é o pessoal do depósito; o gestor acompanha mais pelo desktop.
4. O produto é **mobile-first para operação** e **desktop-enhanced para gestão**.
5. A interface deve ser simples, moderna e operacional.
6. As etapas **0, 0.1, 1 e 1.1 já foram concluídas**.
7. A próxima etapa é a **Etapa 2 — Tela Estoque / Prateleira**.
8. Nessa etapa, a meta é implementar lista, busca, filtro, stepper e edição de quantidade.
9. A etapa seguinte, **2.1**, fará essas ações gerarem movimentações reais.
10. Categorias são sugeridas inicialmente, mas devem ser gerenciáveis e customizáveis.
11. O produto pode futuramente virar negócio, então a base deve continuar limpa e escalável.

---

# 19. PRÓXIMO PASSO RECOMENDADO

O próximo passo ideal no roadmap é:

## **Etapa 1.2 — Reorganização arquitetural do dashboard/home**

Antes de aprofundar a prateleira funcional, o sistema deve melhorar a arquitetura do dashboard desktop para que a home deixe de parecer solta e passe a parecer um produto administrativo claro, organizado e previsível.

### Esta etapa deve focar em:

* sidebar fixa à esquerda;
* header contextual da área principal;
* cards-resumo no topo;
* grid gerencial abaixo;
* dashboard desktop com leitura melhor organizada;
* dashboard mobile mais resumido;
* preservação da área de Estoque como espaço principal de ação rápida.

### Importante

* a referência recente deve ser usada apenas na **organização**;
* a estética escura da referência não deve ser trazida;
* a base visual continua branca com detalhes em verde `#50AC54`.

Depois disso, o caminho natural é:

* Etapa 2 — Estoque / Prateleira
* Etapa 2.1 — Motor de movimentação e saldo
* Etapas seguintes do roadmap

# 20. RESUMO FINAL

O **Acame-Stock** é o sistema de controle de estoque da **ACAME**, criado para organizar a operação de materiais com simplicidade, rapidez e rastreabilidade.

O produto já passou por:

* definição base do domínio;
* ajuste de movimentações;
* criação da base visual e navegação;
* simplificação operacional da interface.

Além disso, ficaram salvas as seguintes decisões recentes:

* a estética base do sistema deve ser **clara**;
* o **branco** será o fundo principal do produto;
* o **verde `#50AC54`** será a principal cor institucional de detalhe;
* a referência mais recente de dashboard será usada apenas como **modelo organizacional**, não como modelo estético;
* no futuro, o dashboard poderá receber gráficos, incluindo barras, linha e pizza/donut, quando houver dados confiáveis de movimentação.

O próximo passo oficial do projeto passa a ser:

## **Etapa 1.2 — Reorganização arquitetural do dashboard/home**

A prioridade agora é melhorar a arquitetura de leitura do dashboard desktop para que a home do sistema pareça madura, organizada e gerencial.

Depois disso, o projeto avança para a prateleira funcional, o motor de movimentações e as demais etapas da V1.
