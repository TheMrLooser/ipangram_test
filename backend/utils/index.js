const { validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    await validations.reduce(async (promise, validation) => {
      await promise;
      return validation.run(req);
    }, Promise.resolve());

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorsArray = errors.array();
    return res
      .status(404)
      .json({ error: true, message: errorsArray[0].msg, errorsArray });
  };
};

const wrapRequestHandler = (fn) => (req, res, next) =>
  fn(req, res, next).catch((e) => {
    console.log(e, "---error-catched");
    next();
  });

module.exports = { wrapRequestHandler, validate };
