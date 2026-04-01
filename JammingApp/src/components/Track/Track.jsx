import styles from './Track.module.css';

function Track({result, index}){
    return (
        <section id={index} className={styles.track}>
            <h1>Song: {result.song}</h1>
            <h2>Artist: {result.artist}</h2>
            <p>Album: {result.album}</p>
            <p>Year: {result.year}</p>
        </section>
    );
}

export default Track;