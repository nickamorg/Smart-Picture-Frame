import * as eventFederator from '@amisolertis/utils-eventfederator';
import * as amiconfig from '@amisolertis/utils-config';
const redis = amiconfig.getConfig(amiconfig.getEnvironment()).redis;

let eventClient = eventFederator.createClient(
  redis.getIP(),
  redis.getPort(),
  redis.getPassword()
);

export function GalleryImageCreated(newGalleryImage: any): void {
  let message = {
    status: 'created',
    data: newGalleryImage
  };

  eventClient.PublishTo('GalleryImages', JSON.stringify(message));
}
