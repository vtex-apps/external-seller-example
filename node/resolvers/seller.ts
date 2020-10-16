import { Seller } from '@vtex/clients'

export const createSellerOnMarketplace = async (
  _: unknown,
  body: SellerGraphqlVars,
  ctx: Context
) => {
  const {
    clients: { catalog },
  } = ctx

  const token = 'ADMIN_TOKEN'

  const { seller } = body

  return catalog.createSeller(seller, token)
}

export const getSellerList = async (_: unknown, __: unknown, ctx: Context) => {
  const {
    clients: { catalog },
  } = ctx

  return catalog.getSellerList()
}

interface SellerGraphqlVars {
  seller: Seller
}
