import { Navigation } from "./Navigation";
import { AuthProvider } from "./features/context/AuthContext";
import { SessionProvider } from "./features/context/SessionContext";
import { LoaderContextProvider } from "./features/context/LoaderContext";

export default function App() {
  return (
    <AuthProvider>
      <LoaderContextProvider>
        <SessionProvider>
          <Navigation />
        </SessionProvider>
      </LoaderContextProvider>
    </AuthProvider>
  );
}

