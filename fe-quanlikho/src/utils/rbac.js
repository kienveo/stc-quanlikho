import { getUser } from './auth';

export const ROLES = {
  Admin: 'Admin',
  Manager: 'Manager',
  Staff: 'Staff',
};

export function getCurrentRoles() {
  const user = getUser();
  if (!user) return [];
  // support both single role or array of roles
  return Array.isArray(user.role) ? user.role : [user.role];
}

export function hasRole(requiredRole) {
  const roles = getCurrentRoles();
  return roles.includes(requiredRole);
}

export function hasAnyRole(requiredRoles = []) {
  const roles = getCurrentRoles();
  return requiredRoles.some(r => roles.includes(r));
}
