import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

import Body from '../../fields/Body';
import Button from '../../fields/Button';
import Eyebrow from '../../fields/Eyebrow';
import Heading from '../../fields/Heading';

import './style.scss';

const GoogleMapWrapper = withScriptjs(
  withGoogleMap(({ lat, lng, marker }) => {
    return (
      <GoogleMap defaultZoom={13} defaultCenter={{ lat, lng }}>
        {marker && <Marker position={{ lat, lng }} />}
      </GoogleMap>
    );
  })
);

const ParagraphMap = ({ body, heading, eyebrow, linkUri, linkTitle, map }) => {
  const hasText = body || heading || eyebrow || (linkTitle && linkUri);

  const classes = classNames(
    'map',
    { [`map--2col`]: hasText },
    { [`map--full`]: !hasText }
  );

  return (
    <section className="map__container">
      <div className={classes}>
        <div className="map__wrapper">
          <div className="map__embed">
            <GoogleMapWrapper
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiIlVXvHRR1eu14ObPbvoyuQhJwAULDDY"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              lat={parseFloat(map.lat)}
              lng={parseFloat(map.lng)}
              marker={true}
            />
          </div>
        </div>
        {hasText && (
          <div className="map__text">
            {eyebrow && <Eyebrow text={eyebrow} classes="map__text-eyebrow" />}
            {heading && (
              <Heading level={2} classes="map__location">
                {heading}
              </Heading>
            )}
            {body && (
              <Body text={body.childMarkdownRemark.html} classes="map__body" />
            )}
            {linkUri && linkTitle && (
              <Button href={linkUri} title={linkTitle} className="map__link" />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

ParagraphMap.propTypes = {
  map: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }).isRequired,
  body: PropTypes.shape({
    value: PropTypes.string
  }),
  heading: PropTypes.string,
  eyebrow: PropTypes.string,
  link: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string
  })
};

ParagraphMap.defaultProps = {
  map: []
};

export default ParagraphMap;
