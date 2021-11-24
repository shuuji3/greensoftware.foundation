import * as React from "react";
import { graphql, Link } from "gatsby";
import { StructuredText } from "react-datocms";

// Components
import Layout from "../components/layout";
import PageTitle from "../components/page-title";
import ChairsSection from "../components/chairs-section";
import MembersSection from "../components/members-section";

// Styles
import "../styles/templates/working-groups.scss";

const SingleWorkingGroupTemplate = ({
  data: {
    datoCmsWorkingGroup: workingGroup,
    chairsData: { nodes: chairs },
    membersData: { nodes: members },
    participantData: { nodes: participants },
  },
}) => {
  return (
    <Layout
      pageName="single-working-group"
      seo={{ meta: workingGroup.seoMetaTags }}
    >
      <PageTitle suptitle={workingGroup.title}>Working Group</PageTitle>
      <section>
        <h2 className="green-uppercase-title">Scope</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: workingGroup.scopeNode.childMarkdownRemark.html,
          }}
        />
      </section>
      {Boolean(chairs.length) && <ChairsSection chairs={chairs} />}
      {Boolean(members.length) && (
        <MembersSection members={[...members, ...participants]} />
      )}
      {Boolean(workingGroup.projects.length) && (
        <section className="projects-section">
          <h2 className="green-uppercase-title">PROJECTS</h2>
          <ul>
            {workingGroup.projects.map((project) => (
              <li key={project.id}>
                <Link to={`/projects/${project.slug}`}>
                  <h4>{project.title}</h4>
                  <p>{project.shortDescription}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {workingGroup.info.map((infoItem) => (
        <section key={infoItem.title} className="info-item">
          <h2 className="green-uppercase-title">{infoItem.title}</h2>
          <StructuredText data={infoItem.content} />
        </section>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query SingleWorkingGroupTemplateQuery($id: String) {
    datoCmsWorkingGroup(id: { eq: $id }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      id
      slug
      title
      scopeNode {
        childMarkdownRemark {
          html
        }
      }

      projects {
        id
        slug
        title
        shortDescription
      }
      info {
        title
        content {
          value
        }
      }
    }
    chairsData: allDatoCmsMember(
      filter: { chairWorkingGroups: { elemMatch: { id: { eq: $id } } } }
      sort: { order: ASC, fields: fullName }
    ) {
      nodes {
        fullName
        photo {
          gatsbyImageData(
            placeholder: TRACED_SVG
            imgixParams: { sat: -100, w: "130", fm: "jpg", auto: "compress" }
          )
        }
        companyWebsite
        company
        role
        socialMediaLink {
          platform
          link
        }
      }
    }
    membersData: allDatoCmsMember(
      filter: { memberWorkingGroups: { elemMatch: { id: { eq: $id } } } }
      sort: { order: ASC, fields: fullName }
    ) {
      nodes {
        fullName
        photo {
          gatsbyImageData(
            placeholder: TRACED_SVG
            imgixParams: { sat: -100, w: "130", fm: "jpg", auto: "compress" }
          )
        }
        companyName: company
        role
        socialMediaLink {
          link
        }
      }
    }
    participantData: allDatoCmsParticipant(
      filter: { workingGroupsInvolvedIn: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        fullName
        photo {
          gatsbyImageData(
            placeholder: TRACED_SVG
            imgixParams: { sat: -100, w: "130", fm: "jpg", auto: "compress" }
          )
        }
        companyName
        socialMediaLink
      }
    }
  }
`;
export default SingleWorkingGroupTemplate;
