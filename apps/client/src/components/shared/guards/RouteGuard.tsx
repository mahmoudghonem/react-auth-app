import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/AuthContext';

export default function PrivateRoute(props: any) {
  const { authState } = useAuth();
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props: any) =>
        !authState.user ? (
          <Navigate replace to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
