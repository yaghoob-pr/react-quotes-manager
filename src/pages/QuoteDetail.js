import React, { Fragment, useEffect } from "react";
import { Outlet, useParams, Link, useLocation } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";

export const QuoteDetail = () => {
  const params = useParams();
  const locaiton = useLocation();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const isShowingComments = locaiton.pathname.includes("comments");

  const quote = loadedQuote;

  if (!quote) {
    return <h1>No Quote Found!</h1>;
  }

  if (status === "pending") {
   return( <div className="centered">
      <LoadingSpinner/>
      </div>);
  }

  if(error) {
    return <p className="centered">{error}</p>
  }

  if(!quote) {
    return <p>No quote found!</p>
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      {!isShowingComments && (
        <div className="centered">
          <Link className="btn--flat" to={`comments`}>
            Load Comments
          </Link>
        </div>
      )}

      <Outlet />
    </Fragment>
  );
};
