import assert from "assert";
import { ValidationError } from "../../models/ValidationError";
import { ValidationErrors } from "../../models/ValidationErrors";

describe("ValidationError tests", () => {
    it("Test constructor with no additionalInfo value", () => {
        const propName = "testProp";
        const errorType = ValidationErrors.MISSING_VALUE;

        const validationErr = new ValidationError(propName, errorType);
        assert.equal(validationErr.propertyName, propName);
        assert.equal(validationErr.errorType, errorType);
        assert.equal(validationErr.errorMessage, "MISSING_VALUE");
        assert.equal(validationErr.additionalInfo, undefined);
    });
    it("Test constructor with additionalInfo value set", () => {
        const propName = "testProp";
        const errorType = ValidationErrors.MISSING_VALUE;
        const additionalInfo = "testing123";

        const validationErr = new ValidationError(propName, errorType, additionalInfo);
        assert.equal(validationErr.propertyName, propName);
        assert.equal(validationErr.errorType, errorType);
        assert.equal(validationErr.errorMessage, "MISSING_VALUE");
        assert.equal(validationErr.additionalInfo, additionalInfo);
    });
})