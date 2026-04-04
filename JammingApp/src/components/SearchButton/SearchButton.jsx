import styles from './SearchButton.module.css';

function SearchButton({onClickHandler}){
    return <button className={styles.searchButton} onClick={onClickHandler}>Search</button>;
}

export default SearchButton;