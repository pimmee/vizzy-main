import { getWeek, getYear, isBefore } from 'date-fns';
import { nanoid } from 'nanoid';
import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

import { extractProjectMeta } from './utils';
import { DEFAULT_USER_VALUES } from 'constants/common';
import { _incrementProjectLike } from 'modules/project/actions';

import { showSnackbar } from 'modules/info/utils';
import { store } from '../storeProvider';
import { ProjectComment } from 'types/common';
import { Collection, ProjectOrderBy } from 'types/firebase';
import { CommunityProject, UserProject } from 'types/project';
import { User, UserNotifcationType } from 'types/user';

const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
};

let firebaseInstance: any = null;

function getFirebase() {
  if (typeof window !== 'undefined') {
    if (firebaseInstance) return firebaseInstance;
    firebaseInstance = app.initializeApp(config);
    return firebaseInstance;
  }

  return null;
}

export default class Firebase {
  private static _instance?: Firebase;
  storage: app.storage.Storage;
  auth: app.auth.Auth;
  db: app.firestore.Firestore;
  analytics?: app.analytics.Analytics;
  database: app.database.Database;
  facebookProvider: app.auth.FacebookAuthProvider;
  googleProvider: app.auth.GoogleAuthProvider;
  fieldValue: any; // typeof app.firestore.FieldValue;
  private hasCheckedAuth = false;

  private lastFetchedProject: any; //app.firestore.Query<app.firestore.DocumentData>;

  constructor() {
    this.auth = null as any;
    this.db = null as any;
    this.database = null as any;
    this.storage = null as any;
    console.log(process.env.GATSBY_FIREBASE_API_KEY);
    /* Social Sign In Method Provider */
    this.facebookProvider = null as any;
    this.googleProvider = null as any;
    this.lastFetchedProject = null as any;
    // const lazyApp = import('firebase/app');
    // const lazyDatabase = import('firebase/database');
    // const lazyFirestore = import('firebase/firestore');
    // const lazyAuth = import('firebase/auth');
    // const lazyStorage = import('firebase/storage');

    // Promise.all([
    //   lazyApp,
    //   lazyDatabase,
    //   lazyFirestore,
    //   lazyAuth,
    //   lazyStorage,
    // ]).then(([firebase]) => {
    console.log('heere');
    this.db = getFirebase().firestore();
    this.auth = getFirebase().auth();
    this.storage = getFirebase().storage();
    if (!isNode && process.env.NODE_ENV === 'production') {
      this.analytics = getFirebase().analytics();
    }
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.fieldValue = app.firestore.FieldValue;

    this.lastFetchedProject = this.db
      .collection(Collection.PROJECTS)
      .where('isCommunityProject', '==', true)
      .limit(3);
    // });
    console.log('db', this.db);
  }

