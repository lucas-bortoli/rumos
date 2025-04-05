import img0 from "./KnowledgeTrailImages/Descobrindo o IPVA.jpeg";
import img1 from "./KnowledgeTrailImages/Manutenção_Carro.jpeg";
import img2 from "./KnowledgeTrailImages/Papelada.jpeg";
import img3 from "./KnowledgeTrailImages/Papelada2.jpeg";
import img4 from "./KnowledgeTrailImages/Tipos de Financiamento.jpeg";

export const TELEMETRY_ENDPOINT = import.meta.env.VITE_TELEMETRY_ENDPOINT_URL;
export const TELEMETRY_CLIENT_KEY = import.meta.env.VITE_TELEMETRY_CLIENT_KEY;

console.log({ TELEMETRY_ENDPOINT, TELEMETRY_CLIENT_KEY });

export type KnowledgeTrailCategoryId = string & { _tag?: "KnowledgeTrailCategoryId" };

export interface KnowledgeTrailCategory {
  id: KnowledgeTrailCategoryId;
  title: string;
}

const KnowledgeTrailCategoryMyFirstVehicle: KnowledgeTrailCategory = {
  id: "84607caf-0e06-440e-868e-94386d9d591d",
  title: "Meu Primeiro Veículo",
};

const KnowledgeTrailCategoryLivingAloneWhatNow: KnowledgeTrailCategory = {
  id: "69bfafb7-0ae5-4db0-8db6-93418f9199b5",
  title: "Morando Sozinho, e Agora?",
};

export const KNOWLEDGE_TRAIL_CATEGORIES = [
  KnowledgeTrailCategoryLivingAloneWhatNow,
  KnowledgeTrailCategoryMyFirstVehicle,
];

export type KnowledgeTrailId = string & { _tag?: "KnowledgeTrailId" };

export interface KnowledgeTrail {
  id: KnowledgeTrailId;
  categoryId: KnowledgeTrailCategoryId;
  title: string;
  backgroundImage: string;
  isEnabled: boolean;
}

export const KNOWLEDGE_TRAILS: KnowledgeTrail[] = [
  {
    id: "1c5d16ce-20c4-40a0-b2b4-ddfefcc24e65",
    categoryId: KnowledgeTrailCategoryMyFirstVehicle.id,
    title: "Descobrindo o IPVA",
    backgroundImage: img0,
    isEnabled: false,
  },
  {
    id: "84b0654d-26fd-4c7c-a348-a1dd5292ba1b",
    categoryId: KnowledgeTrailCategoryMyFirstVehicle.id,
    title: "Tipos de Financiamento",
    backgroundImage: img4,
    isEnabled: false,
  },
  {
    id: "2ac14bca-fc65-4d9e-8b0d-da721a56acc4",
    categoryId: KnowledgeTrailCategoryMyFirstVehicle.id,
    title: "Manutenção e Seguro",
    backgroundImage: img1,
    isEnabled: false,
  },
  {
    id: "caf9e1d5-9023-4777-8481-912599381726",
    categoryId: KnowledgeTrailCategoryMyFirstVehicle.id,
    title: "Documentação",
    backgroundImage: img2,
    isEnabled: false,
  },
  //
  {
    id: "9c61f55d-44de-45e2-aa19-9046908e499d",
    categoryId: KnowledgeTrailCategoryLivingAloneWhatNow.id,
    title: "Termos Técnicos de Contrato",
    backgroundImage: img3,
    isEnabled: true,
  },
  {
    id: "174d5105-b07d-46d6-81ed-fba8c67be205",
    categoryId: KnowledgeTrailCategoryLivingAloneWhatNow.id,
    title: "Documentação",
    backgroundImage: img2,
    isEnabled: false,
  },
  {
    id: "a0d7614e-3e17-4dd6-9a89-cd6b3fa5e0d4",
    categoryId: KnowledgeTrailCategoryLivingAloneWhatNow.id,
    title: "Taxas e Juros",
    backgroundImage: img2,
    isEnabled: false,
  },
];

