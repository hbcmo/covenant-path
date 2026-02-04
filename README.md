# Covenant Path - Year-Long Devotional Journey

A Next.js devotional application that guides believers through the 1689 Baptist Confession over 52 weeks with interactive games, progress tracking, and engaging content for both adults and children.

## 📅 Content Structure

### Overview
- **52 weeks** of devotional content
- **7 days per week** = 364 days total
- Covers the entire **1689 Baptist Confession** systematically
- Both **Adult** and **Kids** modes

### Weekly Progression
The app automatically calculates which week and day you're on based on your start date stored in localStorage (`covenantPath_startDate`).

| Week | Chapter | Theme | Focus |
|------|---------|-------|-------|
| 1-2 | 1 | Holy Scripture | Authority and inspiration of God's Word |
| 3-4 | 2 | God and Trinity | Nature of God, the Trinity |
| 5 | 3 | God's Decree | Divine sovereignty |
| 6-7 | 4-5 | Creation & Providence | God the Creator, His sustaining power |
| 8-9 | 6 | The Fall | Sin enters the world, original sin |
| 10-11 | 7 | Covenants | Covenant of Works and Grace |
| 12-15 | 8 | Christ the Mediator | Jesus as Prophet, Priest, King |
| 16-31 | 9-18 | Salvation Doctrines | Free will, calling, justification, adoption, sanctification, faith, repentance, good works, perseverance, assurance |
| 32-36 | 19-20 | Law & Liberty | God's law, Christian liberty, conscience |
| 37-39 | 21-22 | Worship | Proper worship, prayer, Sabbath |
| 40-44 | 23-26 | Church | Church officers, marriage, visible/invisible church |
| 45-50 | 27-31 | Sacraments & Discipline | Baptism, Lord's Supper, church discipline |
| 51-52 | 32 | End Times | Final judgment, eternal state |

### Daily Structure

Each day includes:

#### For Adults:
1. **Scripture Verse** - ESV translation
2. **1689 Confession Text** - Actual excerpt from the confession for that week
3. **Walk Cue** - Deep theological reflection prompt
4. **Meditation** - Rich theological content with:
   - Historical context
   - Doctrinal depth
   - Critical questions
   - Practical application
5. **Interactive Game** - Rotates daily (see below)
6. **Response Questions** - 5 theologically robust response options
7. **Closing** - Reflection and completion

#### For Kids:
1. **Scripture Verse** - Same ESV text
2. **Story** - Age-appropriate explanation
3. **Question** - Simple reflection prompt
4. **Interactive Game** - Same games as adults
5. **Response Options** - Simplified responses
6. **Prayer** - Short closing prayer

## 🎮 Interactive Games

Games rotate based on day number (`day % 3`):

- **Day 1, 4, 7**: 🔍 **Word Search** - Find 8 faith words in the grid
- **Day 2, 5**: 🎨 **Coloring Page** - Click colors then click to color shapes
- **Day 3, 6**: 🧠 **Memory Match** - Match theological terms with definitions

## 🎯 Progress Tracking

### Stats Dashboard
- **🔥 Streak Counter** - Consecutive days completed
- **⭐ Total Days** - Total completed days
- **📖 Current Week** - Shows week number and theme

### Completion Tracking
- Stored in `localStorage` under `covenantPath_completed`
- Array of date strings
- Triggers celebration animation on completion

### Journey Reset
Users can reset their journey from the home page, clearing their start date and starting over.

## 📂 File Structure

```
/public/data/weeks/
  ├── week01.json  (Holy Scripture - The Word of God)
  ├── week02.json  (Holy Scripture - Divine Inspiration)
  ├── week03.json  (God and Trinity - Nature of God)
  ...
  └── week52.json  (End Times - Final Judgment)

/src/
  ├── app/
  │   ├── page.tsx           (Landing page with Begin/Reset)
  │   ├── daily/page.tsx     (Main devotional flow)
  │   └── globals.css        (Styles + animations)
  ├── components/
  │   ├── WordSearch.tsx     (Interactive word search game)
  │   ├── ColoringPage.tsx   (Click-to-color SVG game)
  │   └── MemoryMatch.tsx    (Card matching game)
  └── lib/
      ├── progression.ts     (Date/week calculation)
      └── config.ts          (Mode switching: adult/kids)

/confession-texts.json  (52 excerpts from 1689 Confession)
/content-plan.json     (Mapping of weeks to confession chapters)
/generate-content.js   (Script to regenerate all 52 weeks)
```

