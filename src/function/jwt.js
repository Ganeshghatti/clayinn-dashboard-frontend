import { getAccessToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";

export function DecodedToken() {
  const token = getAccessToken();
  return jwtDecode(token);
}
