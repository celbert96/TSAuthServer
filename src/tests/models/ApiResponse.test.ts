import assert from "assert";
import { ApiResponse } from "../../models/ApiResponse";

describe("ApiResponse Model Tests", () => {
    it("Construct an ApiResponse with no data param", () => {
        const httpStatus: number = 200;
        const desc: string = 'Test';
        const apiResp = new ApiResponse(httpStatus, desc);
        assert.equal(apiResp.httpStatus, httpStatus, 'httpStatus successfully set');
        assert.equal(apiResp.description, desc, 'description successfully set');
        assert.equal(apiResp.data, undefined, 'data is undefined');
    });

    it("Construct an ApiResponse of type number", () => {
        const httpStatus: number = 200;
        const desc: string = 'Test';
        const data = 4;

        const apiResp = new ApiResponse<number>(httpStatus, desc, data);
        assert.equal(apiResp.httpStatus, httpStatus, 'httpStatus successfully set');
        assert.equal(apiResp.description, desc, 'description successfully set');
        assert.equal(apiResp.data, data, 'data successfully set');
    });

    it("Construct an ApiResponse of type CustomClass", () => {
        class CustomClass {
            testString: string = 'test';
            testNum: number = 7;
        };

        const httpStatus: number = 200;
        const desc: string = 'Test';
        const data = new CustomClass();

        const apiResp = new ApiResponse<CustomClass>(httpStatus, desc, data);
        assert.equal(apiResp.httpStatus, httpStatus, 'httpStatus successfully set');
        assert.equal(apiResp.description, desc, 'description successfully set');
        assert.equal(apiResp.data, data, 'data successfully set');
    });
})