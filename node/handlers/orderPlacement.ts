import { json } from 'co-body'

import { MarketplaceOrderInput } from '../typings/orderPlacement'
import { processAllOrderInputs } from '../utils/orderPlacement'

export async function orderPlacement(ctx: Context) {
  const body: MarketplaceOrderInput[] = await json(ctx.req)

  /*
    The body request here is an array of MarketplaceOrderInput, which
    means that for each object element on the array, we need to call
    the placeOrder method. In order to do that, that is a function inside
    utils folder, to avoid having the logic inside this handler
  */

  ctx.body = processAllOrderInputs(ctx, body)

  ctx.status = 200
}
