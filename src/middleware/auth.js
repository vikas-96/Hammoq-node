import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Not Authorized to access this resource!",
    });
  }

  const [Bearer, token] = req.headers.authorization.split(" ");

  if (!Bearer || Bearer !== "Bearer") {
    return res.status(401).json({
      message: "Not Authorized to access this resource!",
    });
  }

  if (!token) {
    return res.status(401).json({
      message: "Not Authorized to access this resource!",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "please provide a valid token ,your token might be expired",
        });
      }
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
