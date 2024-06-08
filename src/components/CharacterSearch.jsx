import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './CharacterSearch.css';

function CharacterSearch() {
    const [search, setSearch] = useState('');
    const [characters, setcharacters] = useState([]);
    const [page, setPage] = useState(1);

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setPage(1);
    }
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };
    const handleNextpage = () => {
        setPage((prevPage) => prevPage + 1);
    }
    useEffect(() => {
        const url = search.length === 0
            ? `https://api.jikan.moe/v4/characters?page=${page}&limit=15&order_by=favorites&sort=desc`
            : `https://api.jikan.moe/v4/characters?page=${page}&limit=15&q=${search}&order_by=favorites&sort=desc`;

        fetch(url)
            .then(response => response.json())
            .then(data => setcharacters(data.data))
            .catch(error => {
                console.error('Error fetching characters:', error);
                setcharacters([]);
            });
    }, [search, page]);

    return (
        <>
            <div className='search-container'>
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                    type='text'
                    value={search}
                    placeholder='Search characters...'
                    className='search-bar'
                    onChange={handleSearch}
                />
            </div>
            <div>
                {characters && characters.length > 0 ? (
                    <ul>
                        {characters.map((char) => (
                            <li>{char.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No characters found</p>
                )}
            </div>
            <span>
                {page > 1 && <button onClick={handlePreviousPage}>Back</button>}
                {characters && characters.length === 15 && <button onClick={handleNextpage}>Next</button>}
            </span>
        </>
    )
}

export default CharacterSearch
