const jwtKeys = {
  public_key: process.env.PUBLIC_KEY,
  private_key: process.env.PRIVATE_KEY,
};

const jwtOptions = {
  issuer: process.env.JWT_ISSUER_NAME,
  algorithm: process.env.JWT_ALGORITHM,
  accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIREIN,
};
const securitykey = process.env.ENCRYPTER_KEY;

export { jwtKeys, jwtOptions, securitykey };
