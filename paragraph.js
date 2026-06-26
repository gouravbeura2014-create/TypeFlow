/* ==========================================
   TYPEFLOW PARAGRAPHS
   Version 1.0
========================================== */

const paragraphs = [

"Practice makes progress, and every keystroke brings you closer to becoming a faster and more accurate typist.",

"Technology continues to transform the way people communicate, learn, and solve problems across the world every single day.",

"Typing is more than speed; accuracy, consistency, and focus together create an efficient and enjoyable experience.",

"The future belongs to curious minds who never stop asking questions and always remain eager to discover something new.",

"Programming teaches logical thinking, creativity, and patience while encouraging people to build solutions for real-world challenges.",

"Artificial intelligence is changing industries rapidly, but human imagination and critical thinking remain equally important.",

"Success is rarely achieved overnight. Small improvements made consistently over time produce remarkable long-term results.",

"Reading regularly expands knowledge, strengthens vocabulary, and helps develop better communication and problem-solving abilities.",

"The quick brown fox jumps over the lazy dog while curious children continue exploring the fascinating world of science.",

"Every expert was once a beginner who refused to give up despite making mistakes during the learning journey.",

"Space exploration inspires humanity to dream beyond the limits of Earth and search for answers hidden among the stars.",

"A calm mind, focused attention, and regular practice are the foundation of excellent typing performance.",

"Knowledge becomes powerful when it is applied wisely to solve meaningful problems and improve everyday life.",

"Curiosity is the first step toward innovation because every great discovery begins with a simple question.",

"Learning never ends because every new skill opens the door to even greater opportunities and exciting adventures."

];

/* ==========================================
   RANDOM PARAGRAPH FUNCTION
========================================== */

function getRandomParagraph(){

    return paragraphs[
        Math.floor(
            Math.random() * paragraphs.length
        )
    ];

}
