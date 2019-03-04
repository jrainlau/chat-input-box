import paste from './src/paste.js'
import { getCursorPosition, setCursorPosition } from './src/cursorPosition.js'
import emoji from './src/emoji.js'

new Vue({
  el: '#app',
  data () {
    return {
      editor: null,
      cursorPosition: 0,
      emoji
    }
  },
  mounted () {
    this.editor = this.$refs['editor']
  },
  methods: {
    submit (e) {
      const value = e.target.innerHTML.replace(/[\n\r]$/, '')
      if (value) {
        console.info('Submit text', { value })
        e.target.innerText = ''
      }
    },
    async onPaste (e) {
      const result = await paste(e)
      const imgRegx = /^data:image\/png;base64,/
      if (imgRegx.test(result)) {
        // const sel = window.getSelection()
        // if (sel && sel.rangeCount === 1 && sel.isCollapsed) {
        //   const range = sel.getRangeAt(0)
        //   const img = new Image()
        //   img.src = result
        //   range.insertNode(img)
        //   range.collapse(false)
        //   sel.removeAllRanges()
        //   sel.addRange(range)
        // }

        document.execCommand('insertImage', false, result)
      } else {
        document.execCommand('insertText', false, result)
      }
    },
    getCursor () {
      this.cursorPosition = getCursorPosition(this.editor)
    },
    insertEmoji (emoji) {
      const text = this.editor.innerHTML
      this.editor.innerHTML = text.slice(0, this.cursorPosition) + emoji + text.slice(this.cursorPosition, text.length)
      setCursorPosition(this.editor, this.cursorPosition + 1)
      this.cursorPosition = getCursorPosition(this.editor) + 1 //  emoji takes 2 bytes
    }
  }
})
