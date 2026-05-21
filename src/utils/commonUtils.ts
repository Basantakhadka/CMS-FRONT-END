import { PERMISSION_KEY } from "../constants";
import { getLocalStorage } from "./storageUtils";

export const hasPermission = (key: string): boolean => {
  const permissions =getLocalStorage(PERMISSION_KEY)|| []
  console.log({permissions})

 return permissions.includes(key);
};