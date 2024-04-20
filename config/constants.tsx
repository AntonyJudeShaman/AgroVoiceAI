import {
  Bot,
  BugOffIcon,
  CloudDrizzle,
  HeartPulseIcon,
  Home,
  HomeIcon,
  IndianRupee,
  RadarIcon,
  Settings,
  TractorIcon,
  WheatIcon
} from 'lucide-react'
import { NavConfig } from '@/lib/types'
import Image from 'next/image'
import cropfield from '../public/images/crop-field.jpeg'
import pestdetection from '../public/images/pests.jpeg'
import weather from '../public/images/weather-cloud.jpeg'
import cropMgmt from '../public/images/crop-mgmt.jpeg'
import market from '../public/images/market.jpeg'
import farmqa from '../public/images/farmqa.jpeg'
import soil from '../public/images/soil.jpg'
import { IoHome, IoHomeOutline } from 'react-icons/io5'
import { BsCloudRain } from 'react-icons/bs'

export const marketTableHeaderInEnglish = [
  {
    label: 'Name'
  },
  {
    label: 'Unit'
  },
  {
    label: 'Market Price'
  },
  {
    label: 'Retail Price'
  }
]

export const marketTableHeaderInTamil = [
  {
    label: 'பெயர்'
  },
  {
    label: 'அலகு'
  },
  {
    label: 'சந்தை விலை'
  },
  {
    label: 'சில்லறை விலை'
  }
]

export function CropField() {
  return (
    <Image
      src={cropfield.src}
      className="rounded-md"
      alt=""
      height={220}
      width={1024}
    />
  )
}

export const navConfig: NavConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
      icon: <IoHomeOutline className="size-4 mr-2" />
    },
    {
      title: 'Chat',
      href: '/chat',
      icon: <Bot className="size-5 mr-2" />
    },
    {
      title: 'Weather',
      href: '/weather',
      icon: <BsCloudRain className="size-5 mr-2" />
    },
    {
      title: 'Market',
      href: '/market',
      icon: <IndianRupee className="size-5 mr-2" />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings className="size-5 mr-2" />
    },
    {
      title: 'Pest',
      href: '/pest-identification',
      icon: <BugOffIcon className="size-5 mr-2" />
    }
  ]
}

export function PestField() {
  return <img src={pestdetection.src} className="rounded-md" alt="" />
}

export function WeatherField() {
  return <img src={weather.src} className="rounded-md" alt="" />
}

export function CropMgmtField() {
  return <img src={cropMgmt.src} className="rounded-md" alt="" />
}

export function MarketField() {
  return <img src={market.src} className="rounded-md" alt="" />
}

export function FarmingField() {
  return <img src={farmqa.src} className="rounded-md" alt="" />
}

export function SoilField() {
  return <img src={soil.src} className="rounded-md" alt="" />
}

export const features = [
  {
    title: 'Crop Recommendations',
    description:
      'Receive personalized crop recommendations tailored to your soil type, climate, and available resources, maximizing your yield potential.',
    icon: <WheatIcon />,
    header: <CropField />
  },

  {
    title: 'Pest Identification',
    description:
      'Spot crop pests and diseases in user-uploaded images, get quick solutions.',
    icon: <BugOffIcon />,
    header: <PestField />
  },

  {
    title: 'Weather Forecasting',
    description:
      'Get precise weather updates for your location, perfect for planning your farm activities.',
    icon: <CloudDrizzle />,
    header: <WeatherField />
  },

  {
    title: 'Crop Management Tips',
    description:
      'Get timely tips and best practices for crop cultivation, covering planting, fertilization, pruning, and harvesting.',
    icon: <WheatIcon />,
    header: <CropMgmtField />
  },

  {
    title: 'Market Prices and Trends',
    description:
      'Get market prices and trends for agricultural commodities, aiding your sales decisions.',
    icon: <IndianRupee />,
    header: <MarketField />
  },

  {
    title: 'Farming Q&A',
    description: 'Ask farming questions, get accurate answers instantly.',
    icon: <TractorIcon />,
    header: <FarmingField />
  },

  {
    title: 'Soil Health Assessment',
    description:
      'Assess soil health, including soil testing recommendations and interpretation of soil test results, to optimize crop yield and sustainability.',
    icon: <HeartPulseIcon />,
    header: <SoilField />
  }
]

