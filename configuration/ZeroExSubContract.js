exports.dataTypes = [
  { "address": "order.maker" },
  { "address": "order.taker" },
  { "address": "order.makerTokenAddress" },
  { "address": "order.takerTokenAddress" },
  { "address": "order.feeRecipient" },
  { "uint": "order.makerTokenAmount" },
  { "uint": "order.takerTokenAmount" },
  { "uint": "order.makerFee" },
  { "uint": "order.takerFee" },
  { "uint": "order.expirationUnixTimestampSec" },
  { "uint": "order.salt" },
  { "uint": "tokens to take" },
  { "bool": "throwOnError" },
  { "uint8": "Signature v" },
  { "bytes32": "Signature r" },
  { "bytes32": "Signature s" }
];
