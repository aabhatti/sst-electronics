import { UserRepository } from "../../../repositories/UserRepository";
import { IUser } from "../../../models/User";
import { UserMessages, HttpStatusCode } from "../../../../constants";

interface FetchUsersDeps {
  userRepository: UserRepository;
}

interface FetchUserByIdResponse {
  code: number;
  message: string;
  data: IUser | null;
}

async function fetchUserById(
  userId: string,
  { userRepository }: FetchUsersDeps
): Promise<FetchUserByIdResponse> {
  const user = await userRepository.findById(userId);

  return {
    code: HttpStatusCode.OK,
    message: UserMessages.USERS_FETCHED_SUCCESS,
    data: user,
  };
}

export { fetchUserById };
