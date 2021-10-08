import * as React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// Components
import Layout from "../components/layout";
import PageTitle from "../components/page-title";
import Paginator from "../components/paginator";

// Styles
import "../styles/templates/articles-list.scss";

const ArticleCard = ({ article }) => (
  <Link to={`/articles/${article.slug}`} className="article-card-wrapper">
    <div className="image-wrapper">
      <GatsbyImage
        className="image"
        image={getImage(article.mainImage)}
        alt={article.title}
      />
    </div>
    <div className="content-wrapper">
      <div>
        <small>{article.date}</small>
        <h4>{article.title}</h4>
        <p>{article.summary}</p>
      </div>
      <div className="author-wrapper flex-align-center ">
        <div className="photo-wrapper flex-center-center">
          <GatsbyImage
            className="photo"
            image={getImage(article.author.photo)}
            alt={article.author.fullName}
          />
        </div>
        <span>{article.author.fullName}</span>
      </div>
    </div>
  </Link>
);

const ArticlesPage = ({
  data: {
    allDatoCmsArticle: { nodes: articles },
  },
  pageContext: { currentPage, numPages },
}) => {
  return (
    <Layout pageName="articles">
      <PageTitle>articles </PageTitle>
      <div className="articles-wrapper">
        {articles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </div>
      <Paginator
        currentPage={currentPage}
        numPages={numPages}
        path="articles"
      />
    </Layout>
  );
};

export const query = graphql`
  query ArticlesPageQuery($skip: Int!, $limit: Int!) {
    allDatoCmsArticle(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        title
        summary
        slug
        author {
          fullName
          photo {
            gatsbyImageData(
              placeholder: TRACED_SVG
              width: 45
              imgixParams: { sat: -100 }
            )
          }
        }
        date
        mainImage {
          gatsbyImageData(placeholder: TRACED_SVG)
        }
      }
    }
  }
`;

export default ArticlesPage;
