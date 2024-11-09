import { ClientSession } from "mongoose";
import isEmpty from "lodash/isEmpty";
import { UserRepository } from "../../../repositories/UserRepository";
import { IUser } from "../../../models/User";
import { NotFound, InternalServerError } from "../../../../errors";
import { UserMessages, HttpStatusCode } from "../../../../constants";

interface CreateDeps {
  userRepository: UserRepository;
}

// Create a new interface excluding
interface IUserRes
  extends Omit<IUser, "emailToken,salt,password,status,refreshToken"> {}
interface FetchUserResponse {
  code: number;
  message: string;
  data: IUserRes | null;
}

interface IUserBody {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cnic: string;
  mobile: string;
  address: string;
}

async function updateUser(
  body: IUserBody,
  { userRepository }: CreateDeps,
  session?: ClientSession | undefined
): Promise<FetchUserResponse> {
  const { id, firstName, lastName, email, cnic, mobile, address } = body;

  let user = await userRepository.findById(id, "");
  if (isEmpty(user)) {
    throw new NotFound(UserMessages.FAILED_TO_FIND_USER);
  }

  user.firstName = firstName ?? user.firstName;
  user.lastName = lastName ?? user.lastName;
  user.name = `${user.firstName || ""} ${user.lastName || ""}`;
  user.cnic = cnic || user.cnic;
  user.mobile = mobile || user.mobile;
  user.address = address || user.address;

  user = await userRepository.save(user, session);

  if (!user) {
    throw new InternalServerError(UserMessages.FAILED_TO_SAVE_USER);
  }

  const userRes = user.toUser();

  if (session) {
    await session.commitTransaction();
    session.endSession();
  }
  return {
    data: userRes,
    code: HttpStatusCode.OK,
    message: UserMessages.USER_UPDATED_SUCCESS,
  };
}

export { updateUser };
