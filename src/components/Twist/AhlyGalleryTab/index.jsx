import apis from "src/services/Twist";
import styles from "./index.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import GalleryAlbumCard from "../GalleryAlbumCard";
import { useState } from "react";
import GalleryAlbumDetails from "../GalleryAlbumDetails";
import CustomDropdown from "../shared/CustomDropdown";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Barloader from "react-spinners/BarLoader";
import Skeleton from "react-loading-skeleton";

const AlbumsListApiFn = (teamId) => apis.gallery.getGalleryList(teamId);
const AlbumDetailsApiFn = (albumId) => apis.gallery.getOneGallery(albumId);

function AhlyGalleryTab() {
  const { id } = useParams();
  const skeletonsArr = [...Array(6).keys()];
  const [filters, setFilters] = useState({ album: { id: "", name: "" } });

  const { data: galleryListData, isLoading: galleryListLoading } = useQuery({
    queryKey: ["gallery-list"],
    queryFn: () => AlbumsListApiFn(id),
  });

  const { data: albumDetails, isLoading: albumDetailsLoading } = useQuery({
    queryKey: ["album-details", filters.album.id],
    queryFn: () => AlbumDetailsApiFn(filters.album.id),
    enabled: !!filters.album.id,
  });

  if (galleryListLoading)
    return (
      <div className={styles["album-loader"]}>
        {skeletonsArr.map((skeleton) => (
          <Skeleton className={styles["skeleton"]} key={skeleton} />
        ))}
      </div>
    );

  if (filters.album.id) {
    return (
      <div className={styles["ahly-gallery-album"]}>
        {albumDetailsLoading ? (
          <Barloader
            className="my-2"
            color="var(--light-green)"
            height={8}
            width={150}
          />
        ) : (
          <>
            <div className={styles["controls"]}>
              <CustomDropdown
                data={galleryListData}
                dataID="id"
                dataName="name"
                name="album"
                width="auto"
                filters={filters}
                setFilters={setFilters}
              />
              <div
                className={styles["back-arrow"]}
                onClick={() => setFilters({ album: { id: "", name: "" } })}
              >
                <AiOutlineArrowLeft />
              </div>
            </div>
          </>
        )}
        <GalleryAlbumDetails
          albumDetails={albumDetails}
          isLoading={albumDetailsLoading}
        />
      </div>
    );
  }

  return (
    <div className={styles["ahly-gallery"]}>
      <h2>{"صور النادي الأهلي"}</h2>
      <div>
        {galleryListData.map((album) => (
          <div
            key={album.id}
            onClick={() =>
              setFilters({ album: { id: album.id, name: album.name } })
            }
            className={styles["album-card-wrapper"]}
          >
            <GalleryAlbumCard albumData={album} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AhlyGalleryTab;
