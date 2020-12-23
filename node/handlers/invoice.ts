/**
 * Invoices the order on the seller side. In case of happening
 * any problem during the invoice, it will trigger the cancellation
 * by the seller.
 * @param {Context} ctx
 */
export async function invoiceOrder(ctx: Context) {
  const {
    clients: { externalSeller, oms },
    state: { body: marketplaceOrderId },
  } = ctx

  /*
    Try catch to make sure that any problem that happens while
    invoicing will trigger the order cancellation by the seller
  */
  try {
    const invoiceData = await externalSeller.invoiceOrder(
      marketplaceOrderId as string
    )

    ctx.body = await oms.orderNotification(
      marketplaceOrderId as string,
      invoiceData
    )
    ctx.status = 200
  } catch (e) {
    ctx.body = 'An error has ocurred while invoicing. Order was canceled.'
    ctx.status = 500
  }
}
