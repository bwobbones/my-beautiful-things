import Realm from 'realm';

class Thing extends Realm.Object {}

Thing.schema = {
  name: 'Thing', 
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    whatIsIt: 'string',
    whenIFinishedIt: 'string',
    whoIMadeItFor: 'string',
    itsStory: 'string',
    photos: 'string?[]'
  }
}

const thingRealm = new Realm({
  schema: [Thing],
  schemaVersion: 1
});

export default thingRealm;