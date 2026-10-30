// Conteúdo dos posts de feed do Taskcheck. Ciclo 1 (posts 1..60) aqui; ciclo 2 (61..120) em posts-ciclo2.js.
// Campos:
//   n        número sequencial do post
//   dia      dia do calendário
//   slot     'manha' | 'tarde'
//   tpl      template visual usado no render
//   tema     pilar de conteúdo (para relatório e calendário)
//   ...      campos específicos de cada template
//   legenda  texto da legenda do Instagram
//   tags     conjunto de hashtags (chave em HASHTAGS)

import ciclo2 from './posts-ciclo2.js';

// Banco de hashtags por tema. Cada post usa só #taskcheck + 3 delas, em rodízio (ver hashtagsDe):
// repetir o mesmo bloco grande em todo post é um dos sinais de spam do Instagram.
export const HASHTAGS = {
  os: '#ordemdeservico #gestaodeequipes #assistenciatecnica #manutencao #gestaodeservicos #equipeemcampo #fieldservice #softwaredegestao #controledeservicos #empresadeservicos #atendimentotecnico #manutencaocorretiva #os',
  campo: '#equipeemcampo #tecnicoemcampo #gestaodecampo #ordemdeservico #manutencaopredial #climatizacao #pmoc #produtividade #arcondicionado #refrigeracao #manutencaopreventiva #instaladores #gestao',
  gestao: '#gestaoempresarial #processos #produtividade #gestaodeservicos #ordemdeservico #indicadores #transformacaodigital #eficiencia #pme #empreendedorismo #gestaodeprocessos #pequenasempresas #lucratividade',
  tec: '#appparatecnicos #ordemdeservico #offlinefirst #checklistdigital #tecnicoemcampo #manutencao #assistenciatecnica #gestao #tecnologia #aplicativo #digitalizacao #automacao #saas',
};

// Hashtags de um post: #taskcheck + 3 do tema, escolhidas pelo número do post para que posts
// seguidos do mesmo tema não repitam o mesmo conjunto (e o resultado seja sempre o mesmo).
export function hashtagsDe(p) {
  const banco = HASHTAGS[p.tags].split(' ');
  const n = p.n || 0;
  return ['#taskcheck', ...[0, 1, 2].map((i) => banco[(n * 3 + i) % banco.length])].join(' ');
}

const SITE = 'taskcheck.app';

