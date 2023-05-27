import { useEffect, useState } from 'react';
import { useAuth } from '../../shared/contexts/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RegisterErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  api_error?: string;
}

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});
  const { authState, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.user) {
      navigate('/', { replace: true });
    }
  }, []);
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const errorsToHandle: RegisterErrors = {};
    if (!firstName) {
      errorsToHandle.first_name = 'First name is required';
    }
    if (!lastName) {
      errorsToHandle.last_name = 'Last name is required';
    }
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
        await register(firstName, lastName, email, password);
        navigate('/', { replace: true });
      } catch (error: any) {
        setErrors({ api_error: error.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center text-2xl font-bold text-gray-700 dark:text-white">
        Register
      </div>
      <div className="mb-6">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Mahmoud"
        />
        {errors.first_name && (
          <p className="mt-2 text-sm text-red-600">{errors.first_name}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="last_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ghonem"
        />
        {errors.last_name && (
          <p className="mt-2 text-sm text-red-600">{errors.last_name}</p>
        )}
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
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {errors.api_error && (
        <p className="mt-2 mb-2  text-sm text-red-600">{errors.api_error}</p>
      )}
      <div className="flex justify-end">
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create New Account
        </button>
      </div>
    </form>
  );
}
export default RegisterForm;
