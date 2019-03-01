function toPreviewer (dataUrl, cb) {
  cb && cb(dataUrl)
}

function compress (img, fileType, maxWidth) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')

  const proportion = img.width / img.height
  const width = maxWidth
  const height = maxWidth / proportion

  canvas.width = width
  canvas.height = height

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, width, height)

  const base64data = canvas.toDataURL(fileType, 0.75)
  canvas = ctx = null

  return base64data
}

function chooseImg (e, cb, maxsize = 200 * 1024) {
  const file = e.target.files[0]

  if (!file || !/\/(?:jpeg|jpg|png)/i.test(file.type)) {
    return
  }

  const reader = new FileReader()
  reader.onload = function () {
    const result = this.result
    let img = new Image()

    if (result.length <= maxsize) {
      toPreviewer(result, cb)
      return
    }

    img.onload = function () {
      const compressedDataUrl = compress(img, file.type, maxsize / 1024)
      toPreviewer(compressedDataUrl, cb)
      img = null
    }

    img.src = result
  }

  reader.readAsDataURL(file)
}

export default chooseImg
