import {inherits} from 'util'
import NestedError from 'nested-error-stacks'

export function UnauthorizedError(nested) {
    NestedError.call(this, "", nested)
    this.status = 401
}
inherits(UnauthorizedError, NestedError)
UnauthorizedError.prototype.name = 'UnauthorizedError'