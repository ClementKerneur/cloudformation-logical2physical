//Import
import AWS from 'aws-sdk'
import CloudFormationLogicalToPhysical from './CloudFormationLogicalToPhysical.js'

//Setup
let CloudFormation = new AWS.CloudFormation();
let L2P = new CloudFormationLogicalToPhysical(CloudFormation, process.env.STACKNAME)

//Resolve Asynchronously an name (Recomended)
L2P.resolve(process.env.RESOURCELOGICALID, (err, res) => {
    console.log(res)
})

//Resolve Synchronously an name
console.log(L2P.resolve(process.env.RESOURCELOGICALID))
