import assert from "assert";
import {Role} from "../../../models/entities/Role";
import {ValidationErrors} from "../../../models/ValidationErrors";

describe("Role Entity Validation Tests", () => {
    it("Validate function returns 422 when roleName is empty", () => {
        const role = new Role();
        role.id = 1;
        role.roleName = '';
        role.description = '';

        const validationResult = role.validate();

        assert.equal(validationResult.httpStatus, 422);
    });
    it("Validate function returns 1 error when roleName is empty", () => {
        const role = new Role();
        role.id = 1;
        role.roleName = '';
        role.description = '';

        const validationResult = role.validate();
        const roleNameValidationErrors = validationResult.data.get('roleName');

        assert.equal(roleNameValidationErrors.length, 1);
    });
    it("Validate function returns a validation error of type ValidationErrors.MISSING_VALUE when the roleName property is empty", () => {
        const role = new Role();
        role.id = 1;
        role.roleName = '';
        role.description = '';

        const validationResult = role.validate();
        const roleNameValidationErrors = validationResult.data.get('roleName');

        assert.equal(roleNameValidationErrors.some(e => e.errorType === ValidationErrors.MISSING_VALUE), true);
    });
    it("Validate function returns a 422 when the roleName is set but is not a valid role name", () => {
        const role = new Role();
        role.id = 1;
        role.roleName = 'not a valid role';
        role.description = '';

        const validationResult = role.validate();

        assert.equal(validationResult.httpStatus, 422);
    });
    it("Validate function returns 1 error when roleName is set but is not a valid role name", () => {
        const role = new Role();
        role.id = 1;
        role.roleName = 'not a valid role';
        role.description = '';

        const validationResult = role.validate();
        const roleNameValidationErrors = validationResult.data.get('roleName');

        assert.equal(roleNameValidationErrors.length, 1);
    });
    it("Validate function returns a validation error of type ValidationErrors.INVALID_VALUE when the roleName property is set but not a valid role name", () => {
        const role = new Role();
        role.id = 1;
        role.roleName = 'not a valid role';
        role.description = '';

        const validationResult = role.validate();
        const roleNameValidationErrors = validationResult.data.get('roleName');

        assert.equal(roleNameValidationErrors.some(e => e.errorType === ValidationErrors.INVALID_VALUE), true);
    });
    it("Validate function returns a 200 when the roleName is valid", () => {
        const role = new Role();
        role.id = 1;
        role.roleName = 'USER_STANDARD';
        role.description = '';

        const validationResult = role.validate();

        assert.equal(validationResult.httpStatus, 200);
    });
});