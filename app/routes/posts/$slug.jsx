import { useLoaderData } from "@remix-run/react";
import { gql } from "@apollo/client";
import { client } from "../../lib/apollo";

export async function loader({ params }) {
  const slug = params.slug;
  const PostQuery = gql`
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        date
        content
        title
        slug
      }
    }
  `;

  const response = await client.query({
    query: PostQuery,
    variables: {
      id: slug,
    },
  });

  const post = response?.data?.post;
  return post;
}

export default function Slug() {
  const post = useLoaderData();
  return (
    <div>
      <main className="container mx-auto mt-6 rounded-lg bg-gray-100 p-6">
        <h1 className="text-4xl">{post.title}</h1>
        <div className="mt-4 text-2xl">
          {new Date(post.date).toLocaleDateString()}
        </div>
        <article
          className="mt-4 space-y-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></article>
      </main>
    </div>
  );
}
