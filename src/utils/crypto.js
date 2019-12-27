import crypto from 'crypto'
import eccrypto from 'eccrypto'

export async function encrypt(plaintext, pubKey) {
  try {
    const encrypted = await eccrypto.encrypt(Buffer.from(pubKey, 'hex'), Buffer.from(plaintext))
    return Buffer.from(JSON.stringify(encrypted)).toString('base64')
  } catch (error) {
    console.warn(error.message)
  }
}

export async function decrypt(ciphertext, privKey) {
  try {
    const oriBuffer = JSON.parse(Buffer.from(ciphertext, 'base64'))
    const ciphertextBuffer = {}
    Object.keys(oriBuffer).forEach((item) => {
      ciphertextBuffer[item] = Buffer.from(oriBuffer[item].data)
    })

    const decrypted = await eccrypto.decrypt(Buffer.from(privKey, 'hex'), ciphertextBuffer)
    return decrypted.toString()
  } catch (error) {
    console.warn(error.message)
  }
}

export function generateKeys() {
  const privKey = crypto.randomBytes(32)
  const pubKey = eccrypto.getPublicCompressed(privKey)
  return {
    privKey: privKey.toString('hex'),
    pubKey: pubKey.toString('hex'),
  }
}