import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  questions,
  products,
  recommend,
  whatsappLink,
  type Answers,
  type ProductId,
} from "@/lib/quiz-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, MessageCircle, ShoppingCart, Sparkles, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quiz: Descubra a Melhor Maquininha Mercado Pago em 1 Minuto" },
      {
        name: "description",
        content:
          "Responda 6 perguntas rápidas e descubra qual maquininha da Mercado Pago combina com o seu negócio. Recomendação personalizada e gratuita.",
      },
      { property: "og:title", content: "Qual a melhor maquininha Mercado Pago para você?" },
      {
        property: "og:description",
        content: "Quiz interativo com recomendação personalizada de maquininha em 1 minuto.",
      },
    ],
  }),
  component: QuizPage,
});

type Stage = "intro" | "quiz" | "result";

function QuizPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const total = questions.length;
  const current = questions[step];
  const progress = ((step + (stage === "result" ? 1 : 0)) / total) * 100;

  function pick(value: string) {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    if (step + 1 < total) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setTimeout(() => setStage("result"), 200);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setStage("intro");
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--brand-glow)" }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-8 md:py-16">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground shadow-lg"
              style={{ background: "var(--gradient-hero)" }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-foreground">Maquininha Match</span>
          </div>
          {stage !== "intro" && (
            <button
              onClick={reset}
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Recomeçar
            </button>
          )}
        </header>

        {stage === "intro" && <Intro onStart={() => setStage("quiz")} />}

        {stage === "quiz" && (
          <QuizStep
            step={step}
            total={total}
            progress={progress}
            question={current}
            selected={answers[current.key]}
            onPick={pick}
            onBack={() => setStep(Math.max(0, step - 1))}
          />
        )}

        {stage === "result" && <Result answers={answers} onReset={reset} />}
      </div>
    </main>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="text-center py-10 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-foreground/80 ring-1 ring-brand/30">
        <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
        Recomendação personalizada e gratuita
      </span>
      <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
        Descubra a <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >melhor maquininha</span> para o seu negócio em 1 minuto
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base md:text-lg text-muted-foreground">
        Responda 6 perguntas rápidas e receba a recomendação ideal entre as maquininhas Mercado Pago — com preço, taxas e benefícios.
      </p>
      <div className="mt-10 flex flex-col items-center gap-3">
        <Button
          size="lg"
          onClick={onStart}
          className="h-14 rounded-2xl px-10 text-base font-semibold shadow-[0_10px_40px_-12px_oklch(0.62_0.2_250/0.5)] hover:scale-[1.02] transition-transform"
          style={{ background: "var(--gradient-hero)" }}
        >
          Começar agora <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-xs text-muted-foreground">⏱ Leva menos de 60 segundos</p>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 text-left">
        {[
          { n: "6", l: "perguntas rápidas" },
          { n: "6", l: "produtos analisados" },
          { n: "1min", l: "para descobrir" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-2xl border border-border/60 bg-card p-4 md:p-6"
          >
            <div className="text-2xl md:text-3xl font-bold text-foreground">{s.n}</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuizStep({
  step,
  total,
  progress,
  question,
  selected,
  onPick,
  onBack,
}: {
  step: number;
  total: number;
  progress: number;
  question: (typeof questions)[number];
  selected?: string;
  onPick: (v: string) => void;
  onBack: () => void;
}) {
  return (
    <section
      key={question.key}
      className="animate-in fade-in slide-in-from-right-4 duration-300"
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
          <span>Pergunta {step + 1} de {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, background: "var(--gradient-hero)" }}
          />
        </div>
      </div>

      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">
        {question.title}
      </h2>
      {question.subtitle && (
        <p className="mt-2 text-muted-foreground">{question.subtitle}</p>
      )}

      <div className="mt-8 grid gap-3">
        {question.options.map((opt) => {
          const active = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onPick(opt.value)}
              className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all hover:scale-[1.01] hover:shadow-lg ${
                active
                  ? "border-brand bg-brand/5 shadow-[var(--shadow-soft)]"
                  : "border-border bg-card hover:border-brand/40"
              }`}
            >
              {opt.icon && (
                <span className="text-3xl flex-shrink-0">{opt.icon}</span>
              )}
              <span className="flex-1 font-medium text-foreground">{opt.label}</span>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
                  active
                    ? "bg-brand text-primary-foreground"
                    : "bg-secondary text-muted-foreground group-hover:bg-brand/20"
                }`}
              >
                {active ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </span>
            </button>
          );
        })}
      </div>

      {step > 0 && (
        <button
          onClick={onBack}
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
      )}
    </section>
  );
}

function Result({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  const { primary, alternatives } = recommend(answers);
  const main = products[primary];

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Progress 100% */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
          <span>Concluído</span>
          <span>100%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full w-full rounded-full" style={{ background: "var(--gradient-hero)" }} />
        </div>
      </div>

      <div className="text-center">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-hero)" }}
        >
          🏆 Recomendação para você
        </span>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          {main.name}
        </h2>
        <p className="mt-2 text-muted-foreground text-lg">{main.tagline}</p>
      </div>

      {/* Hero card */}
      <div
        className="mt-8 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]"
        style={{ background: "var(--gradient-card)" }}
      >
        <div className="relative aspect-[16/10] bg-secondary">
          <img
            src={main.image}
            alt={main.name}
            width={768}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6 md:p-8">
          <p className="text-foreground/80">{main.description}</p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {main.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-sm text-foreground">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <Spec label="Preço" value={main.price} />
            <Spec label="Taxas" value={main.fees} />
            <Spec label="Conectividade" value={main.connectivity} />
            <Spec label="Ideal para" value={main.ideal} />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="flex-1 h-14 rounded-2xl text-base font-semibold shadow-lg hover:scale-[1.01] transition-transform"
              style={{ background: "var(--gradient-hero)" }}
            >
              <a href={main.affiliate} target="_blank" rel="noopener noreferrer">
                <ShoppingCart className="mr-2 h-5 w-5" /> Comprar agora
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="flex-1 h-14 rounded-2xl text-base font-semibold border-2 hover:scale-[1.01] transition-transform"
            >
              <a
                href={whatsappLink(main.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5 text-[oklch(0.7_0.18_145)]" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Alternatives */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-foreground">Outras opções para comparar</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Outras maquininhas que também podem servir pro seu perfil
        </p>
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          {alternatives.map((id) => (
            <AltCard key={id} id={id} />
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button variant="ghost" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" /> Refazer o quiz
        </Button>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-3">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">{label}</div>
      <div className="text-sm font-medium text-foreground mt-1 leading-tight">{value}</div>
    </div>
  );
}

function AltCard({ id }: { id: ProductId }) {
  const p = products[id];
  return (
    <div className="group flex gap-4 rounded-2xl border border-border bg-card p-4 hover:border-brand/40 hover:shadow-lg transition-all">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
        <img
          src={p.image}
          alt={p.name}
          width={200}
          height={200}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-foreground">{p.name}</div>
        <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{p.tagline}</div>
        <div className="mt-2 text-xs font-semibold text-brand">{p.price}</div>
        <div className="mt-3 flex gap-2">
          <a
            href={p.affiliate}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-foreground hover:text-brand transition-colors inline-flex items-center"
          >
            Ver oferta <ArrowRight className="ml-1 h-3 w-3" />
          </a>
          <a
            href={whatsappLink(p.whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[oklch(0.55_0.16_145)] hover:underline inline-flex items-center"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
