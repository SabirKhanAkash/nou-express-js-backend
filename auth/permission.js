const jwt = require("jsonwebtoken");
const { createLog } = require("../app/src/modules/appLogs/appLog.service");
let userData = {};

// Middleware for ACL verification
const acl = async (req, res, next) => {
  try {
    const accessToken = req?.headers["authorization"]?.split(" ")[1];
    const refreshToken = req?.headers["refresh"];
    // console.log("Access token OG: " + req?.headers["authorization"]);
    console.log("Access token: " + accessToken);
    console.log("Refresh token: " + refreshToken);

    if (!accessToken) {
      // console.log("Access token OG: " + req?.headers["authorization"]);
      if (refreshToken) {
        const decodedRefreshToken = await verifyRefreshToken(req, refreshToken);

        if (decodedRefreshToken) {
          const { newAccessToken, newRefreshToken } =
            await regenerateNewTokens(decodedRefreshToken);

          if (newAccessToken && newRefreshToken) {
            return res.status(200).send({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              message: "New access and refresh token",
            });
          } else {
            return res
              .status(500)
              .send({ status: "Failed", message: "Internal server error" });
          }
        } else {
          return res
            .status(403)
            .send({ status: "Failed", message: "Refresh token invalid" });
        }
      }
      return res
        .status(401)
        .send({ status: "Failed", message: "Access token missing" });
    }
    userData.infos = await getUserData(accessToken);

    const decodedAccessToken = await verifyAccessToken(req, accessToken);
    if (decodedAccessToken) {
      req.decoded = decodedAccessToken;
      next();
    } else {
      return res
        .status(401)
        .send({ status: "Failed", message: "Invalid access token" });
    }
  } catch (error) {
    await createLog(error);
    return res
      .status(500)
      .send({ status: "Failed", message: "Internal server error" });
  }
};

const verifyAccessToken = async (req, accessToken) => {
  try {
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    return decodedToken;
  } catch (error) {
    return null;
  }
};

const regenerateNewTokens = async (decodedRefreshToken) => {
  try {
    delete decodedRefreshToken.iat;
    delete decodedRefreshToken.exp;

    const newAccessToken = jwt.sign(
      decodedRefreshToken,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_LIFESPAN }
    );

    const newRefreshToken = jwt.sign(
      decodedRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_LIFESPAN }
    );

    return { newAccessToken, newRefreshToken };
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = async (req, refreshToken) => {
  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
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
