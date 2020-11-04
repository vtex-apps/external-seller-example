import { json } from 'co-body'

export async function mkpOrderCancellation(ctx: Context) {
  const {
    clients: { externalSeller },
    vtex: {
      route: {
        params: { orderId },
      },
    },
  } = ctx

  const { marketplaceOrderId } = await json(ctx.req)

  try {
    ctx.body = await externalSeller.cancelOrder(
      orderId as string,
      marketplaceOrderId
    )
    ctx.status = 200
  } catch (e) {
    ctx.body = 'An error has occurred'
    ctx.status = 500
  }
}
