export interface Product {
  id: number;
  uuid: string;
  name_en: string;
  name_ar: string;
  price: number;
  currency: {
    symbol: string;
    code: string;
  };
  total_available_quantity: number;
  localized_description_data: {
    key: string;
    value: string;
  }[];
  category: {
    name_en: string;
    name_ar: string;
    image: string;
  };
  thumbnail: {
    url: string;
  };
}

export const products: Product[] = [
  {
    id: 1,
    uuid: "CSD286",
    name_en: "4-volt torque wrench, moving head, with accessories",
    name_ar: "شد عزم ٤ فولت راس متحرك مع ملحقات",
    price: 10.8,
    currency: {
      symbol: "$",
      code: "USD"
    },
    total_available_quantity: 67,
    localized_description_data: [
      { key: "Rated voltage", value: "4V 1.5Ah" },
      { key: "Torque", value: "3NM" },
      { key: "No load speed", value: "250RPM" }
    ],
    category: {
      name_en: "Cordless Drills",
      name_ar: "مثاقب تعمل على البطارية",
      image: "https://api.worksitetool.sy/storage/categories/0tNQCDJwhWMXYNAEq9XbDvGu6XwlXrTdfOp0RkXP.webp"
    },
    thumbnail: {
      url: "https://api.worksitetool.sy/storage/products/3H1ylMTDKnkGYTKESrlfLVDgLK5PJ9sZHw7Z9G1c.jpg"
    }
  },
  {
    id: 2,
    uuid: "CD309-12L-C",
    name_en: "12V 20N drill with battery, charger and accessories",
    name_ar: "مثقب ١٢ فولت ٢٠ نيوتن مع بطارية وشاحن وملحقات",
    price: 17.4,
    currency: {
      symbol: "$",
      code: "USD"
    },
    total_available_quantity: 135,
    localized_description_data: [
      { key: "Voltage", value: "12V Max" },
      { key: "No Load Speed", value: "0-350/1250 RPM" },
      { key: "Chuck Size", value: "3/8\" (10mm)" },
      { key: "Chuck Type", value: "Keyless" },
      { key: "Max Torque", value: "20Nm (177 in-lbs)" },
      { key: "Torque Setting", value: "18+1" }
    ],
    category: {
      name_en: "Cordless Drills",
      name_ar: "مثاقب تعمل على البطارية",
      image: "https://api.worksitetool.sy/storage/categories/0tNQCDJwhWMXYNAEq9XbDvGu6XwlXrTdfOp0RkXP.webp"
    },
    thumbnail: {
      url: "https://api.worksitetool.sy/storage/products/YzeyrpfcUmbwJqLB1JptJLUHSxF70vKx88mtgdia.jpg"
    }
  },
  {
    id: 3,
    uuid: "CD332M",
    name_en: "10 mm drill, 30 Newton, with 2 amp battery, charger, and accessories",
    name_ar: "مثقب ١٠ مم ٣٠ نيوتن مع بطارية ٢ امبير وشاحن و مع ملحقات",
    price: 18.9,
    currency: {
      symbol: "$",
      code: "USD"
    },
    total_available_quantity: 21,
    localized_description_data: [
      { key: "Voltage", value: "21V Max" },
      { key: "No Load Speed", value: "0-400/1400 RPM" },
      { key: "Chuck Size", value: "3/8\" (10mm)" },
      { key: "Chuck Type", value: "Keyless" },
      { key: "Max Torque", value: "30Nm" }
    ],
    category: {
      name_en: "Cordless Drills",
      name_ar: "مثاقب تعمل على البطارية",
      image: "https://api.worksitetool.sy/storage/categories/0tNQCDJwhWMXYNAEq9XbDvGu6XwlXrTdfOp0RkXP.webp"
    },
    thumbnail: {
      url: "https://api.worksitetool.sy/storage/products/uJQIrXGGNFD5LV3zJrFxmYm6K3cTFMfezNPfbFWG.jpg"
    }
  },
  {
    id: 4,
    uuid: "CD332HM",
    name_en: "10mm 30N drill with two 2A batteries, charger, bag and 22 accessories",
    name_ar: "مثقب ١٠مم ٣٠ نيوتن مع بطاريتين ٢ امبير وشاحن وحقيبة و٢٢ قطعة ملحقات",
    price: 30.6,
    currency: {
      symbol: "$",
      code: "USD"
    },
    total_available_quantity: 1,
    localized_description_data: [
      { key: "Voltage", value: "21V Max" },
      { key: "No Load Speed", value: "0-400/1400 RPM" },
      { key: "Chuck Size", value: "3/8\" (10mm)" },
      { key: "Chuck Type", value: "Keyless" },
      { key: "Max Torque", value: "30Nm" },
      { key: "Torque Setting", value: "25+1+1+1" }
    ],
    category: {
      name_en: "Cordless Drills",
      name_ar: "مثاقب تعمل على البطارية",
      image: "https://api.worksitetool.sy/storage/categories/0tNQCDJwhWMXYNAEq9XbDvGu6XwlXrTdfOp0RkXP.webp"
    },
    thumbnail: {
      url: "https://api.worksitetool.sy/storage/products/eVCrKUyjMfBrHpYamCcX9IwCbjsDRARn8VI3w3ES.jpg"
    }
  },
  {
    id: 5,
    uuid: "CD434M-10",
    name_en: "10mm drill, 45N, with 2A battery and charger",
    name_ar: "مثقب ١٠مم ٤٥نيوتن مع بطارية ٢ امبير وشاحن",
    price: 25.8,
    currency: {
      symbol: "$",
      code: "USD"
    },
    total_available_quantity: 21,
    localized_description_data: [
      { key: "Voltage", value: "21V Max" },
      { key: "No Load Speed", value: "0-400/1450 RPM" },
      { key: "Chuck Size", value: "3/8\" (10mm)" },
      { key: "Chuck Type", value: "Keyless" },
      { key: "Max Torque", value: "45Nm (398 in-lbs)" },
      { key: "Torque Setting", value: "20+1" }
    ],
    category: {
      name_en: "Cordless Drills",
      name_ar: "مثاقب تعمل على البطارية",
      image: "https://api.worksitetool.sy/storage/categories/0tNQCDJwhWMXYNAEq9XbDvGu6XwlXrTdfOp0RkXP.webp"
    },
    thumbnail: {
      url: "https://api.worksitetool.sy/storage/products/c9f5h43ZzBxcgtNylyc222YejbcwbO59yNFf71t2.jpg"
    }
  },
  {
    id: 6,
    uuid: "CD434H-13MT",
    name_en: "13mm 45N drill with two 2A batteries, charger and bag",
    name_ar: "مثقب ١٣مم ٤٥نيوتن مع بطاريتين ٢ امبير وشاحن وحقيبة",
    price: 37.8,
    currency: {
      symbol: "$",
      code: "USD"
    },
    total_available_quantity: 62,
    localized_description_data: [
      { key: "Voltage", value: "21V Max" },
      { key: "No load speed", value: "0-400/0-1450 RPM" },
      { key: "Chuck size", value: "1/2\"(13mm)" },
      { key: "Chuck Type", value: "Keyless" },
      { key: "Max torque", value: "45Nm (398 in-lbs)" },
      { key: "Torque setting", value: "20+1+1+1" },
      { key: "Battery type", value: "Li-ion" },
      { key: "Mode select", value: "Drilling/Driving/Hammer Drilling" }
    ],
    category: {
      name_en: "Cordless Drills",
      name_ar: "مثاقب تعمل على البطارية",
      image: "https://api.worksitetool.sy/storage/categories/0tNQCDJwhWMXYNAEq9XbDvGu6XwlXrTdfOp0RkXP.webp"
    },
    thumbnail: {
      url: "https://api.worksitetool.sy/storage/products/YmaIxCxAOaeA5MtcGOh4yk6JHsQ1lhpTxBA4InVH.jpg"
    }
  },
  {
    id: 7,
    uuid: "CD434H-13MT-KIT",
    name_en: "13mm 45N drill with 2 batteries, bag and accessories set",
    name_ar: "مثقب ١٣مم ٤٥نيوتن مع بطاريتين وحقيبة ومجموعة اكسسوارات",
    price: 51.6,
    currency: {
      symbol: "$",
      code: "USD"
    },
    total_available_quantity: 33,
    localized_description_data: [
      { key: "Voltage", value: "21V Max" },
      { key: "No Load Speed", value: "0-400/1450 RPM" },
      { key: "Chuck Size", value: "1/2\" (13mm)" },
      { key: "Chuck Type", value: "Keyless" },
      { key: "Max Torque", value: "45Nm (398 in-lbs)" },
      { key: "Torque Setting", value: "20+1+1+1" }
    ],
    category: {
      name_en: "Cordless Drills",
      name_ar: "مثاقب تعمل على البطارية",
      image: "https://api.worksitetool.sy/storage/categories/0tNQCDJwhWMXYNAEq9XbDvGu6XwlXrTdfOp0RkXP.webp"
    },
    thumbnail: {
      url: "https://api.worksitetool.sy/storage/products/OAmttkH8aVS3Mvl0BS7EXFF5qXUYUkQbgQGv8TzD.jpg"
    }
  },
  {
    id: 8,
    uuid: "CD305HM-13",
    name_en: "13mm 55N drill with two 2A batteries, charger and bag",
    name_ar: "مثقب ١٣مم ٥٥ نيوتن مع بطاريتين ٢ امبير وشاحن وحقيبة",
    price: 55.0,
    currency: {
      symbol: "$",
      code: "USD"
    },
    total_available_quantity: 33,
    localized_description_data: [
      { key: "Voltage", value: "21V Max" },
      { key: "No Load Speed", value: "0-450/0-1800 RPM" },
      { key: "Chuck Size", value: "1/2\" (13mm)" },
      { key: "Chuck Type", value: "Keyless" },
      { key: "Max Torque", value: "55Nm" }
    ],
    category: {
      name_en: "Cordless Drills",
      name_ar: "مثاقب تعمل على البطارية",
      image: "https://api.worksitetool.sy/storage/categories/0tNQCDJwhWMXYNAEq9XbDvGu6XwlXrTdfOp0RkXP.webp"
    },
    thumbnail: {
      url: "https://api.worksitetool.sy/storage/products/YmaIxCxAOaeA5MtcGOh4yk6JHsQ1lhpTxBA4InVH.jpg"
    }
  }
];
