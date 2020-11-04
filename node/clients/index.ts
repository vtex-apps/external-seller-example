import { IOClients } from '@vtex/api'
import { Catalog, OMS, Suggestions } from '@vtex/clients'

import { ExternalSeller } from './externalSeller'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get externalSeller() {
    return this.getOrSet('externalSeller', ExternalSeller)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get suggestion() {
    return this.getOrSet('suggestions', Suggestions)
  }

  public get oms() {
    return this.getOrSet('oms', OMS)
  }
}
