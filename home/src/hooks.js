import { useState, useEffect } from "react";

export const useFetch = (url, initialValue) => {
  const [result, setResult] = useState(initialValue);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => setResult(json));
  }, []);

  return result;
};

export const useDynamicTransition=(delay,increment,length)=>{
  const [ index, setIndex ] = useState(0);
  useEffect(
		() => {
			const interval = setInterval(() => {
				setIndex((si) => {
					return (si + increment) % length;
				});
			}, delay);
			return () => 	clearInterval(interval);
		},
		[ delay, increment ]
  );
  return index;
}