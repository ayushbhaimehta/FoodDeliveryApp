import { AuthProvider, useAuth } from "./features/context/AuthContext";
import { HomeNavigation, SignUpNavigation } from "./Navigation";
import { LoaderContextProvider } from "./features/context/loaderContext";

export default function App() {
  const { user } = useAuth()
  return (
    <AuthProvider>
      <LoaderContextProvider>
        {user ? <HomeNavigation /> : <SignUpNavigation />}
      </LoaderContextProvider>
    </AuthProvider>
  );
}

