export function getProjectValue(project, key) {
  return project.project_data.filter(({ header }) => header === key).shift().descr
}