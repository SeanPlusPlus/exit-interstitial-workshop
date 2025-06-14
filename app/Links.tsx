export default function Links({ src, dest }: { src: string | null; dest: string | null }) {
  if (!src || !dest) {
    return <p className="text-red-500">Invalid parameters provided.</p>
  }

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[210px]"
        href={src}
        rel="noopener noreferrer"
      >
        Go Back
      </a>
      <a
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto md:w-[210px]"
        href={dest}
        rel="noopener noreferrer"
      >
        Continue On
      </a>
    </div>
  )
}
