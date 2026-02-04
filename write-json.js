const fs = require('fs');
const data = {
  week: 1,
  chapter: 'Genesis 1',
  confession: 'Creation',
  theme: 'Foundations',
  days: [{
    day: 1,
    title: 'Day 1: In the Beginning',
    scripture: {
      reference: 'Genesis 1:1',
      text: 'In the beginning, God created the heavens and the earth.'
    },
    adult: {
      walkCue: 'Take a quiet walk and reflect on new beginnings.',
      meditation: 'Close your eyes and breathe deeply. With each breath, release what no longer serves you and welcome what is to come.',
      prompt: 'What new beginning are you committing to?',
      responses: [
        'I commit to living with greater intentionality.',
        'I commit to deepening my faith journey.',
        'I commit to serving others more faithfully.'
      ]
    },
    kids: {
      story: 'In the very beginning, before anything existed, God spoke and created everything - the stars, the earth, the animals, and people. God looked at all He made and said it was very good.',
      question: 'What is one thing God created that you are thankful for?',
      responses: [
        {text: 'The sun', correct: true},
        {text: 'Animals', correct: true},
        {text: 'People', correct: true}
      ],
      prayer: 'Thank you, God, for creating the beautiful world we live in. Help us take care of it and each other.'
    }
  }]
};
fs.writeFileSync('/Users/jeremycourtois/Documents/covenant-path/public/data/weeks/week01.json', JSON.stringify(data, null, 2));
console.log('Done');
