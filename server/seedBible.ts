import { db } from "./db";
import { bibleBooks, bibleVerses, dailyVerses } from "@shared/schema";
import { BIBLE_BOOKS, GENESIS_1_VERSES, DAILY_VERSES_SEED } from "../client/src/lib/bible";

export async function seedBibleData() {
  try {
    console.log("Starting Bible data seeding...");

    // Check if books already exist
    const existingBooks = await db.select().from(bibleBooks).limit(1);
    if (existingBooks.length > 0) {
      console.log("Bible books already seeded, skipping...");
      return;
    }

    // Seed Bible books
    console.log("Seeding Bible books...");
    const booksToInsert = BIBLE_BOOKS.map((book, index) => ({
      id: index + 1,
      ...book
    }));

    await db.insert(bibleBooks).values(booksToInsert);
    console.log(`Seeded ${booksToInsert.length} Bible books`);

    // Seed sample verses (Genesis 1)
    console.log("Seeding sample verses...");
    await db.insert(bibleVerses).values(GENESIS_1_VERSES);
    console.log(`Seeded ${GENESIS_1_VERSES.length} verses from Genesis 1`);

    // Seed daily verses
    console.log("Seeding daily verses...");
    await db.insert(dailyVerses).values(DAILY_VERSES_SEED);
    console.log(`Seeded ${DAILY_VERSES_SEED.length} daily verses`);

    console.log("Bible data seeding completed successfully!");

  } catch (error) {
    console.error("Error seeding Bible data:", error);
    throw error;
  }
}

// Additional verses that can be seeded for other popular chapters
export const ADDITIONAL_SAMPLE_VERSES = {
  // John 3:16-17
  john316: [
    {
      bookId: 43, // John
      chapter: 3,
      verse: 16,
      textEnglish: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      textTagalog: "Sapagka't gayon na lamang ang pag-ibig ng Dios sa sanglibutan, na ibinigay niya ang kanyang bugtong na Anak, upang ang sinumang sumasampalataya sa kanya ay huwag mapahamak, kundi magkaroon ng buhay na walang hanggan.",
      translation: "ESV"
    },
    {
      bookId: 43,
      chapter: 3,
      verse: 17,
      textEnglish: "For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.",
      textTagalog: "Sapagka't hindi sinugo ng Dios ang kanyang Anak sa sanglibutan upang hatulan ang sanglibutan, kundi upang ang sanglibutan ay maligtas sa pamamagitan niya.",
      translation: "ESV"
    }
  ],
  
  // Psalm 23:1-6
  psalm23: [
    {
      bookId: 19, // Psalms
      chapter: 23,
      verse: 1,
      textEnglish: "The Lord is my shepherd; I shall not want.",
      textTagalog: "Ang Panginoon ay aking pastor; hindi ako magkukulang.",
      translation: "ESV"
    },
    {
      bookId: 19,
      chapter: 23,
      verse: 2,
      textEnglish: "He makes me lie down in green pastures. He leads me beside still waters.",
      textTagalog: "Pinapahiga niya ako sa mga luntiang pastulan. Pinapangunahan niya ako sa tabi ng mga tahimik na tubig.",
      translation: "ESV"
    },
    {
      bookId: 19,
      chapter: 23,
      verse: 3,
      textEnglish: "He restores my soul. He leads me in paths of righteousness for his name's sake.",
      textTagalog: "Pinasasauli niya ang aking kaluluwa. Pinapangunahan niya ako sa mga daan ng katuwiran dahil sa kanyang pangalan.",
      translation: "ESV"
    },
    {
      bookId: 19,
      chapter: 23,
      verse: 4,
      textEnglish: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
      textTagalog: "Oo, kahit na ako'y lumakad sa lambak ng anino ng kamatayan, hindi ako matatakot sa kasamaan, sapagka't ikaw ay kasama ko; ang inyong tungkod at ang inyong panghawak ay nagiging kaaliw ko.",
      translation: "ESV"
    },
    {
      bookId: 19,
      chapter: 23,
      verse: 5,
      textEnglish: "You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows.",
      textTagalog: "Ihahanda mo ang mesa sa harap ko sa paningin ng aking mga kaaway; pinapahiran mo ng langis ang aking ulo; ang aking saro ay umaapaw.",
      translation: "ESV"
    },
    {
      bookId: 19,
      chapter: 23,
      verse: 6,
      textEnglish: "Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the Lord forever.",
      textTagalog: "Tunay na kabutihan at awa ay susunod sa akin sa lahat ng mga araw ng aking buhay, at ako'y titira sa bahay ng Panginoon magpakailanman.",
      translation: "ESV"
    }
  ]
};

export async function seedAdditionalVerses() {
  try {
    console.log("Seeding additional popular verses...");
    
    const allAdditionalVerses = [
      ...ADDITIONAL_SAMPLE_VERSES.john316,
      ...ADDITIONAL_SAMPLE_VERSES.psalm23
    ];

    await db.insert(bibleVerses).values(allAdditionalVerses);
    console.log(`Seeded ${allAdditionalVerses.length} additional verses`);

  } catch (error) {
    console.error("Error seeding additional verses:", error);
    throw error;
  }
}
