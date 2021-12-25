import configureMeasurements from 'convert-units';
import length from 'convert-units/lib/esm/definitions/length';
import mass from 'convert-units/lib/esm/definitions/mass';
import volume from 'convert-units/lib/esm/definitions/volume';

export default configureMeasurements({
  length, mass, volume,
});
