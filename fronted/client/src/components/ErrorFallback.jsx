// components/ErrorFallback.jsx
import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    console.log("Error caught:", error);
  return (
    <div role="alert">
    <h2>Something went wrong!</h2>
    <pre>{error.message}</pre>
    <pre>{error.stack}</pre> {/* Optional: For detailed stack trace */}
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
  );
};

export default ErrorFallback;
