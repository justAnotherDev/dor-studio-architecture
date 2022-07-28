export function getProjectValue(project, key) {
  console.log(project)
  return project.project_data.filter(({ header }) => header === key).shift().descr
}