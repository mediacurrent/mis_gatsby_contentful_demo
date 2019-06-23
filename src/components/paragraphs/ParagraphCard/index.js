import React from 'react';
import PropTypes from 'prop-types';

import Eyebrow from '../../fields/Eyebrow';
import Heading from '../../fields/Heading';
import Body from '../../fields/Body';
import Button from '../../fields/Button';

import './style.scss';

const ParagraphCard = (props) => {
  // const classes = classNames(
  //   'card',
  //   {[`${props.datakey}`]: props.datakey},
  //   {[`${props.classes}`]: props.classes}
  // );


  const {classes, media, heading, subhead, eyebrow, text, linkTitle, linkUri} = props;
  classes.push('card')
  classes.push(props.datakey)

  let imageClass = null;
  // try {
  //   imageClass = props.r.media.r.image.localFile.extension;
  //   if (imageClass === 'svg') {
  //     media = props.r.media.r.image.localFile.publicURL;
  //   }
  //   else if (props.r.media.r.image.localFile.cis.f) {
  //     media = props.r.media.r.image.localFile.cis.f.srcWebp;
  //   }
  //   else {
  //     media = props.r.media.r.image.localFile.cis.fixed.srcWebp;
  //   }
  // }
  // catch{}

  return (
    <article className={classes.join(' ')}>
      {media && (
        <div className="card__icon">
          <img
            className={imageClass}
            src={media.fluid.src}
            alt={props.subhead}
          />
        </div>
      )}
      <div className="card__content">
        {eyebrow && <Eyebrow text={eyebrow} />}
        {heading && <Heading level={3}>{heading}</Heading>}
        {subhead && <Heading level={4}>{subhead}</Heading>}
        {text &&
          (<Body>
            <div
              dangerouslySetInnerHTML={{
                __html: text.childMarkdownRemark.html,
              }}
            />
          </Body>)}
        {linkUri && linkTitle && <Button uri={linkUri} title={linkTitle} classes="card__link" />}
      </div>
    </article>
  );
}

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
  linkTitle: PropTypes.string,
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
}

ParagraphCard.defaultProps = {
  classes: []
}

export default ParagraphCard;
