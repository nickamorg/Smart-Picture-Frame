/**
 * WallSet model events
 */

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};


function emitEvent(event) {
  return function (doc) {
    global.__socketController.broadcastMessage(`${event}:${doc._id}`, doc);
    global.__socketController.broadcastMessage(`wallSet:${event}`, doc);
  };
}

// Register the event emitter to the model events
export function registerEvents(WallSet) {
  for (var e in events) {
    let event = events[e];
    WallSet.post(e, emitEvent(event));
  }
}
