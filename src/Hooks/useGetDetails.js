import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APT_OPTIONS } from "../constant";

const useGetDetails = () => {
  const [details, setDetails] = useState({});
  const [video, setVideo] = useState(null);
  const { type, id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getVideo();
    getdetails();
  }, []);

  const getdetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}`,
      APT_OPTIONS
    );
    const json = await data.json();
    setDetails(json);
    // console.log(json);
  };

  const getVideo = async () => {
    setIsLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos`,
      APT_OPTIONS
    );
    const json = await data.json();

    const filterData = json?.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterData?.length ? filterData[0] : false;
    setVideo(trailer);
    setIsLoading(false);
  };

  return [details, video, isLoading];
};

export default useGetDetails;
