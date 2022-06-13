import { FallbackProps } from 'react-error-boundary';

const ErrorMessage = ({ error }: FallbackProps) => {
  return (
    <div
      className="flex p-4 mb-4 text-sm text-red-700 dark:text-red-800 bg-red-100 dark:bg-red-200 rounded-lg"
      role="alert"
    >
      <svg
        className="inline shrink-0 mr-3 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="flex flex-col">
        <span className="font-medium">{error.name}: Something went wrong!</span>
        {error.message}
      </div>
    </div>
  );
};

export default ErrorMessage;
