// scripts/generateLink.js
import { encryptUrl } from '../app/crypto.js'

const src = 'https://www.disney.com/'
const dest = 'https://www.starwars.com/'

const url =
  `http://localhost:3000/` +
  `?src=${encodeURIComponent(encryptUrl(src))}` +
  `&dest=${encodeURIComponent(encryptUrl(dest))}`

console.log(url)
