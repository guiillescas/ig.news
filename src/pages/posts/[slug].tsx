import Head from 'next/head';
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { RichText } from "prismic-dom";

import { getPrismicClient } from "../../services/prismic";

import styles from './post.module.scss';

interface IPostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: IPostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={styles.postContent}
          />
        </article>
      </main>
    </>
  );
}

interface UserSubscriptionSession extends Session {
  activeSubscription?: any;
}

export const getServerSideProps: GetServerSideProps = async ({ req: request, params }) => {
  const session: UserSubscriptionSession = await getSession({ req: request });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const prismic = getPrismicClient(request);

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  };

  return {
    props: {
      post
    }
  }
}