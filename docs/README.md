# External Seller Example

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
