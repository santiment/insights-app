import { query } from 'webkit/api'

const PROJECTS_QUERY = `{
  allProjects(minVolume: 0) {
    slug
    name
    ticker
  }
}`

const accessor = ({ allProjects }) => allProjects
export const queryProjects = () => query(PROJECTS_QUERY).then(accessor)
