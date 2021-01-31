import {newTesselations} from './create-new.js'

export function fetchOrCreateTesselations(start, length) {
  // TODO: First check for existing tesselations before creating new ones.
  return newTesselations(length)
}