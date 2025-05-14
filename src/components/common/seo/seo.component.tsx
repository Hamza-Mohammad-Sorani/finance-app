import React from 'react';
import Head from 'next/head';

function SEO({
  title = 'Finance App',
  description = 'Manage Your Money Like a Pro',
  image,
  url,
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta key="title" name="title" content={title} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="twitter:title" property="twitter:title" content={title} />

      <meta key="description" name="description" content={description} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />
      <link rel={image} />
      <meta key="og:image" property="og:image" content={image} />
      {url && <meta key="og:url" property="og:url" content={url} />}
      <meta key="og:image:url" property="og:image:url" content={image} />
      <meta
        key="og:image:secure_url"
        property="og:image:secure_url"
        content={image}
      />
      <meta key="twitter:image" property="twitter:image" content={image} />
      <meta
        key="twitter:card"
        property="twitter:card"
        content="summary_large_image"
      />

      {url && <meta key="url" name="url" content={url} />}
      {url && <meta key="og:url" property="og:url" content={url} />}
      {url && <meta key="twitter:url" property="twitter:url" content={url} />}

      <meta key="og:type" property="og:type" content="website" />
    </Head>
  );
}

export default SEO;
