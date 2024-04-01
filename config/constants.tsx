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

export const tableHeaderInEnglish = [
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

export const tableHeaderInTamil = [
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
    url: '/chat'
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
  'navigation.settings'
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
    subheading: 'சம்மான் யோஜனா பற்றி மேலும் விவரங்களை வழங்க முடியுமா?',
    message:
      'பிரதம மந்திரி கிசான் சம்மான் யோஜனா பற்றி மேலும் விவரங்களை வழங்க முடியுமா?'
  }
]
