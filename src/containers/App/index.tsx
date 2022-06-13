import PostsProvider from 'containers/Contexts/Posts';
import { Posts } from '../Posts';
import { History } from '../History';
import Layout from './Layout';

function App() {
  return (
    <>
      <PostsProvider>
        <Layout>
          <Posts />
          <History />
        </Layout>
      </PostsProvider>
    </>
  );
}

export default App;
