import styles from "./index.module.css";

export default function YoutubeEmbed({ videoId }) {
  const id = videoId.replace(/&.*/, "");
  /*replace "&" and all characters following */
  return (
    <section className={styles["youtube-section"]}>
      <h3>ملخص المباراة</h3>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      ></iframe>
    </section>
  );
}
