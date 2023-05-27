import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

function MainNav() {
  const { authState,logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={'/'} className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Home
            </span>
          </Link>
          {authState.user && (
            <div className="flex items-center md:order-2">
              <Link
                to="/"
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={
                    authState.user
                      ? authState.data?.avatar
                      : 'https://png.pngtree.com/png-clipart/20190921/original/pngtree-user-avatar-boy-png-image_4693645.jpg'
                  }
                  alt="user photo"
                />
              </Link>

              <button
                type="button"
                className="text-white  hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ml-2 dark:hover:bg-gray-700  "
                onClick={handleSignOut}
              >
                Logout
              </button>

              <Link
                to="/"
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
              </Link>
            </div>
          )}

          {!authState.user && (
            <div className="flex items-center md:order-2">
              <Link
                to="/login"
                className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
              <p className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                {' / '}
              </p>
              <Link
                to="/register"
                className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default MainNav;