  public static get Instance(): Firebase {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  user = (uid: string) => this.db.collection(Collection.USERS).doc(uid);

  users = () => this.db.collection(Collection.USERS).get();

  userAudio = (uid: string) => this.user(uid).collection(Collection.AUDIOS);

  userImages = (uid: string) => this.user(uid).collection(Collection.IMAGES);

  userVideos = (uid: string) => this.user(uid).collection(Collection.VIDEOS);

  userProjects = (uid: string) =>
    this.user(uid).collection(Collection.PROJECTS);

  userExports = (uid: string) => this.user(uid).collection(Collection.EXPORTS);

  customer = (uid: string) => this.db.collection(Collection.CUSTOMERS).doc(uid);

  project = (projectId: string) =>
    this.db.collection(Collection.PROJECTS).doc(projectId);

  comment = (commentId: string) =>
    this.db.collection(Collection.COMMENTS).doc(commentId);

  userNexus = (uid: string) => this.user(uid).collection(Collection.NEXUS);

  projectSubmissions = () => this.db.collection(Collection.WEEKLY_SUBMISSIONS);

  userSpectrumPresets = (uid: string) =>
    this.user(uid).collection(Collection.SPECTRUM_PRESETS);

  spectrumPresets = () => this.db.collection(Collection.SPECTRUM_PRESETS);

  setProjectDescription = (projectId: string, description: string) => {
    return this.db
      .collection(Collection.PROJECTS)
      .doc(projectId)
      .update({ description });
  };
  nexusTemplates = () =>
    this.db
      .collection(Collection.TEMPLATES)
      .doc(Collection.NEXUS)
      .collection(Collection.ELEMENTS);

  getCurrentUserData = async () => {
    const user = this.auth.currentUser;
    if (user) {
      const doc = await this.user(user.uid).get();
      if (doc.exists) {
        return doc.data();
      }
    }

    return null;
  };

  updateProfile = async (values: Record<string, any | string>) => {
    const user = this.auth.currentUser;
    if (user) {
      this.user(user.uid).update(values);
      if (values.email) {
        user.updateEmail(values.email as string);
      }
    }
  };

  getProject = async (projectId: string) => {
    const doc = await this.db
      .collection(Collection.PROJECTS)
      .doc(projectId)
      .get();
    if (doc.exists) {
      const project = doc.data();
      if (!project) return null;
      return {
        ...project,
        commits: project.commits
          ? project.commits.map((p: any) => ({
              ...p,
              forkedAt: p.forkedAt.toDate(),
            }))
          : [],
      };
    }

    return null;
  };

  getUserProjects = async () => {
    let projects: UserProject[] = [];
    const user = this.auth.currentUser;
    if (user) {
      const snapshot = await this.userProjects(user.uid).get();
      projects = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          ...data,
          lastEdited: data.lastEdited.toDate(),
        } as UserProject;
      });
    }
    return projects;
  };

  searchCommunityProjects = async (searchTerm: string) => {
    const snapshot = await this.db
      .collection(Collection.PROJECTS)
      // .orderBy('isCommunityProject', 'desc')
      .where('isCommunityProject', '==', true)
      .where(
        'searchTerms',
        'array-contains-any',
        searchTerm.toLowerCase().split(' ')
      )
      .get();
    const projects = snapshot.docs.map(async (doc: any) => {
      const data = doc.data();
      const userDoc = await this.user(data.userId).get(); // Fetch username
      const userData = userDoc.data() as User;
      return {
        ...extractProjectMeta(data),
        username:
          userData && userData.username ? userData.username : 'Anonymous',
        userAvatar: userData ? userData.avatar : '',
      } as CommunityProject;
    });
    return Promise.all(projects);
  };

  getCommunityProjects = (
    lastVisible?: any, //app.firestore.QueryDocumentSnapshot<app.firestore.DocumentData>,
    orderBy: ProjectOrderBy = ProjectOrderBy.POPULAR,
    limit = 9
  ): Promise<{
    projects: CommunityProject[];
    lastVisible: any; //app.firestore.QueryDocumentSnapshot<app.firestore.DocumentData>;
    hasMore: boolean;
  }> => {
    if (!lastVisible) {
      console.log('Fetching first chunk of projects...');
    }

    if (!Number.isInteger(limit) || limit < 1) {
      throw new Error('limit must be a positive integer');
    }

    console.log('ey', this.db);

    orderBy =
      orderBy === ProjectOrderBy.STAFF_PICK ? ProjectOrderBy.POPULAR : orderBy;
    const query = lastVisible
      ? this.db
          .collection(Collection.PROJECTS)
          .orderBy(orderBy, 'desc')
          .where('isCommunityProject', '==', true)
          .startAfter(lastVisible)
          .limit(limit)
      : this.db
          .collection(Collection.PROJECTS)
          .orderBy(orderBy, 'desc')
          .where('isCommunityProject', '==', true)
          .limit(limit);

    return new Promise((resolve, reject) => {
      query
        .get()
        .then(async (snapshot: any) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];

          const projects = snapshot.docs.map(async (doc: any) => {
            const data = doc.data();
            const userDoc = await this.user(data.userId).get(); // Fetch username
            const userData = userDoc.data() as User;
            return {
              ...extractProjectMeta(data),
              username:
                userData && userData.username ? userData.username : 'Anonymous',
              userAvatar: userData ? userData.avatar : '',
            } as CommunityProject;
          });
          const hasMore = projects.length === limit;
          resolve({
            projects: await Promise.all(projects),
            lastVisible,
            hasMore,
          });
        })
        .catch((error: any) => {
          console.error(error);
          reject(error);
        });
    });
  };

  getAllProjects = async () => {
    const snapshot = await this.db.collection(Collection.PROJECTS).get();
    const projects = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt.toDate(),
        lastEdited: data.lastEdited.toDate(),
      };
    });
    return projects;
  };

  submitTemplate = async (projectId: string, description = '') => {
    const user = this.auth.currentUser;

    if (user) {
      const project = this.project(projectId).get();
      if ((await project).exists) {
        const year = this.projectSubmissions().doc(`${getYear(new Date())}`);
        const week = year.collection(
          `${1 + getWeek(new Date(), { weekStartsOn: 1 })}`
        );
        const userDoc = await this.user(user.uid).get();
        const userData = userDoc.data();
        week.add({
          username: userData!.username || '',
          projectId,
          description,
          userId: user.uid,
        });
        showSnackbar(
          'You are now in the competition to win Project of the Week. Winner will be announced on this page!',
          'success'
        );
      } else {
        showSnackbar('Please enter a valid project id', 'warning');
      }
    } else {
      showSnackbar(`You are not signed in`, 'error');
    }
  };

  likeProject = async (projectId: string) => {
    const user = this.auth.currentUser;
    if (user) {
      const userDoc = await this.user(user.uid).get();
      const data = userDoc.data();
      if (
        data &&
        (!data.likedProjects || !data.likedProjects.includes(projectId))
      ) {
        this.user(user.uid).update({
          likedProjects: this.fieldValue.arrayUnion(projectId),
        });
        showSnackbar('Like!', 'success');
        store.dispatch(_incrementProjectLike(projectId));
      } else {
        showSnackbar('Project already liked!', 'info');
      }
      this.logEvent('like_project', { projectId });
    } else {
      showSnackbar('You must be logged in to like projects', 'info');
    }
  };

  increaseProjectClick = async (projectId: string) => {
    const user = this.auth.currentUser;
    if (user) {
      const projectDoc = this.project(projectId);
      const userDoc = await this.user(user.uid).get();
      if (userDoc) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { clickedProjects } = userDoc.data() as any;
        if (!clickedProjects || !clickedProjects.includes(projectId)) {
          this.user(user.uid).update({
            clickedProjects: this.fieldValue.arrayUnion(projectId),
          });
        }
      }
    }
  };

  getProjectComments = async (projectId: string) => {
    const user = this.auth.currentUser;
    if (user) {
      try {
        const projectDoc = await this.project(projectId).get();
        const data = projectDoc.data();
        if (data && data.comments) {
          const comments = await this.db
            .collection(Collection.COMMENTS)
            .where(app.firestore.FieldPath.documentId(), 'in', data.comments)
            .get();

          return comments;
        }
      } catch (err) {
        showSnackbar(err, 'error');
      }
    }
  };

  rateProjectComment = (commentId: string, amount = 1) => {
    const user = this.auth.currentUser;
    if (user) {
      this.comment(commentId).update({
        likes: this.fieldValue.increment(amount),
      });
      this.user(user.uid).update({
        likedComments: this.fieldValue.arrayUnion(commentId),
      });
    }
  };

  setHasSeenNotifications = async () => {
    const user = this.auth.currentUser;
    if (user) {
      const snapshot = await this.db
        .collection(Collection.NOTIFICATIONS)
        .where('userId', '==', user.uid)
        .where('status', '==', 'pending')
        .get();
      snapshot.docs.forEach((doc: any) => {
        doc.ref.update({
          status: 'done',
          updatedAt: new Date(),
        });
      });
    }
  };

  addProjectComment = async (
    projectId: string,
    text: string,
    parentId?: string
  ) => {
    const user = this.auth.currentUser;
    if (!user) {
      showSnackbar('You need to be signed in to comment', 'info');
      return;
    }

    if (!projectId) {
      showSnackbar('Invalid projectId: ' + projectId, 'warning');
      return;
    }

    if (!text) {
      showSnackbar('Empty comment', 'warning');
      return;
    }
    try {
      const userDoc = this.user(user.uid);
      const id = nanoid();

      userDoc.update({
        comments: this.fieldValue.arrayUnion(id),
      });
      this.comment(id).set({
        id,
        projectId,
        text,
        userId: user.uid,
        likes: [],
        dislikes: [],
        replies: [],
        parentId: parentId || '',
        createdAt: app.firestore.Timestamp.fromDate(new Date()),
        updatedAt: app.firestore.Timestamp.fromDate(new Date()),
      });
      if (parentId) {
        this.comment(parentId).update({
          replies: this.fieldValue.arrayUnion(id),
        });
      }
      showSnackbar('Added comment', 'success');
    } catch (err) {
      showSnackbar('Could not add comment: ' + err, 'warning');
    }
  };

  toggleProjectCommentDislike = async (commentId: string) => {
    const user = this.auth.currentUser;
    if (user) {
      this.user(user.uid)
        .get()
        .then((userDoc: any) => {
          const userData = userDoc.data();
          if (userData?.dislikedComments?.includes(commentId)) {
            userDoc.ref.update({
              dislikedComments: this.fieldValue.arrayRemove(commentId),
            });
            this.comment(commentId).update({
              dislikes: this.fieldValue.arrayRemove(user.uid),
            });
          } else {
            userDoc.ref.update({
              likedComments: this.fieldValue.arrayRemove(commentId),
              dislikedComments: this.fieldValue.arrayUnion(commentId),
            });
            this.comment(commentId).update({
              likes: this.fieldValue.arrayRemove(user.uid),
              dislikes: this.fieldValue.arrayUnion(user.uid),
            });
          }
        });
    }
  };

  toggleProjectCommentLike = async (commentId: string) => {
    const user = this.auth.currentUser;
    if (user) {
      this.user(user.uid)
        .get()
        .then((userDoc: any) => {
          const userData = userDoc.data();
          if (userData?.likedComments?.includes(commentId)) {
            userDoc.ref.update({
              likedComments: this.fieldValue.arrayRemove(commentId),
            });
            this.comment(commentId).update({
              likes: this.fieldValue.arrayRemove(user.uid),
            });
          } else if (userData) {
            userDoc.ref.update({
              likedComments: this.fieldValue.arrayUnion(commentId),
              dislikedComments: this.fieldValue.arrayRemove(commentId),
            });
            this.comment(commentId).update({
              likes: this.fieldValue.arrayUnion(user.uid),
              dislikes: this.fieldValue.arrayRemove(user.uid),
            });
          }
        });
    }
  };

  editProjectComment = async (comment: ProjectComment, newText: string) => {
    const user = this.auth.currentUser;
    if (user && user.uid === comment.userId) {
      this.comment(comment.id).update({
        text: newText,
        updatedAt: app.firestore.Timestamp.fromDate(new Date()),
      });
    }
  };

  removeProjectComment = async (commentId: string, projectId: string) => {
    const user = this.auth.currentUser;
    if (user) {
      const projectDoc = this.project(projectId);

      this.comment(commentId)
        .delete()
        .then(() => showSnackbar('Comment deleted', 'success'))
        .catch((err: string) => {
          showSnackbar('Could not delete comment ' + err, 'error');
        });
    }
  };

  async checkIsUserBanned(userId: string) {
    const userDoc = await this.user(userId).get();
    const bannedUntil = userDoc.data()?.bannedUntil;

    const isBanned = !!(
      bannedUntil &&
      bannedUntil.toDate() instanceof Date &&
      isBefore(new Date(), bannedUntil.toDate())
    );
    return {
      isBanned,
      message: bannedUntil
        ? `You are banned until ${bannedUntil.toDate().toDateString()}`
        : '',
    };
  }

  isMyProject = async (projectId: string): Promise<boolean> => {
    const user = this.auth.currentUser;
    if (user) {
      const doc = await this.user(user.uid)
        .collection(Collection.PROJECTS)
        .doc(projectId)
        .get();
      return doc.exists;
    }
    return false;
  };

  isAdminUser = async () => {
    const user = this.auth.currentUser;
    if (user) {
      const doc = await this.user(user.uid).get();
      const userData = doc.data();
      return userData ? !!userData.isAdmin : false;
    }
    return false;
  };

  getMyImages = async (): Promise<string[]> => {
    const userData = await this.getCurrentUserData();
    return userData ? userData.images : []; // holds urls to images in storage
  };

  async downloadFile(path: string) {
    return await fetch(path);
  }

  getStorageURL = (path: string): Promise<string> => {
    // Create a reference to the file we want to download
    return new Promise<string>((resolve, reject) => {
      const starsRef = this.storage.ref().child(path);

      // Get the download URL
      starsRef
        .getDownloadURL()
        .then(function (url: string) {
          resolve(url);
          // Insert url into an <img> tag to "download"
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch(function (error: any) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          // TODO snackbar / message for user
          reject();
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break;

            case 'storage/unauthorized':
              console.error('Not authorized');
              break;

            case 'storage/unknown':
              console.error('Unknown error');
              break;
          }
        });
    });
  };

  logEvent = (
    eventName: string,
    eventParams?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    },
    options?: any //app.analytics.AnalyticsCallOptions
  ) => {
    if (this.analytics) {
      this.analytics.logEvent(eventName, eventParams, options);
    }
  };

  deleteUserMedia = async (filename: string, collection: Collection) => {
    const user = this.auth.currentUser;
    if (!user) {
      return;
    }
    const ref = this.storage.ref(`${collection}/${user.uid}/${filename}`);

    // TODO: TEMPORARY ALPHA EXPORT NAME WITH .mp4 ENDING FIX
    let tempDeleteFirestoreFailed = false;
    let tempDeleteStorageFailed = false;
    const tempFixedExportId = filename + '.mp4';

    // Delete from storage
    ref
      .delete()
      .then(() => {
        console.log('File deleted successfully from storage.');
      })
      .catch((error: string) => {
        tempDeleteStorageFailed = true;
        console.error('Error deleting file from storage - ' + error);
      });
    // Delete from firestore
    const doc = this.user(user.uid).collection(collection).doc(filename);
    if ((await doc.get()).exists) {
      // temporary alpha check
      doc
        .delete()
        .then(() => {
          console.log('File deleted successfully from firestore.');
          showSnackbar('File was deleted successfully', 'success');
        })
        .catch((error: string) => {
          throw new Error('Error deleting file from firestore - ' + error);
        });
      // DELETE BELOW AFTER ALPHA---------------------------------------------------------------
    } else {
      tempDeleteFirestoreFailed = true;
    }

    if (tempDeleteStorageFailed) {
      // TODO: TEMPORARY ALPHA EXPORT NAME WITH .mp4 ENDING FIX
      console.log(
        'Storage delete failed. Trying with mp4 ending: ',
        tempFixedExportId
      );
      if (collection === Collection.EXPORTS) {
        const ref = this.storage.ref(
          `${collection}/${user.uid}/${tempFixedExportId}`
        );
        ref.delete().then(() => {
          console.log('File deleted successfully from storage.');
        });
      }
    }
    if (tempDeleteFirestoreFailed) {
      // TODO: TEMPORARY ALPHA EXPORT NAME WITH .mp4 ENDING FIX
      console.log(
        'Firestore delete failed. Trying with mp4 ending: ',
        tempFixedExportId
      );
      if (collection === Collection.EXPORTS) {
        this.user(user.uid)
          .collection(collection)
          .doc(tempFixedExportId)
          .delete()
          .then(() => {
            console.log(
              'File deleted successfully from firestore with mp4 ending.'
            );
            showSnackbar('File was deleted successfully', 'success');
          });
      }
    }
  };

  deleteProject = async (projectId: string) => {
    const user = this.auth.currentUser;
    if (!user) {
      return;
    }
    this.db.collection(Collection.PROJECTS).doc(projectId).delete();
    // Delete user project link
    this.user(user.uid)
      .collection(Collection.PROJECTS)
      .doc(projectId)
      .delete()
      .catch((error: string) => {
        throw new Error('Could not delete project from database - ' + error);
      });
  };

  uploadError = (id: string, data: any) => {
    this.db.collection('export-errors').doc(id).set(data);
  };

  _ADMIN_unpublishProject = (projectId: string, reason?: string) => {
    const user = this.auth.currentUser;
    if (user) {
      this.user(user.uid)
        .get()
        .then((doc: any) => {
          const data = doc.data();
          if (data?.isAdmin) {
            this.project(projectId)
              .get()
              .then((projectDoc: any) => {
                const project = projectDoc.data();
                if (project && project.userId) {
                  projectDoc.ref
                    .update({ isCommunityProject: false })
                    .then(() => {
                      showSnackbar('Project unublished', 'success');
                      this.db.collection(Collection.NOTIFICATIONS).add({
                        text: `Your project ${
                          project.name
                        } has been unpublished by an admin ${
                          reason ? reason : ''
                        }`,
                        status: 'pending',
                        type: UserNotifcationType.ADMIN_UNPUBLISH_PROJECT,
                        userId: project.userId,
                        projectId: project.id,
                        createdAt: new Date(),
                      });
                    })
                    .catch((err: any) => {
                      showSnackbar(err.toString(), 'error');
                    });
                }
              });
          }
        });
    }
  };
  _ADMIN_deleteProject = (projectId: string, reason?: string) => {
    const user = this.auth.currentUser;
    if (user) {
      this.user(user.uid)
        .get()
        .then((doc: any) => {
          const data = doc.data();
          if (data?.isAdmin) {
            this.project(projectId)
              .get()
              .then((projectDoc: any) => {
                const project = projectDoc.data();
                if (project && project.userId) {
                  projectDoc.ref
                    .update({ isCommunityProject: false })
                    .then(() => {
                      showSnackbar('Project unublished', 'success');
                      this.db.collection(Collection.NOTIFICATIONS).add({
                        text: `Your project ${
                          project.name
                        } has been deleted by an admin ${reason ? reason : ''}`,
                        status: 'pending',
                        type: UserNotifcationType.ADMIN_DELETE_PROJECT,
                        userId: project.userId,
                        projectId: project.id,
                        createdAt: new Date(),
                      });
                    })

                    .catch((err: any) => showSnackbar(err, 'error'));
                }
              });
          }
        });
    }
  };

  _ADMIN_banUser = (userToBan: string, daysToBan: number, reason?: string) => {
    const user = this.auth.currentUser;
    if (user) {
      this.user(user.uid)
        .get()
        .then((doc: any) => {
          const data = doc.data();
          if (data?.isAdmin) {
            this.db
              .collection(Collection.BANNED_USERS)
              .add({
                userId: userToBan,
                daysToBan,
                reason: `You've been banned for ${daysToBan} days ${
                  reason ? reason : ''
                }`,
                createdAt: new Date(),
              })

              .then(() => showSnackbar('User banned', 'success'))
              .catch((err: any) => showSnackbar(err.toString(), 'error'));
          }
        });
    }
  };

  // unpublishProject = (projectId: string) => {};

  /* Auth API */

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doFetchSignInMethodsForEmail = (email: string) =>
    this.auth.fetchSignInMethodsForEmail(email);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = async (email: string) => {
    return this.auth.sendPasswordResetEmail(email);
  };

  doPasswordUpdate = (password: string) => {
    const user = this.auth.currentUser;
    if (user) {
      user.updatePassword(password);
    }
  };

  doDeleteAccount = () => {
    const user = this.auth.currentUser;
    if (user) {
      user
        .delete()
        .then(() => showSnackbar('Account deleted', 'success'))
        .catch((err: string) => showSnackbar(err, 'error'));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAuthUserListener = (next: any, fallback: any) =>
    this.auth.onAuthStateChanged((user: any) => {
      this.hasCheckedAuth = true;
      if (user) {
        this.user(user.uid)
          .get()
          .then((doc: any) => {
            const data = doc.data();
            this.setDefaultUserValues(data);
            user.emailVerified ? next(user) : fallback();
          });
        this.user(user.uid).update({ updatedAt: new Date() });
      } else {
        fallback();
      }
    });

  setDefaultUserValues = (values: any) => {
    const missingValues: any = {};
    if (!values || values.credits === undefined) {
      missingValues.credits = DEFAULT_USER_VALUES.credits;
    }
    if (!values || values.showTour === undefined) {
      missingValues.showTour = DEFAULT_USER_VALUES.showTour;
    }
    if (!values || values.createdAt === undefined) {
      missingValues.createdAt = app.firestore.Timestamp.fromDate(new Date());
    }

    missingValues.lastEdited = app.firestore.Timestamp.fromDate(new Date());

    this.updateProfile(missingValues);
  };
}

const instance = new Firebase();
export { instance };
