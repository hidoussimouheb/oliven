import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'

const dirname = path.dirname(fileURLToPath(import.meta.url))

if (!process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET is not set. Copy .env.example to .env.')

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · óliven admin' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media],
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'fr', label: 'Français' },
      { code: 'ar', label: 'العربية', rtl: true },
    ],
    defaultLocale: 'en',
    fallback: false,
  },
  editor: lexicalEditor(),
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } }),
  graphQL: { disable: true },
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  upload: { limits: { fileSize: 20_000_000 } },
})
