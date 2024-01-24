import { AuthProvider } from "./AuthContext";
import { HomeNavigation, SignUpNavigation } from "./Navigation";

export default function App() {
  return (
    <AuthProvider>
      <SignUpNavigation />
    </AuthProvider>
  );
}

