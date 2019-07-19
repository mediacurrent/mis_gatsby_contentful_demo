import React from 'react';
import PropTypes from 'prop-types';

import { componentManifest } from './manifest.js';

const Content = ({ content }) => (
  <>
    {content.map((section, i) => {
      const componentType = section['__typename'];
      const datakey = `paragraph-${componentType}--${i}`;
      section.datakey = datakey;

      if (componentManifest[componentType]) {
        const componentDefinition = componentManifest[componentType];
        const Component = componentDefinition.component;
        return (
          <Component {...section} _pageContext={{ ...content }} key={datakey} />
        );
      }

      console.log(section['__typename']);
      return null;
    })}
  </>
);

Content.propTypes = {
  content: PropTypes.array
};

export default Content;
