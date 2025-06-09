import Links from './Links'
import { handleSearchParams } from './utils'

type LinkInfo = { url: string; name: string }

export default async function Home({
  searchParams,
}: {
  // Next 15+: `searchParams` is now a Promise
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  // Wait for the params once (or wrap the whole thing in <Suspense>)
  const params = await searchParams

  // 👀 Raw query values (may be undefined or string[])
  const srcRaw = params.src
  const destRaw = params.dest

  // Verify params valid
  const validParams = handleSearchParams(srcRaw, destRaw)

  // Decide what shape you want to accept.
  // Here we expect simple URLs; names stay the same.
  const src: LinkInfo = {
    url: typeof srcRaw === 'string' ? decodeURIComponent(srcRaw) : 'https://www.disney.com/',
    name: 'Return to Disney',
  }

  const dest: LinkInfo = {
    url: typeof destRaw === 'string' ? decodeURIComponent(destRaw) : 'https://www.starwars.com/',
    name: 'Go to Star Wars',
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">Exit Interstitial Workshop</h1>
        {validParams && <Links src={src} dest={dest} />}
        {!validParams && <p className="text-red-500">Invalid parameters provided.</p>}
      </main>
    </div>
  )
}
