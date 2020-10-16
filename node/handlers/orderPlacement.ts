import { json } from 'co-body'

import { MarketplaceOrderInput } from '../typings/orderPlacement'

export async function orderPlacement(ctx: Context) {
  const {
    clients: { externalSeller },
  } = ctx

  const body: MarketplaceOrderInput = await json(ctx.req)

  ctx.body = externalSeller.placeOrder(body)

  ctx.status = 200
}
