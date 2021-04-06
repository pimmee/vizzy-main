import { useContext, useState, useEffect, MutableRefObject, useReducer, useRef } from 'react';

import { Query, QueryDocumentSnapshot, QuerySnapshot } from '@firebase/firestore-types';
import { compareDesc } from 'date-fns';

import FirebaseContext from './context';
import { CommunityComment, ProjectComment } from 'types/common';
import { Collection } from 'types/firebase';
import { UserMedia } from 'types/common';
import { UserProject, CommunityProject } from 'types/project';
import { User, UserNotification } from 'types/user';

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const useAuth = () => {
  const firebase = useFirebase();
  const [auth, setAuth] = useState({ uid: '' });

  useEffect(() => {
    const cancel = firebase.auth.onAuthStateChanged(auth => {
      auth && setAuth(auth);
    });
    return () => cancel();
  });

  return auth;
};

export const useCurrentUser = (): User | undefined => {
  const firebase = useFirebase();
  const auth = useAuth();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    let cancel = () => {};
    const cancel2 = () => {};
    if (auth.uid !== '') {
      cancel = firebase.user(auth.uid).onSnapshot(snapshot => {
        // cancel2 = firebase.customer(auth.uid).onSnapshot(stripeSnapshot => {
        // const customerData = stripeSnapshot.data();
        // const customerId = customerData ? customerData.customer_id : undefined;
        setUser({ ...snapshot.data(), id: auth.uid } as User);
      });
      // });
    }
    return () => {
      cancel();
      cancel2();
    };
  }, [auth, firebase]);

  return user;
};

export const useProjectComments = (projectId: string): CommunityComment[] => {
  const firebase = useFirebase();
  const auth = useAuth();
  const [comments, setComments] = useState<CommunityComment[]>([]);

  useEffect(() => {
    let cancel = () => {};
    try {
      cancel = firebase.db
        .collection(Collection.COMMENTS)
        .where('projectId', '==', projectId)
        .onSnapshot(comments => {
          const promises = comments.docs.map(async doc => {
            const data = doc.data();
            const userDoc = await firebase.user(data.userId).get(); // Fetch username
            const userData = userDoc.data();
            return {
              ...data,
              createdAt: data.createdAt.toDate(),
              updatedAt: data.updatedAt.toDate(),
              username: userData?.username || 'Anonymous',
              avatar: userData?.avatar,
            } as CommunityComment;
          });
          Promise.all(promises).then(comments => {
            setComments(comments);
          });
        });
    } catch (error) {
      setComments([]);
    }
    return () => cancel();
  }, [auth, firebase, projectId]);

  return comments;
};

export const useUserNotifications = (): UserNotification[] => {
  const firebase = useFirebase();
  const auth = useAuth();
  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  useEffect(() => {
    let cancel = () => {};
    if (auth?.uid) {
      try {
        cancel = firebase.db
          .collection(Collection.NOTIFICATIONS)
          .where('userId', '==', auth.uid)
          .onSnapshot(snapshot => {
            const promises = snapshot.docs.map(async doc => {
              const data = doc.data();

              return {
                ...data,
                createdAt: data.createdAt.toDate(),
              } as UserNotification;
            });
            Promise.all(promises).then(notifications => {
              setNotifications(notifications);
            });
          });
      } catch (error) {
        setNotifications([]);
      }
    }

    return () => cancel();
  }, [auth, firebase]);

  return notifications;
};

export const useLikedProjects = (): CommunityProject[] => {
  const firebase = useFirebase();
  const auth = useAuth();
  const user = useCurrentUser();
  const [projects, setProjects] = useState<CommunityProject[]>([]);

  useEffect(() => {
    let cancel = () => {};
    if (user?.likedProjects?.length) {
      try {
        cancel = firebase.db
          .collection(Collection.PROJECTS)
          .where('id', 'in', user.likedProjects)
          .onSnapshot(snapshot => {
            const projectsData = snapshot.docs.map(async doc => {
              const data = doc.data();
              const userDoc = await firebase.user(data.userId).get(); // Fetch username
              const userData = userDoc.data() as User;
              return {
                ...data,
                createdAt: data.createdAt.toDate(),
                lastEdited: data.lastEdited.toDate(),
                username: userData && userData.username ? userData.username : 'Anonymous',
                userAvatar: userData ? userData.avatar : '',
              } as CommunityProject;
            });
            Promise.all(projectsData).then(projects => {
              setProjects(projects);
            });
          });
      } catch (error) {
        setProjects([]);
      }
    }

    return () => cancel();
  }, [auth, firebase, user?.likedProjects]);

  return projects;
};

export const useUserImages = (): UserMedia[] => {
  const firebase = useFirebase();
  const authUser = useAuth();
  const [images, setImages] = useState<UserMedia[]>([]);

  useEffect(() => {
    const unsubscribe =
      authUser.uid !== ''
        ? firebase.userImages(authUser.uid).onSnapshot(snapshot => {
            const imageData = snapshot.docs
              .map(doc => doc.data())
              .sort((a, b) => compareDesc(a.date.toDate(), b.date.toDate())) as UserMedia[];
            setImages(imageData);
          })
        : () => null;

    return () => {
      unsubscribe();
    };
  }, [authUser, firebase]);

  return images;
};

export const useUserVideos = (): UserMedia[] => {
  const firebase = useFirebase();
  const authUser = useAuth();
  const [videos, setVideos] = useState<UserMedia[]>([]);

  useEffect(() => {
    const unsubscribe =
      authUser.uid !== ''
        ? firebase.userVideos(authUser.uid).onSnapshot(snapshot => {
            const videoData = snapshot.docs
              .map(doc => doc.data())
              .sort((a, b) => compareDesc(a.date.toDate(), b.date.toDate())) as UserMedia[];
            setVideos(videoData);
          })
        : () => null;

    return () => {
      unsubscribe();
    };
  }, [authUser, firebase]);

  return videos;
};

export const useUserAudio = (): UserMedia[] => {
  const firebase = useFirebase();
  const authUser = useAuth();
  const [audio, setAudio] = useState<UserMedia[]>([]);

  useEffect(() => {
    const unsubscribe =
      authUser.uid !== ''
        ? firebase.userAudio(authUser.uid).onSnapshot(snapshot => {
            const audioData = snapshot.docs
              .map(doc => doc.data())
              .sort((a, b) => compareDesc(a.date.toDate(), b.date.toDate())) as UserMedia[];
            setAudio(audioData);
          })
        : () => null;

    return () => {
      unsubscribe();
    };
  }, [authUser, firebase]);

  return audio;
};


export const useUserProjects = (): UserProject[] => {
  const firebase = useFirebase();
  const authUser = useAuth();
  const [projects, setProjects] = useState<UserProject[]>([]);

  useEffect(() => {
    const unsubscribe =
      authUser.uid !== ''
        ? firebase.userProjects(authUser.uid).onSnapshot(snapshot => {
            const projects = snapshot.docs.map(doc => {
              const data = doc.data();
              return {
                ...data,
                id: data.projectId,
                lastEdited: data.lastEdited.toDate(),
              } as UserProject;
            });
            const sortedProjects = projects.sort(
              (a, b) => b.lastEdited.getTime() - a.lastEdited.getTime()
            );
            setProjects(sortedProjects);
          })
        : () => null;

    return () => {
      unsubscribe();
    };
  }, [authUser, firebase]);

  return projects;
};

