export namespace DOMUtils {
  export function verticalScrollbarsVisible(element: Element = document.body) {
    return element.scrollHeight > element.clientHeight;
  }

  export function horizontalScrollbarsVisible(element: Element = document.body) {
    return element.scrollWidth > element.clientWidth;
  }
}
