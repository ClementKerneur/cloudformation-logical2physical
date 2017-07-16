# Description

Resolve easily the Physical Resource Id with the Cloud Formation Logical Resource Id.

# Install

``` shell
$ npm i --save cloudformation-logical2physical
```

# Usage

``` javascript
//Import
var CloudformationLogical2Physical = require('cloudformation-logical2physical')
var AWS = require('aws-sdk')

//Setup
var CloudFormation = new AWS.CloudFormation();
var L2P = new CloudformationLogical2Physical(CloudFormation, '<<STACK NAME>>')

//Resolve Synchronously an name
console.log(L2P.resolve('LogicalNameOfMyResource'))
```