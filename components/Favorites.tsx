import React from "react";
import { GoStar as StarIcon } from "react-icons/go";
import { RepositoryInterface } from "../types/index";
import FavoriteButton from "./FavoriteButton";

interface FavoritesProps {
  data: RepositoryInterface;
  repos: any;
}

const Favorites: React.FC<FavoritesProps> = ({ data, repos }) => {
  return (<>
    <div key={data?.id} className="carousel-item relative w-64 h-60 snap-start bg-zinc-800 shadow-lg ml-1">
    <div className="flex justify-end z-20 absolute right-0 pr-2 pt-2">
      <FavoriteButton repositoryId={data.toString()} />
    </div>
      <a className="h-full w-full aspect-video block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"></a>
      <a className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-30 z-10 font-bold text-gray-800 mb-2">
        <h3 className="text-white text-2xl underline py-2 px-3 mx-auto">{data}</h3>
        <h3 className="text-white py-2 px-3 mx-auto">An adapter-based ORM for Node.js with support for mysql, mongo, postgres, mssql and more</h3>
        <h3 className="text-white py-2 px-3 mx-auto"><StarIcon />stars: 565</h3>
      </a>
    </div>
    </>);
};

export default Favorites