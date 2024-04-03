export const toDataURL = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.src = url
  })
}
