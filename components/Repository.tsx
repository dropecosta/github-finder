import React from "react";
import { GoStar as StarIcon } from "react-icons/go";
import { RepositoryInterface } from "../types/index";
import FavoriteButton from '@/components/FavoriteButton';

interface RepositoryListProps {
  data: RepositoryInterface;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ data }) => {

  return (<>
        <div className="carousel-item relative w-64 h-64 snap-start bg-zinc-800">
          <div className="flex justify-end z-20 absolute right-0 pr-2 pt-2">
            <FavoriteButton repositoryId={data?.name?.toString()} />
          </div>
          <a href={data.svn_url} rel="noopener noreferrer" target="_blank">
            <div className="h-full w-full aspect-video block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"></div>
            <div className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-30 z-10 font-bold text-gray-800 mb-2">
              <h3 className="text-white text-2xl underline py-2 px-3 mx-auto">{data?.name}</h3>
              <h3 className="text-white py-2 px-3 mx-auto">{data?.description}</h3>
              <h3 className="text-white py-2 px-3 mx-auto flex pt-o"><StarIcon /> stars: {data?.stargazers_count}</h3>
              <h3 className="text-white py-2 px-3 mx-auto">owner: {data?.owner?.login}</h3>
            </div>
          </a>
        </div>
  </>);
};

export default RepositoryList;