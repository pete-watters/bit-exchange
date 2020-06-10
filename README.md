## bit-exchange

This application allows users to visualise live crypto trades using the bitfinex API. 

It's built as a lightweight mobile first webapp. 


## Install
Clone this repo locally and run
```
npm install
```

## Run
Start in development mode with
```
npm start
```

## Build
To run the production version run 
```
npm build
```

## Tests
Some Jest unit tests are included. You can run the tests with
```
npm test
```

## Error boundary
I left a comment in `src/features/orderbook/OrderBook.js` that can be commented to test Error Boundary handling. 
I am an advocate of clean code, speaking for itself without comments however I thought this would help for demonstration purposes.