import React, { useState } from 'react';
import PICTURES from './data/pictures';
import { useDynamicTransition } from './hooks';

const SECONDS = 1000;
const minimumDelay = 1000;
const minimumIncrement = 1;
function Gallery() {
	const [ delay, setDelay ] = useState(3 * SECONDS);
	const [ increment, setIncrement ] = useState(1);
	const index = useDynamicTransition(delay, increment, PICTURES.length);
	const updateDelay = (e) => {
		let delay = Number(e.target.value) * SECONDS;
		setDelay(delay < minimumDelay ? minimumDelay : delay);
	};
	const updateIncrement = (e) => {
		let increment = Number(e.target.value);
		setIncrement(increment < minimumIncrement ? minimumIncrement : increment);
	};

	return (
		<div className="Gallery">
			<img src={PICTURES[index].image} alt="Gallery" />
			<div className="multiform">
				<div>
					Gallery transition dely(seconds):
					<input type="number" onChange={updateDelay} />
				</div>
				<div>
					Gallery Increment:
					<input type="number" onChange={updateIncrement} />
				</div>
			</div>
		</div>
	);
}

export default Gallery;
