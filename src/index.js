const w = 1200
const h = 800

const load = path => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = path
    img.onload = () => {
      resolve(img)
    }
  })
}

function draw (img) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  ctx.filter = 'blur(1px)'
  ctx.drawImage(img, 0, 0, w, h)
  return ctx.getImageData(0, 0, w, h)
}

;(async () => {
  const img1 = await load('/assets/1.jpg')
  const data1 = draw(img1)

  const img2 = await load('/assets/3.jpg')
  const data2 = draw(img2)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  ctx.rect(0, 0, w, h)
  ctx.fill()
  const data3 = ctx.getImageData(0, 0, w, h)

  for (var i = 0; i < data1.data.length; i += 4) {
    var ir = data1.data[i]
    var ig = data1.data[i + 1]
    var ib = data1.data[i + 2]

    var fr = data2.data[i]
    var fg = data2.data[i + 1]
    var fb = data2.data[i + 2]

    const dr = Math.abs(ir - fr) > 10 ? fr : 0
    const dg = Math.abs(ig - fg) > 10 ? fg : 0
    const db = Math.abs(ib - fb) > 10 ? fb : 0

    const pxchanged = (dr > 0 && dg > 0 && db > 0)
    data3.data[i] = pxchanged ? 255 : 0
    data3.data[i + 1] = pxchanged ? 0 : 0
    data3.data[i + 2] = pxchanged ? 0 : 0
  }

  ctx.putImageData(data3, 0, 0)
})()
