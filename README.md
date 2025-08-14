# Monde International Sdn Bhd Website

A professional logistics website for Malaysia-China & Hong Kong trade specialists.

## Features

- 🌏 Bilingual support (English/Chinese)
- 📱 Fully responsive design
- 🚢 Interactive shipping timeline
- 📊 Trade route visualization
- 📝 Contact form with Firebase integration
- ⚡ Fast loading static site

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid & Flexbox
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter (Google Fonts)
- **Backend**: Firebase (for contact forms)
- **Deployment**: Vercel

## Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/WeBot-IT-Services/monde-international)

### Manual Deploy to Vercel

1. **Via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import `WeBot-IT-Services/monde-international`
   - Click "Deploy"

2. **Via Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

### Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration
5. Click "Deploy"

## Local Development

To run the site locally:

```bash
# Install serve utility
npm install

# Start local server
npm run dev
```

The site will be available at `http://localhost:3000`

## Project Structure

```
monde-international/
├── public/              # Static assets
│   ├── index.html      # Main HTML file
│   ├── style.css       # Styles
│   ├── form-handler.js # JavaScript functionality
│   ├── favicon.ico     # Site icon
│   └── images/         # Image assets
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
└── README.md          # This file
```

## Environment Variables

For the contact form to work properly, configure these in Vercel:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`

## Contact

**Monde International Sdn Bhd**
- Phone: +60 3-2785 6800
- Email: info@mondeinternational.com.my
- Address: Level 23-1 Premier Suite One Mont Kiara, No. 1 Jalan Kiara, Mont Kiara, 50480 Kuala Lumpur
