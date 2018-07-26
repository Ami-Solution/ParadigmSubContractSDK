exports.makerDataTypes = [
  { 'dataType': "address", 'name': "signer" },//0
  { 'dataType': "address", 'name': "signerToken" },//1
  { 'dataType': "uint", 'name': "signerTokenCount" },//2
  { 'dataType': "address", 'name': "buyer" },//3
  { 'dataType': "address", 'name': "buyerToken" },//4
  { 'dataType': "uint", 'name': "buyerTokenCount" },//5
  { 'dataType': 'signedTransfer', 'name': 'signerTransfer' },//7 -> 6 | 8 -> 7 | 9 -> 8 | 10 -> 9 | 11 -> 10 | 12 -> 11 -- recipient maxAmount v r s nonce
  { 'dataType': "signature", 'signatureFields': [0, 1, 2, 3, 4, 5]}//19 -> 12 | 20 -> 13 | 21 -> 14
];

exports.takerDataTypes = [
  { 'dataType': "uint", 'name': "tokensToBuy"},//6 -> 0
  { 'dataType': 'signedTransfer', 'name': 'buyerTransfer' },//13 -> 1 | 14 -> 2 | 15 -> 3 | 16 -> 4 | 17 -> 5 | 18 -> 6 | -- recipient maxAmount v r s nonce

];


/*Issues with the ParadigmBank concept for signedTransfer.
*  a. If you give someone the details of for a signed transfer in plain text it will be vulnerable for manual draining.
*  b. Giving just the vrs the information can be determined from the parameters based on the api.
*  c. Perhaps add the contract address to the signature.
* */
