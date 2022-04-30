import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { auth } from "../../firebase";

type AuthContextProps = {
  user: auth.User | null;
  isLoading: boolean;
  progress: number;
  signInHandler: (email: string, password: string) => void;
  signUpHandler: (username: string, email: string, password: string) => void;
  signOutHandler: () => void;
};

const AuthContext = createContext<Partial<AuthContextProps>>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState<auth.User>();

  const signInHandler = (email: string, password: string) => {
    auth
      .signInWithEmailAndPassword(auth.getAuth(), email, password)
      .then((userInfo) => {
        ToastAndroid.show("Login successful", ToastAndroid.SHORT);
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  const signUpHandler = (username: string, email: string, password: string) => {
    auth
      .createUserWithEmailAndPassword(auth.getAuth(), email, password)
      .then((userInfo) => {
        auth.updateProfile(auth.getAuth().currentUser, {
          displayName: username,
        });
        ToastAndroid.show("Register successful", ToastAndroid.SHORT);
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  const signOutHandler = () => auth.signOut(auth.getAuth());

  const fakeProgress = () => {
    const unsubscribe = setInterval(
      () => setProgress((prevProgress) => prevProgress + 0.3),
      500
    );

    return unsubscribe;
  };

  const onAuthStateChanged = () => {
    const unsubscribe = auth.onAuthStateChanged(auth.getAuth(), (userInfo) => {
      setIsLoading(false);
      setProgress(1);
      setUser(null);

      if (userInfo) {
        setUser(userInfo);
      }
    });

    return unsubscribe;
  };

  const providerValue = {
    user,
    isLoading,
    progress,
    signInHandler,
    signUpHandler,
    signOutHandler,
  };

  useEffect(() => {
    fakeProgress();
    onAuthStateChanged();
  }, []);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
