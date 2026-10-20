# Artes de Instagram — Taskcheck

60 artes de feed (1080 × 1350 px, proporção 4:5) para 30 dias de publicação, com duas postagens por dia.

## Estrutura

```
Artes Instagram/
├── saida/            60 PNGs prontos para publicação
├── gerador/
│   ├── posts.js      conteúdo dos 60 posts (título, bullets, legenda, hashtags)
│   ├── build.mjs     renderizador: monta o HTML e captura o PNG via Chrome headless
│   └── tmp/          HTMLs intermediários (pode apagar)
├── LEGENDAS.md       legenda + hashtags de cada post
├── CALENDARIO.md     calendário de 30 dias com dia, horário e arte
└── README.md
```

## Como gerar novamente

```bash
node gerador/build.mjs
```

Gerar apenas alguns posts (pelo número):

```bash
node gerador/build.mjs 12 27 41
```

Gerar apenas os HTMLs, sem capturar imagem (útil para ajustar layout no navegador):

```bash
node gerador/build.mjs --html
```

Requisitos: Node.js e Google Chrome (ou Microsoft Edge) instalados. O script localiza o
navegador automaticamente nos caminhos padrão do Windows.

## Como alterar o conteúdo

Todo o texto está em `gerador/posts.js`. Cada post é um objeto com o template (`tpl`), os
campos daquele template e a legenda. Editar o texto e rodar o build novamente recria a arte.

Use `\n` no campo `titulo` para forçar a quebra de linha exatamente onde você quer.

## Carrosséis fixados no perfil

Três carrosséis de 7 slides para fixar no topo do perfil, nesta ordem:

| # | Pasta | Objetivo |
|---|---|---|
| 1 | `saida-carrosseis/1-o-que-e-o-taskcheck` | Apresentar o produto para quem chega no perfil |
| 2 | `saida-carrosseis/2-como-funciona-na-pratica` | Mostrar um atendimento tela por tela |
| 3 | `saida-carrosseis/3-para-quem-e` | Segmentos atendidos e chamada para demonstração |

O conteúdo está em `gerador/carrosseis.js` e usa os mesmos templates dos posts de feed.
O gerador acrescenta em cada slide o contador de página e a dica "Arraste" (menos no último).
Cada pasta tem também um `legenda.txt` com a legenda e as hashtags.

```bash
node gerador/carrossel.mjs        # todos
node gerador/carrossel.mjs 2      # só o carrossel 2
```

Publicação manual pelo app do Instagram: novo post, selecionar os 7 PNGs em ordem, colar a
legenda e, depois de publicado, usar "Fixar no perfil". O último fixado aparece primeiro na
grade: fixe o 3, depois o 2 e por último o 1, para que o "O que é o Taskcheck?" abra o perfil.

## Templates disponíveis

| `tpl` | Uso |
|---|---|
| `feature` | Recurso da plataforma, com bullets e print do aplicativo |
| `vs` | Comparativo "hoje" x "com o Taskcheck" |
| `frase` | Frase de impacto em fundo escuro |
| `pergunta` | Pergunta do cliente ou do gestor, com balões e resposta |
| `numero` | Número ou estatística em destaque |
| `lista` | Grade de chips (listas longas de capacidades) |
| `jornada` | Linha do tempo numerada |
| `checklist` | Simulação de checklist com perguntas dependentes |
| `mito` | Mito x verdade (quebra de objeção) |
| `dica` | Dica numerada de gestão em campo |
| `depoimento` | Citação em fundo escuro |
| `print` | Print do aplicativo em destaque com callouts |
| `segmento` | Segmento de mercado atendido |
| `cta` | Chamada para demonstração |

## Identidade usada

- Cor principal `#0f918f`, acento `#2bbfa5`, fundo escuro `#080d1a`
- Tipografia Inter (carregada do Google Fonts no momento da renderização)
- Logo e prints vindos de `Site/assets/img/`

## Distribuição do conteúdo

| Pilar | Posts |
|---|---|
| Recursos da plataforma | 21 |
| Antes x depois / dor | 10 |
| Posicionamento e frases | 5 |
| Prova e números | 5 |
| Produto (prints e jornadas) | 8 |
| Segmentos atendidos | 4 |
| Educacional (dicas) | 4 |
| Objeção, depoimento e conversão | 3 |

## Observações

- Os dois depoimentos são ilustrativos e estão marcados como tal na arte e na legenda.
  Substitua por relatos reais assim que houver autorização dos clientes.
- Os valores e números usados nas artes de estatística são referências de operação,
  não promessas de resultado.
