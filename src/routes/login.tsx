import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Github, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Relay" },
      { name: "description", content: "Sign in to your Relay dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 600);
  };

  return <AuthShell mode="login" loading={loading} onSubmit={onSubmit} />;
}

export function AuthShell({
  mode,
  loading,
  onSubmit,
}: {
  mode: "login" | "signup";
  loading: boolean;
  onSubmit: (e: FormEvent) => void;
}) {
  const isLogin = mode === "login";
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex flex-col justify-between p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-soft">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">Relay</span>
        </Link>

        <div className="max-w-md mx-auto w-full py-12">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {isLogin ? "Welcome back." : "Create your account."}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin
              ? "Sign in to manage flows, keys and message logs."
              : "Start sending in minutes — no credit card required."}
          </p>

          <div className="mt-8 space-y-2.5">
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-input bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition shadow-soft">
              <GoogleIcon /> Continue with Google
            </button>
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-input bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition shadow-soft">
              <Github className="h-4 w-4" /> Continue with GitHub
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            or with email
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-medium text-foreground">Full name</label>
                <input
                  required
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Ada Lovelace"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-foreground">Work email</label>
              <div className="mt-1.5 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground">Password</label>
                {isLogin && (
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot?
                  </a>
                )}
              </div>
              <input
                type="password"
                required
                minLength={8}
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 transition shadow-elevated disabled:opacity-60"
            >
              {loading ? "Just a moment…" : isLogin ? "Sign in" : "Create account"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          By continuing, you agree to Relay's Terms and Privacy Policy.
        </p>
      </div>

      <div className="hidden lg:flex relative overflow-hidden bg-gradient-subtle">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%)",
          }}
        />
        <div className="relative m-auto max-w-md p-10">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              What you get
            </div>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              {[
                "Unified API for SMS, Email, WhatsApp, AI",
                "Visual flow builder with fallback logic",
                "Per-project API keys & env variables",
                "API Playground to test endpoints in seconds",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-xs text-muted-foreground text-center">
            “We replaced four vendors with Relay in a weekend.” — CTO, Northwind
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  );
}
