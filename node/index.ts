import {
  ClientsConfig,
  LRUCache,
  method,
  Service,
  ServiceContext,
} from '@vtex/api'

import { Clients } from './clients'
import { fullfilmentSimulation } from './handlers/fullfilmentSimulation'
import { placeOrder } from './handlers/orderPlacement'
import { suggestSku } from './handlers/skuSuggestion'
import { invoiceOrder } from './handlers/invoice'
import { createSellerOnMarketplace, getSellerList } from './resolvers/seller'
import { dispatchOrder } from './handlers/orderDispatching'
import { sendTrackingInformation } from './handlers/tracking'
import {
  mkpOrderCancellation,
  sellerOrderCancellation,
} from './handlers/orderCancellation'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    fullfilmentSimulation: method({
      POST: fullfilmentSimulation,
    }),
    orderPlacement: method({
      POST: placeOrder,
    }),
    mkpCancellation: method({
      POST: mkpOrderCancellation,
    }),
    sellerCancellation: method({
      POST: sellerOrderCancellation,
    }),
    orderDispatching: method({
      POST: dispatchOrder,
    }),
    skuSuggestion: method({
      POST: suggestSku,
    }),
    invoice: method({
      POST: invoiceOrder,
    }),
    trackingInfo: method({
      POST: sendTrackingInformation,
    }),
  },
  graphql: {
    resolvers: {
      Query: {
        getSellerList,
      },
      Mutation: {
        createSellerOnMarketplace,
      },
    },
  },
})
