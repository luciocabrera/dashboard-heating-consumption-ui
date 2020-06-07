export const apiMetadataUrl = `http://localhost:3015`;
export const apiMetadataversion = `V1`;
// http://localhost:3015/devices
const devicesPath = `devices`;

export const endPoints = {
  devices: {
    get: {
      devices: `${apiMetadataUrl}/${devicesPath}`,
    },
    post: { devices: `${apiMetadataUrl}/${devicesPath}` },
    delete: { devices: `${apiMetadataUrl}/${devicesPath}` }
  },
};
