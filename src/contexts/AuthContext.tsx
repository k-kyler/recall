import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { auth } from "../../firebase";

type AuthContextProps = {
  user: auth.User | null;
  isLoading: boolean;
  signInHandler: (email: string, password: string) => void;
  signUpHandler: (username: string, email: string, password: string) => void;
  resetPasswordHandler: (email: string) => void;
  signOutHandler: () => void;
};

const AuthContext = createContext<Partial<AuthContextProps>>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
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

  const resetPasswordHandler = (email: string) => {
    auth
      .sendPasswordResetEmail(auth.getAuth(), email)
      .then((response) => {
        ToastAndroid.show("Recovery email is sent", ToastAndroid.SHORT);
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  const signOutHandler = () => {
    setUser(null);
    auth
      .signOut(auth.getAuth())
      .then((response) => {
        ToastAndroid.show("Logged out", ToastAndroid.SHORT);
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  const onAuthStateChanged = () => {
    const unsubscribe = auth.onAuthStateChanged(auth.getAuth(), (userInfo) => {
      setUser(null);
      setIsLoading(false);

      if (userInfo) {
        setUser(userInfo);
      }
    });

    return unsubscribe;
  };

  const providerValue = {
    user,
    isLoading,
    signInHandler,
    signUpHandler,
    resetPasswordHandler,
    signOutHandler,
  };

  useEffect(() => {
    onAuthStateChanged();
  }, []);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
