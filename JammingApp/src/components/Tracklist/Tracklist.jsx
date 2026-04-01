import styles from './Tracklist.module.css';
import Track from '../Track/Track.jsx';

function Tracklist({results}){
    return (
        <section id="searchResults" className={styles.searchResults}>
            {
                results.map((result, index) => {
                    return (
                        <div className={styles.songEntry}>
                            <div className={styles.trackWrapper}>
                                <Track result={result} index={index} />
                            </div>
                            <button className={styles.addButton}>-</button>
                        </div>
                    );
                })
            }        
        </section>
    );
}

export default Tracklist;