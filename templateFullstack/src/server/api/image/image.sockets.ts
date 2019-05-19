/**
 * Image model events
 */

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};


function emitEvent(event) {
  return function (doc) {
    global.__socketController.broadcastMessage(`${event}:${doc._id}`, doc);
    global.__socketController.broadcastMessage(`image:${event}`, doc)
  };
}

// Register the event emitter to the model events
export function registerEvents(Image) {
  for (var e in events) {
    let event = events[e];
    Image.post(e, emitEvent(event));
  }
}
