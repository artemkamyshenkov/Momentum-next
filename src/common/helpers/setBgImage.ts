export async function setBgImage(url: string) {
  if (!url) {
    return null;
  }
  const img = new Image();
  img.src = url;
  await img.decode();
  document.body.style.backgroundImage = `url(${img.src})`;
  return url;
}