export type StudyCardId = string & { _tag?: "KnowledgeTrailId" };

export interface StudyCard {
  id: StudyCardId;
  front: string;
  back: string;
  back_example: string;
}

export interface StudyCard {
  id: StudyCardId;
  front: string;
  back: string;
  back_example: string;
}

export const STUDY_CARDS: StudyCard[] = [
  {
    id: "535dbf21-dc7d-4b04-a898-e71d9a96bd68",
    front: "Locador",
    back: "Pessoa que é dona do imóvel e está alugando para outra pessoa.",
    back_example: "João é dono de uma loja e decide alugá-la. Ele é o locador.",
  },
  {
    id: "853caa0a-592e-4f61-a24f-999c65b26caf",
    front: "Locatária",
    back: "Pessoa ou empresa que está alugando o imóvel para usar.",
    back_example: "Maria aluga a loja para abrir seu salão. Ela é a locatária.",
  },
  {
    id: "8b0ab8cb-3d83-41e1-b7ad-e09821aaabce",
    front: "Vistoria",
    back: "Inspeção feita no imóvel antes e depois do aluguel.",
    back_example: "Verificar se a casa está em bom estado antes de entrar.",
  },
  {
    id: "9038906f-6d3d-4a6b-8e50-89c8621c7dd4",
    front: "Benfeitorias",
    back: "Melhorias feitas no imóvel.",
    back_example: "Consertar o telhado ou pintar as paredes.",
  },
  {
    id: "2d17ca55-eb97-4f38-8cc4-a10181a3754c",
    front: "Voluptuárias",
    back: "Melhorias de luxo ou beleza.",
    back_example: "Colocar uma banheira ou fonte decorativa.",
  },
  {
    id: "433916dd-322a-4716-98bd-819a0b59e0e2",
    front: "Úteis",
    back: "Melhorias que tornam o imóvel mais funcional.",
    back_example: "Instalar grades de segurança ou trocar uma porta.",
  },
  {
    id: "7724d427-5330-4c35-aeb8-5fcc9858a55f",
    front: "Rescisão",
    back: "Encerrar o contrato antes do prazo.",
    back_example: "Você quer sair do imóvel antes dos 3 anos combinados.",
  },
  {
    id: "2bf1d772-6fd1-4dbd-a821-abef1a7cc200",
    front: "Indenização",
    back: "Valor pago para compensar prejuízo.",
    back_example: "Quebrou o portão da casa? Você paga indenização.",
  },
  {
    id: "810570ab-1a1a-48b9-9bf9-a1a58a961dd1",
    front: "Multa compensatória",
    back: "Multa por sair do contrato antes do combinado.",
    back_example: "Desistiu do aluguel antes do tempo? Paga a multa.",
  },
  {
    id: "69ea6d43-badc-4cdc-9d29-4642d0baf797",
    front: "Encargos",
    back: "Despesas extras além do aluguel.",
    back_example: "Luz, água, IPTU, condomínio.",
  },
  {
    id: "898d2bcb-f975-46a5-9107-26d442537ea5",
    front: "Reajuste",
    back: "Aumento do valor do aluguel com o tempo.",
    back_example: "O aluguel sobe a cada 12 meses, conforme a inflação.",
  },
  {
    id: "11518aaf-96c6-4612-b333-42f6e65b7395",
    front: "Garantias locatícias",
    back: "Formas de garantir o pagamento do aluguel.",
    back_example: "Caução, fiador ou seguro fiança.",
  },
  {
    id: "ea2f36c1-be72-47be-8f37-5b332f287a4f",
    front: "Caução",
    back: "Dinheiro deixado como garantia no início.",
    back_example: "Paga 3 meses adiantado e recebe de volta no fim.",
  },
  {
    id: "5ae84315-e82f-4f05-b1a6-459e71528ae9",
    front: "Fiador",
    back: "Pessoa que se responsabiliza se o inquilino não pagar.",
    back_example: "Seu tio vira fiador e paga se você não puder.",
  },
  {
    id: "ae0fa981-71dd-4e9c-91fb-198b5ee41ff9",
    front: "Seguro fiança",
    back: "Seguro que cobre o aluguel se você não pagar.",
    back_example: "Um plano que paga o aluguel para o dono caso falte.",
  },
  {
    id: "6215cf0e-cfe1-4d5a-a745-044d02f4f859",
    front: "Novação",
    back: "Trocar uma dívida ou obrigação por outra.",
    back_example: "Devia um mês e combinou pagar parcelado.",
  },
  {
    id: "18420b5f-10c1-409b-8a47-2777d203637f",
    front: "Direito de preferência",
    back: "Você tem prioridade se o dono quiser vender.",
    back_example: "O dono quer vender, ele tem que oferecer pra você primeiro.",
  },
  {
    id: "b6954e2d-abf8-49d6-ada9-7f22c8d5c71a",
    front: "Foro",
    back: "Cidade onde qualquer processo será resolvido.",
    back_example: "Se der problema, o processo acontece naquela cidade combinada.",
  },
  {
    id: "9a8a7955-3cb0-4386-9725-0d57d1a2f9d1",
    front: "Solidariamente",
    back: "Todos os responsáveis podem ser cobrados sozinhos.",
    back_example: "Dois fiadores - qualquer um pode pagar tudo.",
  },
  {
    id: "3ee2ec60-18ee-435b-a3a9-9115f112054c",
    front: "Alienação",
    back: "Venda do imóvel.",
    back_example: "O dono vende a casa que você está alugando.",
  },
  {
    id: "d79ccd7a-d9e9-49b3-bf83-6480bffa9a9d",
    front: "Apólice",
    back: "Documento que prova que você tem seguro.",
    back_example: "Igual ao papel do seguro do carro, mas do aluguel.",
  },
  {
    id: "3aa01df8-8b53-4a84-9e72-5116a4e79c8b",
    front: "IPCA",
    back: "Índice que mede a inflação e pode ajustar o aluguel.",
    back_example: "Se tudo fica mais caro, o IPCA sobe e o aluguel também.",
  },
];

