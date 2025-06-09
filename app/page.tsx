import Links from './Links'
import { handleSearchParams } from './utils'

type LinkInfo = { url: string; name: string }

export default async function Home({
  searchParams,
}: {
  // Next 15+: `searchParams` is now a Promise
  searchParams: Promise<Record<string, string | undefined>>
}) {
  // Wait for the params once (or wrap the whole thing in <Suspense>)
  const params = await searchParams

  // 👀 Raw query values (may be undefined or string[])
  const srcRaw = params.src
  const destRaw = params.dest

  // Verify params valid
  const { src, dest } = handleSearchParams(srcRaw, destRaw)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">Exit Interstitial Workshop</h1>
        <Links src={src} dest={dest} />
      </main>
    </div>
  )
}
