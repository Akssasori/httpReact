import {useState, useEffect } from 'react';

// 4 - custom hook
export const useFetch = (url) => {

    const [data, setdata] = useState(null);

    useEffect(() => {
        const fectData = async () => {
            const res = await fetch(url);

            const json = await res.json();

            setdata(json);
        };
        fectData();
    }, [url]);

    return {data};

};
