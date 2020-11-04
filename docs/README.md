# [WIP] External Seller Example

## Routes
There are some route that need to be implemented on the seller integration, in order for the marketplace to be able to communicate with the external services from the seller. For each route, there is a handler that is responsible for using the External Seller client to establish the communication with the external API.

## Handlers


## Utils
This boilerplate uses some utils functions in order to have a cleaner code. 
> **NOTE!** It's important to pay attention that some of the utils functions are used with only one purpose: provide mocked data as the response bodies. **Those functions are not going to be used on a real integration.**

## GraphQL queries
### Get list of sellers
Returns the list of sellers that are registered on the account. Below you can find a query example and what it returns.
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

> It's importat to know that there are other fields for each seller, you can check them out on the Documentation tab, on _GraphiQL_ or in the `schema.graphql`.

## GraphQL mutations
### Creating a seller
In order to create a seller, it's necessary to provide a body with all the mandatory information described on the schema.

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
