"use client";

import { FormEvent, useCallback, useState } from "react";
import supabase from "./supabase/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const signNewsletter = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsSaving(true)

      const { data, error, status } = await supabase.from("users").insert([{ email }]);
      
      if (error) {
        if(status === 409) {
          alert("Esse e-mail já foi cadastrado.")
        } else {
          alert("Ocorreu algo de errado na sua inscrição.")
        }

        console.log("Error: ", error);
        setIsSaving(false)
        return;
      }

      alert("Você se inscreveu com sucesso!")
      console.log(data);

      setIsSaving(false)
      setEmail("");
    },
    [email]
  );

  return (
    <div className="flex flex-col justify-between items-center p-1 h-screen font-[family-name:var(--font-geist-sans)] bg-neutral-950">
      <header className="p-10">
        <a href="">Fluxverse</a>
      </header>
      <main className="flex flex-col justify-center items-center gap-4 p-16 bg-neutral-900 rounded-md border border-neutral-600">
        <h1 className="text font-bold">Fluxletter</h1>
        <p className="text-center">
          Inscreva-se na minha newsletter. Eu não mandarei nada que não seja
          útil.
        </p>
        <form className="flex flex-col gap-3 mt-2 items-center" onSubmit={signNewsletter}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="insira seu e-mail aqui"
            className="bg-neutral-100 border border-neutral-600 rounded text-center outline-none text-neutral-900"
          />

          <button
            type="submit"
            className=" bg-teal-700 p-2 pl-4 pr-4 border rounded border-teal-500"
            style={{ pointerEvents: isSaving ? 'none' : 'auto'}}
          >
            Enviar
          </button>
        </form>

      </main>
      <footer className="p-10">
        <button>Política de privacidade</button>
      </footer>
    </div>
  );
}
