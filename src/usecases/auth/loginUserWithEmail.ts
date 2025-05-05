import { ClientSession } from "mongoose";
import { UserRepository } from "../../repositories/UserRepository";
import { Conflict, BadRequest } from "../../../errors";
import { GenericMessages, UserMessages } from "../../../constants";

interface IUserResp {
  id: string;
  token: string | undefined;
  refreshToken: string | undefined;
  userInfo?: string | undefined;
}
interface LoginUserDeps {
  userRepository: UserRepository;
}

async function loginUserWithEmail(
  email: string,
  { userRepository }: LoginUserDeps,
  session?: ClientSession | undefined
): Promise<IUserResp | null> {
  let user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Conflict(UserMessages.FAILED_TO_FIND_USER);
  }

  const tokens = user.generateTokens({});
  if (tokens && tokens.refreshToken) {
    user.refreshToken = tokens.refreshToken;
    user = await userRepository.save(user);
  } else {
    throw new Conflict(UserMessages.FAILED_TO_LOGIN_USER);
  }

  const userInfo = user?.toUserInfo();

  return {
    ...tokens,
    userInfo,
    id: "",
  };
}
export { loginUserWithEmail };
