import { ITEMS_COUNT_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we are gonna take care of every thing
    // args are 'first' and 'skip' (which are passed as 'variables' when starting the query with useQuery in the Products component)
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // read the count of the items in the page from the cache
      const data = cache.readQuery({ query: ITEMS_COUNT_QUERY });
      const itemsCount = data?._allProductsMeta?.count;
      const currentPage = skip / first + 1;
      const totalPages = Math.ceil(itemsCount / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (
        items.length &&
        items.lenght !== first &&
        currentPage === totalPages
      ) {
        // if this was the last page and there wasn't enough items as determined by the perPage variable (first) then return what you've got
        return items;
      }

      if (items.length !== first) {
        // if we dont have the amount of items that are enough to fill the current page [remember that 'first' is the variable holding the number of items allowed perPage], pass 'false' so the function can take care of fetching them from the network and hand them over to merge()
        return false;
      }

      if (items.length) {
        // if there are items just serve them from the cache to Apollo
        return items;
      }
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
