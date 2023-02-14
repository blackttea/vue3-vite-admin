const useBase64 = (data: any) => {
  return `data: image/jpeg;base64,${btoa(
    new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), "")
  )}`
}

export default useBase64
