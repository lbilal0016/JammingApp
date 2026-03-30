import styles from './SearchResults.module.css';

function SearchResults({results}){
    return (
        <section id="searchResults">
            {
                results.map((result, index) => {
                    return (
                        <div key={index}>
                            <h1>Song: {result.song}</h1>
                            <h2>Artist: {result.artist}</h2>
                            <p>Album: {result.album}</p>
                            <p>Year: {result.year}</p>
                        </div>
                    );
                })
            }        
        </section>
    );
}

export default SearchResults;