import { useEffect, useState } from 'react';
import { useAuth } from '../../shared/contexts/AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface LoginErrors {
  email?: string;
  password?: string;
  apiError?: string;
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const { authState, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.user) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const errorsToHandle: LoginErrors = {};
    if (!email) {
      errorsToHandle.email = 'Email is required';
    }
    if (!password) {
      errorsToHandle.password = 'Password is required';
    }
    setErrors(errorsToHandle);

    // If there are no errors, submit the form
    if (Object.keys(errorsToHandle).length === 0) {
      try {
        await login(email, password);
        navigate('/', { replace: true });
      } catch (error: any) {
        setErrors({ apiError: error.message });
        setPassword('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center text-2xl font-bold text-gray-700 dark:text-white">
        Login
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {errors.apiError && (
        <p className="mt-2 mb-2 text-sm text-red-600">{errors.apiError}</p>
      )}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
      </div>
      <div className="flex justify-start">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{' '}
          <Link
            to={'/register'}
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </div>
    </form>
  );
}
export default LoginForm;
