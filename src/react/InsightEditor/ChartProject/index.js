import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Selector from './Selector'

const PROJECTS_QUERY = gql`
  query allProjects($minVolume: Int = 0) {
    projects: allProjects(minVolume: $minVolume) {
      id
      name
      ticker
      logoUrl
    }
  }
`

const ChartProject = ({ project, projects, onChange }) => (
  <Selector value={project} options={projects} onChange={onChange} />
)

export default graphql(PROJECTS_QUERY, {
  props: ({ data: { projects } }) => ({
    projects,
  }),
})(ChartProject)
