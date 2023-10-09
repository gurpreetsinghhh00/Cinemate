import ShimmerCard from "./ShimmerCard";

const Shimmer = () => {
  return (
    <div className="w-full sm:p-2 mt-6 min-h-screen">
      <div className="w-full grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-pulse">
        {Array(10)
          .fill("")
          .map((_, index) => (
            <ShimmerCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default Shimmer;
