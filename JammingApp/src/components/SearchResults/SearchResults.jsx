import styles from './SearchResults.module.css';
import Track from '../Track/Track.jsx';

function SearchResults({results, addSongHandler}){
    return (
        <section id="searchResults" className={styles.searchResults}>
            {
                results.map((result) => {
                    return (
                        <div className={styles.songEntry}>
                            <div className={styles.trackWrapper}>
                                <Track result={result} index={result.id} />
                            </div>
                            <button className={styles.addButton} onClick={() => addSongHandler(result)}>+</button>
                        </div>
                    );
                })
            }        
        </section>
    );
}

export default SearchResults;