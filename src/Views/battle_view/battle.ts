import { addListener, removeListener } from "../../Lib/event_manager";
import { ImperativeObject, notifyUpdate } from "../../Lib/imperative_object";
import generateUUID from "../../Lib/uuid";

interface Opponent {
  name: string;
  level: number;
  hp: number;
  hpMax: number;
  initialDialogue: string[];
  playerVictoryDialogue: string[];
  playerLossDialogue: string[];
  terms: {
    id: number;
    term: string;
    description: string;
    example: string;
  }[];
  questions: {
    id: number;
    dialogue: string; // the character's question
    correctResponseTerm: number; // the term id
  }[];
}

interface Player {
  name: string;
  level: number;
  hp: number;
  hpMax: number;
}

type BattleState = "InitialDialog" | "UserTurn" | "OpponentTurn" | "GameOver" | "Victory";

type UserAction = { kind: "ClickAnywhere" } | { kind: "CardSubmit" };

export default class Battle implements ImperativeObject {
  public readonly uuid: string = generateUUID();
  public readonly player: Player;
  public readonly opponent: Opponent;

  public dialog: string | null;
  public state: BattleState;

  private onWindowClickEventHandler: number | null;

  constructor() {
    this.uuid = generateUUID();
    this.player = {
      name: "User",
      level: 10,
      hp: 7,
      hpMax: 8,
    };
    this.opponent = {
      name: "Archie",
      level: 35,
      hp: 8,
      hpMax: 8,
      initialDialogue: [
        "Sal sempre dizia: 'Contrato sem clareza é briga na certa'. Vamos ver se você conhece essas palavras tão bem quanto eu.",
        "Cada resposta errada vai me deixar... menos paciente. Escolha com sabedoria.",
        "O jogo é simples: você responde, eu avalio. Mas não espere misericórdia.",
      ],
      playerVictoryDialogue: [
        "*limpa o sangue do queixo* Tá bom. Você sabe o básico... mas isso não vai te salvar do Vincent.",
        "Até que enfim alguém que leu os contratos. Não comemore ainda - isso foi o fácil.",
        "Sal teria gostado de você. Uma pena que ele não está mais aqui pra ver.",
      ],
      playerLossDialogue: [
        "*joga o contrato no chão* Patético. Nem meu sobrinho de 12 anos erra essas.",
        "Volte quando aprender a ler. Até lá, fique longe dos negócios da família.",
        "*ri baixo* Eu avisei. Agora vai embora antes que eu mude de ideia.",
      ],
      terms: [
        {
          id: 1,
          term: "Locador",
          description: "Pessoa que é dona do imóvel e está alugando para outra pessoa.",
          example: "João é dono de uma loja e decide alugá-la. Ele é o locador.",
        },
        {
          id: 2,
          term: "Locatária",
          description: "Pessoa ou empresa que está alugando o imóvel para usar.",
          example: "Maria aluga a loja para abrir seu salão. Ela é a locatária.",
        },
        {
          id: 3,
          term: "Vistoria",
          description: "Inspeção feita no imóvel antes e depois do aluguel.",
          example: "Verificar se a casa está em bom estado antes de entrar.",
        },
        {
          id: 4,
          term: "Benfeitorias",
          description: "Melhorias feitas no imóvel.",
          example: "Consertar o telhado ou pintar as paredes.",
        },
        {
          id: 5,
          term: "Voluptuárias",
          description: "Melhorias de luxo ou beleza.",
          example: "Colocar uma banheira ou fonte decorativa.",
        },
        {
          id: 6,
          term: "Úteis",
          description: "Melhorias que tornam o imóvel mais funcional.",
          example: "Instalar grades de segurança ou trocar uma porta.",
        },
        {
          id: 7,
          term: "Rescisão",
          description: "Encerrar o contrato antes do prazo.",
          example: "Você quer sair do imóvel antes dos 3 anos combinados.",
        },
        {
          id: 8,
          term: "Indenização",
          description: "Valor pago para compensar prejuízo.",
          example: "Quebrou o portão da casa? Você paga indenização.",
        },
        {
          id: 9,
          term: "Multa compensatória",
          description: "Multa por sair do contrato antes do combinado.",
          example: "Desistiu do aluguel antes do tempo? Paga a multa.",
        },
        {
          id: 10,
          term: "Encargos",
          description: "Despesas extras além do aluguel.",
          example: "Luz, água, IPTU, condomínio.",
        },
        {
          id: 11,
          term: "Reajuste",
          description: "Aumento do valor do aluguel com o tempo.",
          example: "O aluguel sobe a cada 12 meses, conforme a inflação.",
        },
        {
          id: 12,
          term: "Garantias locatícias",
          description: "Formas de garantir o pagamento do aluguel.",
          example: "Caução, fiador ou seguro fiança.",
        },
        {
          id: 13,
          term: "Caução",
          description: "Dinheiro deixado como garantia no início.",
          example: "Paga 3 meses adiantado e recebe de volta no fim.",
        },
        {
          id: 14,
          term: "Fiador",
          description: "Pessoa que se responsabiliza se o inquilino não pagar.",
          example: "Seu tio vira fiador e paga se você não puder.",
        },
        {
          id: 15,
          term: "Seguro fiança",
          description: "Seguro que cobre o aluguel se você não pagar.",
          example: "Um plano que paga o aluguel para o dono caso falte.",
        },
        {
          id: 16,
          term: "Novação",
          description: "Trocar uma dívida ou obrigação por outra.",
          example: "Devia um mês e combinou pagar parcelado.",
        },
        {
          id: 17,
          term: "Direito de preferência",
          description: "Você tem prioridade se o dono quiser vender.",
          example: "O dono quer vender, ele tem que oferecer pra você primeiro.",
        },
        {
          id: 18,
          term: "Foro",
          description: "Cidade onde qualquer processo será resolvido.",
          example: "Se der problema, o processo acontece naquela cidade combinada.",
        },
        {
          id: 19,
          term: "Solidariamente",
          description: "Todos os responsáveis podem ser cobrados sozinhos.",
          example: "Dois fiadores - qualquer um pode pagar tudo.",
        },
        {
          id: 20,
          term: "Alienação",
          description: "Venda do imóvel.",
          example: "O dono vende a casa que você está alugando.",
        },
        {
          id: 21,
          term: "Apólice",
          description: "Documento que prova que você tem seguro.",
          example: "Igual ao papel do seguro do carro, mas do aluguel.",
        },
        {
          id: 22,
          term: "IPCA",
          description: "Índice que mede a inflação e pode ajustar o aluguel.",
          example: "Se tudo fica mais caro, o IPCA sobe e o aluguel também.",
        },
      ],
      questions: [
        {
          id: 1,
          dialogue: "João é dono do imóvel e tá alugando. Na linguagem do contrato, ele é o quê?",
          correctResponseTerm: 1,
        },
        {
          id: 2,
          dialogue: "Maria tá alugando a loja pra abrir salão. O contrato chama ela de...?",
          correctResponseTerm: 2,
        },
        {
          id: 3,
          dialogue:
            "Antes de entrar, tem que verificar o estado do imóvel. Como se chama essa burocracia?",
          correctResponseTerm: 3,
        },
        {
          id: 4,
          dialogue: "Consertar telhado é tipo de melhoria que chamamos de...?",
          correctResponseTerm: 4,
        },
        {
          id: 5,
          dialogue: "Banheira de hidromassagem é melhoria pra luxo. No contrato isso é...?",
          correctResponseTerm: 5,
        },
        {
          id: 6,
          dialogue:
            "Grades de segurança são melhorias que chamamos de...? (Dica: não é pra enfeitar)",
          correctResponseTerm: 6,
        },
        {
          id: 7,
          dialogue: "Quer sair antes dos 3 anos? Isso no contrato se chama...?",
          correctResponseTerm: 7,
        },
        {
          id: 8,
          dialogue: "Quebrou o portão? Vai pagar o que, segundo a cláusula 4.2?",
          correctResponseTerm: 8,
        },
        {
          id: 9,
          dialogue: "Multa por sair antes do tempo - na linguagem chique do contrato é...?",
          correctResponseTerm: 9,
        },
        {
          id: 10,
          dialogue: "IPTU e condomínio são considerados...? (Dica: não é presente)",
          correctResponseTerm: 10,
        },
        {
          id: 11,
          dialogue: "O aluguel sobe todo ano por causa do...?",
          correctResponseTerm: 11,
        },
        {
          id: 12,
          dialogue: "Fiador, caução, seguro fiança - tudo isso serve pra...?",
          correctResponseTerm: 12,
        },
        {
          id: 13,
          dialogue: "Deixar 3 meses de aluguel adiantado como garantia é...?",
          correctResponseTerm: 13,
        },
        {
          id: 14,
          dialogue: "Se o inquilino não pagar, quem se fode no seu lugar?",
          correctResponseTerm: 14,
        },
        {
          id: 15,
          dialogue: "Seguro que paga o aluguel se o inquilino vacilar - como chamam isso?",
          correctResponseTerm: 15,
        },
        {
          id: 16,
          dialogue: "Trocar dívida antiga por acordo novo - na lei isso é...?",
          correctResponseTerm: 16,
        },
        {
          id: 17,
          dialogue: "Se o dono quiser vender, você tem...? (Dica: não é opinião)",
          correctResponseTerm: 17,
        },
        {
          id: 18,
          dialogue: "Cidade onde resolvem as brigas judiciais - no contrato tá como...?",
          correctResponseTerm: 18,
        },
        {
          id: 19,
          dialogue: "Dois fiadores onde qualquer um pode ser cobrado - isso é responsabilidade...?",
          correctResponseTerm: 19,
        },
        {
          id: 20,
          dialogue: "Quando o dono vende o imóvel que você tá alugando - isso se chama...?",
          correctResponseTerm: 20,
        },
        {
          id: 21,
          dialogue: "Documento do seguro - igual do carro, mas pro aluguel. Como chamam?",
          correctResponseTerm: 21,
        },
        {
          id: 22,
          dialogue: "Índice que faz o aluguel subir junto com a inflação - qual é?",
          correctResponseTerm: 22,
        },
      ],
    };

    if (this.opponent.initialDialogue.length === 0) throw new Error("Opponent has no dialogue.");

    this.state = "InitialDialog";
    this.dialog = null;
    this.onWindowClickEventHandler = null;
  }

