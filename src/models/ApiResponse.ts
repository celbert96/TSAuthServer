/**
 *  class ApiResponse
 *
 *  Class ApiResponse is used to standardize the HTTP response bodies which
 *  are sent to the user.
 *
 *  @property   {number}    httpStatus      - The HTTP Status Code of the response
 *  @property   {string}    description     - A description of the response
 *  @property   {T}         data            - The data to be included in the response
 *
 *  Example Usage:
 *
 *      -- Response with data property set --
 *
 *      const u = new User();
 *      const apiResponse = new ApiResponse<User>(201, 'User created successfully', u);
 *
 *      -- Response with no data property set --
 *      const apiResponse = new ApiResponse(200, 'Action was performed successfully');
 *
 */
export class ApiResponse<T>
{
    httpStatus: number;
    description: string;
    data: T;

    /**
     * Creates a new ApiResponse
     *
     * @constructor
     *
     * @param   {number}  httpStatus    The HTTP Status Code of the response
     * @param   {string}  description   A description of the response
     * @param   {T}       data          The data to be included in the response
     */
    constructor(httpStatus: number, description: string, data?: T) {
        this.httpStatus = httpStatus;
        this.description = description;
        this.data = data;
    }
}