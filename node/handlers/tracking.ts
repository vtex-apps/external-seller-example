import { json } from 'co-body'

export async function sendTrackingInformation(ctx: Context) {
  const {
    clients: { oms },
    vtex: {
      route: {
        params: { marketplaceOrderId },
      },
    },
  } = ctx

  const body = await json(ctx.req)

  ctx.body = await oms.orderNotification(marketplaceOrderId as string, body)
  ctx.status = 200
}
