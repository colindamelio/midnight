import Layout from '../components/Layout';
import { withApollo } from '../lib/withApollo';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ActivityList from '../components/ActivityList';
import Activity from '../components/Activity';

const HELLO_QUERY = gql`
  query HelloQuery {
    sayHello
  }
`

const Home = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);
  if (loading) return <div />
  return (
    <Layout>
      <div className="container">
        <main>
          <h1 className="title">
            {data.sayHello}
          </h1>
        <ActivityList />
        </main>

        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
          }

          main {
            padding: 5rem 0;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
            text-align: center;
          }
          
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </Layout>
  );
}


export default withApollo(Home);