// Social Engineering: The Art of Human Hacking — Master Dataset
// Author: Christopher Hadnagy | Foreword by Kevin Mitnick | Wiley Publishing

import ch1 from './chapters/ch1.json';
import ch2 from './chapters/ch2.json';
import ch3 from './chapters/ch3.json';
import ch4 from './chapters/ch4.json';
import ch5 from './chapters/ch5.json';
import ch6 from './chapters/ch6.json';
import ch7 from './chapters/ch7.json';
import ch8 from './chapters/ch8.json';
import ch9 from './chapters/ch9.json';

export const BOOK_METADATA = {
  title: "Social Engineering",
  subtitle: "The Art of Human Hacking",
  author: "Christopher Hadnagy",
  authorRole: "Chief Human Hacker & Founder of Social-Engineer.org",
  foreword: "Kevin Mitnick (The World's Most Famous Hacker)",
  publisher: "Wiley Publishing, Inc.",
  pages: 474,
  chaptersCount: 9,
  mantra: "Amateurs Hack Systems • Professionals Hack People • Humans Are the Ultimate Security Exploit"
};

export const PARTS = [
  {
    id: 1,
    title: "Phase I: Reconnaissance & Human OSINT",
    subtitle: "Understanding Social Engineering & Information Gathering",
    description: "Laying the groundwork: the definition of social engineering, ethical security boundaries, non-invasive OSINT gathering, communication modeling, and digital footprinting.",
    chapters: [1, 2]
  },
  {
    id: 2,
    title: "Phase II: The Psychological Attack Surface",
    subtitle: "Elicitation, Pretexting & Exploiting Cognitive Biases",
    description: "The core mechanics of human hacking: eliciting sensitive data without triggering suspicion, creating bulletproof pretexting personas, manipulating modes of thinking, and executing the Human Buffer Overflow.",
    chapters: [3, 4, 5, 6]
  },
  {
    id: 3,
    title: "Phase III: Weaponry, Case Studies & Active Defense",
    subtitle: "Hardware Tools, Historic Exploits & Bulletproof Mitigation",
    description: "Physical and digital toolsets (lockpicks, RFID cloners, SET), dissecting real-world Mitnick and Hadnagy penetration tests, and building an institutional culture of human defense.",
    chapters: [7, 8, 9]
  }
];

export const CHAPTERS = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9];
