export const apiMetadataUrl = `http://localhost:3015`;
export const apiMetadataversion = `V1`;
// http://localhost:3015/devices
const devicesPath = `devices`;

export const endPoints = {
  devices: {
    get: `${apiMetadataUrl}/${devicesPath}`,
    post: `${apiMetadataUrl}/${devicesPath}`,
    put: `${apiMetadataUrl}/${devicesPath}`,
    delete: `${apiMetadataUrl}/${devicesPath}`,
  },
};
