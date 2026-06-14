export function AuthCard({ title, buttonText, children, onSubmit }) {
  return (
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
      {title && (
        <h1 className="text-3xl font-semibold mb-6">
          {title}
        </h1>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {children}

        <button
          type="submit"
          className="w-full h-12 bg-[#0A66C2] rounded-full text-white font-medium hover:bg-[#004182]"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}