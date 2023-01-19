import { IconDefinition, faCode, faMasksTheater, faGamepad, faBurger, faVolleyball, faPaw, faCakeCandles, faFaceSmileBeam } from '@fortawesome/free-solid-svg-icons'

type Topic = {
  name: string;
  icon: IconDefinition;
}

export const topics: Topic[] = [
  {
    name: 'coding',
    icon: faCode,
  },
  {
    name: 'comedy',
    icon: faMasksTheater,
  },
  {
    name: 'gaming',
    icon: faGamepad,
  },
  {
    name: 'food',
    icon: faBurger,
  },
  {
    name: 'dance',
    icon: faCakeCandles,
  },
  {
    name: 'beauty',
    icon: faFaceSmileBeam,
  },
  {
    name: 'animals',
    icon: faPaw,
  },
  {
    name: 'sports',
    icon: faVolleyball,
  },
];

export const footerList1 = ['About', 'Newsroom', 'Store', 'Contact', 'Carrers', 'ByteDance', 'Creator Directory']
export const footerList2 = [ 'Tiki Taka for Good','Advertise','Developers','Transparency','TikTik Rewards' ]
export const footerList3 = [ 'Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines' ]