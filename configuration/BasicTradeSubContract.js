exports.dataTypes = [
  { 'dataType': "address", 'name': "signer", 'makerData': true },
  { 'dataType': "address", 'name': "signerToken", 'makerData': true },
  { 'dataType': "uint", 'name': "signerTokenCount", 'makerData': true },
  { 'dataType': "address", 'name': "buyer", 'makerData': true },
  { 'dataType': "address", 'name': "buyerToken", 'makerData': true },
  { 'dataType': "uint", 'name': "buyerTokenCount", 'makerData': true },
  { 'dataType': "uint", 'name': "toensToBuy"},
  { 'dataType': "signature", 'signatureFields': [0, 1, 2, 3, 4, 5]}
];

/*Issues with the ParadigmBank concept for signedTransfer.
*  a. If you give someone the details of for a signed transfer in plain text it will be vulnerable for manual draining.
*  b. Giving just the vrs the information can be determined from the parameters based on the api.
*  c. Perhaps add the contract address to the signature.
*
* */
