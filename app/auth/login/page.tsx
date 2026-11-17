"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage("Vérifiez votre boîte mail — un lien de connexion vous a été envoyé.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2 text-center">Connexion</h1>
        <p className="text-text-muted text-sm text-center mb-6">
          Entrez votre email pour recevoir un lien magique.
        </p>

        <form onSubmit={handleMagicLink} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-surface border border-border-input text-text placeholder:text-text-faint focus:border-accent"
              placeholder="vous@ecole.ma"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary btn-md w-full">
            {loading ? "Envoi…" : "Recevoir le lien"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-center text-text-muted">{message}</p>}

        <p className="mt-6 text-center text-sm text-text-faint">
          <Link href="/" className="text-accent hover:underline">← Retour à l’accueil</Link>
        </p>
      </div>
    </div>
  );
}
