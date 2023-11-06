import type { AxiosError } from 'axios';
import axios from 'axios';
import { FLICKR_API_KEY } from '../config';

const imageInstance = axios.create({
  baseURL: 'https://www.flickr.com/services/rest/',
});
export const imageService = {
  getRandomImage: (tag?: string): Promise<string> =>
    imageInstance
      .get(
        `?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&tags=${
          tag || 'city'
        }&extras=url_o&format=json&nojsoncallback=1&per_page=1&page=${
          Math.floor(Math.random() * 100) + 1
        }`,
      )
      .then(res => {
        const imgId = res.data.photos?.photo?.[0].id;

        return imageInstance.get(
          `?method=flickr.photos.getSizes&api_key=${FLICKR_API_KEY}&photo_id=${imgId}&format=json&nojsoncallback=1`,
        );
      })
      .then(res => {
        const sizes: Array<any> = res?.data.sizes.size;
        const photo = sizes.findLast(
          img => img.height >= 1000 && img.height <= 3000,
        );
        return photo?.source;
      })
      .catch((e: AxiosError) => Promise.reject(e)),
};
