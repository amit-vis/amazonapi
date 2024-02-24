# roxile Back end Project

## About Project

Create an API that provides details about products on Amazon. The API should support pagination, allowing users to retrieve a specific page of results. Users should also be able to search for products based on their price, title, or description.

Additionally, include APIs for the following functionalities:

1. Retrieve details of sold products categorized by month.
2. Get product data within a specified price range.
3. Obtain information on total sold count and total sold amount.
4. Retrieve a list of products that have not been sold.
5. Provide a combined API that includes various data points.

## Installation
Install My Projects Using npm
```bash
    git clone https://github.com/amit-vis/amazonapi.git
    npm install
    cd amazonapi
```

## Running Test
To run tests, run the following command
```bash
    npm start
```

## Routes
    1. Initialize data from API: [get]: /initialize
    2. get Transactions: [get]: /transaction
    3. get statics data of TotalSaleAmount : [get]: /statics/total-sale-amount
    4. get statics data of TotalSoldItemCount: [get]: /statics/total-sold-item
    5. get statics data of TotalNotSoldItemCount: [get]: /statics/total-notsold-item
    6. get statics data of PriceRangeItem: [get]: /statics/price-range-data
    7. get statics data of CategoryData: [get]: /statics/category-data
    8. get combined data: [get]: /combine/combined-data

## Folder Structure
* config
    - mongoose.js
    - secure.js
* controllers
    - combined.js
    - home.js
    - statics.js
* models
    - product.js
* routes
    - index.js
    - combine.js
    - statics.js
- index.js
- .gitignore
- index.js
- package-lock.json
- package.json