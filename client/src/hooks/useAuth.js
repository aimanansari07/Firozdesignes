import { useAuthContext } from '../context/AuthContext.jsx';

/** Convenience re-export so components can `import useAuth`. */
export function useAuth() {
  return useAuthContext();
}

export default useAuth;
