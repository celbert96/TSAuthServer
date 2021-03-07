/**
 *  class ValidationError
 *
 *  Class ValidationError is used to relay model validation errors back to the user.
 *
 *  Example Usage:
 *
 *  const err = new ValidationError('username', 'Field is required, no value found');
 *  return res.status(400).body(new ApiResponse<ValidationError>(400, 'Invalid input', err));
 *
 *
 */

import { ValidationErrors } from "./ValidationErrors";

export class ValidationError {
    propertyName: string;
    errorType: ValidationErrors;
    errorMessage: string;
    additionalInfo: string;

    constructor(propertyName: string, errorType: ValidationErrors, additionalInfo?: string) {
        this.propertyName = propertyName;
        this.errorType = errorType;
        this.errorMessage = ValidationErrors[errorType];
        this.additionalInfo = additionalInfo;
    }
}