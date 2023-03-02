import { StaticImageData } from 'next/image';

import digitization from '../assets/digitization.jpg';
import logo from '../assets/logo.png';
import network from '../assets/network.jpg';
import system from '../assets/system.png';

interface Images {
  digitization: StaticImageData;
  logo: StaticImageData;
  network: StaticImageData;
  system: StaticImageData;
}

export const Images: Images = { digitization, logo, network, system };
