const URL_REGEX = /(https?:\/\/[^\s]+)/g
const EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g
const PHONE_REGEX = /(\+?\d{1,4}[-.\s]?\(?\d{1,}\)?[-.\s]?\d{1,}[-.\s]?\d{1,})/g

const SOCIAL_MEDIA_PATTERNS = [
  { name: 'Facebook', pattern: /facebook\.com/ },
  { name: 'Twitter', pattern: /twitter\.com|x\.com/ },
  { name: 'Instagram', pattern: /instagram\.com/ },
  { name: 'LinkedIn', pattern: /linkedin\.com/ },
  { name: 'YouTube', pattern: /youtube\.com|youtu\.be/ },
  { name: 'TikTok', pattern: /tiktok\.com/ }
]

export const getUrlType = (url: string): string => {
  for (const social of SOCIAL_MEDIA_PATTERNS) {
    if (social.pattern.test(url)) {
      return social.name
    }
  }
  return 'Website'
}

export const formatPhoneNumber = (phone: string): string => { return phone.trim() }
export const formatEmail = (email: string): string => { return email.trim() }

export const parseInteractiveElements = (text: string) => {
  const urlMatches = Array.from(text.matchAll(URL_REGEX))
  const emailMatches = Array.from(text.matchAll(EMAIL_REGEX))
  const phoneMatches = Array.from(text.matchAll(PHONE_REGEX))

  const allMatches = [
    ...urlMatches.map(match => ({
      type: 'url',
      value: match[0],
      displayType: getUrlType(match[0]),
      index: match.index || 0,
      length: match[0].length
    })),
    ...emailMatches.map(match => ({
      type: 'email',
      value: formatEmail(match[0]),
      displayType: 'Email',
      index: match.index || 0,
      length: match[0].length
    })),
    ...phoneMatches.map(match => ({
      type: 'phone',
      value: formatPhoneNumber(match[0]),
      displayType: 'Phone',
      index: match.index || 0,
      length: match[0].length
    }))
  ]

  allMatches.sort((a, b) => a.index - b.index)
  return allMatches
}