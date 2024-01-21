const Loader = ({ isLoading }: { isLoading: boolean }) => {
    if (!isLoading) return null;
  return (
     <div className="fixed top-0 left-0 w-full h-full bg-opacity-100 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500"/>
    </div>
  );
};

export default Loader;
