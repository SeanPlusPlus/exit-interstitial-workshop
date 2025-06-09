# Exit Interstitial Workshop

Standalone exit interstitial proof of concept

https://exit-interstitial-workshop.vercel.app/

## Local Development Setup

### Clone and install

```
git clone git@github.com:SeanPlusPlus/exit-interstitial-workshop.git
cd exit-interstitial-workshop
npm i
```

### Setup a local secret key

Create a `.env` file and save this content in it

```
EXIT_SECRET=my-super-secret-key
```

### Generate a URL with src and dest URL search params

```
node scripts/generateLink.js
```

### Run the dev server locally

```
npm run dev
```

Now you should be able to take the URL generated from the `generateLink.js` script and paste that into your browser
