# External Seller Example

This is an example application to build an integration with an external seller. It's important to emphasize that it contains mocked data, but it can be used as the first step towards developing a fully function integration.

In the following sections, we explain some details regarding the app that's been developed, such as the routes that are available and GraphQL queries and mutations. It's really important for you to read it and make sure that you fully understand what is mandatory to be implemented. We do encourage you to check [our documentation](https://developers.vtex.com/vtex-developer-docs/docs/external-seller-integration-connector) about creating an external seller connector.

So you can test it, you can follow the steps below:
1. Link this application on a development workspace of a VTEX account;
2. Open the GraphiQL link that is available when the app is successfully linked;
3. Use the GraphQL IDE to create a seller on the VTEX account;
4. Make a request to send a SKU suggestion to the marketplace (you can use the SKU Suggestion request in this Postman collection);
5. Wait for the suggestion to pass through our matcher and appear as a Received SKU, on VTEX account's admin panel (Admin > Seller > Received SKUs);
6. At this point, you can approve the SKU so it will appear on the marketplace's store. To do that, it's necessary to select both the category and the brand of the product. In case of not having, you can create it on the Catalog panel;
7. Wait for the product to be indexed;
8. Once it's already available on the store, you can test to buy it. By doing that, you'll automatically trigger all the order flow until the Order Placement. After that, you can test the routes that are exposed on this app regarding invoicing, tracking or cancellation.

Feel free to contribute to this repo in case of identifying any problems or having suggestions to improve it! :rocket:

## Routes
There are some routes that need to be implemented on the seller integration, in order for the marketplace to be able to communicate with the external services from the seller. For each route, there is a handler that is responsible for using the External Seller client to establish the communication with the external API. 

Besides that, some routes were implemented to perform the other way communication, from the seller to the marketplace; an external seller integration has a two way communication. You can check in [this documentation](https://developers.vtex.com/vtex-developer-docs/docs/external-seller-integration-connector) the target of each request that can happen.

## Handlers

| **Handler file**            | **Implemented Functions**                          | Use                                                                  |
|-----------------------------|----------------------------------------------------|----------------------------------------------------------------------|
| `fulfillmentSimulation.ts`  | `fullfilmentSimulation`                            | This is the most important route when developing an external seller integration. It needs to have high availability, because whenever the marketplace needs to check the current price or inventory, it will use this route. **NOTE**: This route has a 2.5s timeout.                                                                                                                  |
| `orderCancellation.ts`      |  `mkpOrderCancellation`, `sellerOrderCancellation` | The order cancellation can be done by both: marketplace or seller. In case of being the seller the one that's cancelling, it will use an endpoint from OMS. On the other side, if it's the marketplace, it will send a request to a route that is exposed on this app.                                                                                                                   |
| `orderDispatching.ts`       | `dispatchOrder`                                    | Responsible for sending information regarding the order dispatch to the marketplace                                                                                                                                           |
| `orderPlacement.ts`         | `placeOrder`                                       | Once the order is placed on the marketplace, it sends information about it to the seller, so the placement can happen also in the seller side, when it will inform the order ID                                             |
| `skuSuggestion`             | `suggestSku`                                       | Handles the SKU suggestions that the seller can send to the marketplace, whether to send a new SKU or update one that has already been registered in the marketplace.                                                 |
| `invoice.ts`                | `invoiceOrder`                                     | Implements the order invoice on the seller side. It has to connect to its external API.                                                                                                                                          |
| `tracking.ts`               | `sendTrackingInformation`                          | It uses the same endpoint as the `invoice` method, but sends different information. Tracking information can only be sent once the order was invoiced.                                                                 |

---

## Utils
This boilerplate uses some utils functions in order to have a cleaner code. 
> **NOTE!** It's important to pay attention that some of the utils functions are used with only one purpose: provide mocked data as the response bodies. **Those functions are not going to be used on a real integration.**

## GraphQL queries
### Get list of sellers
Returns the list of sellers that are registered on the account. Below you can find a query example and what it returns. 

> **NOTE!** This resolver was implemented so the developer can debug his application, to check whether registration of a seller worked or not.
```graphql
query {
  getSellerList{
    SellerId
    Name
    FulfillmentEndpoint
    CatalogSystemEndpoint
  }
}
```

```json
{
  "data": {
    "getSellerList": [
      {
        "SellerId": "externalsellertest",
        "Name": "External Seller Test",
        "FulfillmentEndpoint": "http://fabiana--pilateslovers.myvtex.com/my-seller",
        "CatalogSystemEndpoint": "http://fabiana--pilateslovers.myvtex.com/my-seller"
      }
    ]
  }
}
```

> It's important to know that there are other fields for each seller, you can check them out on the Documentation tab, on _GraphiQL_ or in the `schema.graphql`.

## GraphQL mutations
### Creating a seller
In order to create a seller, it's necessary to provide a body with all the mandatory information described on the schema. As a matter of simplifying this template application, we chose to keep the seller creation on a GraphQL mutation, so it can be set on the front-end, such as an admin panel. It would be possible to have it on the back-end, triggered by a set up button on the admin panel.

Example of mutation and its query variables:
```graphql
mutation ($seller: SellerInput){
  createSellerOnMarketplace(seller: $seller) {
    SellerId
    Name
    Email
    FulfillmentEndpoint
    CatalogSystemEndpoint
  }
}
```

```json
{
  "seller":  {
    "SellerId": "externalsellertest",
    "Email": "fabiana.fonseca@vtex.com.br",
    "Name": "External Seller Test",
    "FulfillmentEndpoint": "http://fabiana--appliancetheme.myvtex.com/my-seller",
    "CatalogSystemEndpoint": "http://fabiana--appliancetheme.myvtex.com/my-seller",
    "UseHybridPaymentOptions": false,
    "CSCIdentification": "externalsellertest",
    "ProductCommissionPercentage": 0,
    "FreightCommissionPercentage": 0
  }
}
```

> The fields that are on the query variables are the mandatory ones, but there are other fields, which you can check on the **Docs** tab, on the top right of GraphiQL.
