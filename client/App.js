import { AuthProvider, useAuth } from "./features/context/AuthContext";
import { Navigation } from "./Navigation";
import { LoaderContextProvider } from "./features/context/loaderContext";

export default function App() {
  return (
    <AuthProvider>
      <LoaderContextProvider>
        <Navigation />
      </LoaderContextProvider>
    </AuthProvider>
  );
}

