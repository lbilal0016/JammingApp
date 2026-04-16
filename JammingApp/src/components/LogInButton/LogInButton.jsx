import styles from './LogInButton.module.css';

function LogInButton({onClickHandler}){
    return <button className={styles.logInButton} onClick={onClickHandler}>Login to Spotify</button>;
}

export default LogInButton;