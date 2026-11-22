import type { Access, FieldAccess } from 'payload'

export type Role = 'admin' | 'editor' | 'sales'

type U = { role?: Role | null } | null | undefined

export const hasRole =
  (...roles: Role[]) =>
  (user: U) =>
    Boolean(user?.role && roles.includes(user.role))

export const isAdmin: Access = ({ req }) => hasRole('admin')(req.user as U)
export const isEditorOrAdmin: Access = ({ req }) => hasRole('admin', 'editor')(req.user as U)
export const isSalesOrAdmin: Access = ({ req }) => hasRole('admin', 'sales')(req.user as U)
export const isLoggedIn: Access = ({ req }) => Boolean(req.user)
export const anyone: Access = () => true
export const adminFieldOnly: FieldAccess = ({ req }) => hasRole('admin')(req.user as U)
