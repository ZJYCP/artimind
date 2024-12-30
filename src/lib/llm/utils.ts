const encoder = new TextEncoder()

export const streamController =
  (controller) => (message: string | null, done: boolean) => {
    if (done) {
      controller.close()
    } else {
      const payload = `data: ${message} \n\n`
      controller.enqueue(encoder.encode(payload))
    }
  }

export async function streamResponse(
  data: Record<string, any>,
  onStream?: (...args: any[]) => void
) {
  for (const [key, value] of Object.entries(data)) {
    onStream?.(JSON.stringify({ [key]: value }))
  }
}
