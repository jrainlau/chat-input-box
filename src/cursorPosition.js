export const getCursorPosition = (element) => {
  let caretOffset = 0
  const doc = element.ownerDocument || element.document
  const win = doc.defaultView || doc.parentWindow
  const sel = win.getSelection()
  if (sel.rangeCount > 0) {
    const range = win.getSelection().getRangeAt(0)
    const preCaretRange = range.cloneRange()
    preCaretRange.selectNodeContents(element)
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    caretOffset = preCaretRange.toString().length
  }
  return caretOffset
}

export const setCursorPosition = (element, cursorPosition) => {
  const range = document.createRange()
  range.setStart(element.firstChild, cursorPosition)
  range.setEnd(element.firstChild, cursorPosition)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}
