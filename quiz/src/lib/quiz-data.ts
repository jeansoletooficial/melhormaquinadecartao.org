import pointMini from "@/assets/point-mini.jpg";
import pointAir from "@/assets/point-air.jpg";
import pointPro from "@/assets/point-pro.jpg";
import pointSmart from "@/assets/point-smart.jpg";
import pointTap from "@/assets/point-tap.jpg";
import linkPagamento from "@/assets/link-pagamento.jpg";

export type AnswerKey =
  | "budget"
  | "usage"
  | "receipt"
  | "chip"
  | "online"
  | "noCost";

export type Answers = Partial<Record<AnswerKey, string>>;

export interface Question {
  key: AnswerKey;
  title: string;
  subtitle?: string;
  options: { value: string; label: string; icon?: string }[];
}

export const questions: Question[] = [
  {
    key: "budget",
    title: "Qual valor você pretende investir?",
    subtitle: "Escolha a faixa que melhor cabe no seu bolso",
    options: [
      { value: "100", label: "Até R$ 100", icon: "💰" },
      { value: "300", label: "Até R$ 300", icon: "💵" },
      { value: "700", label: "Até R$ 700", icon: "💸" },
      { value: "700+", label: "Acima de R$ 700", icon: "🏆" },
    ],
  },
  {
    key: "usage",
    title: "Como você pretende usar a maquininha?",
    options: [
      { value: "ocasional", label: "Uso ocasional", icon: "🌙" },
      { value: "diario", label: "Uso diário", icon: "☀️" },
      { value: "alto", label: "Alto volume de vendas", icon: "🚀" },
    ],
  },
  {
    key: "receipt",
    title: "Você precisa imprimir comprovante?",
    options: [
      { value: "sim", label: "Sim, é importante", icon: "🧾" },
      { value: "nao", label: "Não preciso", icon: "📱" },
    ],
  },
  {
    key: "chip",
    title: "Precisa de chip e internet própria?",
    subtitle: "Útil quando o WiFi do local é instável",
    options: [
      { value: "sim", label: "Sim, quero independência", icon: "📶" },
      { value: "nao", label: "Não, uso WiFi/celular", icon: "📡" },
    ],
  },
  {
    key: "online",
    title: "Pretende vender online também?",
    options: [
      { value: "sim", label: "Sim, redes sociais e WhatsApp", icon: "🌐" },
      { value: "nao", label: "Não, só presencial", icon: "🏪" },
    ],
  },
  {
    key: "noCost",
    title: "Quer começar sem custo inicial?",
    options: [
      { value: "sim", label: "Sim, zero investimento", icon: "🎁" },
      { value: "nao", label: "Posso investir agora", icon: "✅" },
    ],
  },
];

export type ProductId =
  | "mini"
  | "air"
  | "pro"
  | "smart"
  | "tap"
  | "link";

export interface Product {
  id: ProductId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: string;
  fees: string;
  connectivity: string;
  ideal: string;
  benefits: string[];
  affiliate: string;
  whatsappMsg: string;
}

