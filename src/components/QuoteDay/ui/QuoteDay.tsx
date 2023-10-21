'use client';

import React, { useEffect, useState } from 'react';
import quotes from '@/common/data/quotesData.json';
import styles from './QuoteDay.module.scss';
import type { QuoteType } from '../types';

export const QuoteDay = () => {
  const [quote, setQuote] = useState<QuoteType>({ text: '', author: '' });

  const getRandomQuote = () => {
    const random = Math.floor(Math.random() * quotes.length);
    return quotes[random];
  };

  const handleRandomQuotes = () => {
    const randomQuote = getRandomQuote();
    setQuote(randomQuote);
  };

  useEffect(() => {
    handleRandomQuotes();
  }, []);

  return (
    <div className={styles.quoteContainer}>
      <p className={styles.quoteText}>„{quote.text}“</p>
      <p className={styles.quoteAuthor}>{quote.author}</p>
      <button
        type="button"
        onClick={handleRandomQuotes}
        className={styles.button}
      >
        Еще цитату
      </button>
    </div>
  );
};
