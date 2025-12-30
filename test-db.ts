import { prisma } from './lib/prisma'

async function main() {
  console.log('Testing connection with adapter...')
  try {
    await prisma.$connect()
    console.log('SUCCESS: Connected to Neon successfully!')
  } catch (e) {
    console.error('FAILED: Connection failed')
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
