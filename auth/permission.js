const jwt = require("jsonwebtoken");
const { createLog } = require("../app/src/modules/appLogs/appLog.service");
let userData = {};

// Middleware for ACL verification
const acl = async (req, res, next) => {
  try {
    const accessToken = req?.headers["authorization"]?.split(" ")[1];
    const refreshToken = req?.headers["refresh"];

    if (!accessToken) {
      if (refreshToken) {
        const decodedRefreshToken = await verifyRefreshToken(req, refreshToken);

        if (decodedRefreshToken) {
          const newAccessToken =
            await regenerateNewAccessToken(decodedRefreshToken);
          if (newAccessToken) {
            return res.status(200).send({
              token: newAccessToken,
              message: "New access token",
            });
          } else {
            return res
              .status(500)
              .send({ token: false, message: "Internal server error" });
          }
        } else {
          return res
            .status(403)
            .send({ token: false, message: "Invalid refresh token" });
        }
      }
      return res
        .status(401)
        .send({ token: false, message: "Access token missing" });
    }
    userData.infos = await getUserData(accessToken);

    const decodedAccessToken = await verifyAccessToken(req, accessToken);
    if (decodedAccessToken) {
      req.decoded = decodedAccessToken;
      next();
    } else {
      return res
        .status(401)
        .send({ token: false, message: "Invalid access token" });
    }
  } catch (error) {
    await createLog(error);
    return res
      .status(500)
      .send({ token: false, message: "Internal server error" });
  }
};

const verifyAccessToken = async (req, accessToken) => {
  try {
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );
    return decodedToken;
  } catch (error) {
    return null;
  }
};

const regenerateNewAccessToken = async (decodedRefreshToken) => {
  try {
    delete decodedRefreshToken.iat;
    delete decodedRefreshToken.exp;

    return jwt.sign(decodedRefreshToken, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = async (req, refreshToken) => {
  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    return decodedToken;
  } catch (error) {
    return null;
  }
};

const getUserData = async (token) => {
  try {
    const payloads = jwt.decode(token);
    return payloads;
  } catch (error) {
    await createLog(error);
  }
};

module.exports = { acl };
