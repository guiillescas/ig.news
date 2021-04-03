import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>  
      <Head>
        <title>Posts | Ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>O useState é um React Hook, disponibilizado pelos próprios criadores do React, e tem o objetivo de armazenar e usar estados como o próprio nome já sugere.</p>
          </a>

          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>O useState é um React Hook, disponibilizado pelos próprios criadores do React, e tem o objetivo de armazenar e usar estados como o próprio nome já sugere.</p>
          </a>

          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspace</strong>
            <p>O useState é um React Hook, disponibilizado pelos próprios criadores do React, e tem o objetivo de armazenar e usar estados como o próprio nome já sugere.</p>
          </a>
        </div>
      </main>
    </>
  );  
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100
  });

  console.log(response)

  return {
    props: {}
  }
}
