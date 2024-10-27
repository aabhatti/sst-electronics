import { ClientSession } from "mongoose";
import { isEmpty } from "lodash";
import { UserRepository } from "../../../repositories/UserRepository";
import { User, IUser } from "../../../models/User";
import { Conflict, InternalServerError } from "../../../../errors";
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
  firstName: string;
  lastName: string;
  email: string;
  cnic: string;
  mobile: string;
  address: string;
}

async function createUser(
  body: IUserBody,
  { userRepository }: CreateDeps,
  session?: ClientSession | undefined
): Promise<FetchUserResponse> {
  const { firstName, lastName, email, cnic, mobile, address } = body;
  let user = await userRepository.findByEmail(email);
  if (!isEmpty(user)) {
    throw new Conflict(UserMessages.EMAIL_ALREADY_EXIST);
  }
  let creatingUser = new User({
    firstName: firstName,
    lastName: lastName,
    name: `${firstName || ""} ${lastName || ""}`,
    email: email,
    cnic: cnic || "",
    mobile: mobile || "",
    address: address || "",
  });

  let userCreation = await userRepository.save(creatingUser, session);

  if (!userCreation) {
    throw new InternalServerError(UserMessages.FAILED_TO_SAVE_USER);
  }

  const userRes = userCreation.toUser();

  if (session) {
    await session.commitTransaction();
    session.endSession();
  }
  return {
    data: userRes,
    code: HttpStatusCode.CREATED,
    message: UserMessages.REGISTER_ACCOUNT_SUCCESS,
  };
}

export { createUser };
