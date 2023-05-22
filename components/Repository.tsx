import React from "react";
import { GoStar as StarIcon, GoRepoForked as ForkIcon } from "react-icons/go";
import { RepositoryInterface } from "../types/index";

interface RepositoryListProps {
  data: RepositoryInterface;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ data }) => {
  return (<>
    <div className="carousel-item relative w-64 h-60 snap-start bg-zinc-800">
      <a className="h-full w-full aspect-video block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"></a>
      <a className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-30 z-10">
        <h3 className="text-white text-2xl underline py-2 px-3 mx-auto">{data?.name}</h3>
        <h3 className="text-white py-2 px-3 mx-auto">{data?.description}</h3>
        <h3 className="text-white py-2 px-3 mx-auto">stars: {data?.stargazers_count}</h3>
        <h3 className="text-white py-2 px-3 mx-auto">owner: {data?.owner?.login}</h3>
      </a>
    </div>
  </>);
};

export default RepositoryList;