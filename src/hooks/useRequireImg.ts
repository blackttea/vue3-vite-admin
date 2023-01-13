const useRequireImg = (url: string) => {
  return new URL(url, import.meta.url).href
}

export default useRequireImg
