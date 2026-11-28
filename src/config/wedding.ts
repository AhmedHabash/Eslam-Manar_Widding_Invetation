import type { WeddingConfig } from "@/types/wedding";

export const weddingConfig: WeddingConfig = {
  groom: {
    nameAr: "إسلام",
    nameEn: "Islam",
    initialAr: "إ",
    initialEn: "I",
  },

  bride: {
    nameAr: " م ",
    nameEn: "Manar",
    initialAr: "م",
    initialEn: "M",
  },

   date: {
    // Egypt is UTC+2 in December. The time (19:00) is a placeholder:
    // replace it with the real start time of the wedding.
    dateTimeISO: "2026-12-15T19:00:00+02:00",
    weekdayAr: "الثلاثاء",
    dayLabel: "١٥",
    monthAr: "ديسمبر",
    year: "٢٠٢٦",
    numeric: "15 / 12 / 2026",
  },
  venue: {
    nameAr: "قاعة لانا",
    mapsUrl: "https://goo.gl/maps/uGRALUq5mkXDfTxz7",
  },

  invitation: {
    heroPhrase: "حكايةٌ كتبها القدر بحبر المودة، وتكتمل بدعواتكم",

    invitationTitle: "بقلوبٍ يملؤها الفرح",

    paragraphs: [
      "في العمر لحظاتٌ لا تكتمل إلا بوجود من نحب، ويوم زفافنا واحدٌ من أجمل تلك اللحظات.",
      "بعد رحلةٍ من الود والتفاهم، قررنا أن نبدأ معاً فصلاً جديداً من الحكاية: بيتاً عمادُه المحبة، وسقفُه السكينة.",
      "ويسعدنا أن تكونوا شهوداً على فرحتنا، وأن تشاركونا ليلةً نحفظها في القلب عمراً، فحضوركم أجمل ما يزيّن هذا اليوم.",
    ],

    closingMessage:
      "شكراً لأنكم جزءٌ من حكايتنا. دعواتكم ومحبتكم أجمل هدية، ونتمنى أن نراكم بيننا في ليلة العمر.",
  },

  // All times below are placeholders. Replace them with the real schedule.
  timeline: [
    {
      id: "arrival",
      time: "٧:٠٠ م",
      title: "استقبال الضيوف",
      description: "نرحّب بكم ونبدأ الليلة بابتسامة وأجواء دافئة.",
      icon: "arrival",
    },
    {
      id: "ceremony",
      time: "٨:٠٠ م",
      title: "دخول العروسين",
      description: "لحظة الدخول التي ننتظرها بكل شغف.",
      icon: "ceremony",
    },
    {
      id: "photos",
      time: "٨:٣٠ م",
      title: "صور تذكارية",
      description: "نلتقط معكم صوراً تبقى ذكرى جميلة لسنين.",
      icon: "photos",
    },
    {
      id: "dance",
      time: "٩:٠٠ م",
      title: "الفرحة والرقص",
      description: "ونختم الليلة بالبهجة والموسيقى.",
      icon: "dance",
    },
  ],

  share: {
    message:
      "يسعدنا دعوتكم لحضور حفل زفاف إسلام و م\ر 💍\الثلاثاء 17 ديسمبر ٢٠٢٦ - قاعة لانا",
  },

  music: {
    enabled: true,
    src: "/audio/wedding-music.mp3",
  },

  credit: {
    label: "صُمّمت هذه الدعوة بحبّ بواسطة",
    name: "م. أحمد عصام",
    relation: "شقيق العروس",
    links: [
      {
        id: "facebook",
        label: "فيسبوك",
        url: "https://www.facebook.com/share/1H49jNy5bS/",
      },
      {
        id: "whatsapp",
        label: "واتساب",
        url: "https://wa.me/201557209799",
      },
      {
        id: "github",
        label: "جيت هاب",
        url: "https://github.com/AhmedHabash",
      },
    ],
  },
};
