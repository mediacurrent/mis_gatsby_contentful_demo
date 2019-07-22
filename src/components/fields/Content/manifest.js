import ParagraphCard from '../../paragraphs/ParagraphCard';
import ParagraphHero from '../../paragraphs/ParagraphHero';
import ParagraphFaq from '../../paragraphs/ParagraphFaq';
import ParagraphCardList from '../../paragraphs/ParagraphCardList';
import ParagraphQuote from '../../paragraphs/ParagraphQuote';

import { graphql } from 'gatsby';

export const componentManifest = {
  ContentfulCard: {
    label: 'Card',
    component: ParagraphCard
  },
  ContentfulHeroMedia: {
    label: 'Hero Media',
    component: ParagraphHero
  },
  ContentfulFaq: {
    label: 'FAQ',
    component: ParagraphFaq
  },
  ContentfulCardList: {
    label: 'Card List',
    component: ParagraphCardList
  },
  ContentfulQuote: {
    label: 'Quote',
    component: ParagraphQuote
  }
};

export const faqFragment = graphql`
  fragment faqFragment on ContentfulFaq {
    title
    items: faqItems {
      question
      answer {
        childMarkdownRemark {
          html
        }
      }
      link
    }
  }
`;

export const cardFragment = graphql`
  fragment cardFragment on ContentfulCard {
    classes: cardLayout
    heading: title
    subhead
    eyebrow: shortTitle
    text: summary {
      childMarkdownRemark {
        html
      }
    }
    linkUri: link
    linkText
    media {
      fluid(maxWidth: 2560) {
        ...GatsbyContentfulFluid_withWebp
      }
      file {
        contentType
        url
      }
    }
  }
`;

export const cardListFragment = graphql`
  fragment cardListFragment on ContentfulCardList {
    title
    items: card {
      ...cardFragment
    }
    linkUri: link
    linkText
  }
`;

export const heroMediaFragment = graphql`
  fragment heroMediaFragment on ContentfulHeroMedia {
    heading: title
    subhead
    eyebrow: shortTitle
    text: summary {
      childMarkdownRemark {
        html
      }
    }
    linkUri: link
    linkText
    media {
      fluid(maxWidth: 1920) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`;

export const quoteFragment = graphql`
  fragment quoteFragment on ContentfulQuote {
    quote
    name: author
    job: jobTitle
  }
`;
