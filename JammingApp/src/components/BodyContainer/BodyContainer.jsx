import styles from './BodyContainer.module.css';
import SearchButton from '../SearchButton/SearchButton.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';
import Tracklist from '../Tracklist/Tracklist.jsx';
import LogInButton from '../LogInButton/LogInButton.jsx';

function BodyContainer(props){

    return (
        <section id="body-container" className={styles.bodyContainer}>
            <div className={styles.searchBarWrapper}>
                {props.isLoggedIn && <SearchBar searchText={props.searchText} searchEntryHandler={props.searchEntryHandler} enterKeyHandler={props.enterKeyHandler}/>}
            </div>
            <div id="searchButtonWrapper" className={styles.searchButtonWrapper}>
                {!props.isLoggedIn && <LogInButton onClickHandler={props.loginOnClickHandler} />}
                {props.isLoggedIn && <SearchButton onClickHandler={props.searchOnClickHandler} />}
            </div>
            {
                props.isLoggedIn &&
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
            }
        </section>
    );
}

export default BodyContainer;