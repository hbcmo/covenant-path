const fs = require('fs');
const path = require('path');
const contentPlan = require('./content-plan.json');
const confessionTexts = require('./confession-texts.json');

// Helper function to lowercase first letter only, unless it's "God"
function lowerCaseFirst(text) {
  if (!text) return text;
  // Don't lowercase if text starts with "God"
  if (text.startsWith('God')) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

// Generate a complete week file with themed content
function generateWeekFile(weekNumber) {
  const confessionText = confessionTexts.confessionTexts.find(c => c.week === weekNumber);
  const weekInfo = contentPlan.weeks.find(w => w.week === weekNumber);
  
  // Generic scripture references - these serve as placeholders
  // In production, these would be replaced with confession-specific verses
  const genericScriptures = [
    { ref: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." },
    { ref: "2 Timothy 3:16", text: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness." },
    { ref: "Hebrews 4:12", text: "For the word of God is living and active, sharper than any two-edged sword." },
    { ref: "Psalm 19:7", text: "The law of the LORD is perfect, reviving the soul; the testimony of the LORD is sure, making wise the simple." },
    { ref: "Matthew 4:4", text: "Man shall not live by bread alone, but by every word that comes from the mouth of God." },
    { ref: "John 17:17", text: "Sanctify them in the truth; your word is truth." },
    { ref: "Romans 15:4", text: "For whatever was written in former days was written for our instruction, that through endurance and through the encouragement of the Scriptures we might have hope." }
  ];
  
  const days = [];
  for (let day = 1; day <= 7; day++) {
    const scripture = genericScriptures[day - 1];
    
    days.push({
      day,
      title: `Day ${day}`,
      scripture: {
        reference: scripture.ref,
        text: scripture.text
      },
      confession: {
        chapter: confessionText.chapter,
        text: confessionText.text
      },
      adult: {
        walkCue: `As you walk today, allow the weight of ${lowerCaseFirst(weekInfo.theme)} to penetrate your understanding. Consider how the Reformers wrestled with this truth, and how it confronts modern idolatries and shallow thinking. What implications does this doctrine have for your vocation, relationships, and worship?`,
        meditation: `The 1689 Confession addresses ${weekInfo.confession} with theological precision forged in the crucible of persecution and exile. The framers understood that ${lowerCaseFirst(weekInfo.theme)} is not merely an abstract concept but a living reality that demands both intellectual assent and heart transformation. 

Consider: How does this doctrine reveal the character of the Triune God? What error does it guard against? The Confession states these truths not as speculation but as biblical necessity—drawn from the whole counsel of Scripture and tested through centuries of Church history.

Reflect deeply: In what ways does contemporary Christianity dilute or distort this teaching? How might recovering this truth reshape your prayer life, your reading of Scripture, and your engagement with culture? What would it look like to live with this doctrine as a governing reality rather than a theoretical footnote?`,
        prompt: `This truth about ${lowerCaseFirst(weekInfo.theme)} requires a response. How will the Holy Spirit transform you through this meditation?`,
        responses: [
          "I will study the biblical foundations more rigorously, tracing this doctrine through redemptive history",
          "I will confess where my thinking has been shallow or man-centered rather than God-centered",
          "I will teach this truth to others, helping them see its beauty and necessity",
          "I will examine my life for practical inconsistencies with this doctrine and repent",
          "I will worship God more deeply, letting this truth fuel both gratitude and holy fear"
        ]
      },
      kids: {
        story: `Today we're learning about ${weekInfo.theme}! The Bible teaches us important things about who God is and how He works. ${scripture.text} This verse shows us something special about God's Word and how it helps us know Him better.`,
        question: `What does this verse teach you about God and His Word?`,
        responses: [
          "God loves me and wants me to know Him",
          "God's Word is true and helps me every day",
          "I can trust God because He is good",
          "God made everything and cares for me"
        ],
        prayer: `Thank You, God, for teaching me about ${weekInfo.theme}. Help me remember what I learned today and follow You. Amen.`
      }
    });
  }
  
  const weekData = {
    week: weekNumber,
    chapter: weekInfo.chapter,
    confession: weekInfo.confession,
    theme: weekInfo.theme,
    days
  };
  
  return weekData;
}

// Main execution
function generateAllWeeks() {
  const outputDir = path.join(__dirname, 'public', 'data', 'weeks');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate weeks 2-52 (week 1 already exists)
  for (let week = 2; week <= 52; week++) {
    const weekData = generateWeekFile(week);
    const filename = `week${String(week).padStart(2, '0')}.json`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(weekData, null, 2));
    console.log(`Generated ${filename}`);
  }
  
  console.log('\\n✓ All 52 weeks generated successfully!');
  console.log('\\nNote: Scripture passages are generic placeholders.');
  console.log('You can refine each week with confession-specific verses later.');
}

// Run if called directly
if (require.main === module) {
  generateAllWeeks();
}

module.exports = { generateWeekFile, generateAllWeeks };