export const BOSS_NAME = "Archie";

export const BOSS_CORRECT_ANSWER_DIALOGUES: string[][] = [
  ["Tá bom. Você sabe o básico... mas isso não vai te salvar do Vincent."],
  ["Até que enfim alguém que leu os contratos. Não comemore ainda - isso foi o fácil."],
  ["Sal teria gostado de você. Uma pena que ele não está mais aqui pra ver."],
];

export const BOSS_WRONG_ANSWER_DIALOGUES: string[][] = [
  ["Patético. Nem meu sobrinho de 12 anos erra essas."],
  ["Volte quando aprender a ler. Até lá, fique longe dos negócios da família."],
  ["Eu avisei. Agora vai embora antes que eu mude de ideia."],
];

export type BossQuestionId = string & { _tag?: "BossQuestionId" };

export interface BossQuestion {
  id: BossQuestionId;
  content: string;
  tip: string;
  choices: {
    content: string;
    isCorrect: boolean;
  }[];
}

export const BOSS_QUESTIONS: BossQuestion[] = [
  {
    id: "55fb8291-e6a9-4af5-bff6-c6dbfdd67b51",
    content: "Quem é o locador no contrato de aluguel?",
    tip: "Essa figura costuma ser mencionada logo no início do contrato, ao lado do nome de quem vai usar o imóvel.",
    choices: [
      { content: "Quem está alugando para morar", isCorrect: false },
      { content: "Quem está vendendo o imóvel", isCorrect: false },
      { content: "Quem é dono do imóvel e está alugando para alguém", isCorrect: true },
      { content: "Quem faz a vistoria", isCorrect: false },
    ],
  },
  {
    id: "b99d9cda-d398-4f6c-acdd-a65705d613f6",
    content: "A vistoria serve para...",
    tip: "Envolve registros que normalmente são feitos antes de entrar e ao sair.",
    choices: [
      { content: "Deixar o imóvel mais bonito", isCorrect: false },
      { content: "Conferir o estado do imóvel antes e depois da locação", isCorrect: true },
      { content: "Negociar o valor do aluguel", isCorrect: false },
      { content: "Aumentar a multa", isCorrect: false },
    ],
  },
  {
    id: "3e551aca-9abd-428b-b3ef-36b997007744",
    content: "O que é uma benfeitoria voluptuária?",
    tip: "Pode tornar o ambiente mais valorizado, mas não necessariamente mais funcional.",
    choices: [
      { content: "Conserto do telhado", isCorrect: false },
      { content: "Trocar a fiação elétrica", isCorrect: false },
      { content: "Colocar uma banheira ou jardim decorativo", isCorrect: true },
      { content: "Pagar a conta de água", isCorrect: false },
    ],
  },
  {
    id: "9a46000c-acac-4cb1-9eaf-aeb31ebd31c2",
    content: "Quando falamos em caução, estamos falando de:",
    tip: "Relaciona-se a uma espécie de compromisso financeiro, geralmente feito no começo.",
    choices: [
      { content: "Um fiador que mora no mesmo bairro", isCorrect: false },
      { content: "Um seguro que cobre atrasos", isCorrect: false },
      { content: "Um valor pago como garantia no início do contrato", isCorrect: true },
      { content: "Uma cláusula que aumenta o aluguel", isCorrect: false },
    ],
  },
  {
    id: "a76c1548-ed49-4504-a6d7-f60c63cd28b8",
    content: "O que significa rescisão contratual?",
    tip: "Pode ocorrer antes do que se esperava, com aviso prévio ou penalidade.",
    choices: [
      { content: "Aumentar o prazo do contrato", isCorrect: false },
      { content: "Encerrar o contrato antes do fim combinado", isCorrect: true },
      { content: "Passar o contrato para outra pessoa", isCorrect: false },
      { content: "Fazer obras no imóvel", isCorrect: false },
    ],
  },
  {
    id: "fe1a1de1-0faf-4b29-b9a4-ddf085b47722",
    content: "O que é um fiador?",
    tip: "Seu nome aparece no contrato, mesmo sem morar no imóvel.",
    choices: [
      { content: "Quem fiscaliza o contrato", isCorrect: false },
      { content: "Quem escreve o contrato", isCorrect: false },
      { content: "Quem garante o pagamento se o inquilino não pagar", isCorrect: true },
      { content: "Quem faz a vistoria do imóvel", isCorrect: false },
    ],
  },
  {
    id: "f375e848-8cb3-4e57-83b9-81762582e0d3",
    content: "O que é indenização em um contrato de aluguel?",
    tip: "Relaciona-se a um prejuízo causado durante a locação.",
    choices: [
      { content: "Valor pago pelo fiador", isCorrect: false },
      { content: "Desconto no valor do aluguel", isCorrect: false },
      { content: "Pagamento feito por danos causados ao imóvel", isCorrect: true },
      { content: "Valor pago pelo locador ao inquilino", isCorrect: false },
    ],
  },
  {
    id: "a4f54932-362a-4d90-92ff-f00bce44eba2",
    content: "O que significa reajuste do aluguel?",
    tip: "Normalmente acontece uma vez por ano.",
    choices: [
      { content: "Redução do valor do aluguel", isCorrect: false },
      { content: "Aumento proporcional ao número de inquilinos", isCorrect: false },
      { content: "Atualização do valor conforme índices econômicos", isCorrect: true },
      { content: "Troca de imóvel por outro equivalente", isCorrect: false },
    ],
  },
  {
    id: "b5ecb14d-12dd-4a4c-a468-3c7c5e97d7bc",
    content: "Em um contrato, o que quer dizer novação?",
    tip: "Envolve alterar um acordo anterior, mantendo a obrigação principal.",
    choices: [
      { content: "Trocar o imóvel por outro", isCorrect: false },
      { content: "Reformar o imóvel sem aviso", isCorrect: false },
      { content: "Substituir uma cláusula ou dívida antiga por uma nova", isCorrect: true },
      { content: "Trocar de fiador no meio do contrato", isCorrect: false },
    ],
  },
  {
    id: "d9a01ebb-8df9-4237-84a3-d435743369b0",
    content: "Quando o contrato menciona alienação do imóvel, o que isso quer dizer?",
    tip: "É um direito do proprietário, mas pode afetar o inquilino.",
    choices: [
      { content: "O imóvel foi hipotecado", isCorrect: false },
      { content: "O imóvel foi doado", isCorrect: false },
      { content: "O imóvel foi alugado novamente", isCorrect: false },
      { content: "O imóvel foi vendido", isCorrect: true },
    ],
  },
  {
    id: "88f62468-378e-4501-b750-96aa04119a27",
    content: "A função do fiador é:",
    tip: "Papel que envolve uma relação de confiança, nem sempre com contrapartida financeira imediata.",
    choices: [
      { content: "Ajudar a reformar o imóvel", isCorrect: false },
      { content: "Ser dono do imóvel", isCorrect: false },
      { content: "Pagar o aluguel caso o inquilino não pague", isCorrect: true },
      { content: "Acompanhar a vistoria", isCorrect: false },
    ],
  },
  {
    id: "1972e50c-00d5-4845-bddf-ecf5cf75997a",
    content: "O direito de preferência garante que o inquilino:",
    tip: "Pode surgir quando o contrato se cruza com uma decisão de venda.",
    choices: [
      { content: "Pague menos aluguel", isCorrect: false },
      { content: "Tenha prioridade para comprar o imóvel se ele for vendido", isCorrect: true },
      { content: "Escolha o valor do aluguel", isCorrect: false },
      { content: "Possa fazer reformas sem avisar", isCorrect: false },
    ],
  },
  {
    id: "06f7ccf0-0885-4659-b9ac-6c43bb186aa8",
    content: "Encargos no contrato de aluguel se referem a:",
    tip: "Costumam aparecer mensalmente, além do aluguel em si.",
    choices: [
      { content: "Móveis inclusos", isCorrect: false },
      { content: "Contas como água, luz, IPTU e condomínio", isCorrect: true },
      { content: "Presentes do locador", isCorrect: false },
      { content: "Regras para fazer festas", isCorrect: false },
    ],
  },
  {
    id: "348debc4-1dc2-4ef5-8a9a-4a8a0dcc8c39",
    content: "Qual é o índice usado com frequência para o reajuste do aluguel?",
    tip: "É publicado pelo IBGE e tem relação com o custo de vida.",
    choices: [
      { content: "IPVA", isCorrect: false },
      { content: "IOF", isCorrect: false },
      { content: "IPCA", isCorrect: true },
      { content: "IMC", isCorrect: false },
    ],
  },
  {
    id: "3160f6ba-398a-4a49-a4fd-30b2b17f98bf",
    content: "Solidariamente quer dizer que:",
    tip: "Envolve obrigação compartilhada com possibilidade de cobrança individual.",
    choices: [
      { content: "Todos pagam juntos, cada um uma parte", isCorrect: false },
      { content: "Ninguém paga", isCorrect: false },
      { content: "O fiador pode ser cobrado sozinho pela dívida", isCorrect: true },
      { content: "Só o inquilino é responsável", isCorrect: false },
    ],
  },
  {
    id: "ba6fd583-a7b5-4bcd-a90c-f6a899fb1282",
    content: "O que é apólice no contexto do aluguel?",
    tip: "Está presente sempre que há seguro envolvido.",
    choices: [
      { content: "É um valor de entrada", isCorrect: false },
      { content: "Documento que comprova um contrato de seguro", isCorrect: true },
      { content: "Comprovante de pagamento de aluguel", isCorrect: false },
      { content: "Autoriza sublocação", isCorrect: false },
    ],
  },
  {
    id: "fe4d263d-1091-4271-9cb2-cecdce2d0464",
    content: "O que é IPTU?",
    tip: "Custa todo ano, mesmo que o imóvel fique vazio.",
    choices: [
      { content: "Seguro residencial", isCorrect: false },
      { content: "Conta de luz", isCorrect: false },
      { content: "Imposto cobrado pelo município sobre o imóvel", isCorrect: true },
      { content: "Multa por atraso", isCorrect: false },
    ],
  },
  {
    id: "ba4a3f28-312e-44c4-99fe-efd3a3c892ad",
    content: "Garantias locatícias incluem:",
    tip: "Podem ser financeiras ou pessoais.",
    choices: [
      { content: "Apenas móveis", isCorrect: false },
      { content: "Caução, fiador ou seguro fiança", isCorrect: true },
      { content: "Documento de identidade", isCorrect: false },
      { content: "Vistoria e chave", isCorrect: false },
    ],
  },
  {
    id: "2db5adc1-aafe-4071-bb9c-5e5506842f37",
    content: "O que significa foro em um contrato?",
    tip: "Se houver briga judicial, esse lugar vai julgar a questão.",
    choices: [
      { content: "Escritório do corretor", isCorrect: false },
      { content: "Cartório onde o contrato foi assinado", isCorrect: false },
      { content: "Cidade escolhida para resolver disputas", isCorrect: true },
      { content: "Nome do condomínio", isCorrect: false },
    ],
  },
  {
    id: "e3521db3-54a4-4e9d-adc5-2a575ccc330e",
    content: "Quem é o locatário?",
    tip: "É quem aparece no contrato como parte que usufrui do bem.",
    choices: [
      { content: "O fiador", isCorrect: false },
      { content: "O proprietário", isCorrect: false },
      { content: "Quem aluga e usa o imóvel", isCorrect: true },
      { content: "O engenheiro da vistoria", isCorrect: false },
    ],
  },
];

