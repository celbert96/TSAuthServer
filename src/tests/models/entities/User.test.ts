import assert from "assert";
import { User } from "../../../models/entities/User";
import { ValidationErrors } from "../../../models/ValidationErrors";

describe("User Entity Validation Tests", () => {
    /*** userName validation tests ***/
    it("Validate function returns a 422 when the username property is empty", () => {
        const u = new User();
        u.id = 1;
        u.userName = '';
        u.password = 'pass';
        u.email = 'email@email.com';


        const validationResult = u.validate();

        assert.equal(validationResult.httpStatus, 422);
    });
    it("Validation function returns a validation error of type ValidationErrors.MISSING_VALUE when the username property is empty", () => {
        const u = new User();
        u.id = 1;
        u.userName = '';
        u.password = 'pass';
        u.email = 'email@email.com';

        const validationResult = u.validate();
        const userValidationErrors = validationResult.data.userName;

        assert.equal(userValidationErrors.some(e => e.errorType === ValidationErrors.MISSING_VALUE), true);
    });
    it("Validate that 1 error is returned when username is empty", () => {
        const u = new User();
        u.id = 1;
        u.userName = '';
        u.password = 'pass';
        u.email = 'email@email.com';

        const validationResult = u.validate();
        const userValidationErrors = validationResult.data.userName;

        assert.equal(userValidationErrors.length, 1);
    });
    it("Validate function returns a 422 when the userName property is not alphanumeric", () => {
        const u = new User();
        u.id = 1;
        u.userName = 'chris!';
        u.password = 'pass';
        u.email = 'email@email.com';

        let validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris@';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris#';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris$';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris%';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris^';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris&';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris*';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris(';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris)';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris-';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris_';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris+';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris=';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris[';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris{';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris]';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris}';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris\\';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris|';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris;';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris:';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris\'';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris\"';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris,';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris<';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris.';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris>';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris/';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris?';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris~';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

        u.userName = 'chris`';
        validationResult = u.validate();
        assert.equal(validationResult.httpStatus, 422);

    });

    /** email validation tests */
    it("Validate function returns a 422 when the email property is empty", () => {
        const u = new User();
        u.id = 1;
        u.userName = 'celbert';
        u.password = 'password';
        u.email = '';

        const validationResult = u.validate();

        assert.equal(validationResult.httpStatus, 422);
    });
    it("Validate function returns a validation error of type ValidationErrors.MISSING_VALUE when the email property is empty", () => {
        const u = new User();
        u.id = 1;
        u.userName = 'celbert';
        u.password = 'password';
        u.email = '';

        const validationResult = u.validate();
        const emailValidationErrors = validationResult.data.email;

        assert.equal(emailValidationErrors.some(e => e.errorType === ValidationErrors.MISSING_VALUE), true);
    });
    it("Validate function returns a validation error of type ValidationErrors.INVALID_VALUE when the email property is set but not in a valid email format", () => {
        const u = new User();
        u.id = 1;
        u.userName = 'celbert';
        u.password = 'password';
        u.email = 'email';

        let validationResult = u.validate();
        let emailValidationErrors = validationResult.data.email;

        assert.equal(emailValidationErrors.some(e => e.errorType === ValidationErrors.INVALID_VALUE), true);

        u.email = 'email@';

        validationResult = u.validate();
        emailValidationErrors = validationResult.data.email;

        assert.equal(emailValidationErrors.some(e => e.errorType === ValidationErrors.INVALID_VALUE), true);

        u.email = 'email@!';

        validationResult = u.validate();
        emailValidationErrors = validationResult.data.email;

        assert.equal(emailValidationErrors.some(e => e.errorType === ValidationErrors.INVALID_VALUE), true);

        u.email = 'email@email';

        validationResult = u.validate();
        emailValidationErrors = validationResult.data.email;

        assert.equal(emailValidationErrors.some(e => e.errorType === ValidationErrors.INVALID_VALUE), true);

        u.email = 'email@email.';

        validationResult = u.validate();
        emailValidationErrors = validationResult.data.email;

        assert.equal(emailValidationErrors.some(e => e.errorType === ValidationErrors.INVALID_VALUE), true);

        u.email = 'email@email.c';

        validationResult = u.validate();
        emailValidationErrors = validationResult.data.email;

        assert.equal(emailValidationErrors.some(e => e.errorType === ValidationErrors.INVALID_VALUE), true);
    });
    it("Validate function returns one validation error when the email property is empty", () => {
        const u = new User();
        u.id = 1;
        u.userName = 'celbert';
        u.password = 'password';
        u.email = '';

        const validationResult = u.validate();
        const emailValidationErrors = validationResult.data.email;

        assert.equal(emailValidationErrors.length, 1);
    });

    /** password validation tests */
    it("Validate function returns a 422 when the password field is missing", () => {
        const u = new User();
        u.id = 1;
        u.userName = 'celbert';
        u.password = '';
        u.email = 'email@email.com';

        const validationResult = u.validate();

        assert.equal(validationResult.httpStatus, 422);

    });
    it("Validate function returns a validation error of type ValidationErrors.MISSING_VALUE when the password property is empty", () => {
        const u = new User();
        u.id = 1;
        u.userName = 'celbert';
        u.password = '';
        u.email = 'email@email.com';

        const validationResult = u.validate();
        const passwordValidationErrors = validationResult.data.password;

        assert.equal(passwordValidationErrors.some(e => e.errorType === ValidationErrors.MISSING_VALUE), true);
    });
    it("Validate function returns only 1 error when the password is empty", () => {
        const u = new User();
        u.id = 1;
        u.userName = 'user';
        u.password = '';
        u.email = 'email@email.com';

        const validationResult = u.validate();
        const userValidationErrors = validationResult.data.password;

        assert.equal(userValidationErrors.length, 1);
    });
    it("Validate function returns a 200 when the model is valid", () => {
        const u = new User();
        u.id = 1;
        u.userName = 'user';
        u.password = 'password';
        u.email = 'email@email.com';

        const validationResult = u.validate();

        assert.equal(validationResult.httpStatus, 200);
    });
});