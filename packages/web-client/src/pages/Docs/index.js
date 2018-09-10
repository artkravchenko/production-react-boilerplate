import React from 'react';

import Header from 'web-client/src/shared/widgets/Header';

import './style.scss';

function DocsPage() {
  return (
    <div>
      <Header className="docs-page__header" />
      <div>This is the docs page</div>
    </div>
  );
}

export default DocsPage;
