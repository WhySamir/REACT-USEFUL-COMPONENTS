const ActionButton = ({
  children,
  color = "primary",
  type = "submit",
  loading = false,
  disabled = false,
  className = "",
  onClick,
}) => {
  // Spinner Component
  const Spinner = () => (
    <svg
      className="animate-spin h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      className={`flex justify-center w-fit items-center gap-2 py-2 sm:py-3 px-3 sm:px-4 rounded-lg shadow-md transition cursor-pointer text-sm sm:text-base whitespace-normal text-center disabled:opacity-50 disabled:cursor-not-allowed ${
        color === "primary"
          ? "bg-primary text-white hover:bg-primary/90"
          : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
      } ${className}`}
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading && <Spinner />}
      {loading ? "Loading..." : children}
    </button>
  );
};

export default ActionButton;
