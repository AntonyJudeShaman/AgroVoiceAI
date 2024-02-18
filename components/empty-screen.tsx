import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'உங்கள் பண்ணையில் பூச்சிகளைக் கையாள்வது',
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
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to AgroVoiceAI Chatbot!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground"></p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
