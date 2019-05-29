/**
 * Frame model events
 */

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};


function emitEvent(event) {
  return function (doc) {
    global.__socketController.broadcastMessage(`${event}:${doc._id}`, doc);
    global.__socketController.broadcastMessage(`frame:${event}`, doc);
  };
}

// Register the event emitter to the model events
export function registerEvents(Frame) {
  for (var e in events) {
    let event = events[e];
    Frame.post(e, emitEvent(event));
  }
}
