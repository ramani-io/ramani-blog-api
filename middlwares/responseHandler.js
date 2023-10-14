class ResponseHandler {
       static success(res, data, message = 'Success', statusCode = 200) {
         return res.status(statusCode).json({
           success: true,
           status: statusCode,
           message,
           data,
         });
       }
     
       static error(res, message = 'Internal Server Error', statusCode = 500) {
         return res.status(statusCode).json({
           success: false,
           status: statusCode,
           message,
         });
       }
     }
     
export default ResponseHandler;
     