exports.makerDataTypes = [
  {'dataType': "address", 'name': "orderMaker" }, // 0
  {'dataType': "address", 'name': "orderTaker" }, // 1
  {'dataType': "address", 'name': "orderMakerTokenAddress" }, // 2
  {'dataType': "address", 'name': "orderTakerTokenAddress" }, // 3
  {'dataType': "address", 'name': "orderFeeRecipient" }, // 4
  {'dataType': "uint", 'name': "orderMakerTokenAmount" }, // 5
  {'dataType': "uint", 'name': "orderTakerTokenAmount" }, // 6
  {'dataType': "uint", 'name': "orderMakerFee" }, // 7
  {'dataType': "uint", 'name': "orderTakerFee" }, // 8
  {'dataType': "uint", 'name': "orderExpirationUnixTimestampSec" }, // 9
  {'dataType': "uint", 'name': "orderSalt" }, // 10
  {'dataType': "uint8", 'name': "signatureV" }, // 13 -> 11
  {'dataType': "bytes32", 'name': "signatureR" }, // 14 -> 12
  {'dataType': "bytes32", 'name': "signatureS" }, // 15 -> 13
];

exports.takerDataTypes = [
  {'dataType': "uint", 'name': "tokensToTake" }, // 11 -> 0
  {'dataType': "bool", 'name': "throwOnError" }, // 12 -> 1
  {'dataType': "address", 'name': "makerTokenReceiver" } // 16 -> 2
];
