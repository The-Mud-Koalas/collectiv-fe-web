import { postRequest } from "@/lib/fetch";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const loginWithEmail = async (data: LoginFormFields) => {
  const { email, password } = data;
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

const signUpWithEmail = async (data: SignupFormFields) => {
  const { email, name, password } = data;
  const createdUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const idToken = await createdUser.user.getIdToken();
  let populatedUser: UserAttributes;

  try {
    populatedUser = await postRequest<UserPreferenceFields>({
      endpoint: "/user/update",
      token: idToken,
      body: {
        "full-name": name,
        "location-track": false, // Disallow location tracking, only when user says yes
        "preferred-radius": 10, // When first created, discovery radius set to 10 km
      },
    });
    return populatedUser;
  } catch (error) {
    await createdUser.user.delete();
    throw error;
  }
};

export { loginWithEmail, signUpWithEmail };
