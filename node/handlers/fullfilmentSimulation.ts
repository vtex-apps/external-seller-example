import { json } from 'co-body'

import { SimulationInput } from '../typings/fullfilmentSimulation'

export async function fullfilmentSimulation(ctx: Context) {
  const {
    clients: { externalSeller },
  } = ctx

  const body: SimulationInput = await json(ctx.req)

  ctx.body = externalSeller.fullfilmentSimulation(body)

  ctx.status = 200
}
