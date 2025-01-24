export async function resizeImage(file: File, width: number, height: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) { return reject(new Error('Canvas context is not available')) }

        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob((blob) => {
          if (!blob) { return reject(new Error('Failed to create blob from canvas')) }
          resolve(new File([blob], file.name, { type: file.type }))
        }, file.type)
      }
      img.onerror = err => reject(err)
      img.src = event.target?.result as string
    }
    reader.onerror = err => reject(err)
    reader.readAsDataURL(file)
  })
}
