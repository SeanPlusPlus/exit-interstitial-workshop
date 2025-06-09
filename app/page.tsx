import CTA from './CTA'

export default function Home() {
  const src = {
    url: 'https://www.disney.com/',
    name: 'Disney',
  }
  const dest = {
    url: 'https://www.starwars.com/',
    name: 'Star Wars',
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">Exit Interstitial Workshop</h1>
        <CTA src={src} dest={dest} />
      </main>
    </div>
  )
}
