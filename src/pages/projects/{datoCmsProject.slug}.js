import * as React from "react";
import { graphql, Link } from "gatsby";
import { StructuredText } from "react-datocms";

// Components
import Layout from "../../components/layout";
import ChairsSection from "../../components/chairs-section";
import MembersSection from "../../components/members-section";

// Styles
import "../../styles/pages/single-project.scss";

const HeroSection = ({ illustration, title, workingGroup }) => (
  <section className="hero-section">
    <div className="illustration-wrapper">
      <img src={illustration} alt={title} />
    </div>
    <h1>{title}</h1>
    <p>
      By:{" "}
      <Link to={`/working-groups/${workingGroup.slug}`}>
        {workingGroup.title} Working Group
      </Link>
    </p>
  </section>
);

const SingleProjectTemplate = ({ data: { datoCmsProject: project } }) => {
  console.log(project);
  return (
    <Layout pageName="single-project">
      <HeroSection
        illustration={project.illustration.url}
        title={project.title}
        workingGroup={project.workingGroup}
      />
      <section className="short-description">
        <p>{project.shortDescription}</p>
      </section>
      <ChairsSection chairs={project.chairs} />
      <MembersSection members={project.members} />
      {project.info.map((infoItem) => (
        <section key={infoItem.title} className="info-item">
          <h6 className="green-uppercase-title">{infoItem.title}</h6>
          <StructuredText data={infoItem.content} />
        </section>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query SingleProjectTemplateQuery($id: String) {
    datoCmsProject(id: { eq: $id }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      id
      slug
      title
      illustration {
        url
      }
      workingGroup {
        title
        slug
      }
      shortDescription
      chairs {
        company
        companyWebsite
        fullName
        linkedinUsername
        photo {
          gatsbyImageData(placeholder: TRACED_SVG, imgixParams: { sat: -100 })
        }
        twitterUsername
        role
      }
      members {
        fullName
        socialLink
        photo {
          gatsbyImageData(placeholder: TRACED_SVG, imgixParams: { sat: -100 })
        }
      }
      info {
        title
        content {
          value
        }
      }
    }
  }
`;
export default SingleProjectTemplate;