## 📖 Week Data Format

Each week file (`weekXX.json`) contains:

```json
{
  "week": 1,
  "chapter": 1,
  "confession": "Holy Scripture",
  "theme": "The Word of God",
  "days": [
    {
      "day": 1,
      "title": "Day 1",
      "scripture": {
        "reference": "Psalm 119:105",
        "text": "Your word is a lamp..."
      },
      "confession": {
        "chapter": "1.1",
        "text": "The Holy Scripture is the only sufficient..."
      },
      "adult": {
        "walkCue": "...",
        "meditation": "...",
        "prompt": "...",
        "responses": [...]
      },
      "kids": {
        "story": "...",
        "question": "...",
        "responses": [...],
        "prayer": "..."
      }
    }
    // ... days 2-7
  ]
}
```

## 🔍 Checking Specific Days

### View Day 1, Week 1
```bash
cat public/data/weeks/week01.json | jq '.days[0]'
```

### View Week 10 Overview
```bash
cat public/data/weeks/week10.json | jq '{week, theme, confession}'
```

### List All Week Themes
```bash
for i in {01..52}; do
  echo "Week $i: $(cat public/data/weeks/week$i.json | jq -r '.theme')"
done
```

### Check Adult Meditation for Week 5, Day 3
```bash
cat public/data/weeks/week05.json | jq '.days[2].adult.meditation'
```

### Check Kids Content for Week 12, Day 1
```bash
cat public/data/weeks/week12.json | jq '.days[0].kids'
```

## 🛠️ Development

### Generate/Regenerate Content
```bash
# Regenerate weeks 2-52
node generate-content.js

# Regenerate week 1
node regenerate-week1.js
```

### Build & Run
```bash
# Production build
npm run build

# Start custom server (required - dev server hangs)
node server.js
```

### Access the App
- Development: `http://localhost:3000`
- Landing page: `/`
- Daily devotional: `/daily`

## 🎨 Features

### Gamification
- ✅ Streak tracking
- ✅ Total days counter
- ✅ Progress bar through 5 steps
- ✅ Celebration animations (🎉 bouncing, ⭐ pinging)
- ✅ Gradient buttons with hover effects

### Responsive Design
- Mobile-first approach
- Tailwind CSS 4
- Custom animations (@keyframes bounce, ping)
- Gradient backgrounds

### Mode Switching
- Toggle between Adult/Kids content
- Persists in localStorage
- Different complexity levels

### Navigation
- 5-step flow: Walk → Meditation → Play → Response → Closing
- Back buttons on Meditation and Play steps
- Progress indicator

## 📝 Content Generation

The content is programmatically generated using:
1. **content-plan.json** - Maps 52 weeks to 1689 chapters
2. **confession-texts.json** - Contains actual confession excerpts
3. **generate-content.js** - Creates all week files with:
   - Generic ESV verses (7 per week)
   - Theologically rich adult content
   - Kid-friendly stories and prayers
   - Actual 1689 Confession text

## 🔐 LocalStorage Keys

- `covenantPath_startDate` - ISO date string when journey began
- `covenantPath_mode` - "adult" or "kids"
- `covenantPath_completed` - Array of completed date strings

## 🚀 Deployment Notes

- Uses Next.js 16.1.4 with Turbopack
- Production build only (dev server has hanging issues)
- Custom Node.js server (`server.js`) bypasses dev issues
- All routes pre-rendered as static content
- No server-side dependencies at runtime

## 📚 Theological Foundations

Based on:
- **1689 Baptist Confession** (Second London Confession)
- **ESV Bible** translation
- Reformed theology
- Historic Baptist distinctives

Content emphasizes:
- God-centered theology
- Scripture authority
- Covenant theology
- Practical application
- Historical context

---

**Start your journey today at** `http://localhost:3000` 🚶‍♂️📖✨

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
