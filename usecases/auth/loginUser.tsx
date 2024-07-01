import { ClientSession } from "mongoose";
const { isEmpty } = require("lodash");
import { UserRepository } from "../../repositories/UserRepository";
import { Conflict, BadRequest } from "../../errors";
import { GenericMessages, UserMessages } from "../../constants";

interface IUser {
  email: string;
  password: string;
}

interface LoginUserDeps {
  userRepository: UserRepository;
}

async function loginUser(
  body: IUser,
  { userRepository }: LoginUserDeps,
  session?: ClientSession | undefined
) {
  const { email, password } = body;

  let user = await userRepository.findByEmail(email);
  if (isEmpty(user)) {
    throw new Conflict(UserMessages.FAILED_TO_FIND_USER);
  }

  if (!user?.validatePassword(password)) {
    throw new BadRequest(GenericMessages.INVALID_EMAIL_OR_PASSWORD);
  }

  const tokens = user.generateTokens({});
  if (tokens && tokens.refreshToken) {
    user.refreshToken = tokens.refreshToken;
    user = await userRepository.save(user);
  } else {
    throw new Conflict(UserMessages.FAILED_TO_LOGIN_USER);
  }

  const userInfo = user?.toUserInfo();

  return { ...tokens, userInfo };
}
export { loginUser };
