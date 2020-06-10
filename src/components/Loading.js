import React, { memo } from 'react';
import * as loading from 'styles/components/_loading.scss';
import Layout from './Layout';

const Loading = () =>
  <Layout>
    <section className={loading.loadingPage}>
      <div className={loading.loadingSpinner} />
    </section>
  </Layout>;

export default memo(Loading);
