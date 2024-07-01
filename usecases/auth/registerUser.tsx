import { ClientSession } from "mongoose";
const { isEmpty } = require("lodash");
import { UserRepository } from "../../repositories/UserRepository";
import { IUser, User } from "../../models/User";
import { Conflict, InternalServerError } from "../../errors";
import { UserMessages, HttpStatusCode } from "../../constants";

interface RegisterUserDeps {
  userRepository: UserRepository;
}

async function registerUser(
  body: IUser,
  { userRepository }: RegisterUserDeps,
  session?: ClientSession | undefined
) {
  const { email } = body;

  let user = await userRepository.findByEmail(email);
  if (!isEmpty(user)) {
    throw new Conflict(UserMessages.EMAIL_ALREADY_EXIST);
  }
  let creatingUser = new User({
    firstName: body?.firstName,
    lastName: body?.lastName,
    email: body.email,
  });

  if (body.password) creatingUser.setPassword(body.password);

  let userCreation = await userRepository.save(creatingUser, session);

  if (!userCreation) {
    throw new InternalServerError(UserMessages.FAILED_TO_SAVE_USER);
  }

  const userInfo = userCreation.toUserInfo();

  if (session) {
    await session.commitTransaction();
    session.endSession();
  }
  return {
    userInfo,
    code: HttpStatusCode.CREATED,
    message: UserMessages.REGISTER_ACCOUNT_SUCCESS,
  };
}

export { registerUser };