  onMount() {
    this.onWindowClickEventHandler = addListener(document, "click", () => {
      this.onUserAction({ kind: "ClickAnywhere" });
    });
    this.switchState("InitialDialog");
  }

  switchState(next: BattleState) {
    this.state = next;

    switch (this.state) {
      case "InitialDialog": {
        this.dialog = this.opponent.initialDialogue.at(0)!;
        break;
      }
      case "UserTurn": {
        this.dialog = "É a sua vez.";
        break;
      }
      case "OpponentTurn":
      case "GameOver":
      case "Victory":
        break; // no op
    }

    notifyUpdate(this);
  }

  onUserAction(action: UserAction) {
    console.log(this.state, action);

    switch (this.state) {
      case "UserTurn": {
        if (action.kind === "CardSubmit") {
          this.switchState("InitialDialog");
        }
        break;
      }
      case "InitialDialog": {
        if (action.kind === "ClickAnywhere") {
          if (this.dialog === null) break;

          const nextIdx = this.opponent.initialDialogue.indexOf(this.dialog) + 1;
          const next = this.opponent.initialDialogue[nextIdx] ?? null;

          if (next === null) {
            // end of talk
            this.switchState("UserTurn");
          } else {
            this.dialog = next;
            notifyUpdate(this);
          }
        }
        break;
      }
      case "OpponentTurn":
      case "GameOver":
      case "Victory":
        break; // no op
    }
  }

  onUnmount() {
    if (this.onWindowClickEventHandler !== null) removeListener(this.onWindowClickEventHandler);
  }
}
