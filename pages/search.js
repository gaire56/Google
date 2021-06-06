import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { Api_Key, Context_Key } from '../keys';
import Response from '../Response';

const Search = ({ results }) => {
  const router = useRouter();

  console.log(results);
  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Search Results */}
      <SearchResults results={results} />
    </div>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false;
  const startIndex = context.query.start || '0';

  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${Api_Key}&cx=${Context_Key}&q=${context.query.term}&start=${startIndex}`
      ).then((response) => response.json());

  // After the SERVER has renderedPass the result to the client

  return {
    props: {
      results: data,
    },
  };
}
