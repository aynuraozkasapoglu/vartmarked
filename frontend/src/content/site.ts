// Dile bagli OLMAYAN sabitler. Metinler locales/*.json'da durur.

export const SITE = {
  name: 'Vårt Marked',
  domain: 'https://vartmarked.no',
  phone: '+4792249005',
  phoneDisplay: '92 24 90 05',
  whatsapp: '4792249005',
  email: 'post@vartmarked.no',
  orgNr: '915 026 915',
  founded: 2016,
  address: {
    street: 'Fossumveien 60',
    postalCode: '0985',
    city: 'Oslo',
    country: 'NO',
    lat: 59.962428,
    lng: 10.9224773,
  },
  social: {
    facebook: 'https://www.facebook.com/vaartmarked',
    instagram: 'https://www.instagram.com/vaartmarked/',
    tiktok: 'https://www.tiktok.com/@vaartmarked',
  },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.5!2d10.9224773!3d59.962428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46417aa38ec3b99f%3A0xdeda1579832c1ed3!2sV%C3%A5rt%20Marked!5e0!3m2!1sno!2sno!4v1',
} as const

export const STATS = [
  { key: 'yearsLabel', value: '25+' },
  { key: 'itemsLabel', value: '3000+' },
  { key: 'daysLabel', value: '7' },
] as const

export const FEATURES = [
  { key: 'fresh', icon: '🥦' },
  { key: 'international', icon: '🌍' },
  { key: 'prices', icon: '💰' },
  { key: 'experience', icon: '🤝' },
] as const

export const PRODUCTS = [
  { key: 'vegetables', icon: '🥬' },
  { key: 'fruit', icon: '🍎' },
  { key: 'meat', icon: '🥩' },
  { key: 'fish', icon: '🐟' },
  { key: 'dairy', icon: '🧀' },
  { key: 'bakery', icon: '🍞' },
  { key: 'specialties', icon: '🫒' },
] as const

// Acilis saatleri: gun anahtari + saat. Saatler dilden bagimsiz.
export const HOURS = [
  { key: 'mon', opens: '08:00', closes: '21:00', schemaDay: 'Monday' },
  { key: 'tue', opens: '08:00', closes: '21:00', schemaDay: 'Tuesday' },
  { key: 'wed', opens: '08:00', closes: '21:00', schemaDay: 'Wednesday' },
  { key: 'thu', opens: '08:00', closes: '21:00', schemaDay: 'Thursday' },
  { key: 'fri', opens: '08:00', closes: '21:00', schemaDay: 'Friday' },
  { key: 'sat', opens: '08:00', closes: '21:00', schemaDay: 'Saturday' },
  { key: 'sun', opens: '10:00', closes: '19:00', schemaDay: 'Sunday' },
] as const

// Marka adlari cevrilmez; yalniz iki tanesi dile bagli (contact.payment.*)
export const PAYMENT_BRANDS = ['Visa', 'Mastercard', 'Amex'] as const
export const PAYMENT_TRANSLATED = ['contactless', 'cash'] as const