const ciclo1 = [
  // ───────────────────────── DIA 1 ─────────────────────────
  {
    n: 1, dia: 1, slot: 'manha', tpl: 'frase', tema: 'Posicionamento',
    tag: 'Gestão de serviços em campo',
    titulo: 'Sua equipe\nestá em campo.\nSua gestão também\ndeveria estar.',
    sub: 'Do chamado ao fechamento da OS. Tudo conectado.',
    legenda: `Sua equipe está na rua agora. Você sabe exatamente onde cada técnico está, em qual etapa está cada atendimento e quanto aquele serviço realmente custou?

O Taskcheck conecta gestão, técnicos e clientes em toda a jornada do serviço: do planejamento ao atendimento, da execução à comprovação e da operação ao financeiro.

Uma única operação. Uma única fonte de informação.

Conheça em ${SITE}`,
    tags: 'os',
  },
  {
    n: 2, dia: 1, slot: 'tarde', tpl: 'feature', tema: 'Recurso',
    tag: 'Ordem de Serviço',
    titulo: 'A OS digital\nde ponta a ponta',
    sub: 'Tudo o que acontece no campo fica registrado na Ordem de Serviço.',
    itens: ['Dados do cliente e do equipamento', 'Fotos, checklists e ocorrências', 'Materiais consumidos e peças solicitadas', 'Assinatura do cliente e PDF da OS'],
    print: 'app-atividades-da-os',
    legenda: `Fotos no WhatsApp. Checklist no papel. Material anotado num caderno. Assinatura em uma folha que volta amassada para o escritório.

No Taskcheck, tudo isso é uma coisa só: a Ordem de Serviço.

Dados do cliente, equipamento, técnico responsável, geolocalização, checklists, fotos, ocorrências, consumo de material, peças solicitadas, assinatura do cliente e PDF final — tudo dentro da mesma OS, do jeito que aconteceu no campo.

Sem redigitar nada. Sem procurar informação em cinco lugares.`,
    tags: 'os',
  },

  // ───────────────────────── DIA 2 ─────────────────────────
  {
    n: 3, dia: 2, slot: 'manha', tpl: 'vs', tema: 'Antes x Depois',
    tag: 'O cenário de hoje',
    titulo: 'WhatsApp não é\nsistema de gestão',
    sub: 'Ótimo para conversar. Ruim para gerir a operação.',
    antesTitulo: 'Hoje',
    antes: ['Ordem de serviço combinada no grupo', 'Foto que some no meio da conversa', 'Ninguém acha a autorização de ontem', 'Assunto de trabalho misturado com pessoal'],
    depoisTitulo: 'Com o Taskcheck',
    depois: ['OS criada, atribuída e acompanhada', 'Foto anexada ao atendimento certo', 'Autorização registrada dentro da OS', 'Conversa vinculada ao atendimento'],
    legenda: `O WhatsApp é ótimo para conversar. Ruim para gerir.

A mensagem importante desce. A foto se perde. A autorização vira "eu tinha falado". E quando o cliente questiona três meses depois, ninguém acha nada.

No Taskcheck a conversa acontece dentro do atendimento — e continua lá quando alguém precisar consultar meses depois.

Sua operação não deveria depender de mensagens no WhatsApp para funcionar.`,
    tags: 'gestao',
  },
  {
    n: 4, dia: 2, slot: 'tarde', tpl: 'feature', tema: 'Recurso',
    tag: 'Mapa em tempo real',
    titulo: 'Saiba onde sua\nequipe está agora',
    sub: 'Sem ligar para ninguém. Sem perguntar no grupo.',
    itens: ['Localização dos técnicos no mapa', 'Quem está disponível, em deslocamento ou em atendimento', 'Atendimentos do dia posicionados no mapa', 'Percurso, chegada e saída registrados'],
    print: 'app-mapa-oss',
    legenda: `"Cadê o João?"

Essa pergunta custa tempo do gestor, tempo do técnico e paciência do cliente.

Com o mapa em tempo real do Taskcheck você abre a tela e vê: quem está em deslocamento, quem já fez check-in, quem está livre para um encaixe e a que distância está do próximo atendimento.

Você para de perguntar e passa a acompanhar.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 3 ─────────────────────────
  {
    n: 5, dia: 3, slot: 'manha', tpl: 'feature', tema: 'Diferencial',
    tag: 'Principal diferencial',
    titulo: 'Sem internet?\nO atendimento continua.',
    sub: 'Arquitetura Offline First: o técnico não para porque ficou sem sinal.',
    itens: ['Subsolo, galpão, área rural: tanto faz', 'Check-in, checklist, fotos e assinatura funcionam offline', 'Quando o sinal volta, sincroniza sozinho', 'Nada se perde, nada é digitado de novo'],
    print: 'app-tarefas-a-sincronizar',
    dark: true,
    legenda: `Seu técnico chega no subsolo do prédio. Sem sinal.

Na maioria dos aplicativos, é aí que o atendimento para e o papel volta a existir.

No Taskcheck, não. A plataforma foi desenvolvida com conceito Offline First: check-in, checklists, fotos, consumo de material, ocorrências e assinatura do cliente seguem normalmente no aparelho.

Quando a internet volta, o app identifica a conexão e sincroniza tudo automaticamente.

Gerar registro não pode depender do sinal do celular.`,
    tags: 'tec',
  },
  {
    n: 6, dia: 3, slot: 'tarde', tpl: 'pergunta', tema: 'Dor',
    tag: 'Experiência do cliente',
    pergunta: '“Que horas o técnico chega?”',
    contexto: 'Quantas vezes por dia sua central responde isso?',
    extras: ['“Ele já saiu?”', '“Já tem previsão de chegada?”', '“O serviço foi concluído?”', '“O que foi feito no equipamento?”'],
    resposta: 'Com o Taskcheck, o cliente acompanha o atendimento pelo próprio celular: status da OS, quem é o técnico, previsão de chegada e cada etapa concluída.',
    legenda: `"Que horas o técnico chega?"
"Ele já saiu?"
"O serviço foi concluído? O que foi feito?"

Toda ligação dessas é um pedaço do dia da sua central indo embora.

O Taskcheck dá ao seu cliente um link de acompanhamento: ele vê o status da OS, quem é o técnico a caminho, a previsão de chegada e cada etapa concluída — direto no celular dele.

Seu cliente não precisa ligar para saber o que está acontecendo.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 4 ─────────────────────────
  {
    n: 7, dia: 4, slot: 'manha', tpl: 'lista', tema: 'Diferencial',
    tag: 'Offline First',
    titulo: 'Mesmo sem internet,\no técnico pode:',
    chips: ['Consultar suas OSs', 'Consultar a agenda', 'Realizar check-in', 'Registrar fotos', 'Preencher checklists', 'Registrar ocorrências', 'Registrar consumos', 'Adicionar ajudantes', 'Solicitar peças', 'Coletar assinatura', 'Realizar checkout', 'Gerar registros'],
    rodape: 'Sincroniza tudo assim que o sinal voltar.',
    legenda: `Offline First não é um detalhe técnico. É o que decide se o atendimento acontece ou não.

Sem conexão, o técnico continua consultando a agenda, fazendo check-in, preenchendo checklist, tirando foto, registrando ocorrência, lançando material, adicionando ajudante, pedindo peça, coletando assinatura e finalizando a OS.

Assim que a internet volta, tudo sobe para a plataforma automaticamente.

Salve este post para mostrar ao seu time.`,
    tags: 'tec',
  },
  {
    n: 8, dia: 4, slot: 'tarde', tpl: 'feature', tema: 'Recurso',
    tag: 'Agenda e Kanban',
    titulo: 'Planeje o dia.\nAcompanhe o fluxo.',
    sub: 'Escolha a visão que funciona melhor para a sua operação.',
    itens: ['Agenda diária, semanal e por técnico', 'Conflitos de horário e encaixes visíveis', 'Kanban de Aberta a Concluída', 'Linha do tempo minuto a minuto da OS'],
    print: 'app-agenda',
    legenda: `Cada operação enxerga o dia de um jeito.

Quem monta a rota quer a agenda. Quem cobra andamento quer o Kanban. Quem precisa explicar o que aconteceu quer a linha do tempo.

O Taskcheck tem os três:

• Agenda com horários, clientes, status, conflitos, encaixes e deslocamentos
• Kanban de Aberta → Agendada → A caminho → Check-in → Em atendimento → Aguardando peça → Concluída
• Linha do tempo com cada etapa da OS, minuto a minuto

Tenha visão completa da operação sem precisar perguntar para ninguém.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 5 ─────────────────────────
  {
    n: 9, dia: 5, slot: 'manha', tpl: 'numero', tema: 'Prova',
    tag: 'Rastreabilidade',
    numero: '18,4 km',
    lead: 'Quanto sua equipe roda por dia? E quanto disso vira registro?',
    unidade: '· 43 min',
    titulo: 'de deslocamento registrados\nsem ninguém anotar nada',
    sub: 'O técnico inicia o percurso pelo aplicativo. Distância, tempo, horário e localização entram na OS sozinhos.',
    legenda: `Deslocamento é custo. E custo que ninguém mede vira prejuízo silencioso.

Quando o técnico inicia o percurso pelo app, o Taskcheck registra sozinho: horário de saída, trajeto, distância, tempo até a chegada e a geolocalização do check-in.

Nada de "acho que foram uns 20 km". O número real entra na Ordem de Serviço.`,
    tags: 'campo',
  },
  {
    n: 10, dia: 5, slot: 'tarde', tpl: 'print', tema: 'Produto',
    tag: 'App do técnico',
    titulo: 'A agenda do dia\nno bolso do técnico',
    sub: 'Horário, cliente, endereço e prioridade de cada atendimento.',
    print: 'app-listagem-oss',
    callouts: ['Todas as OSs do dia', 'Prioridade e status', 'Endereço com navegação'],
    legenda: `O técnico abre o aplicativo e já sabe o dia inteiro: quais atendimentos, em que horário, em qual cliente, com qual prioridade e onde fica cada um.

Sem passar no escritório para pegar papel. Sem ligar para a central para confirmar o próximo endereço.

A operação inteira no bolso.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 6 ─────────────────────────
  {
    n: 11, dia: 6, slot: 'manha', tpl: 'checklist', tema: 'Recurso',
    tag: 'Padronização',
    titulo: 'Checklists que se\nadaptam ao serviço',
    sub: 'Perguntas que abrem novas perguntas, conforme o que o técnico encontra.',
    linhas: [
      { t: 'O equipamento apresenta vazamento?', v: 'Sim', tipo: 'sim' },
      { t: 'Onde está o vazamento?', v: 'Linha de líquido', tipo: 'dep' },
      { t: 'Registro fotográfico do ponto', v: '2 fotos vinculadas', tipo: 'foto' },
      { t: 'É necessário substituir alguma peça?', v: 'Capacitor 45µF', tipo: 'dep' },
      { t: 'Pressões dentro do especificado?', v: 'Aprovado', tipo: 'ok' },
    ],
    legenda: `Um checklist bom não é uma lista fixa. É uma conversa.

No Taskcheck, o checklist reage às respostas do técnico. Encontrou vazamento? A plataforma abre a pergunta seguinte e pede a foto na hora certa. Precisou trocar peça? Gera a solicitação e notifica a central.

• Múltiplos checklists por OS
• Perguntas obrigatórias e respostas condicionais
• Dependências em cascata
• Fotos vinculadas à pergunta
• Aprovação e reprovação com observação obrigatória

Mais padronização. Menos erro. Mais qualidade na execução.`,
    tags: 'tec',
  },
  {
    n: 12, dia: 6, slot: 'tarde', tpl: 'dica', tema: 'Educacional',
    numeroDica: '01',
    titulo: 'Padronize antes\nde cobrar qualidade',
    sub: 'Você não pode exigir do técnico aquilo que nunca foi escrito em lugar nenhum.',
    itens: ['Liste o que é obrigatório em cada tipo de serviço', 'Transforme essa lista em checklist digital', 'Exija evidência nos pontos críticos', 'Revise o checklist a cada 90 dias'],
    legenda: `Dica de gestão em campo #01

A maior parte do retrabalho não vem de técnico ruim. Vem de processo que só existe na cabeça de quem trabalha há mais tempo na empresa.

Comece assim:

1. Liste o que é obrigatório em cada tipo de atendimento
2. Transforme a lista em checklist digital
3. Exija foto nos pontos críticos
4. Revise a cada 90 dias com quem executa

No Taskcheck você monta checklists diferentes por tipo de serviço, equipamento ou cliente — com perguntas obrigatórias e evidência vinculada.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 7 ─────────────────────────
  {
    n: 13, dia: 7, slot: 'manha', tpl: 'jornada', tema: 'Produto',
    tag: 'Jornada do serviço',
    titulo: 'Do chamado ao\nfechamento da OS',
    etapas: [
      { t: 'Chamado', d: 'Receba e organize as solicitações' },
      { t: 'Ordem de Serviço', d: 'Crie a OS e programe o atendimento' },
      { t: 'Agenda', d: 'Escolha o técnico e monte o dia' },
      { t: 'Percurso', d: 'O técnico sai e o gestor acompanha' },
      { t: 'Execução', d: 'Check-in, checklist, fotos e consumo' },
      { t: 'Comprovação', d: 'Assinatura, checkout e PDF da OS' },
      { t: 'Financeiro', d: 'Custos, comissões e cobrança' },
    ],
    legenda: `Toda operação em campo segue a mesma jornada. A diferença é se ela está conectada ou espalhada em sete lugares diferentes.

No Taskcheck é uma linha só: chamado → OS → agenda → percurso → execução → comprovação → financeiro.

Cada etapa alimenta a próxima. O que o técnico registra no campo chega pronto no escritório e vira número no financeiro.

Salve para consultar depois.`,
    tags: 'os',
  },
  {
    n: 14, dia: 7, slot: 'tarde', tpl: 'feature', tema: 'Recurso',
    tag: 'Evidências',
    titulo: 'Foto é o que\nencerra discussão',
    sub: 'Antes, durante e depois — com horário e localização.',
    itens: ['Captura direta pelo aplicativo', 'Fotos vinculadas à OS e ao checklist', 'Galeria completa dentro do atendimento', 'Funciona mesmo sem internet'],
    print: 'app-lista-de-fotos-os',
    legenda: `"O equipamento já estava assim quando o técnico chegou?"

Quem trabalha com serviço em campo já perdeu dinheiro por não conseguir responder isso.

No Taskcheck o técnico fotografa antes, durante e depois direto pelo aplicativo. Cada foto entra na OS com horário e localização, e pode ficar vinculada a uma pergunta específica do checklist.

Quando o cliente questiona, a evidência está na Ordem de Serviço.`,
    tags: 'os',
  },

  // ───────────────────────── DIA 8 ─────────────────────────
  {
    n: 15, dia: 8, slot: 'manha', tpl: 'vs', tema: 'Antes x Depois',
    tag: 'Planejamento',
    titulo: 'A planilha não\nacompanha o campo',
    sub: 'Ela mostra o que alguém digitou, não o que está acontecendo agora.',
    antesTitulo: 'Planilha',
    antes: ['Atualizada no fim do dia (quando é)', 'Duas pessoas editando versões diferentes', 'Ninguém enxerga conflito de horário', 'Status que já mudou há duas horas'],
    depoisTitulo: 'Kanban do Taskcheck',
    depois: ['Status muda quando o campo muda', 'Uma única visão para toda a equipe', 'Conflitos e encaixes visíveis na agenda', 'Andamento real, sem perguntar a ninguém'],
    legenda: `A planilha nasce desatualizada. Ela mostra o que alguém teve tempo de digitar, não o que está acontecendo agora na rua.

No Kanban do Taskcheck a OS anda sozinha: quando o técnico inicia o percurso, faz check-in, começa o atendimento ou solicita uma peça, o cartão muda de coluna.

Aberta → Agendada → A caminho → Check-in → Em atendimento → Aguardando peça → Concluída.

Você acompanha a operação real, não a versão digitada dela.`,
    tags: 'gestao',
  },
  {
    n: 16, dia: 8, slot: 'tarde', tpl: 'feature', tema: 'Recurso',
    tag: 'Estoque do técnico',
    titulo: 'Controle o material\nque está na rua',
    sub: 'Cada técnico com seu próprio saldo, e consumo baixado direto na OS.',
    itens: ['Saldo individual por técnico', 'Entradas, saídas e devoluções com histórico', 'Transferência entre técnicos com rastreio', 'Consumo na OS dá baixa na hora'],
    print: 'app-estoque-tecnico',
    legenda: `Peça que sai do almoxarifado e some no porta-malas é prejuízo que ninguém consegue explicar no fim do mês.

No Taskcheck cada técnico tem o próprio saldo de materiais. Ele consulta em campo, lança o consumo dentro da Ordem de Serviço e o estoque baixa na hora.

• Entradas, saídas e devoluções com histórico
• Transferência entre técnicos com rastreio
• Solicitação de peça: o técnico pede, a central autoriza, tudo vinculado à OS

O material consumido no campo deixa de ser estimativa e passa a fazer parte da operação real.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 9 ─────────────────────────
  {
    n: 17, dia: 9, slot: 'manha', tpl: 'print', tema: 'Produto',
    tag: 'Check-in',
    titulo: 'Chegou no cliente?\nO sistema sabe.',
    sub: 'Check-in com horário exato e geolocalização registrada.',
    print: 'app-check-realizado',
    callouts: ['Horário exato da chegada', 'Localização registrada', 'Início do atendimento'],
    legenda: `O check-in do Taskcheck não é um botão de formalidade. É o registro que sustenta o SLA.

Quando o técnico chega, o app grava horário exato e geolocalização. A partir dali começa a contar o tempo de atendimento — e o gestor vê tudo em tempo real.

Se o cliente questionar o horário da visita, a resposta não depende da memória de ninguém.`,
    tags: 'campo',
  },
  {
    n: 18, dia: 9, slot: 'tarde', tpl: 'frase', tema: 'Posicionamento',
    tag: 'Como funciona na prática',
    titulo: 'O técnico trabalha.\nO sistema registra.\nVocê acompanha.',
    sub: 'Sem digitar duas vezes. Sem cobrar relatório no fim do dia.',
    legenda: `A melhor gestão de campo é a que não atrapalha quem está executando.

No Taskcheck o técnico faz o trabalho dele pelo aplicativo — percurso, check-in, checklist, fotos, material, ocorrência, assinatura — e o registro nasce disso.

Ninguém precisa parar para preencher relatório. Ninguém precisa redigitar no escritório.

O técnico trabalha. O sistema registra. Você acompanha.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 10 ─────────────────────────
  {
    n: 19, dia: 10, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Comprovação',
    titulo: 'O cliente assina\nna tela do técnico',
    sub: 'Nome do recebedor, documento, data, horário e localização.',
    itens: ['Assinatura coletada no próprio aplicativo', 'Funciona offline', 'Anexada automaticamente à OS', 'Entra no PDF enviado ao cliente'],
    print: 'app-assinatura-cliente',
    legenda: `O serviço termina com a comprovação.

No Taskcheck o cliente assina na tela do aparelho do técnico e a plataforma registra nome do recebedor, documento, data, horário e localização.

Tudo isso é anexado à Ordem de Serviço e sai no PDF do atendimento.

Funciona offline, inclusive. O aceite não pode depender de sinal de celular.`,
    tags: 'os',
  },
  {
    n: 20, dia: 10, slot: 'tarde', tpl: 'numero', tema: 'Prova',
    tag: 'Fechamento do atendimento',
    lead: 'Depois do serviço, quanto tempo leva até o cliente receber o relatório?',
    numero: '1',
    unidade: 'clique',
    titulo: 'para gerar o relatório\nda OS com a sua marca',
    sub: 'Serviços executados, materiais, fotos, checklists e assinatura do cliente — no PDF pronto para enviar.',
    legenda: `O atendimento acabou. E agora?

No Taskcheck, o relatório da Ordem de Serviço é gerado automaticamente com a identidade da sua empresa: serviços executados, materiais consumidos, respostas do checklist, fotos, ocorrências e a assinatura do cliente.

Pronto para enviar ao cliente e arquivado na OS.

Sem montar documento no Word. Sem juntar foto de WhatsApp.`,
    tags: 'os',
  },

  // ───────────────────────── DIA 11 ─────────────────────────
  {
    n: 21, dia: 11, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Custo da operação',
    titulo: 'Despesa lançada\nno mesmo dia',
    sub: 'O técnico fotografa o comprovante e a conta do atendimento fecha sozinha.',
    itens: ['Combustível, pedágio, alimentação, estacionamento', 'Comprovante anexado pelo celular', 'Aprovação pela central', 'Compõe o custo real da OS'],
    print: 'app-despesas',
    legenda: `Nota fiscal amassada no bolso, entregue na sexta-feira, sem ninguém lembrar de qual atendimento era.

No Taskcheck o técnico lança a despesa direto no aplicativo, no momento em que ela acontece, e anexa a foto do comprovante.

Combustível, pedágio, alimentação, estacionamento, hospedagem e outras. A central aprova e o valor entra no custo daquele atendimento.

A conta do atendimento fecha sozinha.`,
    tags: 'campo',
  },
  {
    n: 22, dia: 11, slot: 'tarde', tpl: 'mito', tema: 'Objeção',
    titulo: 'A objeção que\nsempre aparece',
    mito: '“Meu técnico não vai usar aplicativo.”',
    verdade: 'Ele já usa. Só que hoje usa WhatsApp, câmera do celular, Waze e um caderno.',
    itens: ['O app abre o Waze ou o Google Maps para ele', 'A câmera já é a que ele usa todo dia', 'Funciona sem internet, no subsolo e no galpão', 'Ele para de voltar ao escritório para entregar papel'],
    legenda: `A objeção mais comum que ouvimos: "meu técnico não vai usar aplicativo".

A verdade é que ele já usa vários. WhatsApp para falar com a central, câmera para registrar o serviço, Waze para chegar no cliente e um caderno para anotar material.

O Taskcheck junta tudo isso em um lugar só — e devolve tempo para ele:

• Não precisa mais voltar ao escritório para entregar a OS
• Não precisa digitar nada duas vezes
• Não precisa ligar para saber o próximo endereço
• Funciona mesmo sem sinal

Quando o app facilita o dia do técnico, a adesão deixa de ser um problema.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 12 ─────────────────────────
  {
    n: 23, dia: 12, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Operação e financeiro',
    titulo: 'Serviço realizado.\nFinanceiro encaminhado.',
    sub: 'Os registros da operação viram informação financeira sem redigitar nada.',
    itens: ['Cobrança a partir do que foi executado', 'Comissão do técnico por atendimento ou regra própria', 'Materiais, deslocamento e despesas no custo da OS', 'Margem real de cada atendimento'],
    dark: true,
    legenda: `Você sabe quanto cobrou pelo serviço. Mas sabe quanto aquele atendimento realmente custou?

No Taskcheck, o que acontece no campo vira informação financeira automaticamente:

• Cobrança gerada a partir dos serviços executados, materiais consumidos e regras do contrato
• Comissão do técnico calculada por atendimento, por serviço ou por regra própria da empresa
• Custo real com material, deslocamento e despesas
• Margem por atendimento

Sem planilha paralela. Sem estimativa.`,
    tags: 'gestao',
  },
  {
    n: 24, dia: 12, slot: 'tarde', tpl: 'pergunta', tema: 'Dor',
    tag: 'Custo da operação',
    pergunta: 'Quanto custou o atendimento de ontem?',
    contexto: 'Material, deslocamento, comissão, despesa e tempo em campo.',
    extras: ['Quanto de material foi consumido?', 'Quantos quilômetros o técnico rodou?', 'Qual foi a comissão do atendimento?', 'Sobrou margem no fim?'],
    resposta: 'Se a resposta demora mais de 10 segundos, sua operação está decidindo preço no escuro.',
    legenda: `Faça o teste agora: escolha um atendimento de ontem e responda quanto ele custou de verdade.

Material consumido. Quilometragem. Tempo em campo. Comissão do técnico. Despesas do dia.

Se para responder isso você precisa abrir três planilhas e perguntar para duas pessoas, a sua precificação está sendo feita no escuro.

No Taskcheck o custo nasce do que o técnico registra no campo — e a margem de cada OS aparece sozinha.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 13 ─────────────────────────
  {
    n: 25, dia: 13, slot: 'manha', tpl: 'print', tema: 'Produto',
    tag: 'Navegação',
    titulo: 'Do check-in ao\nWaze em um toque',
    sub: 'O app abre a navegação com o endereço do atendimento.',
    print: 'app-waze-googlemaps',
    callouts: ['Waze ou Google Maps', 'Endereço já preenchido', 'Percurso registrado na OS'],
    legenda: `Endereço copiado errado do WhatsApp já fez muito técnico rodar 15 km à toa.

No Taskcheck o endereço vem da OS. Um toque e o aplicativo abre o Waze ou o Google Maps já com o destino preenchido.

E o percurso? Fica registrado na Ordem de Serviço: horário de início, distância e tempo até a chegada.`,
    tags: 'tec',
  },
  {
    n: 26, dia: 13, slot: 'tarde', tpl: 'dica', tema: 'Educacional',
    numeroDica: '02',
    titulo: 'Pare de ligar para\nsaber onde a equipe está',
    sub: 'Cada ligação de acompanhamento interrompe duas pessoas: quem liga e quem atende.',
    itens: ['Defina status objetivos para a OS', 'Faça o status mudar pela ação do técnico', 'Use o mapa em vez do telefone', 'Reserve a ligação para o que é exceção'],
    legenda: `Dica de gestão em campo #02

Some o tempo gasto por dia perguntando "onde você está?" e "já terminou?". Depois multiplique pelo número de técnicos e por 22 dias úteis.

O problema não é a pergunta. É o método.

1. Defina status objetivos para a OS
2. Faça o status mudar pela ação do técnico, não por mensagem
3. Use o mapa em tempo real em vez do telefone
4. Reserve a ligação para o que realmente é exceção

No Taskcheck, o status anda sozinho: percurso iniciado, check-in, em atendimento, aguardando peça, concluída.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 14 ─────────────────────────
  {
    n: 27, dia: 14, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Comunicação',
    titulo: 'A conversa acontece\ndentro da OS',
    sub: 'E continua lá quando alguém precisar consultar meses depois.',
    itens: ['Chat do técnico com a central', 'Mensagens vinculadas ao atendimento', 'Autorizações registradas na OS', 'Histórico que volta a aparecer quando a OS é consultada'],
    print: 'app-chatapp',
    legenda: `"Quem autorizou a troca dessa peça?"

Se a resposta está perdida num grupo com 40 pessoas, ela não existe.

No Taskcheck o chat acontece dentro da Ordem de Serviço. O técnico pede a autorização, a central responde, e aquela decisão fica anexada ao atendimento — para sempre.

Autorizações, combinados e decisões voltam a aparecer sempre que a OS for consultada.`,
    tags: 'os',
  },
  {
    n: 28, dia: 14, slot: 'tarde', tpl: 'vs', tema: 'Antes x Depois',
    tag: 'Comunicação',
    titulo: 'Dezenas de grupos\nou uma OS só',
    sub: 'Cada atendimento com a sua própria conversa e o seu histórico.',
    antesTitulo: 'Hoje',
    antes: ['Grupo por equipe, por cliente, por assunto', 'Informação importante enterrada em 200 mensagens', 'Assunto de trabalho no celular pessoal', 'Quem entra depois não sabe o que foi combinado'],
    depoisTitulo: 'Com o Taskcheck',
    depois: ['Uma conversa por atendimento', 'Autorização registrada dentro da OS', 'Técnico e central no mesmo canal', 'Histórico completo ao abrir a OS'],
    legenda: `Chega de procurar informação em dezenas de grupos de WhatsApp.

No Taskcheck cada atendimento tem a sua própria conversa. Técnico, central e equipe administrativa acompanham no mesmo lugar — e o histórico fica vinculado à OS.

Seis meses depois, quem abrir aquele atendimento vê exatamente o que foi combinado e por quem.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 15 ─────────────────────────
  {
    n: 29, dia: 15, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Experiência do cliente',
    titulo: 'Transparência\npara o seu cliente',
    sub: 'Ele acompanha o atendimento pelo próprio celular.',
    itens: ['Status da OS em tempo real', 'Quem é o técnico a caminho', 'Previsão de chegada e etapas concluídas', 'PDF do serviço realizado ao final'],
    dark: true,
    legenda: `Cliente que não recebe informação, liga. Cliente que liga muito, reclama. Cliente que reclama muito, troca de fornecedor.

O Taskcheck dá ao seu cliente um acompanhamento próprio: ele vê o status da OS, quem é o técnico, a previsão de chegada, cada etapa concluída, e recebe o PDF do serviço no final.

Transparência não é só cortesia. É retenção.`,
    tags: 'gestao',
  },
  {
    n: 30, dia: 15, slot: 'tarde', tpl: 'depoimento', tema: 'Prova',
    quote: 'Antes eu ligava para descobrir onde a equipe estava. Hoje eu abro o mapa.',
    autor: 'Gestor de operações',
    contexto: 'Manutenção predial',
    legenda: `A primeira coisa que muda quando a operação sai do WhatsApp não é o número. É o tempo do gestor.

Em vez de ligar para descobrir onde cada técnico está, você abre o mapa e vê: quem está em deslocamento, quem já chegou, quem está livre para um encaixe.

Depoimento ilustrativo — em breve traremos relatos reais dos nossos clientes.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 16 ─────────────────────────
  {
    n: 31, dia: 16, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Segurança da equipe',
    titulo: 'Botão do pânico\nno aplicativo',
    sub: 'Em situação de risco, o técnico aciona a central em um toque.',
    itens: ['Registra a localização no momento do acionamento', 'Registra data e horário exatos', 'Envia alerta imediato para a central', 'Fica no histórico da operação'],
    print: 'app-botaopanico',
    legenda: `Quem coloca equipe na rua sabe: nem toda visita é tranquila.

O Taskcheck tem Botão do Pânico dentro do aplicativo. Ao ser acionado, ele registra a localização do técnico, a data e o horário exatos, e envia um alerta imediato para a central acionar os procedimentos internos.

Porque cuidar da equipe também faz parte da operação.`,
    tags: 'tec',
  },
  {
    n: 32, dia: 16, slot: 'tarde', tpl: 'frase', tema: 'Posicionamento',
    tag: 'Segurança',
    titulo: 'Cuidar da equipe\ntambém faz parte\nda operação.',
    sub: 'Localização, horário e alerta imediato à central.',
    legenda: `Investimento em gestão de campo costuma ser justificado por produtividade e custo. Mas existe um motivo que raramente entra na planilha: segurança.

O técnico está sozinho, na rua, em endereços que ele não escolheu.

Botão do Pânico, geolocalização, horário de cada etapa e alerta imediato para a central não são recursos de vitrine. São o mínimo que uma operação séria oferece a quem está executando.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 17 ─────────────────────────
  {
    n: 33, dia: 17, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Memória da operação',
    titulo: 'O técnico chega\nsabendo o histórico',
    sub: 'O que já foi feito, quais peças foram usadas e o que ficou pendente.',
    itens: ['Histórico completo por cliente e equipamento', 'Peças já substituídas', 'Ocorrências anteriores', 'Checklists e fotos dos atendimentos passados'],
    legenda: `Reincidência quase sempre nasce da mesma coisa: o técnico de hoje não sabe o que o técnico de três meses atrás encontrou.

No Taskcheck o histórico está na OS. Antes de entrar no cliente, o técnico vê os atendimentos anteriores daquele equipamento: peças trocadas, ocorrências registradas, checklists respondidos e fotos.

Ele chega sabendo. E resolve na primeira visita.`,
    tags: 'campo',
  },
  {
    n: 34, dia: 17, slot: 'tarde', tpl: 'print', tema: 'Produto',
    tag: 'Evidências',
    titulo: 'Foto tirada no local,\nna hora do serviço',
    sub: 'Captura direta pelo app, anexada à OS com horário e localização.',
    print: 'app-camera',
    callouts: ['Câmera dentro do app', 'Anexa direto na OS', 'Funciona offline'],
    legenda: `A foto tirada pela câmera do celular e enviada por WhatsApp perde metade do valor: fica sem contexto, sem horário confiável e sem vínculo com o atendimento.

No Taskcheck a câmera é do próprio aplicativo. A foto entra na Ordem de Serviço com horário e localização, e pode ficar vinculada a uma pergunta específica do checklist.

Funciona offline. Sincroniza quando o sinal volta.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 18 ─────────────────────────
  {
    n: 35, dia: 18, slot: 'manha', tpl: 'lista', tema: 'Produto',
    tag: 'Rastreabilidade',
    titulo: 'O que fica registrado\nem cada atendimento',
    chips: ['Fotos antes e depois', 'Ocorrências', 'Materiais consumidos', 'Respostas do checklist', 'Ajudantes', 'Peças solicitadas', 'Assinatura do cliente', 'Geolocalização', 'Horário de cada etapa', 'Tempo de deslocamento', 'Tempo em atendimento', 'Autorizações da central'],
    rodape: 'Sem depender da lembrança de ninguém.',
    legenda: `Auditoria de operação não é burocracia. É o que te protege quando alguém questiona o serviço.

Toda OS no Taskcheck responde quatro perguntas sozinha:

• Quem fez — técnico responsável, ajudantes e quem autorizou cada decisão
• Quando fez — horário exato de cada etapa, do percurso ao checkout
• Onde fez — geolocalização do início do percurso, do check-in e do checkout
• O que foi realizado — serviços, materiais, checklist, fotos e ocorrências

Salve este post.`,
    tags: 'os',
  },
  {
    n: 36, dia: 18, slot: 'tarde', tpl: 'dica', tema: 'Educacional',
    numeroDica: '03',
    titulo: 'Evidência resolve\ndiscussão. Memória não.',
    sub: 'A conversa difícil com o cliente sempre acontece semanas depois do atendimento.',
    itens: ['Fotografe antes de encostar no equipamento', 'Registre a ocorrência no momento em que ela acontece', 'Colete assinatura com nome e documento', 'Guarde tudo vinculado à OS, não ao celular do técnico'],
    legenda: `Dica de gestão em campo #03

A discussão com o cliente nunca é no dia do serviço. É três semanas depois, quando ninguém lembra direito o que aconteceu.

1. Fotografe antes de encostar no equipamento
2. Registre a ocorrência no momento em que acontece, não no fim do dia
3. Colete assinatura com nome, documento, horário e local
4. Guarde tudo vinculado à OS — nunca no celular pessoal do técnico

No Taskcheck isso é o padrão, não a exceção.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 19 ─────────────────────────
  {
    n: 37, dia: 19, slot: 'manha', tpl: 'segmento', tema: 'Segmento',
    tag: 'Segmentos atendidos',
    titulo: 'Climatização\ne Refrigeração',
    sub: 'Instalação, manutenção e PMOC com evidência em cada visita.',
    itens: ['Checklist PMOC com perguntas dependentes', 'Registro fotográfico obrigatório por item', 'Gás, filtros e peças baixados do estoque do técnico', 'Histórico completo por equipamento e número de série'],
    legenda: `Climatização é o segmento em que o checklist prova o serviço.

O Taskcheck atende operações de instalação, manutenção e PMOC com:

• Checklists com dependência — encontrou vazamento, abre a pergunta seguinte e pede a foto
• Evidência fotográfica obrigatória nos itens críticos
• Gás, filtros e capacitores baixados do estoque do técnico direto na OS
• Histórico por equipamento e número de série, visita a visita
• Relatório em PDF com a identidade da sua empresa

Instalação, manutenção e PMOC organizados na mesma plataforma.`,
    tags: 'campo',
  },
  {
    n: 38, dia: 19, slot: 'tarde', tpl: 'feature', tema: 'Recurso',
    tag: 'Peças',
    titulo: 'O técnico pede.\nA central autoriza.',
    sub: 'Solicitação de peça vinculada à OS, com o aceite registrado.',
    itens: ['Solicitação criada no campo pelo aplicativo', 'Notificação imediata para a central', 'Autorização registrada dentro da OS', 'Consumo dá baixa no estoque do técnico'],
    print: 'app-inserir-consumo-os',
    legenda: `"Achei o capacitor fora de especificação. Posso trocar?"

Hoje isso vira ligação, mensagem no grupo e, semanas depois, uma discussão sobre quem autorizou.

No Taskcheck o técnico abre a solicitação de peça dentro da própria OS. A central recebe, autoriza, e o aceite fica registrado no atendimento — com horário e responsável.

Ao lançar o consumo, o estoque do técnico baixa na hora.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 20 ─────────────────────────
  {
    n: 39, dia: 20, slot: 'manha', tpl: 'numero', tema: 'Prova',
    tag: 'Calculadora de ROI',
    lead: 'O custo que nunca aparece na planilha da operação.',
    numero: '30 min',
    unidade: '/ OS',
    titulo: 'de trabalho administrativo\npor atendimento',
    sub: 'Digitar, conferir e procurar informação. Multiplique pelo número de OSs do mês e veja o custo invisível da desorganização.',
    legenda: `Faça a conta da sua operação:

Meia hora de trabalho administrativo por atendimento — digitando o que o técnico já escreveu, conferindo foto, procurando comprovante e montando relatório.

300 atendimentos no mês = 150 horas. Quase um funcionário inteiro dedicado a redigitar informação que já existia.

No Taskcheck o registro nasce no campo e chega pronto no escritório.

Temos uma calculadora de ROI no site: ajuste os números da sua realidade e veja a estimativa. Link na bio.`,
    tags: 'gestao',
  },
  {
    n: 40, dia: 20, slot: 'tarde', tpl: 'feature', tema: 'Recurso',
    tag: 'Indicadores',
    titulo: 'Os números aparecem\nsozinhos',
    sub: 'Porque nascem do que o técnico registra no campo.',
    itens: ['Atendimentos por dia, por técnico e por cliente', 'Tempo médio de atendimento e de deslocamento', 'Reincidência no mesmo cliente em 30 dias', 'Faturamento, custo e margem da operação'],
    dark: true,
    legenda: `Indicador que precisa ser montado no fim do mês já nasceu velho.

No Taskcheck os números vêm da operação real: OS concluídas, OS em andamento, técnicos em campo, tempo médio de atendimento, produtividade da equipe, tempo em campo por técnico, reincidência no mesmo cliente, ticket médio da OS, faturamento, custo e margem.

Nada disso é digitado. Tudo nasce do que o técnico registra no campo.

Pare de administrar no escuro.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 21 ─────────────────────────
  {
    n: 41, dia: 21, slot: 'manha', tpl: 'segmento', tema: 'Segmento',
    tag: 'Segmentos atendidos',
    titulo: 'Assistência\nTécnica',
    sub: 'Atendimento, garantia e histórico do equipamento em um lugar só.',
    itens: ['Histórico por equipamento e número de série', 'Peças substituídas em cada visita', 'Evidência fotográfica de entrada e saída', 'Relatório em PDF para o cliente'],
    legenda: `Em assistência técnica, o que decide a discussão de garantia é o registro.

O Taskcheck organiza esse tipo de operação:

• Histórico por equipamento e número de série — o técnico chega sabendo o que já foi feito
• Peças substituídas em cada visita, com baixa no estoque
• Evidência fotográfica de entrada e de saída do serviço
• Checklists de teste e conferência
• Relatório em PDF com a sua marca, assinado pelo cliente

Atendimento e garantia sem depender da memória de ninguém.`,
    tags: 'os',
  },
  {
    n: 42, dia: 21, slot: 'tarde', tpl: 'vs', tema: 'Antes x Depois',
    tag: 'Retaguarda',
    titulo: 'Redigitar é o\nmaior desperdício',
    sub: 'A informação já existe. Alguém só está digitando ela de novo.',
    antesTitulo: 'Hoje',
    antes: ['O técnico escreve no papel', 'O papel volta ao escritório', 'Alguém digita tudo de novo', 'Erro de digitação vira erro de cobrança'],
    depoisTitulo: 'Com o Taskcheck',
    depois: ['O técnico registra no aplicativo', 'A informação chega na hora', 'Ninguém digita nada duas vezes', 'A cobrança sai do que foi executado'],
    legenda: `A equipe administrativa da sua empresa passa o dia transformando informação que já existe em informação digitada.

É o desperdício mais caro e mais invisível de uma operação em campo.

No Taskcheck o técnico registra uma única vez, no aplicativo, no momento em que acontece. A informação chega pronta ao escritório e alimenta a OS, o estoque, as despesas e o financeiro.

O que o técnico registra no campo já chega pronto no escritório.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 22 ─────────────────────────
  {
    n: 43, dia: 22, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Equipe',
    titulo: 'Atendimento com\nmais de um técnico',
    sub: 'Registre ajudantes e auxiliares e saiba quem participou de cada serviço.',
    itens: ['Inclusão de ajudante direto no aplicativo', 'Quem participou e por quanto tempo', 'Entra no custo real do atendimento', 'Fica registrado na OS'],
    print: 'app-ajudantes-auxiliares',
    legenda: `Serviço que exige dois ou três profissionais é comum. O que quase nunca existe é o registro de quem estava lá.

No Taskcheck o técnico inclui ajudantes e auxiliares no próprio atendimento. A plataforma registra quem participou e por quanto tempo — e isso entra no custo real daquela OS.

Na hora de calcular comissão, produtividade e margem, o número reflete a equipe que realmente executou.`,
    tags: 'campo',
  },
  {
    n: 44, dia: 22, slot: 'tarde', tpl: 'print', tema: 'Produto',
    tag: 'Estoque',
    titulo: 'O saldo de material\nna mão do técnico',
    sub: 'Ele consulta o próprio estoque em campo, antes de prometer prazo.',
    print: 'app-estoque-tecnico',
    callouts: ['Saldo por técnico', 'Consulta em campo', 'Baixa direto na OS'],
    legenda: `Nada atrasa mais um atendimento do que descobrir no cliente que a peça acabou.

No Taskcheck cada técnico consulta o próprio saldo de material pelo aplicativo, antes de sair e antes de prometer prazo ao cliente.

O consumo lançado na OS dá baixa na hora. Transferência entre técnicos fica rastreada. Reposição entra com histórico.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 23 ─────────────────────────
  {
    n: 45, dia: 23, slot: 'manha', tpl: 'jornada', tema: 'Produto',
    tag: 'Linha do tempo da OS',
    titulo: 'Minuto a minuto\nde cada atendimento',
    etapas: [
      { t: '07:40 · Chamado recebido', d: 'Registrado pela central' },
      { t: '08:02 · Técnico atribuído', d: 'Agenda atualizada' },
      { t: '08:15 · Percurso iniciado', d: 'Localização registrada' },
      { t: '09:15 · Chegada ao cliente', d: '18,4 km percorridos' },
      { t: '09:20 · Atendimento iniciado', d: 'Checklist PMOC aberto' },
      { t: '10:42 · Peça solicitada', d: 'Autorizada pela central' },
      { t: '11:20 · Cliente assinou', d: 'PDF gerado e enviado' },
    ],
    legenda: `Toda a jornada da OS, minuto a minuto, sem depender de ninguém para contar o que aconteceu.

Chamado recebido, técnico atribuído, percurso iniciado, chegada ao cliente, atendimento iniciado, peça solicitada e autorizada, serviço concluído, cliente assinou, saída registrada, PDF gerado.

Quando alguém perguntar "o que aconteceu naquele atendimento?", a resposta está na linha do tempo.`,
    tags: 'os',
  },
  {
    n: 46, dia: 23, slot: 'tarde', tpl: 'pergunta', tema: 'Dor',
    tag: 'Rastreabilidade',
    pergunta: 'O cliente questionou um serviço de 3 meses atrás. Você prova?',
    contexto: 'Foto, horário, localização, checklist e assinatura.',
    extras: ['A foto do antes existe?', 'O horário do check-in está registrado?', 'O checklist foi respondido?', 'O cliente assinou?'],
    resposta: 'No Taskcheck, abrir a OS já é a resposta. Tudo continua lá, exatamente como foi registrado no campo.',
    legenda: `A conversa mais cara do mês costuma começar assim: "aquele serviço de três meses atrás não foi feito direito".

Sem registro, você negocia. Com registro, você mostra.

No Taskcheck abrir a OS já é a resposta: fotos antes e depois com horário, geolocalização do check-in, checklist respondido, materiais consumidos, ocorrências registradas e a assinatura do cliente.

Tudo continua lá, exatamente como foi registrado no campo.`,
    tags: 'os',
  },

  // ───────────────────────── DIA 24 ─────────────────────────
  {
    n: 47, dia: 24, slot: 'manha', tpl: 'segmento', tema: 'Segmento',
    tag: 'Segmentos atendidos',
    titulo: 'Energia Solar',
    sub: 'Instalação e manutenção com evidência de cada etapa.',
    itens: ['Checklist de comissionamento', 'Fotos de estrutura, string e inversor', 'Materiais e equipamentos baixados na OS', 'Relatório assinado pelo cliente'],
    legenda: `Instalação de energia solar é um projeto inteiro dentro de uma visita — e a comprovação de cada etapa é o que sustenta a garantia.

O Taskcheck organiza a operação:

• Checklist de instalação e comissionamento, com perguntas dependentes
• Registro fotográfico de estrutura, string, inversor e quadro
• Materiais e equipamentos baixados do estoque direto na OS
• Assinatura do cliente e relatório em PDF com a sua marca
• Histórico completo para as manutenções seguintes

Instalação e manutenção na mesma plataforma.`,
    tags: 'campo',
  },
  {
    n: 48, dia: 24, slot: 'tarde', tpl: 'feature', tema: 'Recurso',
    tag: 'Deslocamento',
    titulo: 'O percurso começa\ncom um toque',
    sub: 'E o gestor acompanha em tempo real, sem ligar para ninguém.',
    itens: ['Início do percurso registrado pelo técnico', 'Localização transmitida durante o deslocamento', 'Previsão de chegada visível para a central', 'Distância e tempo entram na OS'],
    print: 'app-iniciarpercurso',
    legenda: `O técnico toca em "Iniciar percurso" e a operação inteira passa a saber o que está acontecendo.

O gestor vê no mapa quem saiu e para onde vai. A central sabe a previsão de chegada. O cliente acompanha o status. E a Ordem de Serviço recebe distância, tempo e horário automaticamente.

Um toque no início. Zero perguntas depois.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 25 ─────────────────────────
  {
    n: 49, dia: 25, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Ocorrências',
    titulo: 'Imprevisto registrado\nna hora que acontece',
    sub: 'Não no fim do dia, quando metade já foi esquecida.',
    itens: ['Ocorrência criada pelo técnico no campo', 'Com foto, horário e localização', 'Visível para a central na hora', 'Anexada à Ordem de Serviço'],
    print: 'app-inserir-ocorrencia',
    legenda: `Cliente ausente. Área interditada. Equipamento diferente do cadastrado. Falta de energia no local.

Imprevisto faz parte da operação em campo. O problema é quando ele só é contado no fim do dia — e sem prova.

No Taskcheck o técnico registra a ocorrência no momento em que ela acontece, com foto, horário e localização. A central enxerga na hora e o registro fica anexado à OS.

Improdutividade documentada é improdutividade que pode ser cobrada ou corrigida.`,
    tags: 'os',
  },
  {
    n: 50, dia: 25, slot: 'tarde', tpl: 'dica', tema: 'Educacional',
    numeroDica: '04',
    titulo: 'Registre no momento,\nnão no fim do dia',
    sub: 'Registro feito depois é sempre menos completo e menos confiável.',
    itens: ['Foto perde o contexto se sai da hora do serviço', 'Ocorrência lembrada às 18h já perdeu detalhe', 'Consumo anotado depois vira estimativa', 'Assinatura coletada no cliente não tem substituto'],
    legenda: `Dica de gestão em campo #04

Todo registro feito fora do momento perde valor:

• A foto tirada depois perde o contexto
• A ocorrência lembrada às 18h perde o detalhe que importava
• O material anotado no fim do dia vira estimativa
• A assinatura que "o cliente manda depois" quase nunca chega

O Taskcheck existe para que registrar seja mais fácil do que não registrar — e funciona offline, para que a falta de sinal nunca seja a desculpa.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 26 ─────────────────────────
  {
    n: 51, dia: 26, slot: 'manha', tpl: 'segmento', tema: 'Segmento',
    tag: 'Segmentos atendidos',
    titulo: 'Manutenção Predial\ne Facilities',
    sub: 'Preventiva programada, corretiva e inspeções sob controle.',
    itens: ['Contratos e preventivas programadas', 'Checklists por tipo de inspeção', 'Vários técnicos, vários prédios, uma agenda', 'Relatório por cliente com evidências'],
    legenda: `Manutenção predial é volume: muitos prédios, muitos técnicos, muitas preventivas programadas e a corretiva que aparece no meio.

O Taskcheck dá conta disso:

• Agenda diária, semanal e por técnico, com encaixes e conflitos visíveis
• Kanban do fluxo completo das OSs
• Checklists diferentes por tipo de inspeção
• Evidência fotográfica com horário e geolocalização
• Relatório por cliente, com a identidade da sua empresa

Preventiva, corretiva e inspeção na mesma operação.`,
    tags: 'campo',
  },
  {
    n: 52, dia: 26, slot: 'tarde', tpl: 'feature', tema: 'Recurso',
    tag: 'Checklists',
    titulo: 'Vários checklists\nna mesma OS',
    sub: 'Um por equipamento, um por etapa, um por exigência do contrato.',
    itens: ['Múltiplos checklists por Ordem de Serviço', 'Perguntas obrigatórias e condicionais', 'Aprovação e reprovação com observação', 'Fotos vinculadas a cada pergunta'],
    print: 'app-atividades-da-os',
    legenda: `Um atendimento raramente tem só uma lista de verificação.

Tem o checklist do equipamento, o da segurança, o exigido pelo contrato do cliente e o de conferência final.

No Taskcheck você usa quantos checklists forem necessários dentro da mesma Ordem de Serviço — cada um com suas perguntas obrigatórias, respostas condicionais, evidência fotográfica e regra de aprovação.

Mais padronização. Menos erro.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 27 ─────────────────────────
  {
    n: 53, dia: 27, slot: 'manha', tpl: 'numero', tema: 'Prova',
    tag: 'Painel da operação',
    lead: 'Quantas abas você abre hoje para saber como está a operação?',
    numero: '1',
    unidade: 'tela',
    titulo: 'para enxergar a\noperação inteira',
    sub: 'OS em andamento, técnicos em campo, atendimentos concluídos, SLA, custo e margem — no mesmo painel.',
    dark: true,
    legenda: `Quantas abas você precisa abrir hoje para saber como está a operação?

Planilha de agenda, grupo do WhatsApp, e-mail do cliente, caderno do almoxarifado, planilha de despesa.

No Taskcheck é uma tela: OS em andamento, técnicos em campo, atendimentos concluídos, tempo médio de atendimento, produtividade da equipe, faturamento, custo e margem.

Os números nascem do campo. Você só precisa olhar.`,
    tags: 'gestao',
  },
  {
    n: 54, dia: 27, slot: 'tarde', tpl: 'frase', tema: 'Posicionamento',
    tag: 'O cenário de hoje',
    titulo: 'Sua operação não\ndeveria depender\nde mensagens no\nWhatsApp para\nfuncionar.',
    sub: 'Existe um lugar certo para cada informação do atendimento.',
    legenda: `Não é sobre abandonar o WhatsApp. É sobre parar de usá-lo como sistema de gestão.

Agenda em mensagem. Foto em conversa. Autorização em áudio. Material em anotação. Assinatura em papel fotografado.

Cada uma dessas informações tem um lugar certo dentro da Ordem de Serviço — e é lá que ela precisa estar quando alguém for procurar.

Sua operação não deveria depender de mensagens no WhatsApp para funcionar.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 28 ─────────────────────────
  {
    n: 55, dia: 28, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Relatório da OS',
    titulo: 'O PDF sai com\na sua marca',
    sub: 'Relatório do atendimento gerado automaticamente e pronto para enviar.',
    itens: ['Identidade visual da sua empresa', 'Serviços, materiais, checklists e fotos', 'Assinatura do cliente com data e hora', 'Enviado ao cliente e arquivado na OS'],
    legenda: `O relatório é a última impressão que o cliente tem do seu serviço. Ele merece mais do que fotos soltas no WhatsApp.

No Taskcheck o PDF da Ordem de Serviço é gerado automaticamente com a identidade da sua empresa: serviços executados, materiais consumidos, respostas do checklist, fotos, ocorrências e a assinatura do cliente com data e hora.

Pronto para enviar. Arquivado na OS.`,
    tags: 'os',
  },
  {
    n: 56, dia: 28, slot: 'tarde', tpl: 'print', tema: 'Produto',
    tag: 'Comprovação',
    titulo: 'A assinatura na\ntela do celular',
    sub: 'Com nome, documento, data, horário e localização.',
    print: 'app-assinatura-cliente',
    callouts: ['Assina no aparelho do técnico', 'Nome e documento do recebedor', 'Funciona offline'],
    legenda: `O cliente assina na tela do próprio aparelho do técnico e o atendimento está comprovado.

O Taskcheck registra nome do recebedor, documento, data, horário e localização — e anexa tudo à Ordem de Serviço.

Sem papel para voltar ao escritório. Sem folha amassada. E funciona mesmo sem internet.`,
    tags: 'os',
  },

  // ───────────────────────── DIA 29 ─────────────────────────
  {
    n: 57, dia: 29, slot: 'manha', tpl: 'feature', tema: 'Recurso',
    tag: 'Integrações',
    titulo: 'Conectado aos\nseus sistemas',
    sub: 'A plataforma conversa com o que a sua empresa já usa.',
    itens: ['Navegação com Waze e Google Maps', 'Envio de informações ao cliente', 'Sistemas de cadastro e faturamento', 'Integrações sob demanda e API'],
    legenda: `Nenhuma plataforma deve exigir que você abandone o que já funciona.

O Taskcheck se integra ao que a sua empresa já usa: navegação por Waze e Google Maps, envio de informações ao cliente, sistemas de cadastro, faturamento e financeiro, além de integrações sob demanda e API.

Algumas integrações estão em expansão. Fale com o nosso time comercial para consultar a disponibilidade atual.`,
    tags: 'tec',
  },
  {
    n: 58, dia: 29, slot: 'tarde', tpl: 'depoimento', tema: 'Prova',
    quote: 'Mesmo sem internet conseguimos atender. Em galpão e subsolo isso fez toda a diferença.',
    autor: 'Coordenador de campo',
    contexto: 'Manutenção industrial',
    legenda: `Offline First deixa de ser detalhe técnico no dia em que o técnico entra num subsolo.

Galpão, área rural, prédio antigo, estacionamento fechado: a maior parte dos lugares onde o serviço acontece é exatamente onde o sinal não chega.

No Taskcheck o atendimento continua. Check-in, checklist, foto, consumo, ocorrência e assinatura funcionam localmente e sincronizam quando a conexão volta.

Depoimento ilustrativo — em breve traremos relatos reais dos nossos clientes.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 30 ─────────────────────────
  {
    n: 59, dia: 30, slot: 'manha', tpl: 'vs', tema: 'Antes x Depois',
    tag: 'O que muda',
    titulo: 'O que muda quando\na operação organiza',
    sub: 'A diferença entre as duas colunas não é orçamento. É decisão.',
    antesTitulo: 'Operação improvisada',
    antes: ['WhatsApp como sistema de gestão', 'Planilha que ninguém atualiza no dia', 'Ligação para saber onde o técnico está', 'Papel que volta amassado ao escritório'],
    depoisTitulo: 'Operação sob controle',
    depois: ['Plataforma única para toda a operação', 'OS digital com tudo registrado', 'Mapa em tempo real da equipe', 'Financeiro conectado e indicadores prontos'],
    legenda: `Do lado esquerdo está a operação que a maioria das empresas de serviço em campo ainda tem. Do lado direito, a que dá para ter.

A diferença entre as duas não é tamanho de empresa nem orçamento. É decisão.

O Taskcheck reúne OS digital, agenda e Kanban, mapa em tempo real, aplicativo Offline First, checklists, estoque do técnico, despesas, financeiro e indicadores — em uma plataforma só.

Quer ver com o cenário da sua operação? Fale com a gente.`,
    tags: 'gestao',
  },
  {
    n: 60, dia: 30, slot: 'tarde', tpl: 'cta', tema: 'Conversão',
    tag: 'Demonstração',
    titulo: 'Vamos ver isso\nna sua operação?',
    sub: 'Agende uma demonstração e conheça a plataforma com o cenário real da sua empresa.',
    itens: ['Plataforma web para o gestor', 'Aplicativo para o técnico', 'Implantação acompanhada'],
    contato: '(11) 93933-0887',
    legenda: `Chegamos ao fim deste ciclo de conteúdo — e a melhor forma de entender o Taskcheck é ver a plataforma com o cenário da sua própria operação.

Na demonstração mostramos:

• A Ordem de Serviço digital de ponta a ponta
• Agenda, Kanban e mapa em tempo real
• O aplicativo do técnico funcionando offline
• Checklists, estoque, despesas e financeiro
• Os indicadores da operação

Fale com a gente pelo WhatsApp (11) 93933-0887 ou acesse ${SITE}.

Sua equipe está em campo. Sua gestão também deveria estar.`,
    tags: 'os',
  },
];

export const posts = [...ciclo1, ...ciclo2];

export default posts;
