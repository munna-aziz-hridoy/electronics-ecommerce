const { StatusCodes, getReasonPhrase } = require("http-status-codes");

class Response {
  SUCCESS(res, data) {
    return res.status(StatusCodes.OK).send(data);
  }
  BAD_REQUEST(res, message) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message });
  }
  INTERNAL_SERVER_ERROR(res, error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      error,
    });
  }
  CREATED(res, data) {
    return res.status(StatusCodes.CREATED).send(data);
  }
  METHOD_NOT_ALLOWED(res, req) {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send({ message: `Method ${req.method} is not allowed` });
  }
  ALREADY_EXISTS(res) {
    return res
      .status(StatusCodes.CONFLICT)
      .send({ message: "Already exists, please try to update" });
  }
  NOT_FOUND(res) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: "No data available" });
  }
  FORBIDDEN(res) {
    return res.status(StatusCodes.FORBIDDEN).send({
      message: "Forbidden access",
    });
  }
}

export { Response };
