import DeAsync from 'deasync'
import Async from 'async'
export default class CloudFormationLogicalToPhysical {

    constructor(cloudformation, stack) {
        this.cloudformation = cloudformation
        this.stack = stack
    }

    resolve(logicalId, end) {
        let done = false
        let physicalId = null

        Async.whilst(
            () => { return !physicalId },
            (callback) => {

                this.cloudformation.describeStackResource({
                    StackName: this.stack,
                    LogicalResourceId: logicalId
                }, (err, res) => {
                    if(err && err.code == 'Throttling')  {
                        setTimeout( callback, 1000 )
                    }
                    else {
                        if(err) { callback(err); return; }

                        physicalId = res.StackResourceDetail.PhysicalResourceId
                        done = true
                        callback(null, physicalId)
                    }
                })

            },
            (err, n) => {
                if(err) throw err

                if(typeof end == 'function') {
                    end(null, physicalId)
                }
            }
        )

        if(typeof end == 'undefined') {
            DeAsync.loopWhile( () => { return !done })
            return physicalId
        }
    }

}
