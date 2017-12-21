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

export default new Realm({
  schema: [Thing],
  schemaVersion: 2
});