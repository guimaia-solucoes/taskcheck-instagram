// Carrosséis para fixar no topo do perfil do Instagram.
// Cada slide usa os mesmos templates dos posts de feed (ver build.mjs).
// O contador de página e a dica "Arraste" são adicionados pelo carrossel.mjs.

const CONTATO = '(11) 93933-0887';
const SITE = 'taskcheck.app';

const ctaFinal = {
  tpl: 'cta',
  tag: 'Demonstração',
  titulo: 'Vamos ver isso\nna sua operação?',
  sub: 'Agende uma demonstração e conheça a plataforma com o cenário real da sua empresa.',
  itens: ['Plataforma web para o gestor', 'Aplicativo para o técnico', 'Implantação acompanhada'],
  contato: CONTATO,
};

export const carrosseis = [
  // ───────────────────────── 1. O QUE É ─────────────────────────
  {
    id: 1,
    nome: 'o-que-e-o-taskcheck',
    slides: [
      {
        tpl: 'frase',
        tag: 'Comece por aqui',
        titulo: 'O que é o\nTaskcheck?',
        sub: 'A plataforma que conecta gestor, técnico e cliente em cada atendimento em campo.',
      },
      {
        tpl: 'vs',
        tag: 'O problema',
        titulo: 'Equipe na rua,\ngestão no escuro',
        antesTitulo: 'Sem sistema',
        antes: ['OS combinada no grupo do WhatsApp', 'Checklist no papel, digitado depois', 'Ninguém sabe onde o técnico está', 'Relatório montado à mão no fim do dia'],
        depoisTitulo: 'Com o Taskcheck',
        depois: ['OS criada, atribuída e acompanhada', 'Checklist e fotos direto no app', 'Mapa da equipe em tempo real', 'Relatório em PDF gerado na hora'],
      },
      {
        tpl: 'feature',
        tag: 'Ordem de Serviço',
        titulo: 'A OS digital\nde ponta a ponta',
        sub: 'Tudo o que acontece no campo fica registrado na Ordem de Serviço.',
        itens: ['Dados do cliente e do equipamento', 'Fotos, checklists e ocorrências', 'Materiais consumidos e peças', 'Assinatura do cliente e PDF'],
        print: 'app-atividades-da-os',
      },
      {
        tpl: 'feature',
        tag: 'Mapa em tempo real',
        titulo: 'Saiba onde sua\nequipe está agora',
        sub: 'Sem ligar para ninguém. Sem perguntar no grupo.',
        itens: ['Técnicos no mapa', 'Quem está livre, em percurso ou atendendo', 'Chegada e saída registradas'],
        print: 'app-mapa-oss',
      },
      {
        tpl: 'feature',
        tag: 'Offline First',
        titulo: 'Sem internet?\nO atendimento continua.',
        sub: 'O técnico não para porque ficou sem sinal.',
        itens: ['Check-in, checklist, fotos e assinatura offline', 'Sincroniza sozinho quando o sinal volta', 'Nada é digitado de novo'],
        print: 'app-tarefas-a-sincronizar',
        dark: true,
      },
      {
        tpl: 'numero',
        tag: 'Fechamento do atendimento',
        lead: 'Serviço feito. E o relatório para o cliente?',
        numero: '1',
        unidade: 'clique',
        titulo: 'para gerar o relatório\nda OS com a sua marca',
        sub: 'Serviços, materiais, fotos, checklists e assinatura do cliente no PDF pronto para enviar.',
      },
      ctaFinal,
    ],
    legenda: `Novo por aqui? Comece por este post. 👋

O Taskcheck é uma plataforma de gestão de serviços em campo. Ela conecta o gestor no escritório, o técnico na rua e o cliente que está esperando o atendimento.

Arraste para ver:
→ o problema que a gente resolve
→ a Ordem de Serviço digital
→ o mapa da equipe em tempo real
→ o atendimento que continua sem internet
→ o relatório em PDF gerado em um clique

Quer ver na sua operação? Fale com a gente no WhatsApp ${CONTATO} ou acesse ${SITE}`,
    tags: 'os',
  },

  // ───────────────────────── 2. COMO FUNCIONA ─────────────────────────
  {
    id: 2,
    nome: 'como-funciona-na-pratica',
    slides: [
      {
        tpl: 'frase',
        tag: 'Passo a passo',
        titulo: 'Como funciona\nna prática',
        sub: 'Um atendimento em campo do chamado ao relatório, tela por tela.',
      },
      {
        tpl: 'jornada',
        tag: 'Jornada do serviço',
        titulo: 'Do chamado ao\nfechamento da OS',
        etapas: [
          { t: 'Chamado', d: 'Receba e organize as solicitações' },
          { t: 'Ordem de Serviço', d: 'Crie a OS e programe o atendimento' },
          { t: 'Agenda', d: 'Escolha o técnico e monte o dia' },
          { t: 'Percurso', d: 'O técnico sai e o gestor acompanha' },
          { t: 'Execução', d: 'Check-in, checklist, fotos e consumo' },
          { t: 'Comprovação', d: 'Assinatura, checkout e PDF da OS' },
        ],
      },
      {
        tpl: 'print',
        tag: 'Passo 1 · Agenda',
        titulo: 'O técnico abre\no app e vê o dia',
        sub: 'Horário, cliente, endereço e prioridade de cada atendimento.',
        print: 'app-listagem-oss',
        callouts: ['Todas as OSs do dia', 'Prioridade e status', 'Endereço com navegação'],
      },
      {
        tpl: 'print',
        tag: 'Passo 2 · Percurso',
        titulo: 'Sai para o cliente\ncom um toque',
        sub: 'O app abre o Waze ou o Google Maps com o destino preenchido.',
        print: 'app-waze-googlemaps',
        callouts: ['Percurso registrado', 'Gestor acompanha no mapa', 'Cliente sabe que ele saiu'],
      },
      {
        tpl: 'checklist',
        tag: 'Passo 3 · Execução',
        titulo: 'Checklist que se\nadapta ao serviço',
        sub: 'Perguntas que abrem novas perguntas, com foto no ponto certo.',
        linhas: [
          { t: 'O equipamento apresenta vazamento?', v: 'Sim', tipo: 'sim' },
          { t: 'Onde está o vazamento?', v: 'Linha de líquido', tipo: 'dep' },
          { t: 'Registro fotográfico do ponto', v: '2 fotos vinculadas', tipo: 'foto' },
          { t: 'Pressões dentro do especificado?', v: 'Aprovado', tipo: 'ok' },
        ],
      },
      {
        tpl: 'print',
        tag: 'Passo 4 · Comprovação',
        titulo: 'Assinatura do\ncliente na tela',
        sub: 'Checkout feito, relatório da OS pronto para enviar em PDF.',
        print: 'app-assinatura-cliente',
        callouts: ['Assinatura no celular', 'Horário de saída registrado', 'PDF com a sua marca'],
      },
      ctaFinal,
    ],
    legenda: `Como é um atendimento com o Taskcheck, do começo ao fim? 👇

1. O técnico abre o app e vê a agenda do dia
2. Um toque abre o Waze ou o Google Maps, e o percurso fica registrado
3. No cliente, faz check-in e preenche o checklist com fotos
4. O cliente assina na tela e o relatório em PDF sai pronto

Enquanto isso, o gestor acompanha tudo em tempo real, sem ligar para ninguém.

Salve este post para mostrar para a sua equipe. Quer ver ao vivo? WhatsApp ${CONTATO}`,
    tags: 'tec',
  },

  // ───────────────────────── 3. PARA QUEM É ─────────────────────────
  {
    id: 3,
    nome: 'para-quem-e',
    slides: [
      {
        tpl: 'frase',
        tag: 'Para quem é',
        titulo: 'Feito para quem\ncoloca equipe\nna rua',
        sub: 'Veja se a sua operação está aqui.',
      },
      {
        tpl: 'segmento',
        tag: 'Segmentos atendidos',
        titulo: 'Climatização\ne Refrigeração',
        sub: 'Instalação, manutenção e PMOC com evidência em cada visita.',
        itens: ['Checklist PMOC com perguntas dependentes', 'Registro fotográfico por item', 'Gás, filtros e peças baixados do estoque', 'Histórico por equipamento e número de série'],
      },
      {
        tpl: 'segmento',
        tag: 'Segmentos atendidos',
        titulo: 'Manutenção Predial\ne Facilities',
        sub: 'Preventiva programada, corretiva e inspeções sob controle.',
        itens: ['Contratos e preventivas programadas', 'Checklists por tipo de inspeção', 'Vários técnicos, vários prédios, uma agenda', 'Relatório por cliente com evidências'],
      },
      {
        tpl: 'segmento',
        tag: 'Segmentos atendidos',
        titulo: 'Assistência\nTécnica',
        sub: 'Atendimento, garantia e histórico do equipamento em um lugar só.',
        itens: ['Histórico por equipamento e número de série', 'Peças substituídas em cada visita', 'Fotos de entrada e saída', 'Relatório em PDF para o cliente'],
      },
      {
        tpl: 'segmento',
        tag: 'Segmentos atendidos',
        titulo: 'Energia Solar',
        sub: 'Instalação e manutenção com evidência de cada etapa.',
        itens: ['Checklist de comissionamento', 'Fotos de estrutura, string e inversor', 'Materiais e equipamentos baixados na OS', 'Relatório assinado pelo cliente'],
      },
      {
        tpl: 'lista',
        tag: 'Em qualquer segmento',
        titulo: 'O que fica registrado\nem cada atendimento',
        chips: ['Fotos antes e depois', 'Ocorrências', 'Materiais consumidos', 'Respostas do checklist', 'Peças solicitadas', 'Assinatura do cliente', 'Geolocalização', 'Horário de cada etapa', 'Tempo de deslocamento', 'Tempo em atendimento'],
        rodape: 'Sem depender da lembrança de ninguém.',
      },
      ctaFinal,
    ],
    legenda: `O Taskcheck foi feito para empresas que têm equipe técnica em campo:

❄️ Climatização e refrigeração (incluindo PMOC)
🏢 Manutenção predial e facilities
🔧 Assistência técnica
☀️ Energia solar

E também para qualquer operação que precise de Ordem de Serviço, checklist, foto e assinatura do cliente.

Sua empresa é de outro segmento? Comenta aqui qual é que a gente responde se atende.

WhatsApp ${CONTATO} · ${SITE}`,
    tags: 'campo',
  },
];
