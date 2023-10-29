import axios from 'axios';
import { FLICKR_API_KEY } from '../config';

const imageInstance = axios.create({
  baseURL: 'https://www.flickr.com/services/rest/',
});
export const imageService = {
  getRandomImage: (): Promise<any> =>
    imageInstance
      .get(
        `?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&tags=city&extras=url_l&format=json&nojsoncallback=1&per_page=1&page=${
          Math.floor(Math.random() * 100) + 1
        }`,
      )
      .then(res => res.data.photos)
      .catch(e => Promise.reject(new Error(e))),
};
