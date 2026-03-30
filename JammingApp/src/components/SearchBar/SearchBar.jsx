import styles from './SearchBar.module.css';

function SearchBar(props){
    return (
        <section id="searchBar" className={styles.search}>
            <input type="text" value={props.searchText} onChange={props.searchEntryHandler} placeholder='Search a song from Spotify...'></input>
        </section>
    );
}

export default SearchBar;