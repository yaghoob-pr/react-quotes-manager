import React, { useEffect } from 'react';
import QuoteForm from '../components/quotes/QuoteForm'
import {useNavigate} from 'react-router-dom'
import {addQuote} from '../lib/api'
import useHttp from '../hooks/use-http';

export const NewQuote = () => {
  let navigate = useNavigate();
  const {sendRequest, status} = useHttp(addQuote);

  useEffect(() => {
    console.log(status)
    if(status === 'completed') {
      navigate('/quotes');
    }
  }, [status, navigate])


  const addQuoteHandler = quoteData => {
    sendRequest(quoteData)
  }

  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>;
};
