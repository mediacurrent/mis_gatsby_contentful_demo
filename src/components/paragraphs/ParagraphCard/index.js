import React from 'react';
import PropTypes from 'prop-types';

import Eyebrow from '../../fields/Eyebrow';
import Heading from '../../fields/Heading';
import Body from '../../fields/Body';
import Button from '../../fields/Button';

import classNames from 'classnames';

import './style.scss';

const ParagraphCard = ({
  classes,
  media,
  heading,
  subhead,
  eyebrow,
  text,
  linkText,
  linkUri,
  datakey
}) => {
  if (!classes) {
    classes = [];
  }
  // @TODO what is the right class for wide media right?
  const className = {
    card: true,
    wide: classes.some(
      (classLabel) =>
        classLabel === 'Wide (Media Left)' ||
        classLabel === 'Wide (Media Right)'
    )
  };
  className[datakey] = true;

  const mediaClasses = {
    svg: media && media.file.contentType === 'image/svg+xml'
  };

  return (
    <article className={classNames(className)}>
      {media && (
        <div className="card__icon">
          <img
            className={classNames(mediaClasses)}
            src={media.fluid.src ? media.fluid.src : media.file.url}
            alt={subhead}
          />
        </div>
      )}
      <div className="card__content">
        {eyebrow && <Eyebrow text={eyebrow} />}
        {heading && <Heading level={3}>{heading}</Heading>}
        {subhead && <Heading level={4}>{subhead}</Heading>}
        {text && (
          <Body>
            <div
              dangerouslySetInnerHTML={{
                __html: text.childMarkdownRemark.html
              }}
            />
          </Body>
        )}
        {linkUri && linkText && (
          <Button uri={linkUri} title={linkText} classes="card__link" />
        )}
      </div>
    </article>
  );
};

ParagraphCard.propTypes = {
  /** Content */
  text: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      __html: PropTypes.string
    })
  }),
  /** Eyebrow Component Properties. */
  eyebrow: PropTypes.string,
  /** Heading string. */
  heading: PropTypes.string,
  /** Heading Component Properties */
  subheading: PropTypes.string,
  /** CTA */
  linkUri: PropTypes.string,
  linkText: PropTypes.string,
  /** Media Component Properties. */
  media: PropTypes.shape({
    /** Image Tag */
    image: PropTypes.symbol,
    /** Video Iframe */
    video: PropTypes.symbol,
    /** Credit / Caption */
    caption: PropTypes.string
  }),
  /** Additional classes. */
  classes: PropTypes.arrayOf(PropTypes.string)
};

ParagraphCard.defaultProps = {
  classes: []
};

export default ParagraphCard;
