import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import React from 'react'
import { WobbleCard } from '../ui/wobble-card'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function MarketLinkage() {
  const locale = useLocale()
  return (
    <div className="flex flex-col items-center justify-center md:mt-[5rem] mt-[3rem] pb-10">
      <div className="md:w-[80%] 2xl:w-[70%] z-10">
        <div className="flex items-center justify-center md:justify-between w-full md:flex-row flex-col">
          <p
            className={cn(
              'md:text-5xl text-4xl pb-4 flex sm:flex-row flex-col text-center justify-center items-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-emerald-500 to-60% font-bold font-pops tracking-tighter mb-4'
            )}
          >
            {locale === 'en'
              ? `Find Market for your products`
              : `உங்கள் பொருட்களுக்கான சந்தையை கண்டறியுங்கள்`}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mx-auto">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 px-0 h-full border hover:border-green-600 duration-300"
            className=""
          >
            <div className="w-full">
              <h2 className="text-left text-balance text-2xl md:text-xl lg:text-3xl font-bold tracking-tighter text-white">
                {locale === 'en' ? 'AgriBegri' : 'அக்ரிபெக்ரி'}
              </h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">
                {locale === 'en'
                  ? `
                They are known for supplying Seeds, Fertilizers, Pesticides,
                Plant Growth Regulators, Irrigation and Farming Tools and
                Equipment that are required in agriculture. They provide
                guaranteed market's best price and customer support with Free
                Home Delivery throughout India.`
                  : `அவர்கள் விதைகள், உரங்கள், பூச்சிக்கொல்லிகள், தாவர வளர்ச்சி சீராக்கிகள், நீர்ப்பாசனம் மற்றும் விவசாயக் கருவிகள் மற்றும் விவசாயத்திற்குத் தேவையான உபகரணங்களை வழங்குவதில் பெயர் பெற்றவர்கள். இந்தியா முழுவதும் இலவச ஹோம் டெலிவரியுடன் சந்தையின் சிறந்த விலை மற்றும் வாடிக்கையாளர் ஆதரவை உத்தரவாதம் அளிக்கின்றன.`}
              </p>
              <Link href="https://agribegri.com/about_us.php#modal-sell">
                <Button className="mt-5">
                  {locale === 'en'
                    ? 'Click here for more info'
                    : 'மேலும் தகவலுக்கு'}
                </Button>
              </Link>
            </div>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-auto bg-cyan-700 border hover:border-blue-600 duration-300">
            <h2 className="text-left text-balance text-2xl md:text-xl lg:text-3xl font-bold tracking-tighter text-white">
              {locale === 'en' ? 'AgriBazaar' : 'அக்ரிபஜார்'}
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              {' '}
              {locale === 'en'
                ? `
                  AgriBazaar is a one-stop online trading platform for agri
              commodities such as tur, moong, urad, wheat, maize, barley, etc.`
                : `AgriBazaar என்பது டர், மூங், உளுந்து, கோதுமை, மக்காச்சோளம், பார்லி போன்ற விவசாயப் பொருட்களுக்கான ஒரு ஆன்லைன் வர்த்தக தளமாகும்.`}
            </p>
            <Link href="https://trade.agribazaar.com/createtrade">
              <Button className="mt-5">
                {locale === 'en'
                  ? 'Click here for more info'
                  : 'மேலும் தகவலுக்கு'}
              </Button>
            </Link>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 bg-gradient-to-tr from-slate-800 to-slate-900/90 to-60% min-h-auto border hover:border-slate-700 duration-300">
            <div>
              <h2 className="md:max-w-lg  text-left text-balance text-2xl md:text-xl lg:text-3xl font-bold tracking-tighter text-white">
                {locale === 'en' ? 'Farmer Bazaar' : 'உழவர் பஜார்'}
              </h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">
                {locale === 'en'
                  ? `
                  Farmer Bazaar is very easy and friendly mobile application for
                  agricultural products to buy and sell. Farmer Bazaar is a
                  trusted application for agricultural Products. All our users are
                  verified.`
                  : `உழவர் பஜார் விவசாய பொருட்களை வாங்க மற்றும் விற்க மிகவும் எளிதான மற்றும் நட்பு மொபைல் பயன்பாடு ஆகும். உழவர் பஜார் என்பது விவசாயப் பொருட்களுக்கான நம்பகமான பயன்பாடு ஆகும். எங்கள் பயனர்கள் அனைவரும் சரிபார்க்கப்பட்டுள்ளனர்.`}
              </p>
              <Link href="https://farmerbazaarapp.com/post-item">
                <Button className="mt-5">
                  {locale === 'en'
                    ? 'Click here for more info'
                    : 'மேலும் தகவலுக்கு'}
                </Button>
              </Link>
            </div>
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 bg-gradient-to-r from-green-700 from-10% via-green-700 via-30% to-emerald-700 to-60% px-0 h-full border hover:border-purple-700 duration-300"
            className=""
          >
            <div className="w-full">
              <h2 className="text-left text-balance font-bold tracking-tighter text-2xl md:text-xl lg:text-3xl text-white">
                {locale === 'en' ? 'AgrisNet' : 'அக்ரிஸ்நெட்'}
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                {locale === 'en'
                  ? 'It helps farmers in increasing crop productivity and net incomein a given area through specific crop intervention at the farm level and sustaining it in the long term. Providing a comprehensive information technology platform to enable farmers to access and disseminate information whenever and wherever they need it.'
                  : 'பண்ணை மட்டத்தில் குறிப்பிட்ட பயிர் தலையீட்டின் மூலம் குறிப்பிட்ட பகுதியில் பயிர் உற்பத்தித்திறன் மற்றும் நிகர வருவாயை அதிகரிக்க இது விவசாயிகளுக்கு உதவுகிறது மற்றும் நீண்ட காலத்திற்கு அதை நிலைநிறுத்துகிறது. விவசாயிகள் எப்போது வேண்டுமானாலும் எங்கு வேண்டுமானாலும் தகவல்களை அணுகவும் பரப்பவும் ஒரு விரிவான தகவல் தொழில்நுட்ப தளத்தை வழங்குதல்.'}
              </p>
              <Link href="https://www.tnagrisnet.tn.gov.in/home/index/">
                <Button className="mt-5">
                  {locale === 'en'
                    ? 'Click here for more info'
                    : 'மேலும் தகவலுக்கு'}
                </Button>
              </Link>
            </div>
          </WobbleCard>
        </div>
      </div>
    </div>
  )
}
