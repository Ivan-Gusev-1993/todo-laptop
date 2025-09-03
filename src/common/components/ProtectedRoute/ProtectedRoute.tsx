import { Navigate, Outlet } from "react-router"
import { Path } from "@/common/routing"
import type { ReactNode } from "react"

type Props = {
  children?: ReactNode
  isAllowed: boolean
  redirectPath?: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath = Path.Login }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return children ?? <Outlet />
}
