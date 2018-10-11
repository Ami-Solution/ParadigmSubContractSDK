#ParadigmSubContractSDK

###Installation

`npm i paradigm-subcontract-sdk`

###Usage

#####Creating a Paradigm SubContract

######Import the SubContract
`import "paradigm-subcontract-sdk/contracts/SubContract.sol";`

######Extend SubContract
```
contract YourContract is SubContract {

}
```

######Implement the required methods
```
//Optional, but suggest initializing with the arguments.
constructor(_makerArguments, _takerArguments) {
  makerArguments = _makerArguments;
  takerArguments = _takerArguments;
}

function participate(bytes32[] makerData, bytes32[) takerData) public returns (bool) {
    //Your Settlement implementation
    return true;
} 
```

#####Defining arguments
######The arguments are a JSON string that is of the structure:
```
[
  { 
    dataType: 'address', //The solidity data type the variable will be expected to 
    name:'maker' //The name of the key in the Paradigm Connect input
  },
  { dataType: 'uint', name: 'count' },
  { dataType: 'address', name: 'taker' }
]
```
######The arguments above would correspond to input in the following format
```
{
  maker: '0x01234abc',
  count: '2000',
  taker: '0x0321cba'
}
```



