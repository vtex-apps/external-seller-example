import { MarketplaceOrderInput } from '../typings/orderPlacement'

export const processAllOrderInputs = (
  ctx: Context,
  requests: MarketplaceOrderInput[]
) => {
  const {
    clients: { externalSeller },
  } = ctx

  return requests.map((order) => externalSeller.placeOrder(order))
}
