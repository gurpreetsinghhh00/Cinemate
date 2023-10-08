import { Link } from "react-router-dom";
import ListCard from "./ListCard";

const List = ({ heading, data, type }) => {
  return (
    <div className="px-2">
      <span className="py-2 px-3 rounded-full font-bold bg-red-600 text-white text-lg md:text-2xl font-nunito">
        {heading}
      </span>
      <div className="py-4 flex overflow-x-scroll scrollbar-none mt-2">
        <div className="flex gap-4 px-2">
          {data?.map((item) => {
            return (
              <Link key={item.id} to={`/details/${type}/${item.id}`}>
                <ListCard name={item.name} {...item} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
