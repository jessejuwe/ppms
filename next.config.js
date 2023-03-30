/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: 'AIzaSyB4s0rxDAKN6JCcZJH4PmWrxK1Gd1a4ucg',
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'ppms-af3c8.firebaseapp.com',
    NEXT_PUBLIC_FIREBASE_DATABASE_URL:
      'https://ppms-af3c8-default-rtdb.firebaseio.com',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'ppms-af3c8',
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'gs://ppms-af3c8.appspot.com',
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '437885695348',
    NEXT_PUBLIC_FIREBASE_APP_ID: '1:437885695348:web:3b83dbac05e48e3a856821',
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'G-YCX96GTV7L',
  },
};

module.exports = nextConfig;
