import React from 'react';
import { useSubject } from 'rxf-rewrite';
import { metaTopbarObject, selectedMetaOption$ } from './shared';

const Content: React.FC = () => {
  useSubject(selectedMetaOption$);

  const Element = metaTopbarObject[selectedMetaOption$.value].mainComponent;

  return <Element />;
};

export default Content;
