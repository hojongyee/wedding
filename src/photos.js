import chairlift from '../photos/chairlift.jpg';
import photobooth from '../photos/photobooth.jpg';
import selfie from '../photos/selfie.jpg';
import beach from '../photos/beach.jpg';

export const COVER = chairlift;
export const ENDING = beach;

export const GALLERY = [
  { src: chairlift, area: 'a', pos: '48% 55%', caption: 'Spring ride' },
  { src: photobooth, area: 'b', pos: 'center', caption: 'Mono mansion' },
  { src: selfie, area: 'c', pos: 'center 30%', caption: 'Smile' },
  { src: beach, area: 'd', pos: 'center 40%', caption: 'Summer night' },
];
