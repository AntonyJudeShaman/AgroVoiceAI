import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight, IconOpenAI } from '@/components/ui/icons'

const exampleMessages = [
  // பூச்சிகளைக் கையாள்வது
  {
    heading: 'உங்கள் பண்ணையில்',
    message:
      'தீங்கு விளைவிக்கும் இரசாயனங்களை நாடாமல் எங்கள் பயிர்களில் பூச்சிகளை நிர்வகிக்க சில பயனுள்ள மற்றும் சுற்றுச்சூழல் நட்பு வழிகள் யாவை?'
  },
  {
    heading: 'மண் வளத்தை மேம்படுத்துதல்',
    message:
      'நமது மண்ணின் ஆரோக்கியத்தையும் வளத்தையும் மேம்படுத்தவும், சிறந்த விளைச்சல் மற்றும் நிலைத்தன்மையை உறுதி செய்யவும் நாம் என்ன எளிய நடைமுறைகளைக் கடைப்பிடிக்கலாம்?'
  },
  {
    heading: 'பயிர் சுழற்சியை மேம்படுத்துதல்',
    message:
      'உற்பத்தித்திறனை அதிகரிக்கவும், மண் குறைவதைத் தடுக்கவும், நோய்களின் அபாயத்தைக் குறைக்கவும் ஒரு திறமையான பயிர் சுழற்சி திட்டத்தை எவ்வாறு செயல்படுத்துவது?'
  },
  {
    heading: 'பயிர் சுழற்சியை மேம்படுத்துதல்',
    message:
      'உற்பத்தித்திறனை அதிகரிக்கவும், மண் குறைவதைத் தடுக்கவும், நோய்களின் அபாயத்தைக் குறைக்கவும் ஒரு திறமையான பயிர் சுழற்சி திட்டத்தை எவ்வாறு செயல்படுத்துவது?'
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-full flex justify-center ">
    <div className="max-w-3xl mx-auto pt-[5rem]">
      <IconOpenAI className="size-16 mx-auto " />
      <p className="mx-auto flex justify-center pt-4 text-3xl font-semibold">
        AgroVoiceAI
      </p>
    </div>
    <div className="mx-auto max-w-3xl absolute bottom-40 grid grid-cols-2 gap-3 p-4">
      {exampleMessages.map((message, index) => (
        <Button
          key={index}
          variant="ghost"
          className="h-auto rounded-2xl px-4 py-6 space-x-4 border justify-start dark:border-gray-800 dark:hover:border-gray-700 bg-background text-base"
          onClick={() => setInput(message.message)}
        >
          {/* <IconArrowRight className="mr-2  text-muted-foreground" /> */}
          {message.heading}
        </Button>
      ))}
    </div>
  </div>
  
  )
}
