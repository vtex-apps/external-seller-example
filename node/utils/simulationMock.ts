import {
  SimulationInput,
  SimulationItem,
} from '../typings/fullfilmentSimulation'

export const getItemsInfoFromInput = (input: SimulationInput) =>
  input.items.map((item) => {
    const { id, quantity, seller } = item

    return <SimulationItem>{
      id,
      quantity,
      seller,
      measurementUnit: 'un',
      merchantName: null,
      price: 37500,
      priceTags: [],
      priceValidUntil: null,
      requestIndex: 0,
      unitMultiplier: 1,
    }
  })
