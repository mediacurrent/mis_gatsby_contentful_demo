import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../../fields/Button';
import Eyebrow from '../../fields/Eyebrow';
import Heading from '../../fields/Heading';

import './style.scss';

const ParagraphBreaker = ({
  classes,
  eyebrow,
  heading,
  text,
  linkUri,
  linkText,
  media
}) => {
  const breakerClasses = classNames(
    'section',
    'breaker',
    { [`with-hero`]: media },
    { [`${classes}`]: classes }
  );

  return (
    <section className={breakerClasses}>
      <div className="section__container breaker__container">
        {media && (
          <div className="breaker__hero">
            <img
              src={media.fluid.srcWebp}
              srcSet={media.srcSetWebp}
              alt=""
              sizes="100vw"
            />
          </div>
        )}
        <div className="breaker__content-wrapper">
          <div className="breaker__content-container">
            {eyebrow && <Eyebrow text={eyebrow} classes="breaker__eyebrow" />}
            {heading && (
              <Heading classes="breaker__heading">
                <span>{heading}</span>
              </Heading>
            )}
            {text && (
              <div
                className="breaker__body body-text"
                dangerouslySetInnerHTML={{
                  __html: text.childMarkdownRemark.html
                }}
              />
            )}
            {linkUri && linkText && (
              <Button uri={linkUri} title={linkText} classes="breaker__cta" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

ParagraphBreaker.propTypes = {
  classes: PropTypes.string
};

ParagraphBreaker.defaultProps = {
  classes: ''
};

export default ParagraphBreaker;
