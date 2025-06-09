import 'dotenv/config'
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'

const ALG = 'aes-256-gcm'

/**
 * Derive a fixed‑length key from the env secret.
 * If EXIT_SECRET is missing we fall back to an ephemeral random key so that
 * the process continues to run.  Tokens encrypted with this key will *not*
 * survive a restart, but the app will never crash.
 */
function deriveKey() {
  const secret = process.env.EXIT_SECRET

  if (!secret) {
    console.warn(
      '[crypto] EXIT_SECRET env var is missing – using an ephemeral key; tokens will be invalid after a restart.',
    )
    return randomBytes(32)
  }

  try {
    return createHash('sha256').update(secret, 'utf8').digest() // 32‑byte key
  } catch (err) {
    console.error('[crypto] Failed to derive key:', err)
    // Fallback to a random key so the service stays up even if hashing fails.
    return randomBytes(32)
  }
}

const KEY = deriveKey()

// ---------------- URL‑safe base64 helpers ----------------
const toB64url = (buf) =>
  buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

const fromB64url = (str) => {
  if (typeof str !== 'string') return Buffer.alloc(0)
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  return Buffer.from(str, 'base64')
}

// ---------------- Encrypt / Decrypt helpers --------------

/**
 * Encrypt a URL string.
 * @param {string} plainUrl – the URL to encrypt
 * @returns {string|null} URL‑safe token or `null` on failure (never throws)
 */
export function encryptUrl(plainUrl) {
  try {
    if (typeof plainUrl !== 'string' || !plainUrl) {
      throw new TypeError('plainUrl must be a non‑empty string')
    }

    const iv = randomBytes(12) // 96‑bit nonce (NIST‑recommended)
    const cipher = createCipheriv(ALG, KEY, iv)

    const ciphertext = Buffer.concat([cipher.update(plainUrl, 'utf8'), cipher.final()])

    const tag = cipher.getAuthTag() // 16 bytes
    return toB64url(Buffer.concat([iv, tag, ciphertext]))
  } catch (err) {
    console.error('[crypto] encryptUrl failed:', err)
    return null
  }
}

/**
 * Decrypt a token back to a URL string.
 * @param {string} token – token produced by encryptUrl
 * @returns {string|null} the original URL or `null` on failure (never throws)
 */
export function decryptUrl(token) {
  try {
    if (typeof token !== 'string' || !token) {
      throw new TypeError('token must be a non‑empty string')
    }

    const buf = fromB64url(token)
    if (buf.length < 28) throw new Error('token is too short to be valid')

    const iv = buf.subarray(0, 12)
    const tag = buf.subarray(12, 28)
    const data = buf.subarray(28)
    if (!data.length) throw new Error('token contains no ciphertext')

    const decipher = createDecipheriv(ALG, KEY, iv)
    decipher.setAuthTag(tag)

    const plaintext = Buffer.concat([decipher.update(data), decipher.final()])
    return plaintext.toString('utf8')
  } catch (err) {
    // Bad token, wrong key, tampering, etc.
    console.error('[crypto] decryptUrl failed:', err)
    return null
  }
}
