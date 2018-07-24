exports.dataTypes = [
  { 'dataType': "address", 'name': "signer", 'makerData': true },//0
  { 'dataType': "address", 'name': "signerToken", 'makerData': true },//1
  { 'dataType': "uint", 'name': "signerTokenCount", 'makerData': true },//2
  { 'dataType': "address", 'name': "buyer", 'makerData': true },//3
  { 'dataType': "address", 'name': "buyerToken", 'makerData': true },//4
  { 'dataType': "uint", 'name': "buyerTokenCount", 'makerData': true },//5
  { 'dataType': "uint", 'name': "tokensToBuy"},//6
  { 'dataType': 'signedTransfer', 'name': 'signerTransfer', 'makerData': true },//7 8 9 10 11 12 -- recipient maxAmount v r s nonce
  { 'dataType': 'signedTransfer', 'name': 'buyerTransfer' },//13 14 15 16 17 18 -- recipient maxAmount v r s nonce
  { 'dataType': "signature", 'signatureFields': [0, 1, 2, 3, 4, 5]}//19 20 21
];

/*Issues with the ParadigmBank concept for signedTransfer.
*  a. If you give someone the details of for a signed transfer in plain text it will be vulnerable for manual draining.
*  b. Giving just the vrs the information can be determined from the parameters based on the api.
*  c. Perhaps add the contract address to the signature.
* */
