// lib/crypto.js
import 'dotenv/config'
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

const ALG = 'aes-256-gcm'

// Derive a fixed-length key from the env secret
const KEY = createHash('sha256').update(process.env.EXIT_SECRET, 'utf8').digest() // 32 bytes

// ------- URL-safe base64 helpers -------
const toB64url = (buf) =>
  buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

const fromB64url = (str) => {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  return Buffer.from(str, 'base64')
}

// ------- Encrypt / Decrypt a URL -------
export function encryptUrl(plainUrl) {
  const iv = randomBytes(12) // 96-bit nonce (NIST-recommended)
  const cipher = createCipheriv(ALG, KEY, iv)

  const ciphertext = Buffer.concat([cipher.update(plainUrl, 'utf8'), cipher.final()])

  const tag = cipher.getAuthTag() // 16 bytes
  return toB64url(Buffer.concat([iv, tag, ciphertext]))
}

export function decryptUrl(token) {
  const buf = fromB64url(token)

  const iv = buf.subarray(0, 12)
  const tag = buf.subarray(12, 28)
  const data = buf.subarray(28)

  const decipher = createDecipheriv(ALG, KEY, iv)
  decipher.setAuthTag(tag)

  const plaintext = Buffer.concat([decipher.update(data), decipher.final()])
  return plaintext.toString('utf8')
}
