import Post from "../components/Post";
import { useLoaderData } from "@remix-run/react";
import { gql } from "@apollo/client";
import { client } from "../lib/apollo";

export async function loader() {
  const PostsQuery = gql`
    query GetPosts {
      posts {
        nodes {
          title
          content
          date
          slug
        }
      }
    }
  `;
  const response = await client.query({
    query: PostsQuery,
  });

  const posts = response?.data?.posts?.nodes;
  return posts;
}

export default function Index() {
  const posts = useLoaderData();
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-3">
        {posts.map((post: { title: string | null | undefined }) => {
          return <Post post={post} key={post.title}></Post>;
        })}
      </div>
    </div>
  );
}