export const products: Record<ProductId, Product> = {
  mini: {
    id: "mini",
    name: "Point Mini NFC 2",
    tagline: "A queridinha de quem está começando",
    description:
      "A maquininha mais acessível da Mercado Pago. Conecta no celular via Bluetooth e aceita aproximação, débito e crédito.",
    image: pointMini,
    price: "A partir de R$ 89",
    fees: "Débito 1,99% • Crédito 4,98%",
    connectivity: "Bluetooth (usa o seu celular)",
    ideal: "Iniciantes, vendas eventuais e baixo orçamento",
    benefits: [
      "Mais barata do mercado",
      "Aceita aproximação (NFC)",
      "Sem mensalidade",
      "Recebe na hora na conta Mercado Pago",
    ],
    affiliate: "https://mpago.li/1rSRiz5",
    whatsappMsg: "Quero Comprar a Point Mini NFC 2",
  },
  air: {
    id: "air",
    name: "Point Air 2",
    tagline: "Liberdade sem fio com tela própria",
    description:
      "Maquininha moderna, sem fio, com tela colorida e bateria de longa duração. Ideal pra quem precisa de mobilidade.",
    image: pointAir,
    price: "A partir de R$ 199",
    fees: "Débito 1,79% • Crédito 4,38%",
    connectivity: "Bluetooth + WiFi",
    ideal: "Quem quer mobilidade sem precisar do celular",
    benefits: [
      "Tela própria",
      "Não depende do celular",
      "Bateria de longa duração",
      "Design moderno e leve",
    ],
    affiliate: "https://mpago.li/1q7EmyY",
    whatsappMsg: "Quero Comprar a Point Air 2",
  },
  pro: {
    id: "pro",
    name: "Point Pro 3",
    tagline: "Profissional, com chip e impressora",
    description:
      "A escolha de quem leva o negócio a sério. Chip 4G, WiFi, impressora de comprovantes e bateria potente.",
    image: pointPro,
    price: "A partir de R$ 399",
    fees: "Débito 1,69% • Crédito 4,18%",
    connectivity: "Chip 4G + WiFi",
    ideal: "Volume médio, comércios e prestadores de serviço",
    benefits: [
      "Imprime comprovante na hora",
      "Chip 4G grátis",
      "Funciona em qualquer lugar",
      "Bateria potente",
    ],
    affiliate: "https://mpago.li/1A7CMMA",
    whatsappMsg: "Quero Comprar a Point Pro 3",
  },
  smart: {
    id: "smart",
    name: "Point Smart 2",
    tagline: "A mais completa: um POS Android na sua mão",
    description:
      "Sistema Android completo com gestão de vendas, catálogo, impressora e tela touch. Para quem quer escalar.",
    image: pointSmart,
    price: "A partir de R$ 799",
    fees: "Débito 1,69% • Crédito 4,18%",
    connectivity: "Chip 4G + WiFi",
    ideal: "Alto volume, restaurantes, lojas e gestão completa",
    benefits: [
      "Sistema Android completo",
      "Tela touch HD",
      "Gestão de vendas e estoque",
      "Imprime comprovante",
    ],
    affiliate: "https://mpago.li/32XUanp",
    whatsappMsg: "Quero Comprar a Point Smart 2",
  },
  tap: {
    id: "tap",
    name: "Point Tap (App)",
    tagline: "Seu celular vira maquininha — sem custo",
    description:
      "Transforme o seu próprio celular em uma maquininha de cartão usando NFC. Zero investimento inicial.",
    image: pointTap,
    price: "Grátis",
    fees: "Débito 1,99% • Crédito 4,98%",
    connectivity: "NFC do seu celular",
    ideal: "Quem quer começar sem investir nada",
    benefits: [
      "Sem custo inicial",
      "Sem maquininha física",
      "Aproxima e cobra",
      "Pronto em minutos",
    ],
    affiliate: "https://mpago.li/2MZSMfg",
    whatsappMsg:
      "Quer ter acesso ao Aplicativo que faz o Celular virar uma Maquininha",
  },
  link: {
    id: "link",
    name: "Link de Pagamento",
    tagline: "Venda pelo WhatsApp e redes sociais",
    description:
      "Crie um link de cobrança e envie pelo WhatsApp, Instagram ou e-mail. Seu cliente paga em qualquer lugar.",
    image: linkPagamento,
    price: "Grátis",
    fees: "A partir de 4,98% no crédito",
    connectivity: "100% online",
    ideal: "Vendas online, redes sociais e delivery",
    benefits: [
      "Sem maquininha física",
      "Recebe de qualquer lugar do Brasil",
      "Parcela em até 12x",
      "Compartilha em segundos",
    ],
    affiliate: "https://mpago.la/24aTX7E",
    whatsappMsg: "Quero Obter Acesso ao Link de Pagamento",
  },
};

export function recommend(answers: Answers): {
  primary: ProductId;
  alternatives: ProductId[];
} {
  // Priority rules
  if (answers.noCost === "sim") {
    if (answers.online === "sim")
      return { primary: "link", alternatives: ["tap", "mini"] };
    return { primary: "tap", alternatives: ["link", "mini"] };
  }

  if (answers.online === "sim" && answers.usage === "ocasional") {
    return { primary: "link", alternatives: ["mini", "tap"] };
  }

  if (answers.usage === "alto" || answers.budget === "700+") {
    return { primary: "smart", alternatives: ["pro", "air"] };
  }

  if (answers.receipt === "sim" || answers.chip === "sim") {
    return { primary: "pro", alternatives: ["smart", "air"] };
  }

  if (answers.budget === "100") {
    return { primary: "mini", alternatives: ["tap", "air"] };
  }

  if (answers.usage === "diario" && answers.budget !== "100") {
    return { primary: "air", alternatives: ["pro", "mini"] };
  }

  return { primary: "mini", alternatives: ["air", "tap"] };
}

export const WHATSAPP_NUMBER = "5571993107035";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
