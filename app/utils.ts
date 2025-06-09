import { decryptUrl } from './crypto'

export const handleSearchParams = (src: string | undefined, dest: string | undefined) => {
  console.log('src param:', src)
  console.log('dest param:', dest)

  console.log('src param decrypted:', decryptUrl(src || ''))
  console.log('dest param decrypted:', decryptUrl(dest || ''))

  return {
    src: decryptUrl(src || ''),
    dest: decryptUrl(dest || ''),
  }
}
