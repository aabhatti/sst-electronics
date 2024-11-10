import { UserRepository } from "../../../repositories/UserRepository";
import { IUser } from "../../../models/User";
import { UserMessages, HttpStatusCode } from "../../../../constants";

interface FetchUsersDeps {
  userRepository: UserRepository;
}

interface FetchUserByIdResponse {
  code: number;
  message: string;
  data: IUser[] | [];
}

async function fetchAllQueriedUsers(
  query: string,
  { userRepository }: FetchUsersDeps
): Promise<FetchUserByIdResponse> {
  query = query.trim();
  const condition = {
    $or: [
      { name: { $regex: query, $options: "i" } },
      { cnic: { $regex: query, $options: "i" } },
    ],
  };
  const users = await userRepository.find(condition, "_id id name email cnic");

  return {
    code: HttpStatusCode.OK,
    message: UserMessages.USERS_FETCHED_SUCCESS,
    data: users,
  };
}

export { fetchAllQueriedUsers };
