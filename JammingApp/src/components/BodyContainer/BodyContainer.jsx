import styles from './BodyContainer.module.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import SearchResults from '../SearchResults/SearchResults.jsx';

function BodyContainer(props){

    return (
        <section id="body-container" className={styles.bodyContainer}>
            <div className={styles.searchBarWrapper}>
                <SearchBar searchText={props.searchText} searchEntryHandler={props.searchEntryHandler} />
            </div>
            <SearchResults results={props.searchResults} />
        </section>
    );
}

export default BodyContainer;