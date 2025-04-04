import { motion, Variant } from "framer-motion";
import Frame from "../../Components/Frame";
import { cn } from "../../Lib/class_names";
import { useWindowing } from "../../Lib/compass_navigator";
import DocScroll from "../../Lib/doc_scroll";
import BattleView from "../battle_view";
import DocViewStyle from "./document.module.css";

const MotionFrame = motion.create(Frame);

const variants = {
  enter: {
    translateY: "150%",
    opacity: 0.7,
  } satisfies Variant,
  active: {
    translateY: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.15,
    },
  } satisfies Variant,
  exit: {
    translateY: "150%",
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  } satisfies Variant,
};

export default function QAView() {
  const html = `<h1>CONTRATO DE LOCAÇÃO COMERCIAL</h1>

<p><span class="bold">LOCADOR:</span> João da Silva, brasileiro, empresário, inscrito no CPF nº 123.456.789-00, residente à Rua das Flores, nº 100, Londrina/PR.</p>

<p><span class="bold">LOCATÁRIA:</span> Maria de Souza Comércio de Roupas Ltda., CNPJ nº 12.345.678/0001-99, com sede à Rua das Palmeiras, nº 200, Londrina/PR, neste ato representada por sua sócia-administradora Maria de Souza, CPF nº 987.654.321-00.</p>

<h2>CLÁUSULAS E CONDIÇÕES</h2>

<div class="section">
    <h3>CLÁUSULA 1 - DO IMÓVEL LOCADO</h3>
    <p>O LOCADOR dá em locação à LOCATÁRIA o imóvel de sua propriedade, localizado na Avenida Central, nº 500, Centro, Londrina/PR, com área total de 120m², destinado exclusivamente ao exercício de atividades comerciais do ramo de vestuário.</p>
</div>

<div class="section">
    <h3>CLÁUSULA 2 - DO PRAZO DE LOCAÇÃO</h3>
    <p>O prazo de duração do presente contrato é de 36 (trinta e seis) meses, com início em 01 de maio de 2025 e término previsto para 30 de abril de 2028. Ao término do prazo contratual, caso não haja manifestação expressa de nenhuma das partes em sentido contrário, poderá ser renovado por meio de novo acordo formal.</p>
</div>

<div class="section">
    <h3>CLÁUSULA 3 - DO VALOR DO ALUGUEL E FORMA DE PAGAMENTO</h3>
    <p>O valor mensal do aluguel será de R$ 3.500,00 (três mil e quinhentos reais), que deverá ser pago até o dia 05 (cinco) de cada mês, por meio de transferência bancária à conta informada pelo LOCADOR.</p>
</div>

<div class="section">
    <h3>CLÁUSULA 4 - DAS GARANTIAS LOCATÍCIAS</h3>
    <p>Para garantia do fiel cumprimento das obrigações aqui assumidas, a LOCATÁRIA deverá optar por uma das seguintes modalidades de garantia, a critério do LOCADOR:</p>
    <ul>
        <li>Caução em Dinheiro;</li>
        <li>Fiador;</li>
        <li>Seguro fiança locatícia.</li>
    </ul>
</div>

<div class="section">
    <h3>CLÁUSULA 5 - DOS ENCARGOS</h3>
    <p>Ficarão a cargo exclusivo da LOCATÁRIA os seguintes encargos incidentes sobre o imóvel locado: tributos municipais (IPTU, taxas de coleta, etc.), contas de consumo (água, energia elétrica, telefone, internet), taxas condominiais, seguros obrigatórios, e quaisquer outras despesas inerentes à sua ocupação.</p>
</div>

<div class="section">
    <h3>CLÁUSULA 6 - DAS BENFEITORIAS E MODIFICAÇÕES</h3>
    <p>A realização de benfeitorias de qualquer natureza dependerá de autorização prévia e expressa do LOCADOR. As benfeitorias úteis ou voluptuárias, ainda que autorizadas, não serão objeto de indenização ou retenção ao término da locação, salvo disposição contratual específica.</p>
</div>

<div class="section">
    <h3>CLÁUSULA 7 - DA DESTINAÇÃO DO IMÓVEL</h3>
    <p>O imóvel ora locado destina-se exclusivamente ao exercício de atividades comerciais, sendo vedada sua utilização para fins residenciais ou quaisquer outros não previstos neste contrato. É expressamente proibida a cessão ou sublocação, no todo ou em parte, a terceiros, sem prévia autorização por escrito do LOCADOR.</p>
</div>

<div class="section">
    <h3>CLÁUSULA 8 - DA RESCISÃO CONTRATUAL</h3>
    <p>A rescisão antecipada do contrato por iniciativa de qualquer das partes deverá ser comunicada por escrito com antecedência mínima de 30 (trinta) dias. Em caso de rescisão imotivada pela LOCATÁRIA, será devida multa compensatória no valor de 3 (três) aluguéis vigentes, proporcional ao tempo restante do contrato.</p>
</div>

<div class="section">
    <h3>CLÁUSULA 9 - DA VISTORIA</h3>
    <p>Será realizada vistoria detalhada do imóvel no início e no término da locação, com registro por meio de laudo técnico. A LOCATÁRIA se obriga a restituir o imóvel nas mesmas condições em que o recebeu, salvo deteriorações decorrentes do uso normal.</p>
</div>

<div class="section">
    <h3>CLÁUSULA 10 - DO FORO</h3>
    <p>Para dirimir quaisquer controvérsias oriundas deste contrato, as partes elegem o foro da comarca de Londrina/PR, renunciando a qualquer outro, por mais privilegiado que seja.</p>
</div>

<h2>ASSINATURAS</h2>

<p><span class="bold">Assinatura do LOCADOR:</span> _________</p>
<p><span class="bold">Assinatura da LOCATÁRIA:</span> _________</p>

<p>Testemunhas:</p>
<p>1. Nome: _______ | CPF: ______</p>
<p>2. Nome: _______ | CPF: ______</p>`;

  const windowing = useWindowing();

  function onCardClick() {
    windowing.createWindow({
      component: BattleView,
      props: {},
      title: "Battle View",
    });
  }

  return (
    <main className="flex h-full w-full flex-col overflow-hidden bg-white">
      <nav className="flex items-center gap-2 border-b border-gray-200 bg-white p-4">
        <h1 className="text-xl">QA</h1>
      </nav>
      <div className="relative shrink grow overflow-auto">
        <DocScroll className={cn("bg-grey-100 p-8 pb-96")}>
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className={cn(
              "border-grey-400 mx-[25%] w-[960px] border bg-white shadow-md",
              DocViewStyle["doc-view"]
            )}></div>
        </DocScroll>
        {/* deck */}
        <MotionFrame
          className="fixed bottom-2 left-2 h-48 w-[calc(100%-theme('spacing.4'))]"
          variants={variants}
          initial="enter"
          animate="active"
          exit="exit">
          <ul className="flex h-full w-full overflow-x-scroll p-2">
            {[0, 1, 2, 3, 4, 5].map((card) => {
              return (
                <motion.li
                  key={card}
                  whileTap={{ scale: 1.05 }}
                  onClick={onCardClick}
                  className="mr-2 flex aspect-[3/4] h-full shrink-0 flex-col items-stretch justify-end overflow-hidden rounded-lg bg-white p-4 text-gray-600 shadow-sm">
                  <h3 className="text-center text-lg">Carta</h3>
                </motion.li>
              );
            })}
          </ul>
        </MotionFrame>
      </div>
    </main>
  );
}
