import styles from './BodyContainer.module.css';
import SearchBar from '../SearchBar/SearchBar.jsx';

function BodyContainer(props){

    return (
        <section id="body-container" className={styles.bodyContainer}>
            <div className={styles.searchBarWrapper}>
                <SearchBar searchText={props.searchText} searchEntryHandler={props.searchEntryHandler} />
            </div>
        </section>
    );
}

export default BodyContainer;