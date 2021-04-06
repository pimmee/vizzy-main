import FirebaseContext, { withFirebase } from './context';
import Firebase from './firebase';
import {
  useFirebase,
  useAuth,
  useCurrentUser,
  useUserAudio,
  useUserImages,
  useUserProjects,
} from './hooks';

export default Firebase;

export {
  FirebaseContext,
  useFirebase,
  useAuth,
  useCurrentUser,
  withFirebase,
  useUserAudio,
  useUserImages,
  useUserProjects,
};
