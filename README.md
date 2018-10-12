# ParadigmSubContractSDK

### Installation

`npm i paradigm-subcontract-sdk`

### Usage

##### Creating a Paradigm SubContract

###### Import the SubContract
`import "paradigm-subcontract-sdk/contracts/SubContract.sol";`

###### Extend SubContract
```solidity
contract YourContract is SubContract {

}
```

###### Implement the required methods
```solidity
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

##### Defining arguments
###### The arguments are a JSON string that is of the structure:
Arguments are an ordered list where the array index in this json object correspond to the contracts bytes32 input. 
```
[
  { 
    dataType: 'address', //The solidity data type the variable will be expected to 
    name:'maker' //The name of the key in the Paradigm Connect input
  }, //0 of bytes32 input
  { dataType: 'uint', name: 'count' }, //1 of bytes32 input
  { dataType: 'address', name: 'taker' } //2 of bytes32 input
]
```
###### The arguments above would correspond to input in the following format
```
{
  maker: '0x01234abc',
  count: '2000',
  taker: '0x0321cba'
}
```
###### Typecasting solidity function input
Assuming the example arguments were defined as the makerArguments.  Usage of them in the solidity may look like:
```solidity
function participate(bytes32[] makerData, bytes32[) takerData) public returns (bool) {
    address maker = address(makerData[0]);
    uint count = uint(makerData[1]);
    address taker = address(makerData[2]);
    
    //Boolean values don't have a casting mechanism I'm aware of, but are represented as a 0  
    //or 1 when cast to a uint.  
    bool boolean = uint(takerData[0]) > 0
    
    return true;
} 
```
