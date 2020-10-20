export interface MarketplaceOrderInput {
  marketplaceOrderId: string
  marketplaceServicesEndpoint: string
  marketplacePaymentValue: number
  items: Item[]
  clientProfileData: ClientProfileData
  shippingData: ShippingData
  openTextField?: any
  marketingData?: MarketingData
  paymentData?: any
}

export interface MarketplaceOrderResponse extends MarketplaceOrderInput {
  orderId: string
  followUpEmail: string
}

interface ClientProfileData {
  email: string
  firstName: string
  lastName: string
  documentType: string
  document: string
  phone: string
  corporateName: string | null
  tradeName: string | null
  corporateDocument: string | null
  stateInscription: string | null
  corporatePhone: string | null
  isCorporate: boolean
  userProfileId: string | null
}

interface Item {
  id: string
  quantity: number
  Seller: string
  commission: number
  freightCommission: number
  price: number
  bundleItems: any[]
  itemAttachment: ItemAttachment
  attachments: any[]
  priceTags: any[]
  measurementUnit: string
  unitMultiplier: number
  isGift: boolean
}

interface ItemAttachment {
  name: string
  content: any
}

interface MarketingData {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmiPage: string
  utmiPart: string
  utmiCampaign: string
}

interface ShippingData {
  address: OrderAddress
  logisticsInfo: OrderLogisticsInfo[]
}

interface OrderAddress {
  addressType: string
  receiverName: string
  addressId: string
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string | null
  reference: string
  geoCoordinates: any[]
}

interface OrderLogisticsInfo {
  itemIndex: number
  selectedSla: string
  lockTTL: string
  shippingEstimate: string
  price: number
  deliveryWindow: any
}
