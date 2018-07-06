exports.dataTypes = [
  ["address", "signer"],
  ["address", "signer's token"],
  ["uint", "signer's token count"],
  ["address", "buyer"],
  ["address", "buyer's token"],
  ["uint", "buyer's token count"],
  ["uint", "tokens to buy"],
  ["signature", [0, 1, 2, 3, 4, 5]]
];

/*Issues:
* 1. If does not work with the ParadigmBank concept for signedTransfer.
*  a. If you give someone the details of for a signed transfer in plain text it will be vulnerable for manual draining.
*  b. Giving just the vrs the information can be determined from the parameters based on the api.
*
*
* */
