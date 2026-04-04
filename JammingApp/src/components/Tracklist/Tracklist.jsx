import styles from './Tracklist.module.css';
import Track from '../Track/Track.jsx';

function Tracklist({selectedSongs, trackListText, trackListTextHandler}){
    return (
        <div id="trackListComponentWrapper">
            <input type="text" value={trackListText} onChange={trackListTextHandler} className={styles.trackListTextField}></input>
            <section id="searchResults" className={styles.searchResults}>
                {
                    selectedSongs.map((song) => {
                        return (
                            <div className={styles.songEntry}>
                                <div className={styles.trackWrapper}>
                                    <Track result={song} index={song.id} />
                                </div>
                                <button className={styles.addButton}>-</button>
                            </div>
                        );
                    })
                }        
            </section>
        </div>
    );
}

export default Tracklist;