import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const ITEMS_COUNT_QUERY = gql`
  query ITEMS_COUNT_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { loading, error, data } = useQuery(ITEMS_COUNT_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles data-testid="pagination">
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>⬅️ Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} items total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next ➡️</a>
      </Link>
    </PaginationStyles>
  );
}
