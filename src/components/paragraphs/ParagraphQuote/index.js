import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Parser from 'html-react-parser';

import Icon from '../../fields/Icon';

import './style.scss';

const ParagraphQuote = ({ quote, name, job }) => {
  const classes = classNames('quote');

  return (
    <blockquote className={classes}>
      <Icon
        className="quote__icon"
        name="icon-quote"
        border={{ x: 0, y: 1, deviation: 1 }}
      />
      <p className="quote__text">“{Parser(quote)}”</p>
      <cite className="quote__cite">
        <div className="quote__cite-text">
          <p className="quote__cite-name">{name}</p>
          {job && <p className="quote__cite-job">{job}</p>}
        </div>
      </cite>
    </blockquote>
  );
};

ParagraphQuote.propTypes = {
  /** Quote string. HTML is Parsed. */
  quote: PropTypes.string.isRequired,
  /** Quote attribution. */
  name: PropTypes.string.isRequired,
  /** Optional attribution job title. */
  job: PropTypes.string
};

export default ParagraphQuote;
