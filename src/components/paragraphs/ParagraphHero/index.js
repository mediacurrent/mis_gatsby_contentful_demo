import React, { useEffect, useRef } from 'react';

import Body from '../../fields/Body';
import Button from '../../fields/Button';
import Eyebrow from '../../fields/Eyebrow';
import Heading from '../../fields/Heading';
import Media from '../../fields/Media';

// Homempage videos.
import webm from './rain.webm'
import mp4 from './rain.mp4'

import './style.scss';

const ParagraphHero = (props) => {

  const videoRef = useRef(null);

  // Load Video on homepage.
  useEffect(() => {
    if (
      typeof Promise === 'undefined' ||
      !videoRef.current ||
      window.matchMedia('(prefers-reduced-motion)').matches ||
      window.innerWidth < 992
    ) {
      return;
    }
    const video = videoRef.current;

    const children = Array.prototype.slice.call(video.children);
    children.forEach((child) => {
      if (
        child.tagName === 'SOURCE' &&
        typeof child.dataset.src !== 'undefined'
      ) {
        child.setAttribute('src', child.dataset.src);
      }
    });
    video.load();

    // Promise resolves when video.canplaythrough event triggers.
    const videoLoad = new Promise((resolve) => {
      video.addEventListener('canplaythrough', () => {
        resolve('can play');
      });
    });

    // Promise resolves after a predetermined time (2sec)
    const videoTimeout = new Promise((resolve) => {
      setTimeout(() => {
        resolve('The video timed out.');
      }, 2000);
    });

    // Race the promises to see which one resolves first.
    Promise.race([videoLoad, videoTimeout]).then((data) => {
      if (data === 'can play') {
        video.play();
        setTimeout(() => {
          video.classList.add('video-loaded');
        }, 500);
      }
      else {
        const children = Array.prototype.slice.call(video.children);
        children.forEach((child) => {
          if (
            child.tagName === 'SOURCE' &&
            typeof child.dataset.src !== 'undefined'
          ) {
            child.parentNode.removeChild(child);
          }
        });

        // reload the video without <source> tags to stop downloading.
        video.load();
      }
    });
  });
  const hero_videos = {
    webm,
    mp4,
  }

  const {media, heading, eyebrow, text, linkTitle, linkUri} = props;

  return (
    <section className="hero">
      {media && (
        <Media
          classes="hero__image"
          image={`<img src="${media.fluid.src}" srcset="${
            media.fluid.srcSet
          }" sizes="100vw" alt="" />`}
        />
      )}
      {props._pageContext.home_video_hero && (
        <div className="hero__background">
          <video
            loop
            muted
            autoPlay
            className="hero__bgvideo hero__bg-video--playback-slow"
            ref={videoRef}
          >
            <source data-src={hero_videos.webm} type="video/webm" />
            <source data-src={hero_videos.mp4} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="hero__content-wrapper">
        <div className="hero__content">
          <div className="section__container hero__content-container">
            <div className="hero__content-container-inner">
              {eyebrow && (
                <Eyebrow text={eyebrow} classes="hero__eyebrow" />
              )}
              {heading && <Heading level={1}>{heading}</Heading>}
              {text && <Body classes="hero__body" text={text.childMarkdownRemark.html} />}
              {linkUri && linkTitle && <Button uri={linkUri} title={linkTitle} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ParagraphHero;
