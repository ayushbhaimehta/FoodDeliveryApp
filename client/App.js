import { Navigation } from "./Navigation";
import { AuthProvider } from "./features/context/AuthContext";
import { SessionProvider } from "./features/context/SessionContext";
import { LoaderContextProvider } from "./features/context/LoaderContext";

export default function App() {
  console.log(process.env.BASE_URL);
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

