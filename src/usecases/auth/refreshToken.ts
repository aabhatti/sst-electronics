import { UserRepository } from "../../repositories/UserRepository";
import { Conflict } from "../../../errors";
import { UserMessages } from "../../../constants";
import { IJwtPayload } from "@/utils/interfaces";

interface IUserResp {
  id: string;
  token: string | undefined;
  refreshToken: string | undefined;
}
interface LoginUserDeps {
  userRepository: UserRepository;
}

async function refreshToken(
  jwt: IJwtPayload,
  { userRepository }: LoginUserDeps
): Promise<IUserResp | null> {
  let user = await userRepository.findById(jwt.id);
  if (!user) {
    throw new Conflict(UserMessages.FAILED_TO_FIND_USER);
  }

  const tokens = user.generateTokens({ expiredAt: jwt.expiredAt || "" });
  return { ...tokens, id: jwt.id || "" };
}
export { refreshToken };
