import styles from './Tracklist.module.css';
import Track from '../Track/Track.jsx';

function Tracklist({selectedSongs, trackListText, trackListTextHandler, removeSongHandler}){
    return (
        <div id="trackListComponentWrapper">
            <input type="text" value={trackListText} onChange={trackListTextHandler} className={styles.trackListTextField} placeholder={selectedSongs.length !== 0 ? 'Enter a name for your playlist' : ''}></input>
            <section id="searchResults" className={styles.searchResults}>
                {
                    selectedSongs.map((song) => {
                        return (
                            <div className={styles.songEntry}>
                                <div className={styles.trackWrapper}>
                                    <Track result={song} index={song.id} />
                                </div>
                                <button className={styles.addButton} onClick={() => {removeSongHandler(song.id)}}>-</button>
                            </div>
                        );
                    })
                }        
            </section>
        </div>
    );
}

export default Tracklist;