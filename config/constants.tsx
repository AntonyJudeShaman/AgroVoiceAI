import {
  BugOffIcon,
  CloudDrizzle,
  CropIcon,
  HeartPulseIcon,
  IndianRupee,
  InspectIcon,
  TractorIcon,
  WheatIcon
} from 'lucide-react'
import Image from 'next/image'
import cropfield from '../public/images/crop-field.jpeg'
import pestdetection from '../public/images/pests.jpeg'
import weather from '../public/images/weather-cloud.jpeg'
import cropMgmt from '../public/images/crop-mgmt.jpeg'
import market from '../public/images/market.jpeg'
import farmqa from '../public/images/farmqa.jpeg'
import soil from '../public/images/soil.jpg'

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
)

export function CropField() {
  return <Image src={cropfield.src} className='rounded-md' alt="" height={220} width={1024} />
}

export function PestField() {
  return <img src={pestdetection.src} className='rounded-md' alt=""  />
}

export function WeeatherField() {
  return <img src={weather.src} className='rounded-md' alt=""  />
}

export function CropMgmtField() {
  return <img src={cropMgmt.src} className='rounded-md' alt=""  />
}

export function MarketField() {
  return <img src={market.src} className='rounded-md' alt=""  />
}

export function FarmingField() {
  return <img src={farmqa.src} className='rounded-md' alt=""  />
}

export function SoilField() {
  return <img src={soil.src} className='rounded-md' alt=""  />
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
    header: <WeeatherField />
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
    description:
      'Ask farming questions, get accurate answers instantly.',
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