import { formatDistanceToNow } from "https://esm.sh/date-fns@2.29.3";
import ru from "https://esm.sh/date-fns@2.29.3/locale/ru";

export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function formatDate(isoDate) {
  return formatDistanceToNow(new Date(isoDate), {
    addSuffix: true,
    locale: ru,
  });
}
