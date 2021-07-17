import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_POSTS } from '../../graphql/query/post';

export function useGetMyPosts() {
  const [state, setState] = useState({ search: '' });
  const res = useQuery(GET_MY_POSTS, {
    variables: { limit: 20, page: 1, search: state.search },
    fetchPolicy: 'network-only',
  });
  return { ...res, state, setState };
}
