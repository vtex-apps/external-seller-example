import { json } from 'co-body'

export async function dispatchOrder(ctx: Context) {
  const {
    clients: { externalSeller },
    vtex: {
      route: {
        params: { orderId },
      },
    },
  } = ctx

  const marketplaceOrderId = await json(ctx.req)

  ctx.body = externalSeller.dispatchOrder(orderId as string, marketplaceOrderId)

  ctx.status = 200
}
