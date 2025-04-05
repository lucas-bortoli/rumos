export default function findElementInParents(
  searchStart: HTMLElement,
  matcher: (element: HTMLElement) => boolean
): HTMLElement | null {
  let current: HTMLElement | null = searchStart;

  while (current !== null) {
    if (matcher(current)) {
      return current;
    }

    current = current.parentElement;
  }

  return null;
}
