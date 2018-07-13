exports.dataTypes = [
  {'dataType': "address", 'name': "orderMaker", 'makerData': true },
  {'dataType': "address", 'name': "orderTaker", 'makerData': true },
  {'dataType': "address", 'name': "orderMakerTokenAddress", 'makerData': true },
  {'dataType': "address", 'name': "orderTakerTokenAddress", 'makerData': true },
  {'dataType': "address", 'name': "orderFeeRecipient", 'makerData': true },
  {'dataType': "uint", 'name': "orderMakerTokenAmount", 'makerData': true },
  {'dataType': "uint", 'name': "orderTakerTokenAmount", 'makerData': true },
  {'dataType': "uint", 'name': "orderMakerFee", 'makerData': true },
  {'dataType': "uint", 'name': "orderTakerFee", 'makerData': true },
  {'dataType': "uint", 'name': "orderExpirationUnixTimestampSec", 'makerData': true },
  {'dataType': "uint", 'name': "orderSalt", 'makerData': true },
  {'dataType': "uint8", 'name': "signatureV", 'makerData': true },
  {'dataType': "bytes32", 'name': "signatureR", 'makerData': true },
  {'dataType': "bytes32", 'name': "signatureS", 'makerData': true },
  {'dataType': "uint", 'name': "tokensToTake" },
  {'dataType': "bool", 'name': "throwOnError" },
  {'dataType': "address", 'name': "makerTokenReceiver" }
];
