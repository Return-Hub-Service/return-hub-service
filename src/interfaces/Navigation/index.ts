export interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface User {
  name: string;
  email: string;
  id: string;
}

export interface NavigationProps {
  isAuthenticated?: boolean;
  user?: User;
}