export const options = [
  {
    title: 'Personalized Chatting',
    description:
      'Receive personalized crop recommendations tailored to your soil type, climate, and available resources, maximizing your yield potential.',
    icon: <WheatIcon />,
    header: <CropField />,
    url: '/chat'
  },

  {
    title: 'Pest Identification',
    description:
      'Spot crop pests and diseases in user-uploaded images, get quick solutions.',
    icon: <BugOffIcon />,
    header: <PestField />,
    url: '/pest-identification'
  },

  {
    title: 'Weather Forecasting',
    description:
      'Get precise weather updates for your location, perfect for planning your farm activities.',
    icon: <CloudDrizzle />,
    header: <WeatherField />,
    url: '/weather'
  },

  {
    title: 'Soil Health Assessment',
    description:
      'Assess soil health, including soil testing recommendations and interpretation of soil test results, to optimize crop yield and sustainability.',
    icon: <HeartPulseIcon />,
    header: <SoilField />,
    url: '/soiltest'
  },

  {
    title: 'Market Prices and Trends',
    description:
      'Get market prices and trends for agricultural commodities, aiding your sales decisions.',
    icon: <IndianRupee />,
    header: <MarketField />,
    url: '/market'
  }
]

export const tnDistricts = [
  { label: 'Ariyalur', value: 'Ariyalur' },
  { label: 'Chengalpattu', value: 'Chengalpattu' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Coimbatore', value: 'Coimbatore' },
  { label: 'Cuddalore', value: 'Cuddalore' },
  { label: 'Dharmapuri', value: 'Dharmapuri' },
  { label: 'Dindigul', value: 'Dindigul' },
  { label: 'Erode', value: 'Erode' },
  { label: 'Kallakurichi', value: 'Kallakurichi' },
  { label: 'Kanchipuram', value: 'Kanchipuram' },
  { label: 'Kanyakumari', value: 'Kanyakumari' },
  { label: 'Karur', value: 'Karur' },
  { label: 'Krishnagiri', value: 'Krishnagiri' },
  { label: 'Madurai', value: 'Madurai' },
  { label: 'Mayiladuthurai', value: 'Mayiladuthurai' },
  { label: 'Nagapattinam', value: 'Nagapattinam' },
  { label: 'Namakkal', value: 'Namakkal' },
  { label: 'Nilgiris', value: 'Nilgiris' },
  { label: 'Perambalur', value: 'Perambalur' },
  { label: 'Pudukkottai', value: 'Pudukkottai' },
  { label: 'Ramanathapuram', value: 'Ramanathapuram' },
  { label: 'Ranipet', value: 'Ranipet' },
  { label: 'Salem', value: 'Salem' },
  { label: 'Sivaganga', value: 'Sivaganga' },
  { label: 'Tenkasi', value: 'Tenkasi' },
  { label: 'Thanjavur', value: 'Thanjavur' },
  { label: 'Theni', value: 'Theni' },
  { label: 'Thoothukudi', value: 'Thoothukudi' },
  { label: 'Tiruchirappalli', value: 'Tiruchirappalli' },
  { label: 'Tirunelveli', value: 'Tirunelveli' },
  { label: 'Tirupathur', value: 'Tirupathur' },
  { label: 'Tiruppur', value: 'Tiruppur' },
  { label: 'Tiruvallur', value: 'Tiruvallur' },
  { label: 'Tiruvannamalai', value: 'Tiruvannamalai' },
  { label: 'Tiruvarur', value: 'Tiruvarur' },
  { label: 'Vellore', value: 'Vellore' },
  { label: 'Viluppuram', value: 'Viluppuram' },
  { label: 'Virudhunagar', value: 'Virudhunagar' }
]

export const tnDistrictsInEnglish = {
  Ariyalur: 'Ariyalur',
  Chengalpattu: 'Chengalpattu',
  Chennai: 'Chennai',
  Coimbatore: 'Coimbatore',
  Cuddalore: 'Cuddalore',
  Dharmapuri: 'Dharmapuri',
  Dindigul: 'Dindigul',
  Erode: 'Erode',
  Kallakurichi: 'Kallakurichi',
  Kanchipuram: 'Kanchipuram',
  Kanyakumari: 'Kanyakumari',
  Karur: 'Karur',
  Krishnagiri: 'Krishnagiri',
  Madurai: 'Madurai',
  Mayiladuthurai: 'Mayiladuthurai',
  Nagapattinam: 'Nagapattinam',
  Namakkal: 'Namakkal',
  Nilgiris: 'Nilgiris',
  Perambalur: 'Perambalur',
  Pudukkottai: 'Pudukkottai',
  Ramanathapuram: 'Ramanathapuram',
  Ranipet: 'Ranipet',
  Salem: 'Salem',
  Sivaganga: 'Sivaganga',
  Tenkasi: 'Tenkasi',
  Thanjavur: 'Thanjavur',
  Theni: 'Theni',
  Thoothukudi: 'Thoothukudi',
  Tiruchirappalli: 'Tiruchirappalli',
  Tirunelveli: 'Tirunelveli',
  Tirupathur: 'Tirupathur',
  Tiruppur: 'Tiruppur',
  Tiruvallur: 'Tiruvallur',
  Tiruvannamalai: 'Tiruvannamalai',
  Tiruvarur: 'Tiruvarur',
  Vellore: 'Vellore',
  Viluppuram: 'Viluppuram',
  Virudhunagar: 'Virudhunagar'
}

export const tnDistrictsInTamil = {
  Ariyalur: 'அரியலூர்',
  Chengalpattu: 'செங்கல்பட்டு',
  Chennai: 'சென்னை',
  Coimbatore: 'கோவை',
  Cuddalore: 'கடலூர்',
  Dharmapuri: 'தர்மபுரி',
  Dindigul: 'திண்டுக்கல்',
  Erode: 'ஈரோடு',
  Kallakurichi: 'கள்ளக்குறிச்சி',
  Kanchipuram: 'காஞ்சிபுரம்',
  Kanyakumari: 'கன்னியாகுமரி',
  Karur: 'கரூர்',
  Krishnagiri: 'கிருஷ்ணகிரி',
  Madurai: 'மதுரை',
  Mayiladuthurai: 'மயிலாடுதுறை',
  Nagapattinam: 'நாகப்பட்டினம்',
  Namakkal: 'நாமக்கல்',
  Nilgiris: 'நீலகிரி',
  Perambalur: 'பெரம்பலூர்',
  Pudukkottai: 'புதுக்கோட்டை',
  Ramanathapuram: 'ராமநாதபுரம்',
  Ranipet: 'ராணிப்பேட்டை',
  Salem: 'சேலம்',
  Sivaganga: 'சிவகங்கை',
  Tenkasi: 'தென்காசி',
  Thanjavur: 'தஞ்சாவூர்',
  Theni: 'தேனி',
  Thoothukudi: 'தூத்துக்குடி',
  Tiruchirappalli: 'திருச்சிராப்பள்ளி',
  Tirunelveli: 'திருநெல்வேலி',
  Tirupathur: 'திருப்பத்தூர்',
  Tiruppur: 'திருப்பூர்',
  Tiruvallur: 'திருவள்ளூர்',
  Tiruvannamalai: 'திருவண்ணாமலை',
  Tiruvarur: 'திருவாரூர்',
  Vellore: 'வேலூர்',
  Viluppuram: 'விழுப்புரம்',
  Virudhunagar: 'விருதுநகர்'
}

export const navItems = [
  'navigation.home',
  'navigation.chat',
  'navigation.weather',
  'navigation.market',
  'navigation.settings',
  'navigation.pest'
]

export const translations = [
  {
    title: 'home.crop.title',
    description: 'home.crop.desc'
  },
  {
    title: 'home.pest.title',
    description: 'home.pest.desc'
  },
  {
    title: 'home.weather.title',
    description: 'home.weather.desc'
  },
  {
    title: 'home.tips.title',
    description: 'home.tips.desc'
  },
  {
    title: 'home.market.title',
    description: 'home.market.desc'
  },
  {
    title: 'home.farming.title',
    description: 'home.farming.desc'
  },
  {
    title: 'home.soil.title',
    description: 'home.soil.desc'
  }
]

export const translateOptions = [
  'explore.chat',
  'explore.pest',
  'explore.weather',
  'explore.soil',
  'explore.market'
]

export const exampleMessagesEnglish = [
  {
    heading: 'How can I',
    subheading: 'maximize limited space for crop cultivation?',
    message:
      'How can I small-scale farmers maximize limited space for crop cultivation?'
  },
  {
    heading: 'How do I',
    subheading: 'improve soil condition using natural methods?',
    message: 'How do I improve soil condition using natural methods?'
  },
  {
    heading: 'How can I',
    subheading: 'prevent pests and diseases in my paddy?',
    message: 'How can I prevent pests and diseases in my paddy?'
  },
  {
    heading: 'Can you provide',
    subheading: 'more details about PM Kissan Samman Yojna?',
    message: 'Can you provide more detail about PM Kissan Samman Yojna?'
  }
]

export const exampleMessagesTamil = [
  {
    heading: 'பயிர் சாகுபடிக்கு குறைந்த',
    subheading: 'இடத்தில் விவசாயிகள் எவ்வாறு லாபத்தை அதிகரிக்க முடியும்?',
    message:
      'பயிர் சாகுபடிக்கு குறைந்த இடத்தில் விவசாயிகள் எவ்வாறு லாபத்தை அதிகரிக்க முடியும்?'
  },
  {
    heading: 'இயற்கை முறைகளைப்',
    subheading: 'பயன்படுத்தி மண்ணின் நிலையை எவ்வாறு மேம்படுத்துவது?',
    message:
      'இயற்கை முறைகளைப் பயன்படுத்தி மண்ணின் நிலையை எவ்வாறு மேம்படுத்துவது?'
  },
  {
    heading: 'எனது நெற்பயிரில்',
    subheading: 'பூச்சிகள் மற்றும் நோய்களை எவ்வாறு தடுக்கலாம்?',
    message: 'எனது நெற்பயிரில் பூச்சிகள் மற்றும் நோய்களை எவ்வாறு தடுக்கலாம்?'
  },
  {
    heading: 'பிரதம மந்திரி கிசான்',
    subheading: 'சம்மான் யோஜனா பற்றி விவரங்களை வழங்க முடியுமா?',
    message:
      'பிரதம மந்திரி கிசான் சம்மான் யோஜனா பற்றி விவரங்களை வழங்க முடியுமா?'
  }
]

export const vegetableNamesInEnglish = {
  'Amaranth leaves': 'Amaranth leaves',
  Amla: 'Amla',
  'Ash gourd': 'Ash gourd',
  'Baby corn': 'Baby corn',
  'Banana flower': 'Banana flower',
  Beetroot: 'Beetroot',
  'Bell Pepper (Capsicum)': 'Bell Pepper (Capsicum)',
  'Bitter gourd': 'Bitter gourd',
  Bottlegourd: 'Bottlegourd',
  'Butter beans': 'Butter beans',
  'Broad beans (Fava beans, lima beans)':
    'Broad beans (Fava beans, lima beans)',
  Cabbage: 'Cabbage',
  Carrot: 'Carrot',
  Cauliflower: 'Cauliflower',
  'Cluster beans': 'Cluster beans',
  'Coconut (fresh)': 'Coconut (fresh)',
  'Colocasia leaves (Taro leaves)': 'Colocasia leaves (Taro leaves)',
  'Colocasia roots (Taro roots)': 'Colocasia roots (Taro roots)',
  'Coriander leaves (Cilantro)': 'Coriander leaves (Cilantro)',
  Corn: 'Corn',
  Cucumber: 'Cucumber',
  'Curry leaves': 'Curry leaves',
  'Dill leaves': 'Dill leaves',
  Drumsticks: 'Drumsticks',
  'Eggplant (Brinjal or Aubergine)': 'Eggplant (Brinjal or Aubergine)',
  'Brinjal ( Big )': 'Brinjal ( Big )',
  'Elephant Yam': 'Elephant Yam',
  'Fenugreek leaves': 'Fenugreek leaves',
  'French Beans (Green beans)': 'French Beans (Green beans)',
  Garlic: 'Garlic',
  Ginger: 'Ginger',
  'Green chili': 'Green chili',
  'Green onion (Scallian or Spring onion)':
    'Green onion (Scallian or Spring onion)',
  'Green peas': 'Green peas',
  'Ivy gourd': 'Ivy gourd',
  'Lemon (Lime)': 'Lemon (Lime)',
  Mango: 'Mango',
  'Mint leaves': 'Mint leaves',
  Mushroom: 'Mushroom',
  'Mustard leaves': 'Mustard leaves',
  'Okra (Ladies finger)': 'Okra (Ladies finger)',
  'Onion Big': 'Onion Big',
  'Onion Small': 'Onion Small',
  'Plantain (raw banana)': 'Plantain (raw banana)',
  Potato: 'Potato',
  Pumpkin: 'Pumpkin',
  'Radish (Daikon)': 'Radish (Daikon)',
  'Ridge gourd': 'Ridge gourd',
  'Shallot (pearl onion)': 'Shallot (pearl onion)',
  'Snake gourd': 'Snake gourd',
  'Sorrel leaves': 'Sorrel leaves',
  Spinach: 'Spinach',
  'Sweet potato': 'Sweet potato',
  Tomato: 'Tomato'
}

export const vegetableNamesInTamil = {
  'Amaranth leaves': 'அமராந்த் இலைகள்',
  Amla: 'ஆம்லா',
  'Ash gourd': 'வெள்ளைப் பூசணிக்காய்',
  'Baby corn': 'சிறு மக்காச்சோளம்',
  'Banana flower': 'வாழைப்பூ',
  Beetroot: 'பீட்ரூட்',
  'Bell Pepper (Capsicum)': 'குடை மிளகாய்',
  'Bitter gourd': 'பாகற்காய்',
  Bottlegourd: 'சுரைக்காய்',
  'Butter beans': 'பெரிய அவரை',
  'Broad beans (Fava beans, lima beans)': 'தட்டைமொச்சவகை',
  Cabbage: 'முட்டைக்கோஸ்',
  Carrot: 'கேரட்',
  Cauliflower: 'பூக்கோசு',
  'Cluster beans': 'கொத்தவரைங்காய்',
  'Coconut (fresh)': 'தேங்காய்',
  'Colocasia leaves (Taro leaves)': 'சேம்பு இலைகள்',
  'Colocasia roots (Taro roots)': 'சேப்பங்கிழங்கு வேர்',
  'Coriander leaves (Cilantro)': 'கொத்தமல்லி இலைகள்',
  Corn: 'சோளம்',
  Cucumber: 'வெள்ளரிக்காய்',
  'Curry leaves': 'கறிவேப்பிலை',
  'Dill leaves': 'வெந்தயம் இலைகள்',
  Drumsticks: 'முருங்கைக்காய்',
  'Eggplant (Brinjal or Aubergine)': 'கத்திரிக்காய்',
  'Brinjal ( Big )': 'கத்தரி (பெரிய)',
  'Elephant Yam': 'சேனைக்கிழங்கு',
  'Fenugreek leaves': 'வெந்தயக் கீரை',
  'French Beans (Green beans)': 'பச்சை பீன்ஸ்',
  Garlic: 'பூண்டு',
  Ginger: 'இஞ்சி',
  'Green chili': 'பச்சை மிளகாய்',
  'Green onion (Scallian or Spring onion)': 'பச்சை வெங்காயம்',
  'Green peas': 'பச்சை பட்டாணி',
  'Ivy gourd': 'கோவைக்காய்',
  'Lemon (Lime)': 'எலுமிச்சை',
  Mango: 'மாங்கனி',
  'Mint leaves': 'புதினா இலைகள்',
  Mushroom: 'காளான்',
  'Mustard leaves': 'கடுகு இலைகள்',
  'Okra (Ladies finger)': 'வெண்டை',
  'Onion Big': 'பெரிய வெங்காயம்',
  'Onion Small': 'சின்ன வெங்காயம்',
  'Plantain (raw banana)': 'வாழைப்பழம்',
  Potato: 'உருளைக்கிழங்கு',
  Pumpkin: 'பூசணிக்காய்',
  'Radish (Daikon)': 'முள்ளங்கி',
  'Ridge gourd': 'பீர்க்கங்காய்',
  'Shallot (pearl onion)': 'முத்து வெங்காயம்',
  'Snake gourd': 'புடலங்காய்',
  'Sorrel leaves': 'சிவந்த இலைகள்',
  Spinach: 'கீரை',
  'Sweet potato': 'சர்க்கரைவள்ளிக்கிழங்கு',
  Tomato: 'தக்காளி'
}

export const fruitsNamesInEnglish = {
  'Apple washington': 'Apple washington',
  'Apple Simla': 'Apple Simla',
  'Apple Green ( Smith )': 'Apple Green ( Smith )',
  Apricot: 'Apricot',
  'Avocado (Butterfruit)': 'Avocado (Butterfruit)',
  'Banana Morris Kg': 'Banana Morris Kg',
  'Banana Regular': 'Banana Regular',
  'Banana other': 'Banana other',
  'Cantaloupe (Musk melon)': 'Cantaloupe (Musk melon)',
  'Custard apple': 'Custard apple',
  'Gooseberry, Indian': 'Gooseberry, Indian',
  'Grapes ( Black )': 'Grapes ( Black )',
  'Grapes ( Green )': 'Grapes ( Green )',
  Guava: 'Guava',
  Jackfruit: 'Jackfruit',
  Lychee: 'Lychee',
  'Mango, ripe': 'Mango, ripe',
  'Mango, unripe': 'Mango, unripe',
  Orange: 'Orange',
  'Orange Imported': 'Orange Imported',
  Papaya: 'Papaya',
  Pears: 'Pears',
  Pineapple: 'Pineapple',
  Pomegranate: 'Pomegranate',
  'Sapota (Sapodilla)': 'Sapota (Sapodilla)',
  'Sugar cane': 'Sugar cane',
  'Sweet lime': 'Sweet lime',
  Watermelon: 'Watermelon'
}

export const fruitsNamesInTamil = {
  'Apple washington': 'ஆப்பிள் வாஷிங்டன்',
  'Apple Simla': 'ஆப்பிள் சிம்லா',
  'Apple Green ( Smith )': 'ஆப்பிள் கிரீன் (ஸ்மித்)',
  Apricot: 'பாதாமி பழம்',
  'Avocado (Butterfruit)': 'அவகேடோ (பட்டர்ஃப்ரூட்)',
  'Banana Morris Kg': 'வாழை மோரிஸ்',
  'Banana Regular': 'வாழைப்பழம் வழக்கமானது',
  'Banana other': 'வாழை மற்றது',
  'Cantaloupe (Musk melon)': 'பாகற்காய் (கஸ்தூரி முலாம்பழம்)',
  'Custard apple': 'கஸ்டர்ட் ஆப்பிள்',
  'Gooseberry, Indian': 'நெல்லிக்காய், இந்தியன்',
  'Grapes ( Black )': 'திராட்சை (கருப்பு)',
  'Grapes ( Green )': 'திராட்சை (பச்சை)',
  Guava: 'கொய்யா',
  Jackfruit: 'பலாப்பழம்',
  Lychee: 'லிச்சி',
  'Mango, ripe': 'மா, பழுத்த',
  'Mango, unripe': 'மாம்பழம், பழுக்காதது',
  Orange: 'ஆரஞ்சு',
  'Orange Imported': 'ஆரஞ்சு இறக்குமதி செய்யப்பட்டது',
  Papaya: 'பப்பாளி',
  Pears: 'பேரிக்காய்',
  Pineapple: 'அன்னாசி',
  Pomegranate: 'மாதுளை',
  'Sapota (Sapodilla)': 'சப்போட்டா (சப்போட்டா)',
  'Sugar cane': 'கரும்பு',
  'Sweet lime': 'இனிப்பு சுண்ணாம்பு',
  Watermelon: 'தர்பூசணி'
}

export const weatherMainInEnglish = {
  Thunderstorm: 'Thunderstorm',
  Drizzle: 'Drizzle',
  Rain: 'Rain',
  Snow: 'Snow',
  Clear: 'Clear',
  Clouds: 'Clouds',
  Mist: 'Mist',
  Haze: 'Haze'
}

export const weatherMainInTamil = {
  Thunderstorm: 'இடிப்புயல்',
  Drizzle: 'தூறல்',
  Rain: 'மழை',
  Snow: 'பனி',
  Clear: 'தெளிவு',
  Clouds: 'முகில்',
  Mist: 'மூடுபனி',
  Haze: 'மூடுபனி'
}

export const weatherDescriptionInEnglish = {
  'broken clouds': 'Broken clouds',
  'scattered clouds': 'Scattered clouds',
  'few clouds': 'Few clouds',
  'overcast clouds': 'Overcast clouds',
  'light rain': 'Light rain',
  'moderate rain': 'Moderate rain',
  'clear sky': 'Clear sky'
}

export const weatherDescriptionInTamil = {
  'broken clouds': 'உடைந்த மேகங்கள்',
  'scattered clouds': 'சிதறிய மேகங்கள்',
  'few clouds': 'சில மேகங்கள்',
  'overcast clouds': 'மேகமூட்டம்',
  'light rain': 'தூறல்',
  'moderate rain': 'மிதமான மழை',
  'clear sky': 'தெளிந்த வானம்'
}
