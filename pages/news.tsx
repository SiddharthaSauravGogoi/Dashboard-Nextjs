import React from 'react';
import axios from 'axios';
import { GetStaticProps } from 'next';
import NewsModel from '../models/NewsModel';
import styles from '../styles/Home.module.css';

const News = ({ newsData }: { newsData: NewsModel[] }) => {
  return (
    <section>
      {newsData.map((news: NewsModel) => (
        <article className={styles.card} key={news.id}>
          <h3> Title : {news.title} </h3>
          <p>
            <strong> Body </strong>: {news.body}
          </p>
        </article>
      ))}
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apiUrl = `https://jsonplaceholder.typicode.com/posts`;
  const response = await axios.get<NewsModel[]>(apiUrl);
  const newsData = response.data;
  return { props: { newsData } };
};

export default News;
