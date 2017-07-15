import DeAsync from 'deasync'
export default class CloudFormationLogicalToPhysical {

    constructor(cloudformation, stack) {
        this.cloudformation = cloudformation
        this.stack = stack
    }

    resolve(logicalId) {
        let done = false
        let physicalId
        this.cloudformation.describeStackResource({
            StackName: this.stack,
            LogicalResourceId: logicalId
        }, (err, res) => {
            physicalId = res.StackResourceDetail.PhysicalResourceId 
            done = true
        })

        DeAsync.loopWhile( () => { return !done })
        return physicalId
    }

}