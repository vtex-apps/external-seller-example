import { getItemsInfoFromInput } from './../utils/simulationMock'
import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

import {
  SimulationInput,
  SimulationResponse,
} from '../typings/fullfilmentSimulation'
import {
  MarketplaceOrderInput,
  MarketplaceOrderResponse,
} from '../typings/orderPlacement'

export class ExternalSeller extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`baseUrl`, ctx, {
      ...options,
    })
  }

  public fullfilmentSimulation(input: SimulationInput) {
    const items = getItemsInfoFromInput(input)

    const body: SimulationResponse = {
      country: 'BRA',
      items,
      logisticsInfo: [
        {
          itemIndex: 0,
          quantity: 1,
          shipsTo: ['BRA'],
          slas: [],
          stockBalance: 199,
          deliveryChannels: [
            {
              id: 'delivery',
              stockBalance: 179,
            },
            {
              id: 'pickup-in-point',
              stockBalance: 20,
            },
          ],
        },
      ],
      postalCode: input.postalCode,
    }

    return body
  }

  public placeOrder(_: MarketplaceOrderInput) {
    const body: MarketplaceOrderResponse = {
      marketplaceOrderId: '959311095',
      marketplaceServicesEndpoint: 'https://marketplaceservicesendpoint/',
      marketplacePaymentValue: 11080,
      orderId: '123543123',
      followUpEmail: '75c70c09dbb3498c9b3bbdee59bf0687@ct.vtex.com.br',
      items: [
        {
          id: '2002495',
          quantity: 1,
          Seller: '1',
          commission: 0,
          freightCommission: 0,
          price: 9990,
          bundleItems: [],
          priceTags: [],
          attachments: [],
          itemAttachment: {
            name: 'test',
            content: 'test',
          },
          measurementUnit: 'un',
          unitMultiplier: 1,
          isGift: false,
        },
      ],
      clientProfileData: {
        email: '5c77abaea35f4cb6824b9326942c00e5@ct.vtex.com.br',
        firstName: 'JONAS',
        lastName: 'ALVES DE OLIVEIRA',
        documentType: 'cpf',
        document: '32133239851',
        phone: '1592712979',
        corporateName: null,
        tradeName: null,
        corporateDocument: null,
        stateInscription: null,
        corporatePhone: null,
        isCorporate: false,
        userProfileId: null,
      },
      shippingData: {
        address: {
          addressType: 'Residencial',
          receiverName: 'JONAS ALVES DE OLIVEIRA',
          addressId: 'Casa',
          postalCode: '13476103',
          city: 'Americana',
          state: 'SP',
          country: 'BRA',
          street: 'JOÃO DAMÁZIO GOMES',
          number: '121',
          neighborhood: 'SÃO JOSÉ',
          complement: null,
          reference: 'Bairro Praia Azul / Posto de Saúde 17',
          geoCoordinates: [],
        },
        logisticsInfo: [
          {
            itemIndex: 0,
            selectedSla: 'Normal',
            lockTTL: '8d',
            shippingEstimate: '5d',
            price: 1090,
            deliveryWindow: null,
          },
        ],
      },
      paymentData: null,
    }

    return body
  }

  public dispatchOrder(orderId: string, marketplaceOrderId: string) {
    const body: OrderDispatch = {
      date: '2014-10-06 18:52:00',
      marketplaceOrderId,
      orderId,
      receipt: 'e39d05f9-0c54-4469-a626-8bb5cff169f8',
    }

    return body
  }
}

interface OrderDispatch {
  date: string
  marketplaceOrderId: string
  orderId: string
  receipt: string
}
