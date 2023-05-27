function AuthLayout(props: any) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        {props.children}
      </div>
    </div>
  );
}

export default AuthLayout;
