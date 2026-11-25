/** Refresh every public page after an edit. Outside a Next.js request (seed script) there is nothing to refresh. */
export async function revalidateSite() {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    /* not running inside Next.js */
  }
}
