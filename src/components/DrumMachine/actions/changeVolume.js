export const CHANGE_VOLUME = 'CHANGE_VOLUME';

const changeVolume = (volume) => ({
  type: CHANGE_VOLUME,
  volume
});

export default changeVolume;