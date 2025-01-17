import React from 'react'
import Image from 'next/image'

const AIAvatar: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 cursor-pointer">
      <Image
        src="/ai-avatar.png"
        alt="AI Support Avatar"
        width={80}
        height={80}
        className="rounded-full border-2 border-gold"
      />
    </div>
  )
}

export default AIAvatar