type ContractNode = string | { choices: { content: string; isCorrect: boolean }[] };

export interface Contract {
  id: string;
  title: string;
  nodes: ContractNode[];
}

const SAMPLE_CONTRACT: Contract = {
  id: "36093d9f-c669-469a-b488-b09dc561a0d6",
  title: "Contrato de Locação Comercial",
  nodes: [],
};

export const DOCUMENT_CONTRACT_HTML = `<h1><whiteout correct="CONTRATO DE LOCAÇÃO"></whiteout> COMERCIAL</h1>
<p>
  <b><whiteout correct="LOCADOR"></whiteout>:</b> João da Silva, brasileiro, empresário,
  inscrito no CPF nº 123.456.789-00, residente à Rua das Flores, nº 100,
  Londrina/PR.
</p>
<p>
  <b>LOCATÁRIA:</b> Maria de Souza Comércio de Roupas Ltda., CNPJ nº
  12.345.678/0001-99, com sede à Rua das Palmeiras, nº 200, Londrina/PR, neste
  ato representada por sua sócia-administradora Maria de Souza, CPF nº
  987.654.321-00.
</p>
<h2>CLÁUSULAS E CONDIÇÕES</h2>
<div>
  <h3>CLÁUSULA 1 - DO IMÓVEL LOCADO</h3>
  <p>
    O LOCADOR dá em locação à <whiteout correct="LOCATÁRIA"></whiteout> o imóvel de sua
    propriedade, localizado na Avenida Central, nº 500, Centro, Londrina/PR, com
    área total de 120m², destinado exclusivamente ao exercício de atividades
    comerciais do ramo de vestuário.
  </p>
</div>
<div>
  <h3><whiteout correct="CLÁUSULA 2"></whiteout> - DO PRAZO DE LOCAÇÃO</h3>
  <p>
    O prazo de duração do presente contrato é de 36 (trinta e seis) meses, com
    início em 01 de maio de 2025 e término previsto para 30 de abril de 2028. Ao
    término do prazo contratual, caso não haja manifestação expressa de nenhuma
    das partes em sentido contrário, poderá ser renovado por meio de novo acordo
    formal.
  </p>
</div>
<div>
  <h3>CLÁUSULA 3 - DO VALOR DO ALUGUEL E FORMA DE PAGAMENTO</h3>
  <p>
    O valor mensal do aluguel será de R$ 3.500,00 (três mil e quinhentos reais),
    que deverá ser pago até o dia 05 (cinco) de cada mês, por meio de
    transferência bancária à conta informada pelo LOCADOR.
  </p>
</div>
<div>
  <h3>CLÁUSULA 4 - DAS GARANTIAS LOCATÍCIAS</h3>
  <p>
    Para garantia do fiel cumprimento das obrigações aqui assumidas, a LOCATÁRIA
    deverá optar por uma das seguintes modalidades de garantia, a critério do
    LOCADOR:
  </p>
  <ul>
    <li>Caução em Dinheiro;</li>
    <li>Fiador;</li>
    <li>Seguro fiança locatícia.</li>
  </ul>
</div>
<div>
  <h3>CLÁUSULA 5 - DOS ENCARGOS</h3>
  <p>
    Ficarão a cargo exclusivo da LOCATÁRIA os seguintes encargos incidentes
    sobre o imóvel locado: tributos municipais (<whiteout correct="IPTU"></whiteout>,
    taxas de coleta, etc.), contas de consumo (água, energia elétrica, telefone,
    internet), taxas condominiais, seguros obrigatórios, e quaisquer outras
    despesas inerentes à sua ocupação.
  </p>
</div>
<div>
  <h3>CLÁUSULA 6 - DAS BENFEITORIAS E MODIFICAÇÕES</h3>
  <p>
    A realização de benfeitorias de qualquer natureza dependerá de autorização
    prévia e expressa do LOCADOR. As benfeitorias úteis ou voluptuárias, ainda
    que autorizadas, não serão objeto de indenização ou retenção ao término da
    locação, salvo disposição contratual específica.
  </p>
</div>
<div>
  <h3>CLÁUSULA 7 - DA DESTINAÇÃO DO IMÓVEL</h3>
  <p>
    O imóvel ora locado destina-se exclusivamente ao exercício de atividades
    comerciais, sendo vedada sua utilização para fins residenciais ou quaisquer
    outros não previstos neste contrato. É expressamente proibida a cessão ou
    sublocação, no todo ou em parte, a terceiros, sem prévia autorização por
    escrito do LOCADOR.
  </p>
</div>
<div>
  <h3>CLÁUSULA 8 - DA RESCISÃO CONTRATUAL</h3>
  <p>
    A rescisão antecipada do contrato por iniciativa de qualquer das partes
    deverá ser comunicada por escrito com antecedência mínima de 30 (trinta)
    dias. Em caso de rescisão imotivada pela LOCATÁRIA, será devida multa
    compensatória no valor de 3 (três) aluguéis vigentes, proporcional ao tempo
    restante do contrato.
  </p>
</div>
<div>
  <h3>CLÁUSULA 9 - DA VISTORIA</h3>
  <p>
    Será realizada vistoria detalhada do imóvel no início e no término da
    locação, com registro por meio de laudo técnico. A LOCATÁRIA se obriga a
    restituir o imóvel nas mesmas condições em que o recebeu, salvo
    deteriorações decorrentes do uso normal.
  </p>
</div>
<div>
  <h3>CLÁUSULA 10 - DO FORO</h3>
  <p>
    Para dirimir quaisquer controvérsias oriundas deste contrato, as partes
    elegem o foro da comarca de Londrina/PR, renunciando a qualquer outro, por
    mais privilegiado que seja.
  </p>
</div>
<h2>ASSINATURAS</h2>
<p><b>Assinatura do LOCADOR:</b> _________</p>
<p><b>Assinatura da LOCATÁRIA:</b> _________</p>
<p>Testemunhas:</p>
<p>1. Nome: _______ | CPF: ______</p>
<p>2. Nome: _______ | CPF: ______</p>
`;
