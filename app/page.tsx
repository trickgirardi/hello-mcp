"use client"

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center w-screen h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="p-10">
        <a href="">Fluxverse</a>
      </header>
      <main className="flex flex-col justify-center items-center gap-3 p-16 m-1 w-screen h-screen max-w-xl max-h-96 bg-neutral-900 rounded-md border border-neutral-600">
        <h1 className="text font-bold">Fluxletter</h1>
        <p className="text-center">Inscreva-se na minha newsletter. Eu não mandarei nada que não seja útil.</p>
        <form onSubmit={() => { }}>
          <input type="email" placeholder="insira seu e-mail aqui" className="bg-neutral-100 border border-neutral-600 rounded text-center" />
        </form>
        <button className=" bg-teal-700 p-2 font-bold border rounded border-neutral-600">Enviar</button>
      </main>
      <footer className="p-10">
        <button type="submit">Política de privacidade</button>
      </footer>
    </div>
  );
}
