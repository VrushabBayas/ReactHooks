import React, { useState } from 'react';
import Joke from './Joke';
import Stories from './Stories';
import Tasks from './Tasks';
import Gallery from './Gallery';
import Matrix from './Matrix';

function App () {
	const [ userQuery, setUserQuery ] = useState('');
	const [ showGallery, setShowGallery ] = useState(false);
	const updateUserQuery = (event) => {
		setUserQuery(event.target.value);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			searchQuery();
		}
	};

	const searchQuery = () => {
		window.open(`https://google.com/search?q=${userQuery}`, '_blank');
	};
	const toggleShowGallery = () => {
		setShowGallery(!showGallery);
	};

	return (
		<div className="App">
			<h1>Hello folks</h1>
			<div className="form">
				<input value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress} />
				<button onClick={searchQuery}>Search</button>
			</div>
			<hr />
			<div>
				{showGallery ? <Gallery /> : null}
				<button onClick={toggleShowGallery}>{showGallery ? ' HIDE ' : ' SHOW '} Gallery</button>
			</div>
			<hr />
			<Tasks />
			<hr />
			<Joke />
			<hr />
			<Stories />
			<hr />
			<Matrix />
		</div>
	);
}

export default App;
