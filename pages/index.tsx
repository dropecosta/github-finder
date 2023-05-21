import React, { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useRepository from "@/hooks/useRepository";
import Navbar from "@/components/Navbar";
import Repository from "@/components/Repository";
import Favorites from "@/components/Favorites";
import useFavorites from "@/hooks/useFavorites";

interface HomeProps {
  session: any;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Home: React.FC<HomeProps> = ({ session }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [repos, setRepos] = useState<any[]>([]);

  const { data: user } = useCurrentUser();
  const { data: repositories } = useRepository(selectedLanguage);
  const { data: favorites } = useFavorites();

  useEffect(() => {
    if (repositories && Array.isArray(repositories.items)) {
      setRepos(repositories.items);
    }
  }, [repositories]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement | null>(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    if (carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    if (carousel.current !== null) {
      maxScrollWidth.current =
        carousel.current.scrollWidth - carousel.current.offsetWidth;
    }
  }, []);

  return (
    <>
      <Navbar user={user} signOut={signOut} /> 

      <Favorites data={favorites} />

      <div className="ml-5 my-10">
        <h1>Top {selectedLanguage} Repositories:</h1>
        <div>
          <button
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={() => handleLanguageChange("css")}
          >
            CSS
          </button>
          <button
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={() => handleLanguageChange("javascript")}
          >
            JavaScript
          </button>
          <button
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={() => handleLanguageChange("typescript")}
          >
            TypeScript
          </button>
          <button
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={() => handleLanguageChange("go")}
          >
            Go
          </button>
        </div>

        <div className="carousel h-2 mx-auto">
          <h2 className="text-4xl leading-8 font-semibold mb-10 mt-6 text-white">
            Top repositories
          </h2>

          <div className="relative overflow-hidden">


            <div className="flex justify-between absolute top left w-full h-full">
              <button
                onClick={movePrev}
                className={`hover:bg-zinc-600 text-white w-10 h-full text-center opacity-75 hover:opacity-100 ${
                  currentIndex <= 0
                    ? "disabled:opacity-25 disabled:cursor-not-allowed"
                    : ""
                } z-10 p-0 m-0 transition-all ease-in-out duration-300`}
                disabled={currentIndex <= 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-20 -ml-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="sr-only">Prev</span>
              </button>
              <button
                onClick={moveNext}
                className={`hover:bg-zinc-600 text-white w-10 h-full text-center opacity-75 hover:opacity-100 ${
                  carousel.current !== null &&
                  carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
                    ? "disabled:opacity-25 disabled:cursor-not-allowed"
                    : ""
                } z-10 p-0 m-0 transition-all ease-in-out duration-300`}
                
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-20 -ml-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="sr-only">Next</span>
              </button>
            </div>

            <div
              ref={carousel}
              className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
            >
              {repos.map((repositories) => (
                <Repository key={repositories?.id} data={repositories} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
