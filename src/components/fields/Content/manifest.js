import ParagraphCard from "../../paragraphs/ParagraphCard"
import ParagraphHero from "../../paragraphs/ParagraphHero"
import ParagraphFaq from "../../paragraphs/ParagraphFaq"

import { graphql } from 'gatsby';

export const componentManifest = {
  ContentfulCard: {
    label: "Card",
    component: ParagraphCard,
  },
  ContentfulHeroMedia: {
    label: "Hero Media",
    component: ParagraphHero,
  },
  ContentfulFaq: {
    label: 'FAQ',
    component: ParagraphFaq
  }
}

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
`

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
      fluid(
        maxWidth: 2560
      ) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`

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
      fluid(
        maxWidth: 1920
      ) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`