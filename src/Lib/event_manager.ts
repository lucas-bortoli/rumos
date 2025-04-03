// Global counter to generate unique listener IDs
let eventListenerIdCounter = 0;

type EventCallback<E> = (event: E) => void;

// Stores all active event listeners
const listeners = new Map<
  number,
  { target: EventTarget; event: string; callback: EventCallback<any> }
>();

/**
 * Adds an event listener to any target and returns a unique ID.
 *
 * @param target - The event target (e.g., document, window, an element).
 * @param event - The event type (e.g., "click", "keydown").
 * @param callback - The function to execute when the event fires.
 * @returns A unique ID to remove the listener later.
 */
export function addListener<E>(
  target: EventTarget,
  event: string,
  callback: EventCallback<E>
): number {
  const id = eventListenerIdCounter++;
  listeners.set(id, { target, event, callback });
  target.addEventListener(event, callback as any);
  return id;
}

/**
 * Removes an event listener using its unique ID.
 *
 * @param id - The unique ID returned by `addListener`.
 */
export function removeListener(id: number): void {
  const listener = listeners.get(id);
  if (!listener) return;

  listener.target.removeEventListener(listener.event, listener.callback);
  listeners.delete(id);
}
