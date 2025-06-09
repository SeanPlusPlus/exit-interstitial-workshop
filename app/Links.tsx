export default function Links({
  src,
  dest,
}: {
  src: { url: string; name: string }
  dest: { url: string; name: string }
}) {
  if (!src || !dest) {
    return null
  }
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[210px]"
        href={src.url}
        rel="noopener noreferrer"
      >
        {src.name}
      </a>
      <a
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto md:w-[210px]"
        href={dest.url}
        rel="noopener noreferrer"
      >
        {dest.name}
      </a>
    </div>
  )
}
