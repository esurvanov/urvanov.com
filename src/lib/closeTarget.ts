// Куда возвращать при закрытии каталога/ссылок: в презентацию, если пришли из неё, иначе на главную.
export function closeTarget(): string {
  try {
    const last = sessionStorage.getItem('lastSlide')
    return last ? `/slide/${last}` : '/'
  } catch {
    return '/'
  }
}
