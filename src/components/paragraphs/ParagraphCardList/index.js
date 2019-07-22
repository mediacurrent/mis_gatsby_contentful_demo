import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { uid } from 'react-uid';

import ParagraphCard from '../ParagraphCard';
import Button from '../../fields/Button';
import Heading from '../../fields/Heading';

import './style.scss';

const ParagraphCardList = ({ title, items, linkUri, linkText }) => {
  const classes = classNames('card-list');
  return (
    <>
      <section className="card-list--container">
        {title && <Heading level={2}>{title}</Heading>}
        <ul className={classes}>
          {items.map((item, index) => {
            return (
              <li className="card-list__item" key={uid(item, index)}>
                <ParagraphCard {...item} />
              </li>
            );
          })}
        </ul>
        {linkUri && linkText && (
          <Button uri={linkUri} title={linkText} classes="card__link" />
        )}
      </section>
    </>
  );
};

ParagraphCardList.propTypes = {
  /** Optional Title */
  title: PropTypes.string,
  /** Array of Card Properties */
  items: PropTypes.array,
  /** Modifying classes */
  classes: PropTypes.string,
  /** CTA */
  link: PropTypes.shape({
    url: PropTypes.string,
    text: PropTypes.string
  })
};

export default ParagraphCardList;
