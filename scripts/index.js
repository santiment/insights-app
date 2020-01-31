import { moveFiles } from './files'
import { preprocessSvelte } from './preprocess'

export function prepareLib() {
  moveFiles()
  preprocessSvelte()
}
