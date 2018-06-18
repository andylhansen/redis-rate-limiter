var rateLimiter  = require('./rate-limiter');

module.exports = function(opts) {
  var limiter = rateLimiter(opts);
  return function(req, res, next) {
    limiter(req, function(err, rate) {
      if (err) {
        next();
      } else {
        if (rate.current > rate.limit) {
          res.sendStatus(429).send(opts.message || '');
          res.end();
        } else {
          next();
        }
      }
    });
  };
};
