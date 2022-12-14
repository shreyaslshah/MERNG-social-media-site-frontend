import React, { useContext } from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client/react/hooks';
import { Grid, Loader } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { Transition } from 'semantic-ui-react';

function Home() {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  var posts = null;
  if (data) {
    posts = data.getPosts;
  }

  return (
    <div className='mobileContainer'>
      <Grid columns={3} stackable className='homeContainer' >
        <Grid.Row className='page-title'>
          <h1 className='homeHeading'>
            Recent Posts
          </h1>
        </Grid.Row>
        <Grid.Row>
          {
            user && (
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            )
          }
          {
            loading ? (<Loader active inline='centered'>Loading Posts</Loader>) :
              (
                <Transition.Group>
                  {posts &&
                    posts.map(post => (
                      <Grid.Column key={post.id} style={{ marginBottom: '20px' }}>
                        <PostCard key={post.id} post={post} />
                      </Grid.Column>
                    ))}
                </Transition.Group>
              )
          }
        </Grid.Row>
      </Grid >
    </div>
  )
}

const FETCH_POSTS_QUERY = gql`
query GetPosts {
  getPosts {
    id
    body
    username
    comments {
      id
      body
      username
      createdAt
    }
    likes {
      id
      username
      createdAt
    }
    createdAt
  }
}`

export default Home