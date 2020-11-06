import { SuggestionRequest } from '@vtex/clients'
import { json } from 'co-body'

export async function suggestSku(ctx: Context) {
  const {
    clients: { catalog, suggestion },
    vtex: {
      route: {
        params: { sellerId, sellerSkuId },
      },
    },
  } = ctx

  const body: SuggestionRequest = await json(ctx.req)

  try {
    await catalog.changeNotification({
      sellerId: sellerId as string,
      sellerSkuId: sellerSkuId as string,
    })
    ctx.body = 'SKU already exists on Marketplace'
    ctx.status = 304
  } catch (e) {
    if (e.response.status === 404) {
      suggestion.sendSkuSuggestion(body)
      ctx.body = 'Suggestion was successfully sent'
      ctx.status = 200
    } else {
      // eslint-disable-next-line no-console
      console.log(`Error: ${e.response.message}`)
    }
  }
}
