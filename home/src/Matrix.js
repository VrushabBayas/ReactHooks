import React, { useState } from 'react';

import MATRIX_FRAMES from './data/matrix';
import { useDynamicTransition } from './hooks';

const MINIMUM_DELAY = 10;
const MINIMUM_INCREMENT = 1;
function Matrix() {
	const [ delay, setDelay ] = useState(500);
	const [ increment, setIncrement ] = useState(5);
	const index = useDynamicTransition(delay, increment, MATRIX_FRAMES.length);

	const updateDelay = (e) => {
		const delay = Number(e.target.value);
		setDelay(delay < MINIMUM_DELAY ? MINIMUM_DELAY : delay);
	};
	const updateIncrement = (e) => {
		let increment = Number(e.target.value);
		setIncrement(increment < MINIMUM_INCREMENT ? MINIMUM_INCREMENT : increment);
	};
	return (
		<div>
			<img src={MATRIX_FRAMES[index]} alt="matrix-animation" />
			<div className="multi-orm">
				Frame tranisition delay(second)
				<input type="number" onChange={updateDelay} />
			</div>
			<div className="multi-form">
				Frame increment
				<input type="number" onChange={updateIncrement} />
			</div>
		</div>
	);
}

export default Matrix;
