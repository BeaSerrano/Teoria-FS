import React from 'react';
import { useCounter, useFetch } from '../hooks';
import { Loading, Quote } from '../components';

export const PrintQuote = () => {
    const { counter, increment, decrement, reset } = useCounter();
    const { data, isLoading, hasError } = useFetch(`https://api.breakingbadquotes.xyz/v1/quotes/${counter}`);
    
    if (hasError) {
        return (<div className="alert alert-danger text-center">{hasError.toString()}</div>)
    } else {
        return isLoading ? (
            <Loading />
        ) : (
            <>
                <div className="border border-outline">
                    {data && data.map((quoteData, i) => (
                        <Quote key={i} quote={quoteData.quote} author={quoteData.author} />
                    ))}
                </div>
                <button className="btn btn-primary" onClick={() => increment()}>INCREMENTO</button>
                {counter > 1 && <button className="btn btn-success" onClick={() => decrement()}>DECREMENTO</button>}
                <button className="btn btn-secondary" onClick={() => reset()}>RESET</button>
            </>
        )
    }
}
