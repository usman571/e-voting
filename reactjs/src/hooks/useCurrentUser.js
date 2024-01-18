import { useSelector } from "react-redux";

export function useCurrentUser() {
  return useSelector((state) => state.user.currentUser);
}

export function useCurrentAdmin() {
  return useSelector((state) => state.admin.currentAdmin);
}
