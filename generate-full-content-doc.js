const fs = require('fs');
const path = require('path');

// Generate complete content documentation
function generateFullContentDoc() {
  let output = '# Covenant Path - Complete Content Documentation\n\n';
  output += 'This document contains the FULL content for all 52 weeks and 364 days of the devotional journey.\n\n';
  output += '---\n\n';

  for (let weekNum = 1; weekNum <= 52; weekNum++) {
    const weekFile = path.join(__dirname, 'public', 'data', 'weeks', `week${String(weekNum).padStart(2, '0')}.json`);
    
    if (!fs.existsSync(weekFile)) {
      output += `## Week ${weekNum}: FILE NOT FOUND\n\n`;
      continue;
    }

    const weekData = JSON.parse(fs.readFileSync(weekFile, 'utf8'));
    
    output += `# Week ${weekData.week}: ${weekData.theme}\n\n`;
    output += `**1689 Confession**: ${weekData.confession}\n`;
    output += `**Chapter**: ${weekData.chapter}\n\n`;

    weekData.days.forEach((day, index) => {
      output += `## Day ${day.day}\n\n`;
      
      // Scripture
      output += `### 📖 Scripture\n`;
      output += `**Reference**: ${day.scripture.reference}\n\n`;
      output += `**Text**: "${day.scripture.text}"\n\n`;
      
      // Confession Text
      if (day.confession) {
        output += `### 📜 1689 Baptist Confession (Chapter ${day.confession.chapter})\n\n`;
        output += `${day.confession.text}\n\n`;
      }
      
      // Adult Content
      output += `### 👨 Adult Mode\n\n`;
      output += `#### Walk Cue\n${day.adult.walkCue}\n\n`;
      output += `#### Meditation\n${day.adult.meditation}\n\n`;
      output += `#### Response Prompt\n${day.adult.prompt}\n\n`;
      output += `#### Response Options\n`;
      day.adult.responses.forEach((response, i) => {
        output += `${i + 1}. ${response}\n`;
      });
      output += `\n`;
      
      // Kids Content
      output += `### 👧 Kids Mode\n\n`;
      output += `#### Story\n${day.kids.story}\n\n`;
      output += `#### Question\n${day.kids.question}\n\n`;
      output += `#### Response Options\n`;
      day.kids.responses.forEach((response, i) => {
        output += `${i + 1}. ${response}\n`;
      });
      output += `\n`;
      output += `#### Prayer\n${day.kids.prayer}\n\n`;
      
      output += `---\n\n`;
    });
    
    output += `\n\n`;
  }

  return output;
}

const fullContent = generateFullContentDoc();
fs.writeFileSync('./FULL_CONTENT.md', fullContent);
console.log('✓ FULL_CONTENT.md generated successfully!');
console.log(`Total size: ${(fullContent.length / 1024 / 1024).toFixed(2)} MB`);
