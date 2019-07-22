import React from 'react';
import PropTypes from 'prop-types';

import Accordion from '../../fields/Accordion';
import Heading from '../../fields/Heading';

import './style.scss';

const ParagraphFaq = (props) => {
  const items = props.items.map((item) => {
    return {
      heading: item.question,
      content: item.answer.childMarkdownRemark.html
    };
  });

  return (
    <section className="faq">
      {props.title && <Heading level={2}>{props.title}</Heading>}
      {items && <Accordion items={items} />}
    </section>
  );
};

ParagraphFaq.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      answer: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string
        })
      })
    })
  )
};

export default ParagraphFaq;
