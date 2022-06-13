import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorMessage } from 'components/ErrorMessage';
import PostsProvider from 'containers/Contexts/Posts';
import { Posts } from '../Posts';
import { History } from '../History';
import Layout from './Layout';

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <PostsProvider>
          <Layout>
            <Posts />
            <History />
          </Layout>
        </PostsProvider>
      </ErrorBoundary>

      <ToastContainer />
    </>
  );
}

export default App;
