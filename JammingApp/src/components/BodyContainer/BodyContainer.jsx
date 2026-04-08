import styles from './BodyContainer.module.css';
import SearchButton from '../SearchButton/SearchButton.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';
import Tracklist from '../Tracklist/Tracklist.jsx';

function BodyContainer(props){

    return (
        <section id="body-container" className={styles.bodyContainer}>
            <div className={styles.searchBarWrapper}>
                <SearchBar searchText={props.searchText} searchEntryHandler={props.searchEntryHandler} enterKeyHandler={props.enterKeyHandler}/>
            </div>
            <div id="searchButtonWrapper" className={styles.searchButtonWrapper}>
                <SearchButton onClickHandler={props.searchOnClickHandler} />
            </div>
            <div id="resultsAndTracklistWrapper" className={styles.resultsAndTrackListWrapper}>
                <div id="resultsWrapper" className={styles.resultsWrapper}>
                    <SearchResults results={props.searchResults} addSongHandler={props.addSongHandler} />
                </div>
                <div id="trackListWrapper" className={styles.trackListWrapper}>
                    <Tracklist 
                        selectedSongs={props.selectedSongs} 
                        trackListText={props.trackListText} 
                        trackListTextHandler={props.trackListTextHandler} 
                        removeSongHandler={props.removeSongHandler} 
                        addSpotifyHandler={props.addSpotifyHandler}
                        />
                </div>
            </div>
        </section>
    );
}

export default BodyContainer;