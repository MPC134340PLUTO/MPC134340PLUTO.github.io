import { originalGallery } from './originalGallery';
import { normalizePath } from './navigation';
// One existing image per route. The home hero already renders its own image.
const backgrounds: Record<string, {index:number; position:string; strength:number}> = {
  '/': {index:0, position:'center', strength:.55},
  '/cabin': {index:1, position:'center 35%', strength:.75},
  '/galaxy': {index:2, position:'center 40%', strength:.66},
  '/cabin/workbench': {index:3, position:'center', strength:.62},
  '/archive/articles/binary-search': {index:4, position:'center 35%', strength:.78},
  '/archive/articles/paper-reading': {index:5, position:'center 35%', strength:.78},
  '/archive/articles/astro-workflow': {index:6, position:'center 35%', strength:.78},
  '/archive/articles/tcp-udp': {index:7, position:'center 35%', strength:.78},
  '/solar-system': {index:8, position:'center 30%', strength:.78},
  '/archive': {index:9, position:'center 35%', strength:.78},
  '/hangar': {index:10, position:'center 35%', strength:.65},
  '/memories': {index:11, position:'center 35%', strength:.72},
  '/hangar/voyage': {index:12, position:'center 35%', strength:.72},
  '/memories/collection': {index:13, position:'center 40%', strength:.65},
  '/observatory': {index:14, position:'center 28%', strength:.68},
  '/radio': {index:3, position:'center', strength:.72},
  '/oracle': {index:11, position:'center', strength:.72},
  '/friends': {index:2, position:'center', strength:.78},
  '/explore': {index:13, position:'center 40%', strength:.63},
};
export function getPageBackground(path: string) {
  const key=normalizePath(path);
  const newScenes: Record<string,string>={'/radio':'radio','/oracle':'oracle','/friends':'friends','/hangar':'hangar','/hangar/voyage':'voyage'};
  const config = backgrounds[key];
  if(config && newScenes[key]) return {...config,src:`/media/images/backgrounds/community/${newScenes[key]}.webp`};
  if (!config || normalizePath(path) === '/') return null;
  return { ...config, src: originalGallery[config.index].src };
}
