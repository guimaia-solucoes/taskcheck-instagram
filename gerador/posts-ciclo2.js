// Ciclo 2 — posts 61 a 120 (dias 31 a 60). Mesmos campos de posts.js.
// Sem depoimentos: números de exemplo vêm sempre identificados como ilustrativos.

const SITE = 'taskcheck.app';

const ciclo2 = [
  // ───────────────────────── DIA 31 ─────────────────────────
  {
    tpl: 'frase', tema: 'Posicionamento',
    tag: 'Gestão de serviços em campo',
    titulo: 'Organizar a\noperação não\né luxo.\nÉ margem.',
    sub: 'Cada retrabalho, visita perdida e hora redigitando sai do seu lucro.',
    legenda: `Muita empresa de serviço trata organização como algo para "quando sobrar tempo".

Só que a desorganização tem preço, e ele aparece todo mês: visita refeita, material que some, hora administrativa redigitando o que o técnico já escreveu, cobrança que esqueceu um item.

Organizar a operação não é luxo. É margem.

O Taskcheck conecta OS, agenda, app do técnico, estoque, despesas e financeiro para que cada atendimento feche com o custo e o valor certos.

Conheça em ${SITE}`,
    tags: 'gestao',
  },
  {
    tpl: 'feature', tema: 'Produto',
    tag: 'App do técnico',
    titulo: 'O dia do técnico\ncomeça com\num resumo',
    sub: 'Abriu o aplicativo, já sabe o que tem pela frente.',
    itens: ['Atendimentos do dia em destaque', 'Próxima OS a um toque', 'Pendências de sincronização visíveis', 'Acesso rápido a agenda, estoque e despesas'],
    print: 'app-home-page',
    legenda: `O primeiro minuto do dia define o resto dele.

No Taskcheck o técnico abre o aplicativo e encontra o resumo do dia: quantos atendimentos tem, qual é o próximo, se existe algum registro aguardando sincronização e o acesso direto à agenda, ao estoque e às despesas.

Sem ligar para a central perguntando "qual é a primeira de hoje?".

A operação inteira no bolso, desde a primeira hora.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 32 ─────────────────────────
  {
    tpl: 'vs', tema: 'Antes x Depois',
    tag: 'Ordem de Serviço',
    titulo: 'OS de papel\nx OS digital',
    sub: 'O papel registra o que coube na folha. A OS digital registra o que aconteceu.',
    antesTitulo: 'OS de papel',
    antes: ['Letra que ninguém entende', 'Folha que molha, rasga ou some', 'Chega ao escritório dias depois', 'Sem foto, sem horário, sem localização'],
    depoisTitulo: 'OS no Taskcheck',
    depois: ['Campos padronizados e legíveis', 'Salva no app, mesmo offline', 'Chega na hora em que é finalizada', 'Foto, horário e geolocalização em cada etapa'],
    legenda: `A OS de papel ainda é realidade em muita operação. E ela cobra caro:

• Letra que ninguém entende
• Folha que molha, rasga ou fica no carro
• Informação que chega ao escritório dias depois
• Nenhuma prova de horário ou de local

No Taskcheck a Ordem de Serviço é digital de ponta a ponta. O técnico registra no aplicativo, mesmo sem internet, e a OS chega completa ao escritório no momento em que é finalizada: com fotos, checklist, materiais, assinatura e o horário de cada etapa.`,
    tags: 'os',
  },
  {
    tpl: 'segmento', tema: 'Segmento',
    tag: 'Segmentos atendidos',
    titulo: 'Elétrica',
    sub: 'Serviços, inspeções e corretivas com evidência e segurança.',
    itens: ['Checklists de inspeção por tipo de instalação', 'Fotos do quadro antes e depois do serviço', 'Materiais baixados do estoque do técnico', 'Laudo do atendimento em PDF com a sua marca'],
    legenda: `Em serviços elétricos, o registro protege o cliente, o técnico e a sua empresa.

O Taskcheck organiza operações de elétrica com:

• Checklists de inspeção diferentes por tipo de instalação
• Fotos do quadro antes e depois, com horário e localização
• Ocorrências registradas no momento em que são encontradas
• Cabos, disjuntores e contatores baixados do estoque do técnico direto na OS
• Relatório em PDF com a identidade da sua empresa, assinado pelo cliente

Serviços e inspeções elétricas com rastreabilidade de ponta a ponta.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 33 ─────────────────────────
  {
    tpl: 'pergunta', tema: 'Dor',
    tag: 'Reincidência',
    pergunta: 'Por que esse cliente chamou de novo?',
    contexto: 'O mesmo problema, no mesmo equipamento, em menos de 30 dias.',
    extras: ['O que foi feito na última visita?', 'Qual peça foi trocada?', 'Quem atendeu?', 'Ficou alguma pendência?'],
    resposta: 'No Taskcheck o histórico do equipamento está na OS. O técnico chega sabendo o que já foi feito e a reincidência vira indicador, não surpresa.',
    legenda: `Retorno ao mesmo cliente com o mesmo problema é o tipo de custo que ninguém fatura.

E quase sempre começa igual: o técnico de hoje não sabe o que o técnico do mês passado encontrou.

No Taskcheck cada equipamento tem seu histórico: atendimentos anteriores, peças substituídas, ocorrências, checklists e fotos. O técnico consulta antes de entrar no cliente.

E o painel mostra a reincidência em 30 dias, para você enxergar onde o problema está se repetindo.`,
    tags: 'campo',
  },
  {
    tpl: 'dica', tema: 'Educacional',
    numeroDica: '05',
    titulo: 'Meça a reincidência\nantes que o cliente\nreclame',
    sub: 'Voltar ao mesmo cliente pelo mesmo problema é custo dobrado e confiança pela metade.',
    itens: ['Defina o prazo de retorno que conta como reincidência', 'Vincule cada OS ao equipamento atendido', 'Revise as reincidências do mês com a equipe', 'Ajuste o checklist onde o erro se repete'],
    legenda: `Dica de gestão em campo #05

Reincidência é o indicador mais honesto de qualidade da operação. E quase ninguém mede.

1. Defina o prazo que conta como reincidência (30 dias é um bom começo)
2. Vincule cada OS ao equipamento, não só ao cliente
3. Revise as reincidências do mês com a equipe, sem caça às bruxas
4. Ajuste o checklist exatamente no ponto em que o erro se repete

No Taskcheck o histórico por equipamento e o indicador de reincidência já vêm prontos.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 34 ─────────────────────────
  {
    tpl: 'checklist', tema: 'Recurso',
    tag: 'Checklist · Elétrica',
    titulo: 'Inspeção de\nquadro elétrico',
    sub: 'Cada resposta pede a próxima verificação e a evidência certa.',
    linhas: [
      { t: 'Há sinais de aquecimento nos barramentos?', v: 'Sim', tipo: 'sim' },
      { t: 'Em qual circuito?', v: 'Circuito 7', tipo: 'dep' },
      { t: 'Foto do ponto aquecido', v: '3 fotos vinculadas', tipo: 'foto' },
      { t: 'Disjuntor compatível com a carga?', v: 'Substituir', tipo: 'dep' },
      { t: 'Aterramento verificado?', v: 'Aprovado', tipo: 'ok' },
    ],
    legenda: `Checklist bom não é formulário. É roteiro de inspeção.

Neste exemplo de quadro elétrico, o técnico encontra sinal de aquecimento e o Taskcheck abre as perguntas seguintes: qual circuito, foto do ponto, compatibilidade do disjuntor.

• Perguntas obrigatórias e condicionais
• Fotos vinculadas a cada pergunta
• Aprovação e reprovação com observação obrigatória
• Vários checklists na mesma OS

Você monta o checklist do seu jeito, para cada tipo de serviço.`,
    tags: 'tec',
  },
  {
    tpl: 'feature', tema: 'Recurso',
    tag: 'Busca por localização',
    titulo: 'Chamado urgente?\nVeja quem está\nmais perto',
    sub: 'Encontre atendimentos e técnicos pela localização, direto no mapa.',
    itens: ['Busca de OSs por endereço e região', 'Técnicos disponíveis próximos ao local', 'Distância e previsão de chegada', 'Encaixe decidido em segundos'],
    print: 'app-buscalocalizacao',
    legenda: `O chamado urgente entrou. Quem atende?

Sem localização, a decisão vira uma rodada de ligações: "você está onde?", "consegue ir?", "quanto tempo?".

No Taskcheck você vê no mapa quem está disponível, quem está perto e a previsão de chegada. A busca por localização mostra os atendimentos da região e ajuda a encaixar o chamado no técnico certo.

Encaixe decidido com informação, não com telefonema.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 35 ─────────────────────────
  {
    tpl: 'numero', tema: 'Prova',
    tag: 'Mapa em tempo real',
    lead: 'Chamado urgente entrou agora. Quem chega primeiro?',
    numero: '12 min',
    unidade: '· 3,2 km',
    titulo: 'é a previsão do técnico\nmais próximo, na tela',
    sub: 'Distância e previsão de chegada de cada técnico no mapa. Você decide o encaixe sem ligar para ninguém.',
    legenda: `Exemplo de uso: chegou um chamado urgente e a central precisa decidir quem vai.

No mapa do Taskcheck aparece quem está disponível, quem está em atendimento e a distância e a previsão de chegada de cada um até o endereço.

Nesse exemplo: 3,2 km, 12 minutos. Decisão tomada em segundos.

(Valores ilustrativos. A localização em tempo real depende da permissão de localização e de conexão no aparelho do técnico.)`,
    tags: 'campo',
  },
  {
    tpl: 'mito', tema: 'Objeção',
    titulo: 'Sistema de OS\né só para\nempresa grande?',
    mito: '“Somos pequenos, ainda dá para controlar no WhatsApp.”',
    verdade: 'É na empresa pequena que cada visita perdida e cada peça sem baixa mais pesa no resultado.',
    itens: ['Comece com poucos técnicos e cresça', 'Implantação acompanhada pelo nosso time', 'Mesmo processo hoje e quando a equipe dobrar', 'O dono para de ser a central de informação'],
    legenda: `"Ainda somos pequenos, dá para controlar no WhatsApp."

Dá, até o dia em que não dá mais. E geralmente esse dia chega quando a empresa está crescendo, que é exatamente quando não dá para parar e arrumar a casa.

Na empresa pequena, cada visita perdida, cada peça sem baixa e cada hora redigitando pesa mais no resultado.

Com o Taskcheck você começa com a equipe que tem hoje, com implantação acompanhada, e o processo já está pronto quando a operação crescer.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 36 ─────────────────────────
  {
    tpl: 'segmento', tema: 'Segmento',
    tag: 'Segmentos atendidos',
    titulo: 'Hidráulica',
    sub: 'Manutenção, chamados e emergências com registro de cada visita.',
    itens: ['Chamados organizados por prioridade', 'Fotos do vazamento antes e depois do reparo', 'Peças e conexões baixadas na OS', 'Histórico por imóvel e por cliente'],
    legenda: `Vazamento não marca hora. Por isso a operação de hidráulica precisa de agenda flexível e registro confiável.

O Taskcheck ajuda com:

• Chamados organizados por prioridade e encaixes visíveis na agenda
• Técnico mais próximo identificado no mapa
• Fotos do problema antes e depois do reparo
• Tubos, conexões e registros baixados do estoque do técnico
• Histórico por imóvel, para a próxima visita começar sabendo

Manutenção e chamados hidráulicos sob controle.`,
    tags: 'campo',
  },
  {
    tpl: 'print', tema: 'Produto',
    tag: 'A caminho',
    titulo: 'Saiu para o\natendimento?\nO status muda.',
    sub: 'O técnico segue para a OS e a operação inteira acompanha.',
    print: 'app-indo-para-os',
    callouts: ['Status “A caminho” automático', 'Gestor acompanha no mapa', 'Cliente vê a previsão'],
    legenda: `Quando o técnico sai para o atendimento no Taskcheck, ninguém precisa avisar ninguém.

O status da OS muda para "A caminho", o gestor acompanha no mapa e o cliente pode ver a previsão de chegada no link de acompanhamento.

O técnico só dirige. O sistema informa.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 37 ─────────────────────────
  {
    tpl: 'jornada', tema: 'Produto',
    tag: 'Implantação acompanhada',
    titulo: 'Como sua operação\nentra no Taskcheck',
    etapas: [
      { t: 'Conversa inicial', d: 'Entendemos como a sua operação funciona hoje' },
      { t: 'Cadastros', d: 'Clientes, equipamentos, técnicos e serviços' },
      { t: 'Checklists', d: 'Montados para cada tipo de atendimento' },
      { t: 'Estoque', d: 'Saldo inicial de material de cada técnico' },
      { t: 'Treinamento', d: 'Gestores na plataforma, técnicos no app' },
      { t: 'Primeiras OSs', d: 'Operação real, com o nosso time por perto' },
      { t: 'Ajustes', d: 'Refinamos com base no uso do dia a dia' },
    ],
    legenda: `"Mas vai dar trabalho implantar?"

Implantação no Taskcheck é acompanhada. Em linhas gerais, o caminho é este:

1. Entendemos como sua operação funciona hoje
2. Cadastramos clientes, equipamentos, técnicos e serviços
3. Montamos os checklists de cada tipo de atendimento
4. Lançamos o saldo inicial de material de cada técnico
5. Treinamos gestores na plataforma e técnicos no aplicativo
6. Acompanhamos as primeiras OSs reais
7. Ajustamos com base no uso

Quer saber como seria na sua empresa? Fale com a gente.`,
    tags: 'gestao',
  },
  {
    tpl: 'feature', tema: 'Recurso',
    tag: 'Kanban',
    titulo: '“Aguardando peça”\nnão pode ser\num limbo',
    sub: 'OS parada aparece no Kanban, com motivo e responsável.',
    itens: ['Coluna própria para OS aguardando peça', 'Solicitação e autorização registradas na OS', 'Fácil enxergar o que está travado há dias', 'Retomada com histórico completo'],
    dark: true,
    legenda: `Toda operação tem aquela OS que ficou "aguardando peça" e ninguém mais lembrou dela.

Até o cliente ligar.

No Kanban do Taskcheck, "Aguardando peça" é uma coluna própria. A OS fica visível, com a solicitação de peça, quem autorizou e desde quando está parada.

Quando a peça chega, o atendimento é retomado com todo o histórico, sem ninguém precisar reconstruir o que aconteceu.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 38 ─────────────────────────
  {
    tpl: 'dica', tema: 'Educacional',
    numeroDica: '06',
    titulo: 'Defina o SLA\npor tipo de chamado',
    sub: 'Nem todo atendimento é urgente, mas o cliente precisa saber o que esperar de cada um.',
    itens: ['Classifique os chamados por prioridade', 'Defina um prazo claro para cada prioridade', 'Acompanhe as OSs atrasadas todos os dias', 'Mostre o SLA cumprido ao cliente'],
    legenda: `Dica de gestão em campo #06

Quando tudo é urgente, nada é urgente. E o cliente fica sem saber o que esperar.

1. Classifique os chamados por prioridade (emergência, alta, normal, programada)
2. Defina um prazo de atendimento claro para cada uma
3. Acompanhe diariamente as OSs atrasadas, não só no fim do mês
4. Use o SLA cumprido como argumento na renovação do contrato

No Taskcheck a OS tem prioridade e SLA, e o painel mostra as atrasadas e o percentual cumprido.`,
    tags: 'gestao',
  },
  {
    tpl: 'lista', tema: 'Produto',
    tag: 'Indicadores',
    titulo: 'Números que você\npassa a ter',
    chips: ['OS abertas e concluídas', 'OS atrasadas e SLA', 'Tempo médio de atendimento', 'Produtividade por técnico', 'Tempo em campo', 'Deslocamento por dia', 'Reincidência', 'Ticket médio da OS', 'Faturamento', 'Custos da operação', 'Comissões', 'Margem por atendimento'],
    rodape: 'Todos nascem do que o técnico registra no campo.',
    legenda: `Quanto tempo leva, em média, um atendimento seu? Quantos quilômetros cada técnico roda por dia? Qual é a margem de uma OS típica?

Se essas respostas dependem de planilha montada no fim do mês, elas chegam tarde demais para virar decisão.

No Taskcheck esses números aparecem sozinhos, porque nascem do que o técnico registra no campo: check-in, checkout, percurso, consumo, despesas e serviços executados.

Salve este post e compare com o que você consegue medir hoje.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 39 ─────────────────────────
  {
    tpl: 'segmento', tema: 'Segmento',
    tag: 'Segmentos atendidos',
    titulo: 'Telecom',
    sub: 'Instalações e manutenção com comprovação em cada endereço.',
    itens: ['Agenda de instalações por técnico e região', 'Fotos da instalação e dos equipamentos', 'Material e equipamentos baixados na OS', 'Assinatura do cliente na conclusão'],
    legenda: `Em telecom, a operação é volume de endereços por dia, e cada instalação precisa de comprovação.

O Taskcheck organiza:

• Agenda por técnico e por região, com encaixes e deslocamentos
• Navegação com Waze ou Google Maps a partir do endereço da OS
• Fotos da instalação, da passagem de cabo e dos equipamentos
• Cabos, conectores e equipamentos baixados do estoque do técnico
• Assinatura do cliente e PDF do atendimento

Instalações e manutenção com evidência em cada endereço.`,
    tags: 'campo',
  },
  {
    tpl: 'vs', tema: 'Antes x Depois',
    tag: 'Comissões',
    titulo: 'Comissão fechada\nsem planilha',
    sub: 'A comissão nasce do atendimento concluído, não da memória de alguém.',
    antesTitulo: 'Hoje',
    antes: ['Planilha montada no fim do mês', 'Técnico contestando valores', 'Ajudante que ninguém lembrou', 'Dias para conferir tudo'],
    depoisTitulo: 'Com o Taskcheck',
    depois: ['Comissão calculada por OS concluída', 'Regra clara por serviço ou percentual', 'Ajudantes registrados no atendimento', 'Relatório pronto para conferência'],
    legenda: `Fim de mês, fechamento de comissão: a planilha não bate, o técnico contesta, ninguém lembra que teve um ajudante naquela OS.

No Taskcheck a comissão é calculada a partir de cada atendimento concluído, seguindo a regra que a sua empresa definir: por OS, por serviço ou por percentual.

Como os ajudantes também ficam registrados na OS, o valor reflete quem realmente executou.

Menos discussão. Mais confiança da equipe.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 40 ─────────────────────────
  {
    tpl: 'feature', tema: 'Recurso',
    tag: 'Financeiro e comissões',
    titulo: 'Comissão sem\nplanilha e sem\ndiscussão',
    sub: 'Regras cadastradas uma vez, calculadas em cada atendimento.',
    itens: ['Por OS, por serviço ou por percentual', 'Regras por técnico, serviço e cliente', 'Valores a pagar visíveis no painel', 'Cada valor ligado à OS que o gerou'],
    dark: true,
    legenda: `A comissão é o assunto mais sensível da relação com o técnico. E o que gera desconfiança quase sempre é falta de transparência no cálculo.

No Taskcheck você cadastra as regras uma vez, por OS, por serviço ou por percentual, e o cálculo acontece em cada atendimento concluído.

Cada valor fica ligado à OS que o gerou. Se o técnico perguntar "de onde veio esse número?", a resposta está a um clique.`,
    tags: 'gestao',
  },
  {
    tpl: 'pergunta', tema: 'Dor',
    tag: 'Produtividade',
    pergunta: 'Quanto cada técnico produziu este mês?',
    contexto: 'Atendimentos, horas em campo, deslocamento e retorno.',
    extras: ['Quantas OSs cada um concluiu?', 'Quanto tempo ficou em atendimento?', 'Quanto rodou entre um cliente e outro?', 'Quantas visitas precisaram ser refeitas?'],
    resposta: 'No Taskcheck a produtividade por técnico vem do check-in, do checkout e do percurso. Sem achismo e sem planilha.',
    legenda: `Avaliar técnico por impressão é injusto com quem trabalha bem e confortável para quem não trabalha.

No Taskcheck cada técnico tem números reais, que vêm do próprio uso do aplicativo:

• OSs concluídas no período
• Tempo em atendimento e tempo em campo
• Quilômetros rodados
• Reincidência nos clientes que atendeu

Conversa de desempenho baseada em dado, não em achismo.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 41 ─────────────────────────
  {
    tpl: 'frase', tema: 'Posicionamento',
    tag: 'Memória da operação',
    titulo: 'Informação que\nfica no celular\ndo técnico vai\nembora com ele.',
    sub: 'Fotos, combinados e histórico precisam ficar com a empresa.',
    legenda: `Pense em quanta informação da sua operação está hoje na galeria e no WhatsApp pessoal dos técnicos.

Fotos de serviços, combinados com clientes, autorizações, endereços, observações sobre equipamentos.

No dia em que esse técnico sai da empresa, tudo isso vai junto.

No Taskcheck a informação nasce dentro da Ordem de Serviço, e fica com a empresa. Quem chegar depois encontra o histórico completo de cada cliente e equipamento.`,
    tags: 'gestao',
  },
  {
    tpl: 'feature', tema: 'Recurso',
    tag: 'Ocorrências',
    titulo: 'Visita improdutiva\ntambém precisa\nde prova',
    sub: 'Cliente ausente, local fechado ou equipamento diferente: tudo registrado.',
    itens: ['Lista de ocorrências do atendimento', 'Foto, horário e localização de cada uma', 'Central avisada no mesmo momento', 'Base para cobrar ou reagendar a visita'],
    print: 'app-ocorrencias',
    legenda: `O técnico foi até o cliente e não conseguiu atender. Cliente ausente, portaria sem autorização, área fechada, equipamento diferente do informado.

Sem registro, essa visita é só prejuízo. Com registro, ela pode ser cobrada, reagendada ou discutida com base em fato.

No Taskcheck a ocorrência entra na OS com foto, horário e localização, e a central fica sabendo na hora.`,
    tags: 'os',
  },

  // ───────────────────────── DIA 42 ─────────────────────────
  {
    tpl: 'checklist', tema: 'Recurso',
    tag: 'Checklist · Energia Solar',
    titulo: 'Comissionamento\nde sistema\nfotovoltaico',
    sub: 'A evidência de cada etapa sustenta a garantia da instalação.',
    linhas: [
      { t: 'Estrutura fixada conforme o projeto?', v: 'Aprovado', tipo: 'ok' },
      { t: 'Strings com tensão dentro do esperado?', v: 'Não', tipo: 'sim' },
      { t: 'Qual string está fora?', v: 'String 2', tipo: 'dep' },
      { t: 'Foto da medição', v: '2 fotos vinculadas', tipo: 'foto' },
      { t: 'Inversor comunicando com o app?', v: 'Aprovado', tipo: 'ok' },
    ],
    legenda: `Na energia solar, o comissionamento é o momento em que a instalação prova que está certa.

Neste exemplo, o técnico encontra uma string fora do esperado e o checklist do Taskcheck pede qual é, a foto da medição e a observação.

• Checklists de instalação e comissionamento
• Perguntas condicionais e fotos vinculadas
• Materiais baixados do estoque na OS
• Relatório final em PDF assinado pelo cliente

Instalação e garantia com evidência.`,
    tags: 'tec',
  },
  {
    tpl: 'dica', tema: 'Educacional',
    numeroDica: '07',
    titulo: 'Organize o histórico\npor equipamento',
    sub: 'O cliente muda de endereço, de responsável e de contrato. O equipamento continua lá.',
    itens: ['Cadastre o equipamento com modelo e número de série', 'Vincule toda OS ao equipamento atendido', 'Registre as peças trocadas em cada visita', 'Consulte o histórico antes de cada atendimento'],
    legenda: `Dica de gestão em campo #07

Histórico organizado só por cliente perde a informação mais útil: o que aconteceu com aquele equipamento específico.

1. Cadastre o equipamento com modelo e número de série
2. Vincule toda OS ao equipamento atendido
3. Registre as peças substituídas em cada visita
4. Faça o técnico consultar o histórico antes de entrar no cliente

No Taskcheck o técnico vê os atendimentos anteriores, as peças trocadas e as ocorrências daquele equipamento direto no aplicativo.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 43 ─────────────────────────
  {
    tpl: 'segmento', tema: 'Segmento',
    tag: 'Segmentos atendidos',
    titulo: 'Indústria',
    sub: 'Serviços técnicos e manutenção industrial sem parar a linha.',
    itens: ['Funciona offline em galpões e áreas sem sinal', 'Checklists de manutenção por máquina', 'Peças solicitadas e autorizadas dentro da OS', 'Histórico por equipamento e linha de produção'],
    legenda: `Na indústria, cada minuto de máquina parada custa caro. E galpão é justamente onde o sinal de celular não chega.

O Taskcheck atende manutenção industrial com:

• Aplicativo Offline First: o técnico registra tudo sem internet
• Checklists de manutenção preventiva e corretiva por máquina
• Solicitação de peça com autorização registrada na OS
• Histórico por equipamento, com peças e ocorrências
• Tempo de atendimento medido do check-in ao checkout

Serviços técnicos e manutenção industrial com rastreabilidade.`,
    tags: 'campo',
  },
  {
    tpl: 'print', tema: 'Produto',
    tag: 'Evidências',
    titulo: 'Antes, durante\ne depois',
    sub: 'As fotos entram na OS certa, na etapa certa.',
    print: 'app-inserir-fotos',
    callouts: ['Fotos organizadas por etapa', 'Horário e localização', 'Vinculadas ao checklist'],
    legenda: `Foto solta não prova nada. Foto com contexto prova tudo.

No Taskcheck o técnico anexa as fotos direto na Ordem de Serviço, organizadas por etapa: antes de começar, durante o serviço, a peça substituída e o resultado final.

Cada imagem guarda horário e localização e pode ficar vinculada a uma pergunta do checklist.

Quando alguém perguntar como estava, a resposta está na OS.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 44 ─────────────────────────
  {
    tpl: 'numero', tema: 'Prova',
    tag: 'Auditoria da operação',
    lead: 'Quando o cliente questiona um serviço, só quatro perguntas importam.',
    numero: '4',
    unidade: 'respostas',
    titulo: 'que toda OS do Taskcheck\njá traz registradas',
    sub: 'Quem fez, quando fez, onde fez e o que foi realizado. Sem depender da lembrança de ninguém.',
    legenda: `Toda auditoria de serviço em campo se resume a quatro perguntas:

• Quem fez? Técnico responsável, ajudantes e quem autorizou cada decisão
• Quando fez? Horário exato de cada etapa, do percurso ao checkout
• Onde fez? Geolocalização do início do percurso, do check-in e do checkout
• O que foi realizado? Serviços, materiais, checklist, fotos e ocorrências

No Taskcheck, cada OS responde as quatro sozinha.`,
    tags: 'os',
  },
  {
    tpl: 'vs', tema: 'Antes x Depois',
    tag: 'Relatório da OS',
    titulo: 'Relatório no Word\nx PDF automático',
    sub: 'O relatório é a última impressão que o cliente tem do seu serviço.',
    antesTitulo: 'Montado à mão',
    antes: ['Copiar e colar dados da OS', 'Juntar fotos do WhatsApp', 'Assinatura escaneada à parte', 'Horas por semana montando documento'],
    depoisTitulo: 'Gerado pelo Taskcheck',
    depois: ['Dados da OS preenchidos sozinhos', 'Fotos e checklist já incluídos', 'Assinatura com data e hora', 'Pronto ao finalizar o atendimento'],
    legenda: `Quantas horas por semana alguém da sua equipe passa montando relatório de atendimento?

Copia dado da OS, procura foto no WhatsApp, escaneia a assinatura, ajusta formatação, exporta, envia.

No Taskcheck o PDF da Ordem de Serviço é gerado automaticamente, com a identidade da sua empresa: serviços, materiais, respostas do checklist, fotos, ocorrências e a assinatura do cliente com data e hora.

Pronto para enviar no momento em que o atendimento termina.`,
    tags: 'os',
  },

  // ───────────────────────── DIA 45 ─────────────────────────
  {
    tpl: 'feature', tema: 'Recurso',
    tag: 'Preventivas',
    titulo: 'Preventiva que\nnão depende\nde lembrete',
    sub: 'Contratos e preventivas programadas viram OSs na agenda.',
    itens: ['Preventivas programadas por contrato', 'OSs distribuídas na agenda dos técnicos', 'Checklist certo para cada tipo de visita', 'Contratos ativos acompanhados no painel'],
    legenda: `Preventiva esquecida vira corretiva. E corretiva em cliente de contrato vira desgaste.

No Taskcheck as preventivas programadas dos contratos aparecem como Ordens de Serviço na agenda, com o checklist certo para cada tipo de visita.

O gestor acompanha os contratos ativos no painel e enxerga o que está em dia e o que está atrasado.

Contrato cumprido é contrato renovado.`,
    tags: 'campo',
  },
  {
    tpl: 'mito', tema: 'Objeção',
    titulo: 'Offline é só\npara área rural?',
    mito: '“Aqui na cidade tem sinal em todo lugar.”',
    verdade: 'Subsolo, casa de máquinas, galpão, elevador e prédio antigo: o serviço acontece justamente onde o sinal falha.',
    itens: ['O técnico registra tudo sem conexão', 'Os dados ficam salvos no aparelho', 'Sincroniza sozinho quando o sinal volta', 'Nada é digitado de novo'],
    legenda: `"Offline? Isso é para quem trabalha no interior. Aqui na cidade tem sinal."

Até o técnico descer para a casa de máquinas, entrar no subsolo da garagem, atender um galpão com telhado metálico ou subir até o barrilete.

A maior parte dos lugares onde o serviço técnico acontece é justamente onde o sinal falha.

O aplicativo do Taskcheck é Offline First: check-in, checklist, fotos, consumo, ocorrências e assinatura funcionam sem internet e sincronizam automaticamente quando a conexão volta.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 46 ─────────────────────────
  {
    tpl: 'segmento', tema: 'Segmento',
    tag: 'Segmentos atendidos',
    titulo: 'Segurança\nEletrônica',
    sub: 'Instalação e manutenção de CFTV, alarmes e controle de acesso.',
    itens: ['Checklist por tipo de equipamento instalado', 'Fotos de cada câmera, sensor e central', 'Equipamentos baixados do estoque na OS', 'Histórico por cliente e por ponto instalado'],
    legenda: `Em segurança eletrônica, o cliente precisa confiar que tudo foi instalado e testado. E você precisa conseguir provar.

O Taskcheck organiza instalação e manutenção de CFTV, alarmes e controle de acesso:

• Checklists por tipo de equipamento, com teste de funcionamento
• Fotos de cada câmera, sensor e central instalados
• Equipamentos e materiais baixados do estoque do técnico na OS
• Assinatura do cliente e PDF do atendimento
• Histórico por cliente para as manutenções seguintes

Instalação e manutenção com evidência.`,
    tags: 'campo',
  },
  {
    tpl: 'feature', tema: 'Recurso',
    tag: 'Chat com a central',
    titulo: 'Trabalho no app.\nWhatsApp pessoal\nfica para a família.',
    sub: 'O técnico fala com a central sem sair do aplicativo.',
    itens: ['Chat direto com a central', 'Conversa vinculada à OS', 'Assunto de trabalho fora do celular pessoal', 'Histórico disponível para quem assumir depois'],
    print: 'app-chatapp',
    legenda: `Seu técnico recebe mensagem de trabalho às 22h no WhatsApp pessoal? Tem foto de cliente misturada com foto da família na galeria?

No Taskcheck a conversa de trabalho acontece dentro do aplicativo, no chat com a central e vinculada à Ordem de Serviço.

O técnico separa o trabalho da vida pessoal. A empresa fica com o histórico. E quem assumir o atendimento depois encontra tudo o que foi combinado.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 47 ─────────────────────────
  {
    tpl: 'jornada', tema: 'Diferencial',
    tag: 'Offline First',
    titulo: 'O que acontece\nquando o sinal cai',
    etapas: [
      { t: 'Sem sinal', d: 'O técnico entra no subsolo ou no galpão' },
      { t: 'Atendimento continua', d: 'Check-in, checklist, fotos e consumo no app' },
      { t: 'Tudo salvo no aparelho', d: 'Registros aguardando sincronização' },
      { t: 'Assinatura e checkout', d: 'Também funcionam sem internet' },
      { t: 'Sinal volta', d: 'O app identifica a conexão sozinho' },
      { t: 'Sincronização', d: 'Tudo sobe para a plataforma, sem redigitar' },
    ],
    legenda: `O que acontece com o atendimento quando o celular do técnico fica sem sinal?

No Taskcheck, nada muda para quem está executando:

1. O técnico entra num local sem sinal
2. Check-in, checklist, fotos e consumo seguem no aplicativo
3. Os registros ficam salvos no aparelho
4. Assinatura e checkout também funcionam offline
5. Quando o sinal volta, o app identifica a conexão
6. Tudo sincroniza automaticamente com a plataforma

Sua operação não depende do sinal do celular.`,
    tags: 'tec',
  },
  {
    tpl: 'dica', tema: 'Educacional',
    numeroDica: '08',
    titulo: 'Despesa lançada\nno dia, não\nna sexta-feira',
    sub: 'Comprovante que espera uma semana no bolso volta amassado, ou não volta.',
    itens: ['Lance a despesa no momento do gasto', 'Fotografe o comprovante na hora', 'Vincule a despesa ao atendimento', 'Aprove ou recuse no mesmo dia'],
    legenda: `Dica de gestão em campo #08

Despesa de campo acumulada para "acertar no fim da semana" vira três problemas: comprovante perdido, gasto sem atendimento vinculado e conferência que toma uma tarde inteira.

1. Lance no momento do gasto
2. Fotografe o comprovante na hora
3. Vincule a despesa ao atendimento que a gerou
4. Aprove ou recuse no mesmo dia

No Taskcheck o técnico lança a despesa pelo aplicativo com foto do comprovante, a central aprova e o valor entra no custo da OS.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 48 ─────────────────────────
  {
    tpl: 'pergunta', tema: 'Dor',
    tag: 'Produtividade do técnico',
    pergunta: 'Seu técnico ainda volta ao escritório para entregar a OS?',
    contexto: 'Cada viagem de volta é tempo que poderia ser mais um atendimento.',
    extras: ['Quantos km só para entregar papel?', 'Quantas OSs chegam incompletas?', 'Quem digita tudo de novo?'],
    resposta: 'No Taskcheck o técnico finaliza a OS no cliente e segue direto para o próximo.',
    legenda: `Voltar ao escritório só para entregar a OS de papel parece pouco. Some os quilômetros, o tempo e o atendimento que deixou de ser feito no fim da tarde.

E depois alguém ainda precisa digitar tudo.

No Taskcheck o técnico finaliza a OS no próprio cliente: checklist, fotos, material, assinatura e checkout. A OS chega ao escritório na hora e o técnico segue direto para o próximo atendimento.`,
    tags: 'tec',
  },
  {
    tpl: 'feature', tema: 'Recurso',
    tag: 'Consumo de material',
    titulo: 'Material lançado\nno atendimento\ncerto',
    sub: 'O que foi usado entra na OS e sai do estoque do técnico.',
    itens: ['Lista de materiais consumidos na OS', 'Baixa automática no estoque do técnico', 'Quantidade e unidade de cada item', 'Valor entra na cobrança e no custo'],
    print: 'app-consumos-os',
    legenda: `Material anotado no caderno vira estimativa. Material lançado na OS vira dado.

No Taskcheck o técnico registra o consumo no próprio atendimento: item, quantidade e unidade. O estoque dele baixa na hora, e o valor entra tanto na cobrança do cliente quanto no custo real daquela OS.

No fim do mês, o que saiu do estoque bate com o que foi usado nos atendimentos.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 49 ─────────────────────────
  {
    tpl: 'frase', tema: 'Posicionamento',
    tag: 'Experiência do cliente',
    titulo: 'O cliente não\ncompra só o serviço.\nCompra a certeza\nde que foi bem feito.',
    sub: 'Transparência e comprovação também fazem parte da entrega.',
    legenda: `Duas empresas fazem o mesmo serviço com a mesma qualidade. Uma informa o cliente sobre cada etapa e entrega um relatório com fotos e assinatura. A outra manda "tá pronto" no WhatsApp.

Qual delas o cliente vai renovar?

O cliente não compra só o serviço. Compra a certeza de que foi bem feito.

No Taskcheck ele acompanha o atendimento pelo celular e recebe o PDF do serviço com a identidade da sua empresa.`,
    tags: 'gestao',
  },
  {
    tpl: 'lista', tema: 'Produto',
    tag: 'Experiência do cliente',
    titulo: 'O que o seu cliente\nacompanha pelo\ncelular',
    chips: ['Status do atendimento', 'Atualização de cada etapa', 'Quem é o técnico', 'Previsão de chegada', 'Dados da OS', 'Conversa com a central', 'Assinatura pelo celular', 'PDF do serviço realizado'],
    rodape: 'E para de ligar perguntando o que está acontecendo.',
    legenda: `No Taskcheck o seu cliente recebe um link de acompanhamento do atendimento. Por ele, pode:

• Acompanhar o status e cada etapa da OS
• Ver quem é o técnico responsável
• Ver a previsão de chegada
• Consultar as informações da Ordem de Serviço
• Conversar com a central
• Assinar o atendimento no próprio celular
• Receber o PDF do serviço realizado

Cliente informado liga menos e confia mais.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 50 ─────────────────────────
  {
    tpl: 'checklist', tema: 'Recurso',
    tag: 'Checklist · Segurança eletrônica',
    titulo: 'Instalação\nde CFTV',
    sub: 'Cada ponto testado, fotografado e aprovado no próprio app.',
    linhas: [
      { t: 'Todas as câmeras com imagem no gravador?', v: 'Não', tipo: 'sim' },
      { t: 'Qual câmera está sem imagem?', v: 'Câmera 4', tipo: 'dep' },
      { t: 'Foto do ponto de instalação', v: '1 foto vinculada', tipo: 'foto' },
      { t: 'Gravação configurada e testada?', v: 'Aprovado', tipo: 'ok' },
      { t: 'Acesso remoto liberado ao cliente?', v: 'Aprovado', tipo: 'ok' },
    ],
    legenda: `Instalação de CFTV só termina quando tudo foi testado. O checklist garante que nenhum ponto fique para trás.

Neste exemplo, uma câmera está sem imagem e o Taskcheck pede qual é e a foto do ponto, antes de seguir para a gravação e o acesso remoto.

• Checklists diferentes por tipo de instalação
• Perguntas condicionais e fotos vinculadas
• Aprovação e reprovação com observação
• Relatório final assinado pelo cliente

Padronize a instalação, do primeiro ao último ponto.`,
    tags: 'tec',
  },
  {
    tpl: 'segmento', tema: 'Segmento',
    tag: 'Segmentos atendidos',
    titulo: 'Manutenção\nPreventiva e\nCorretiva',
    sub: 'A preventiva programada e a corretiva que chega no meio do dia.',
    itens: ['Preventivas programadas na agenda', 'Corretivas encaixadas pelo mapa', 'Checklist diferente para cada tipo', 'Histórico que reduz a reincidência'],
    legenda: `Toda operação de manutenção vive o mesmo equilíbrio: cumprir a preventiva programada sem deixar a corretiva urgente esperando.

O Taskcheck ajuda a equilibrar:

• Preventivas programadas viram OSs na agenda
• Corretivas encaixadas no técnico mais próximo, pelo mapa
• Checklists diferentes para preventiva e corretiva
• Histórico por equipamento para reduzir a reincidência
• Indicadores de SLA e OSs atrasadas

Preventiva e corretiva na mesma operação.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 51 ─────────────────────────
  {
    tpl: 'numero', tema: 'Prova',
    tag: 'Calculadora de ROI',
    lead: 'Exemplo: 400 atendimentos por mês, meia hora de retaguarda em cada um.',
    numero: '200 h',
    unidade: '/ mês',
    titulo: 'de trabalho administrativo\nredigitando e conferindo',
    sub: 'Tempo que poderia ir para atender o cliente, vender ou planejar a operação.',
    legenda: `Faça a conta com a sua realidade:

400 atendimentos por mês × 30 minutos de trabalho administrativo em cada um (digitar, conferir, procurar foto, montar relatório) = 200 horas por mês.

É mais do que uma pessoa trabalhando o mês inteiro só para transformar em dado o que o técnico já tinha registrado.

No Taskcheck o registro nasce no campo e chega pronto no escritório.

Valores de exemplo. Simule com os seus números na calculadora de ROI do site, link na bio.`,
    tags: 'gestao',
  },
  {
    tpl: 'vs', tema: 'Antes x Depois',
    tag: 'Rotina do gestor',
    titulo: 'Apagar incêndio\nou decidir?',
    sub: 'O mesmo gestor, com e sem informação na mão.',
    antesTitulo: 'Sem visibilidade',
    antes: ['O dia começa ligando para técnico', 'Descobre o atraso quando o cliente reclama', 'Fecha o mês sem saber a margem', 'Decide por intuição'],
    depoisTitulo: 'Com o Taskcheck',
    depois: ['O dia começa olhando o painel', 'Vê a OS atrasada antes do cliente', 'Sabe o custo e a margem de cada OS', 'Decide com base em dado'],
    legenda: `O gestor de operação em campo costuma ser o profissional mais ocupado da empresa. E boa parte desse tempo vai para descobrir o que está acontecendo.

Sem visibilidade, o dia é apagar incêndio: ligar para técnico, responder cliente irritado, montar planilha.

Com a operação no Taskcheck, o gestor abre o painel, vê o que está atrasado, quem está onde e quanto custou cada atendimento, e usa o tempo para decidir.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 52 ─────────────────────────
  {
    tpl: 'feature', tema: 'Produto',
    tag: 'Mapa no app',
    titulo: 'Os atendimentos\ndo dia no mapa\ndo técnico',
    sub: 'Ele enxerga a rota inteira antes de sair.',
    itens: ['OSs do dia posicionadas no mapa', 'Distância até cada atendimento', 'Navegação com um toque', 'Funciona com Waze e Google Maps'],
    print: 'app-mapa-oss',
    legenda: `Lista de endereços não mostra a melhor sequência do dia. O mapa mostra.

No aplicativo do Taskcheck o técnico vê os atendimentos do dia posicionados no mapa, a distância até cada um e abre a navegação no Waze ou no Google Maps com um toque.

Menos quilômetro rodado à toa. Mais atendimento no mesmo dia.`,
    tags: 'tec',
  },
  {
    tpl: 'dica', tema: 'Educacional',
    numeroDica: '09',
    titulo: 'Comece pequeno.\nMas comece.',
    sub: 'Não é preciso digitalizar toda a operação no primeiro dia.',
    itens: ['Escolha uma equipe ou um tipo de serviço', 'Comece pela OS digital e pelas fotos', 'Inclua checklist e estoque na sequência', 'Amplie quando a equipe estiver confortável'],
    legenda: `Dica de gestão em campo #09

O maior erro de quem quer organizar a operação é esperar o momento perfeito para mudar tudo de uma vez.

1. Escolha uma equipe ou um tipo de serviço para começar
2. Comece pelo básico: OS digital, fotos e assinatura
3. Inclua checklists, estoque e despesas na sequência
4. Amplie para o resto da operação quando a equipe estiver confortável

No Taskcheck a implantação é acompanhada, no ritmo da sua operação.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 53 ─────────────────────────
  {
    tpl: 'pergunta', tema: 'Dor',
    tag: 'Memória da operação',
    pergunta: 'Se o seu melhor técnico sair amanhã, o conhecimento vai junto?',
    contexto: 'Clientes, equipamentos, manias de cada instalação.',
    extras: ['Quem sabe a história daquele cliente?', 'Onde estão as fotos dos últimos serviços?', 'O que foi combinado com o síndico?'],
    resposta: 'No Taskcheck o conhecimento fica na OS: histórico, fotos, peças e conversas. O próximo técnico chega sabendo.',
    legenda: `Toda operação tem aquele técnico que "sabe tudo": conhece cada cliente, lembra de cada equipamento, sabe o que foi combinado com cada síndico.

Isso é ótimo, até o dia em que ele sai de férias, muda de empresa ou simplesmente não atende o telefone.

No Taskcheck esse conhecimento fica registrado na Ordem de Serviço: histórico por equipamento, peças trocadas, fotos, ocorrências e conversas. O próximo técnico chega sabendo o que o anterior sabia.`,
    tags: 'gestao',
  },
  {
    tpl: 'print', tema: 'Produto',
    tag: 'App do técnico',
    titulo: 'Tudo o que o\ntécnico precisa\nem um menu',
    sub: 'Agenda, OSs, estoque, despesas, chat e sincronização.',
    print: 'app-menu',
    callouts: ['Agenda e OSs do dia', 'Estoque e despesas', 'Chat com a central'],
    legenda: `Um aplicativo para o técnico só funciona se for simples.

No Taskcheck tudo o que ele precisa está a um toque no menu: agenda, lista de OSs, mapa, estoque, despesas, chat com a central, registros aguardando sincronização e o botão do pânico.

Sem cinco aplicativos diferentes. Sem caderno no porta-luvas.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 54 ─────────────────────────
  {
    tpl: 'feature', tema: 'Recurso',
    tag: 'Estoque do técnico',
    titulo: 'Peça passou de\num técnico para\noutro? Fica rastreado.',
    sub: 'Transferências entre técnicos com origem, destino e responsável.',
    itens: ['Transferência registrada pelo aplicativo', 'Sai de um saldo e entra no outro', 'Data, responsável e quantidade', 'Histórico completo de movimentações'],
    print: 'app-estoque-tecnico',
    legenda: `"Passei aquele capacitor para o Carlos." Na prática, essa frase é onde o controle de estoque se perde.

No Taskcheck a transferência entre técnicos é registrada: a peça sai de um saldo e entra no outro, com data, quantidade e responsável.

Somado às entradas, devoluções e consumos lançados na OS, você tem o histórico completo de cada item que está na rua.`,
    tags: 'campo',
  },
  {
    tpl: 'mito', tema: 'Objeção',
    titulo: 'Localização\né desconfiança\ndo técnico?',
    mito: '“Rastrear a equipe vai passar a impressão de que eu não confio nela.”',
    verdade: 'O registro de horário e local protege o técnico: prova que ele chegou, quanto tempo ficou e que fez o serviço.',
    itens: ['Comprova o horário de chegada ao cliente', 'Encerra discussão sobre visita não feita', 'Ajuda a central em situação de risco', 'Regras claras, combinadas com a equipe'],
    legenda: `"Se eu acompanhar a localização, a equipe vai achar que eu não confio nela."

Na prática, o registro de horário e local é o que protege o técnico quando o cliente diz "ninguém veio aqui" ou "ele ficou só 10 minutos".

Com o Taskcheck o check-in grava horário e geolocalização, e em situação de risco o Botão do Pânico envia a localização para a central.

Transparência combinada com a equipe é proteção, não vigilância.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 55 ─────────────────────────
  {
    tpl: 'jornada', tema: 'Produto',
    tag: 'Encaixe urgente',
    titulo: 'Do chamado\nurgente ao\natendimento',
    etapas: [
      { t: 'Chamado urgente', d: 'Registrado com prioridade alta' },
      { t: 'Mapa', d: 'Quem está disponível e mais perto' },
      { t: 'Encaixe', d: 'OS atribuída e agenda ajustada' },
      { t: 'A caminho', d: 'Cliente recebe a previsão de chegada' },
      { t: 'Check-in', d: 'Horário e localização registrados' },
      { t: 'Concluído', d: 'Assinatura e PDF enviados' },
    ],
    legenda: `O chamado urgente é o teste de estresse de qualquer operação.

No Taskcheck, o caminho é curto:

1. O chamado entra com prioridade alta
2. O mapa mostra quem está disponível e mais perto
3. A OS é atribuída e a agenda se ajusta, com o encaixe visível
4. O cliente recebe a previsão de chegada
5. O check-in registra horário e local
6. Assinatura e PDF fecham o atendimento

Urgência resolvida com informação, não com correria.`,
    tags: 'os',
  },
  {
    tpl: 'frase', tema: 'Posicionamento',
    tag: 'Como funciona na prática',
    titulo: 'A melhor ligação\né a que ninguém\nprecisa fazer.',
    sub: 'Quando a informação está na tela, o telefone fica para a exceção.',
    legenda: `"Cadê você?" "Já chegou?" "Terminou?" "O cliente assinou?" "Usou qual peça?"

Cada uma dessas ligações interrompe quem está executando e quem está gerindo.

No Taskcheck o status da OS muda pela ação do técnico, o mapa mostra onde cada um está e o registro do atendimento chega pronto.

A melhor ligação é a que ninguém precisa fazer.`,
    tags: 'campo',
  },

  // ───────────────────────── DIA 56 ─────────────────────────
  {
    tpl: 'feature', tema: 'Recurso',
    tag: 'Assinatura',
    titulo: 'O cliente também\npode assinar\npelo celular dele',
    sub: 'No aparelho do técnico ou no link de acompanhamento do atendimento.',
    itens: ['Assinatura na tela do técnico, até offline', 'Ou pelo celular do próprio cliente', 'Nome, documento, data e horário', 'Anexada à OS e incluída no PDF'],
    print: 'app-assinatura-cliente',
    legenda: `Nem sempre o responsável pelo aceite está no local na hora em que o serviço termina.

No Taskcheck a assinatura pode ser coletada na tela do aparelho do técnico, inclusive sem internet, ou pelo próprio cliente, no celular dele, a partir do link de acompanhamento do atendimento.

Nos dois casos ficam registrados nome, documento, data e horário, e a assinatura entra na OS e no PDF.`,
    tags: 'os',
  },
  {
    tpl: 'dica', tema: 'Educacional',
    numeroDica: '10',
    titulo: 'Revise as\nocorrências\nda semana',
    sub: 'As ocorrências contam onde a operação está perdendo tempo e dinheiro.',
    itens: ['Separe as ocorrências por motivo', 'Identifique os clientes que mais se repetem', 'Corrija na origem: agenda, cadastro ou contrato', 'Compartilhe o que mudou com a equipe'],
    legenda: `Dica de gestão em campo #10

Ocorrência registrada e nunca analisada é só arquivo. Analisada toda semana, vira melhoria contínua.

1. Separe as ocorrências por motivo (cliente ausente, acesso negado, peça faltando, equipamento divergente)
2. Veja quais clientes e endereços mais se repetem
3. Corrija na origem: confirmação de agenda, cadastro do equipamento ou regra do contrato
4. Compartilhe com a equipe o que mudou

No Taskcheck as ocorrências ficam registradas na OS com foto, horário e localização.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 57 ─────────────────────────
  {
    tpl: 'vs', tema: 'Antes x Depois',
    tag: 'Técnico novo na equipe',
    titulo: 'O primeiro mês\ndo técnico novo',
    sub: 'Com e sem o histórico da operação à mão.',
    antesTitulo: 'Sem histórico',
    antes: ['Liga para o colega a cada visita', 'Não sabe o que já foi feito no cliente', 'Esquece itens que o cliente sempre pede', 'Aprende errando no cliente'],
    depoisTitulo: 'Com o Taskcheck',
    depois: ['Consulta o histórico do equipamento', 'Vê fotos e peças das visitas anteriores', 'Segue o checklist do tipo de serviço', 'Chega preparado desde a primeira OS'],
    legenda: `Contratar técnico já é difícil. Fazer ele render rápido é mais difícil ainda.

Sem histórico, o técnico novo aprende errando no cliente e ligando para o colega a cada visita.

No Taskcheck ele chega preparado: consulta o histórico do equipamento, vê as fotos e as peças das visitas anteriores e segue o checklist padrão daquele tipo de serviço.

Menos tempo de adaptação. Mesma qualidade, qualquer que seja o técnico.`,
    tags: 'campo',
  },
  {
    tpl: 'numero', tema: 'Prova',
    tag: 'Retaguarda',
    lead: 'Quantas vezes a mesma informação é digitada na sua operação?',
    numero: '0',
    unidade: 'redigitação',
    titulo: 'do campo até o\nfinanceiro',
    sub: 'O técnico registra uma vez. A OS, o estoque, as despesas e o financeiro usam o mesmo dado.',
    legenda: `Na maioria das operações, a mesma informação é digitada três, quatro vezes: o técnico anota, alguém passa para a planilha, outra pessoa lança no estoque e mais alguém usa para cobrar.

Cada digitação é uma chance de erro e uma hora de trabalho.

No Taskcheck o técnico registra uma vez, no aplicativo, e esse mesmo dado alimenta a OS, o estoque, as despesas, a comissão e a cobrança.

Registro único. Do campo ao financeiro.`,
    tags: 'gestao',
  },

  // ───────────────────────── DIA 58 ─────────────────────────
  {
    tpl: 'feature', tema: 'Recurso',
    tag: 'Linha do tempo',
    titulo: 'O que aconteceu,\nminuto a minuto',
    sub: 'Cada etapa da OS registrada pela ação de quem executou.',
    itens: ['OS criada, técnico atribuído e percurso', 'Chegada, check-in e início do atendimento', 'Peças solicitadas e autorizações', 'Assinatura, checkout e PDF enviado'],
    dark: true,
    legenda: `"O técnico chegou que horas? Quando a peça foi autorizada? Que horas o cliente assinou?"

Na linha do tempo da OS no Taskcheck, essas respostas estão em ordem, minuto a minuto: criação da OS, técnico atribuído, percurso iniciado, chegada, check-in, peça solicitada e autorizada, serviço concluído, assinatura, checkout e PDF enviado.

Nada disso é digitado depois. Cada etapa é registrada pela ação de quem executou.`,
    tags: 'os',
  },
  {
    tpl: 'checklist', tema: 'Recurso',
    tag: 'Checklist · Hidráulica',
    titulo: 'Atendimento\nde vazamento',
    sub: 'Do diagnóstico ao teste final, com foto onde importa.',
    linhas: [
      { t: 'Vazamento visível no local?', v: 'Sim', tipo: 'sim' },
      { t: 'Origem do vazamento', v: 'Registro do banheiro', tipo: 'dep' },
      { t: 'Foto antes do reparo', v: '2 fotos vinculadas', tipo: 'foto' },
      { t: 'Peça substituída?', v: 'Reparo do registro', tipo: 'dep' },
      { t: 'Teste de estanqueidade aprovado?', v: 'Aprovado', tipo: 'ok' },
    ],
    legenda: `Vazamento resolvido sem registro vira discussão se voltar a pingar.

Neste exemplo de checklist hidráulico, o técnico informa a origem, fotografa antes do reparo, registra a peça substituída e aprova o teste final.

• Checklists por tipo de chamado
• Perguntas condicionais e fotos vinculadas
• Material baixado do estoque na OS
• Assinatura do cliente na conclusão

Diagnóstico, reparo e teste documentados.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 59 ─────────────────────────
  {
    tpl: 'dica', tema: 'Educacional',
    numeroDica: '11',
    titulo: 'Foto obrigatória,\nmas com critério',
    sub: 'Pedir foto de tudo cansa o técnico. Pedir nos pontos certos protege a empresa.',
    itens: ['Exija foto antes de intervir no equipamento', 'Exija foto da peça substituída', 'Exija foto do resultado final', 'Nos demais itens, deixe a foto opcional'],
    legenda: `Dica de gestão em campo #11

Checklist que pede foto em todas as perguntas vira um álbum que ninguém olha, e um técnico que fotografa qualquer coisa para seguir em frente.

Seja estratégico:

1. Foto obrigatória antes de intervir no equipamento
2. Foto obrigatória da peça substituída
3. Foto obrigatória do resultado final
4. Nos demais itens, foto opcional

No Taskcheck você define, pergunta a pergunta, onde a evidência é obrigatória.`,
    tags: 'tec',
  },
  {
    tpl: 'lista', tema: 'Produto',
    tag: 'App do técnico',
    titulo: 'Tudo o que o técnico\nfaz pelo aplicativo',
    chips: ['Ver a agenda do dia', 'Iniciar o percurso', 'Abrir Waze ou Maps', 'Fazer check-in', 'Responder checklists', 'Tirar e anexar fotos', 'Registrar ocorrências', 'Lançar consumo', 'Incluir ajudantes', 'Lançar despesas', 'Falar com a central', 'Coletar assinatura'],
    rodape: 'E quase tudo funciona sem internet.',
    legenda: `O aplicativo do Taskcheck acompanha o técnico do primeiro ao último atendimento do dia:

agenda, percurso, navegação, check-in, checklists, fotos, ocorrências, consumo de material, ajudantes, despesas, chat com a central, assinatura do cliente, checkout e botão do pânico.

Tudo em um lugar só, e funcionando mesmo sem internet.

Salve este post para mostrar à sua equipe técnica.`,
    tags: 'tec',
  },

  // ───────────────────────── DIA 60 ─────────────────────────
  {
    tpl: 'frase', tema: 'Posicionamento',
    tag: 'O que muda',
    titulo: 'Organizar não é\ntrabalhar mais.\nÉ parar de fazer\nduas vezes.',
    sub: 'Registrar uma vez, no campo, e usar em toda a operação.',
    legenda: `Muita gente adia a organização da operação por achar que vai dar mais trabalho.

Na prática, a operação desorganizada é que dá trabalho dobrado: o técnico anota e alguém digita, a foto é tirada e depois procurada, o material é usado e depois estimado, o serviço é feito e depois explicado.

Organizar não é trabalhar mais. É parar de fazer tudo duas vezes.

É para isso que o Taskcheck existe.`,
    tags: 'gestao',
  },
  {
    tpl: 'cta', tema: 'Conversão',
    tag: 'Demonstração',
    titulo: 'Quer ver o Taskcheck\nrodando na sua\noperação?',
    sub: 'Mostramos a plataforma com os seus serviços, a sua equipe e os seus clientes.',
    itens: ['OS digital, agenda, Kanban e mapa', 'App do técnico funcionando offline', 'Estoque, despesas, comissões e indicadores'],
    contato: '(11) 93933-0887',
    legenda: `Se você acompanhou nossos posts até aqui, já conhece o que o Taskcheck faz. O próximo passo é ver a plataforma com o cenário da sua própria operação.

Na demonstração mostramos:

• A Ordem de Serviço digital e a linha do tempo do atendimento
• Agenda, Kanban e mapa em tempo real
• O aplicativo do técnico funcionando sem internet
• Checklists, estoque, despesas e comissões
• Os indicadores da operação

Fale com a gente pelo WhatsApp (11) 93933-0887 ou acesse ${SITE}.`,
    tags: 'os',
  },
];

// Numeração e calendário: posts 61..120, dias 31..60, manhã e tarde.
export default ciclo2.map((p, i) => ({
  n: 61 + i,
  dia: 31 + Math.floor(i / 2),
  slot: i % 2 === 0 ? 'manha' : 'tarde',
  ...p,
}));
