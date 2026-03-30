import styles from './Header.module.css';

function Header(){
    return (
        <section id="header" className={styles.header}>
            <h1>Ja<div className={styles.styledms}>mmm</div>ing</h1>
        </section>
    );
}

export default Header;