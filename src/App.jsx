import {
  Clock,
  ChevronDown,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Search,
  Utensils,
  X
} from "lucide-react";
import React from "react";
import { useEffect, useMemo, useState } from "react";

const restaurant = {
  name: "China Moon",
  cuisine: "Chinese",
  cityState: "Marietta, GA",
  address: "3960 Mary Eliza Trace NW Suite 700, Marietta, GA 30064",
  phone: "(678) 275-2350",
  phoneHref: "tel:+16782752350",
  phoneNumbers: [
    { label: "(678) 275-2350", href: "tel:+16782752350" },
    { label: "(678) 275-2351", href: "tel:+16782752351" }
  ],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=3960%20Mary%20Eliza%20Trace%20NW%20Suite%20700%2C%20Marietta%2C%20GA%2030064",
  mapEmbedSrc:
    "https://www.google.com/maps?q=3960%20Mary%20Eliza%20Trace%20NW%20Suite%20700%2C%20Marietta%2C%20GA%2030064&output=embed",
  reviewsHref:
    "https://www.google.com/search?q=China+Moon+3960+Mary+Eliza+Trace+NW+Suite+700+Marietta+GA+reviews",
  tagline: "Chinese favorites made for quick family meals.",
  rating: "4.3",
  reviewCount: "267",
  description:
    "A casual Marietta spot for generous Chinese entrees, lunch specials, soups, appetizers, fried rice, noodles, and family dinners.",
  note: "Dine-in and takeout available. Lunch specials end at 3:00 PM. Please call for current wait times or special hours.",
  social: [
    { label: "Google", href: "https://www.google.com/search?q=China+Moon+Marietta+GA" }
  ],
  hours: [
    { day: "Sunday", time: "12:00 PM - 10:00 PM" },
    { day: "Monday", time: "Closed" },
    { day: "Tuesday", time: "11:00 AM - 10:00 PM" },
    { day: "Wednesday", time: "11:00 AM - 10:00 PM" },
    { day: "Thursday", time: "11:00 AM - 10:00 PM" },
    { day: "Friday", time: "11:00 AM - 10:00 PM" },
    { day: "Saturday", time: "12:00 PM - 10:00 PM" }
  ]
};

const weeklySchedule = {
  Sunday: { open: 12 * 60, close: 22 * 60 },
  Monday: null,
  Tuesday: { open: 11 * 60, close: 22 * 60 },
  Wednesday: { open: 11 * 60, close: 22 * 60 },
  Thursday: { open: 11 * 60, close: 22 * 60 },
  Friday: { open: 11 * 60, close: 22 * 60 },
  Saturday: { open: 12 * 60, close: 22 * 60 }
};

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const menuCategories = [
  {
    name: "Appetizers",
    note: "Classic starters and shareable plates.",
    items: [
      item("A1", "Egg Roll (2)", "3.95"),
      item("A2", "Spring Rolls (2)", "3.85"),
      item("A3", "Fried Wonton (8)", "3.45"),
      item("A4", "Sesame Donuts", "5.95"),
      item("A5", "Fried Chicken Wings (8)", "8.95"),
      item("A6", "Crab Rangoon (6)", "7.95"),
      item("A7", "Fried Shrimp (6)", "7.85"),
      item("A8", "Beef Teriyaki (4)", "7.85"),
      item("A9", "BBQ Sliced Pork", "7.85"),
      item("A10", "Pot Stickers (6)", "7.85"),
      item("A11", "Steamed or Fried Pork Dumpling (6)", "7.85"),
      item("A12", "Pu Pu Platter", "16.95", {
        description:
          "For two. Egg rolls, wings, fried dumplings, fried wonton, crab rangoon, fried shrimp, and beef teriyaki.",
      }),
      item("A13", "Flavored Wings", "", {
        description: "Buffalo, honey garlic, hot braised, lemon pepper, or teriyaki.",
        options: [
          ["10 pieces", "11.95"],
          ["15 pieces", "15.20"],
          ["20 pieces", "19.95"],
          ["30 pieces", "29.75"]
        ]
      }),
      item("A14", "Fried Wing (8) with Rice", "11.95")
    ]
  },
  {
    name: "Soup",
    note: "Small and large sizes where listed.",
    items: [
      item("SO1", "Egg Drop Soup", "Small 2.99 / Large 5.65"),
      item("SO2", "Wonton Soup", "Small 2.99 / Large 5.65"),
      item("SO3", "Hot & Sour Soup", "Small 2.99 / Large 5.65", { spicy: true }),
      item("SO4", "Chicken Corn Soup", "Small 2.99 / Large 5.65"),
      item("SO5", "Vegetable & Bean Curd Soup", "5.85", { vegetarian: true }),
      item("SO6", "Sizzling Rice Soup", "7.45", {
        description:
          "Chicken broth with chicken, shrimp, snow peas, carrots, bamboo shoots, and golden rice."
      }),
      item("SO7", "Triple Delight Soup", "7.45", {
        description: "Chicken, shrimp, and scallops with carrots, snow peas, and vegetables."
      }),
      item("SO8", "Dragon Soup", "7.45", {
        description: "Chicken and shrimp in rich chicken broth with crystal noodles."
      })
    ]
  },
  {
    name: "House Specials",
    note: "Signature combination plates.",
    items: [
      item("1", "Phoenix and Dragon", "16.25", {
        description: "Jumbo shrimp and sliced chicken breast sauteed with vegetables in savory white sauce."
      }),
      item("2", "Chicken and Beef with Mixed Vegetables", "16.25"),
      item("3", "Shrimp and Chicken with Cashew Nuts", "16.25"),
      item("4", "Three Delicacies with Black Bean Sauce", "16.45"),
      item("5", "Shrimp and Beef with Broccoli", "16.75"),
      item("6", "Sesame Shrimp (12)", "16.75"),
      item("7", "General Tso's Shrimp (12)", "16.75", { spicy: true }),
      item("8", "Sweet and Sour Combination", "16.65", {
        description: "Combination of shrimp, pork, and chicken."
      }),
      item("9", "Sizzling Scallop and Steak", "16.45", {
        description: "Sliced steak, scallop, and Chinese vegetables served on a hot plate."
      }),
      item("10", "Triple Crown", "16.45", {
        description: "Jumbo shrimp, sliced chicken breast, and tender beef sauteed with mixed vegetables in brown sauce."
      }),
      item("11", "Triple Delight", "16.45", {
        description: "Jumbo shrimp, sliced chicken breast, and scallops stir fried with mixed vegetables in a white sauce."
      }),
      item("12", "Mongolian Triple", "16.45", {
        description: "Onion and white onion stir fried with chicken, beef, and shrimp."
      }),
      item("13", "Szechuan Triple", "16.45", {
        description: "Vegetables stir fried with chicken, beef, and shrimp in a spicy brown sauce.",
        spicy: true
      }),
      item("14", "Four Happiness", "16.75", {
        description:
          "Tender beef, jumbo shrimp, sliced chicken breast, and roast pork sauteed with vegetables in a spicy brown sauce.",
        spicy: true
      }),
      item("15", "Sizzling Happy Family", "16.75", {
        description:
          "Combination of scallops, crab meat, jumbo shrimp, tender beef, and sliced chicken breast sauteed with mixed vegetables."
      }),
      item("16", "Salt & Pepper Shrimp (12)", "16.75", { spicy: true }),
      item("17", "Sizzling Seafood Deluxe", "16.75"),
      item("18", "Scallop with Mixed Vegetables", "16.75"),
      item("19", "Scallop with Snow Peas", "16.75")
    ]
  },
  {
    name: "Chicken",
    items: [
      item("C1", "Almond Fried Chicken", "14.35"),
      item("C2", "Sweet & Sour Chicken", "14.35"),
      item("C3", "Lemon Fried Chicken", "14.35"),
      item("C4", "Honey Garlic Chicken", "14.35"),
      item("C6", "Moo Goo Gai Pan", "14.35", {
        description: "Sauteed chicken breast with bamboo shoots, mushroom, and Chinese vegetables."
      }),
      item("C7", "Chicken with Mixed Vegetables", "14.35"),
      item("C8", "Chicken with Broccoli", "14.35"),
      item("C9", "Chicken with Snow Peas", "14.35", {
        description: "Sauteed white chicken meat with snow peas, water chestnuts, and carrots in white sauce."
      }),
      item("C10", "Hunan Chicken", "14.35", {
        description:
          "Chicken with broccoli, green pepper, snow peas, carrot, mushroom, baby corn, bamboo shoots, and water chestnuts in Hunan sauce.",
        spicy: true
      }),
      item("C11", "Szechuan Chicken", "14.35", { spicy: true }),
      item("C12", "Chicken with Garlic Sauce", "14.35", { spicy: true }),
      item("C13", "Curry Chicken", "14.35", { spicy: true }),
      item("C14", "Moo Shu Chicken", "14.35", {
        description:
          "Fancy-flavored egg with white meat chicken, green onions, cabbage, mushroom, and carrot served with thin Chinese pancakes."
      }),
      item("C15", "Imperial Chicken", "14.35", {
        description: "Chicken fried in a thin batter with peas, carrots, and onion in chef's special hot sauce.",
        spicy: true
      }),
      item("C16", "Mongolian Chicken", "14.35"),
      item("C17", "Green Pepper Chicken", "14.35", {
        description: "Chicken breast stir fried with green pepper and white onions in brown sauce."
      }),
      item("C18", "Chicken with Cashew Nuts", "14.35", {
        description: "Diced chicken with celery, carrots, onions, and cashew nuts."
      }),
      item("C19", "Garlic Chicken", "14.35"),
      item("C20", "Kung Pao Chicken", "14.35", { spicy: true }),
      item("C21", "Chicken with Black Bean Sauce", "14.35"),
      item("C22", "Sesame Chicken", "14.35"),
      item("C23", "General Tso's Chicken", "14.95", { spicy: true }),
      item("C24", "Orange Chicken", "14.95", { spicy: true })
    ]
  },
  {
    name: "Beef",
    items: [
      item("B1", "Beef with Fresh Broccoli", "15.50", {
        description: "Beef with broccoli and carrots.",
      }),
      item("B2", "Green Pepper Steak", "15.50", {
        description: "Sliced tender beef sauteed with green pepper and onion in our special sauce."
      }),
      item("B3", "Beef with Snow Peas", "15.50", {
        description: "Snow pea pods tossed with water chestnuts and carrots."
      }),
      item("B4", "Kung Pao Beef", "15.50", {
        description: "Beef with water chestnuts, celery, carrots, green pepper, onions, and peanuts in spicy brown sauce.",
        spicy: true
      }),
      item("B5", "Beef with Mixed Vegetables", "15.50"),
      item("B6", "Hunan Beef", "15.50", {
        description:
          "Tender beef sauteed with bamboo shoots, water chestnuts, mushrooms, baby corn, snow peas, carrots, and broccoli in spicy brown sauce.",
        spicy: true
      }),
      item("B7", "Mongolian Beef", "15.50", {
        description: "Beef stir fried with green onion and white onion in a sweet brown sauce.",
      }),
      item("B8", "Curry Beef", "15.50", { spicy: true }),
      item("B9", "Beef with Mushroom", "15.50"),
      item("B10", "Szechuan Beef", "15.50", { spicy: true }),
      item("B11", "Spicy Beef with Garlic Sauce", "15.50", { spicy: true }),
      item("B12", "Beef with Black Bean Sauce", "15.50", {
        description:
          "Tasty black bean sauce sauteed with beef, onion, bell peppers, water chestnuts, bamboo shoots, and mushroom."
      }),
      item("B13", "Sesame Beef", "16.25"),
      item("B14", "Orange Beef", "16.25", {
        description: "Crispy fried breaded beef in sweet orange sauce with sliced orange peel.",
        spicy: true
      }),
      item("B15", "Moo Shu Beef", "15.50", {
        description: "Fancy-flavored egg with beef, green onions, cabbage, and mushroom served with thin pancakes."
      })
    ]
  },
  {
    name: "Pork",
    items: [
      item("P1", "Sweet & Sour Pork", "12.75"),
      item("P2", "Hot Braised Pork", "12.75", { spicy: true }),
      item("P3", "Roast Pork with Broccoli", "12.75"),
      item("P4", "Roast Pork with Snow Peas", "12.75", {
        description: "Snow pea pods tossed with water chestnuts and carrots."
      }),
      item("P5", "Roast Pork with Mixed Chinese Vegetables", "12.75"),
      item("P6", "Hunan Roast Pork", "12.75", { spicy: true }),
      item("P7", "Kung Pao Pork", "12.75", { spicy: true }),
      item("P8", "Double Cooked Pork", "12.75", { spicy: true }),
      item("P9", "Pork with Garlic Sauce", "12.75", {
        description: "Shredded pork in a light, medium-spicy garlic ginger sauce.",
        spicy: true
      }),
      item("P10", "Ma Po Tofu", "12.75", {
        description: "Soft bean curd and minced pork in a hot spicy Szechuan sauce with chopped scallions.",
        spicy: true
      }),
      item("P11", "Moo Shu Pork", "13.45")
    ]
  },
  {
    name: "Seafood",
    items: [
      item("S1", "Sweet & Sour Shrimp", "15.35"),
      item("S2", "Almond Fried Shrimp", "15.35"),
      item("S3", "Lemon Fried Shrimp", "15.35"),
      item("S4", "Honey Garlic Shrimp", "15.35"),
      item("S5", "Shrimp with Snow Peas", "15.35"),
      item("S6", "Moo Shu Shrimp", "15.35"),
      item("S7", "Hunan Shrimp", "15.35", { spicy: true }),
      item("S8", "Shrimp with Broccoli", "15.35"),
      item("S9", "Curry Shrimp", "15.35", { spicy: true }),
      item("S10", "Hot Braised Shrimp", "15.35", { spicy: true }),
      item("S11", "Shrimp with Lobster Sauce", "15.35", {
        description: "Jumbo shrimp with water chestnuts, peas, carrots, egg, and mushrooms."
      }),
      item("S12", "Shrimp with Mushrooms", "15.35"),
      item("S13", "Shrimp with Cashew Nuts", "15.35"),
      item("S14", "Shrimp with Garlic Sauce", "15.35", {
        description: "Jumbo shrimp with mixed vegetables in a light, medium-spicy garlic ginger sauce.",
        spicy: true
      }),
      item("S15", "Green Pepper Shrimp", "15.35"),
      item("S16", "Imperial Shrimp", "15.35", {
        description: "Fried in a thin batter with peas, carrots, and onion in chef's special hot sauce.",
        spicy: true
      }),
      item("S17", "Garlic Shrimp", "15.35"),
      item("S18", "Kung Pao Shrimp", "15.35", { spicy: true }),
      item("S19", "Shrimp with Chinese Vegetables", "15.35", {
        description: "Jumbo shrimp mixed with different vegetables."
      }),
      item("S20", "Shrimp with Black Bean Sauce", "15.35")
    ]
  },
  {
    name: "Noodles",
    note: "Chow mein is not noodle. Chow mein includes fresh onion, bean sprouts, Chinese cabbage, bamboo shoots, and your choice of meat. Lo mein is soft noodles stir fried with onion, scallion, napa, carrots, and bamboo shoots.",
    items: [
      item("", "Chow Mein - Chicken or Pork", "10.45"),
      item("", "Chow Mein - Vegetables", "10.35", { vegetarian: true }),
      item("", "Chow Mein - Beef or Shrimp", "12.15"),
      item("", "Chow Mein - House Special", "12.45"),
      item("", "Lo Mein - Chicken, Pork, or Vegetables", "12.15"),
      item("", "Lo Mein - Beef or Shrimp", "12.50"),
      item("", "Lo Mein - House Special", "12.45"),
      item("", "Lo Mein - Crab Meat", "11.45"),
      item("", "Lo Mein - Tofu", "11.95", { vegetarian: true }),
      item("", "House Special Pan-Fried Noodle", "14.25"),
      item("", "Singapore Noodle", "14.25", { spicy: true }),
      item("", "Pad Thai Noodle", "14.15", { spicy: true })
    ]
  },
  {
    name: "Fried Rice",
    note: "Fresh bean sprouts, peas, and carrots stir fried with your choice of meat.",
    items: [
      item("", "Fried Rice - Chicken, Tofu, Pork, or Vegetables", "12.25"),
      item("", "Fried Rice - Shrimp, Crab Meat, or Beef", "12.55"),
      item("", "Fried Rice - Seafood or House Special", "12.95")
    ]
  },
  {
    name: "Vegetables",
    items: [
      item("V1", "General Tso's Tofu", "11.95", { spicy: true, vegetarian: true }),
      item("V2", "Kung Pao Tofu", "11.95", { spicy: true, vegetarian: true }),
      item("V3", "Tofu with Mushrooms", "11.95", { vegetarian: true }),
      item("V4", "Steamed Mixed Vegetables", "11.95", { vegetarian: true }),
      item("V5", "Vegetables Deluxe", "11.95", { vegetarian: true }),
      item("V6", "Home Style Bean Curd", "11.95", { vegetarian: true }),
      item("V7", "Spicy Vegetables with Garlic Sauce", "11.95", { spicy: true, vegetarian: true }),
      item("V8", "Broccoli with Oyster Sauce", "11.95")
    ]
  },
  {
    name: "Egg Fu Yung",
    note: "Crispy vegetables and egg fried to golden brown and served with brown gravy.",
    items: [
      item("", "Chicken Egg Fu Yung", "12.35", {
        description: "Crispy vegetables and egg fried to golden brown and served with brown gravy."
      }),
      item("", "Beef Egg Fu Yung", "12.55"),
      item("", "Vegetables Egg Fu Yung", "11.95", {
        description: "Crispy vegetables and egg fried to golden brown and served with brown gravy.",
        vegetarian: true
      }),
      item("", "Crab Meat Egg Fu Yung", "11.95"),
      item("", "Roast Pork Egg Fu Yung", "12.35"),
      item("", "Shrimp Egg Fu Yung", "12.35"),
      item("", "House Special Egg Fu Yung", "13.25"),
      item("", "Seafood Egg Fu Yung", "13.25")
    ]
  },
  {
    name: "Combination Dinners",
    note: "Includes soup choice, egg roll, and fried rice.",
    items: [
      item("CO1", "Vegetables Deluxe", "12.75", { vegetarian: true }),
      item("CO2", "Moo Goo Gai Pan", "12.75"),
      item("CO3", "Chicken with Broccoli", "12.75"),
      item("CO4", "Chicken Vegetable", "12.75"),
      item("CO5", "Hunan Chicken", "12.75", { spicy: true }),
      item("CO6", "Garlic Chicken", "12.75"),
      item("CO7", "Chicken with Cashew Nuts", "12.75"),
      item("CO8", "Kung Pao Chicken", "12.75", { spicy: true }),
      item("CO9", "Sweet & Sour Chicken", "12.75"),
      item("CO10", "Lemon Chicken", "12.75"),
      item("CO11", "Almond Fried Chicken", "12.75"),
      item("CO12", "Mongolian Chicken", "12.75"),
      item("CO13", "General Tso's Chicken", "12.75", { spicy: true }),
      item("CO14", "Sesame Chicken", "12.75"),
      item("CO15", "Sweet & Sour Pork", "12.75"),
      item("CO16", "Mongolian Beef", "13.25"),
      item("CO17", "Green Pepper Steak", "13.25"),
      item("CO18", "Hunan Beef", "13.25", { spicy: true }),
      item("CO19", "Beef with Broccoli", "13.25"),
      item("CO20", "Beef with Vegetables", "13.25"),
      item("CO21", "Kung Pao Beef", "13.25", { spicy: true }),
      item("CO22", "Garlic Shrimp", "13.25"),
      item("CO23", "Kung Pao Shrimp", "13.25", { spicy: true }),
      item("CO24", "Shrimp with Broccoli", "13.25"),
      item("CO25", "Shrimp with Mixed Vegetables", "13.25"),
      item("CO26", "Hunan Shrimp", "13.25", { spicy: true }),
      item("CO27", "Shrimp with Lobster Sauce", "13.25")
    ]
  },
  {
    name: "Lunch Specials",
    note: "Served until 3:00 PM with egg fried rice, spring roll, and soup choice for dine-in. To-go soup extra.",
    items: [
      item("L1", "Vegetables Deluxe or Tofu Dish", "8.45", {
        description: "Tofu options include dishes like Kung Pao Tofu or General Tso's Tofu.",
        vegetarian: true
      }),
      item("L2", "Moo Goo Gai Pan", "9.15"),
      item("L3", "Chicken with Broccoli", "9.15"),
      item("L4", "Green Pepper Chicken", "9.15"),
      item("L5", "Chicken with Mixed Vegetables", "9.15"),
      item("L6", "Hunan Chicken", "9.15", { spicy: true }),
      item("L7", "Spicy Chicken with Garlic Sauce", "9.15", { spicy: true }),
      item("L8", "Garlic Chicken", "9.15"),
      item("L9", "Chicken with Cashew Nuts", "9.15"),
      item("L10", "Kung Pao Chicken", "9.15", { spicy: true }),
      item("L11", "Mongolian Chicken", "9.15"),
      item("L12", "Sweet & Sour Chicken", "9.15"),
      item("L13", "Lemon Chicken", "9.15"),
      item("L14", "Almond Fried Chicken", "9.15"),
      item("L15", "Hot Braised Chicken", "9.15", { spicy: true }),
      item("L16", "General Tso's Chicken", "9.15", { spicy: true }),
      item("L17", "Sesame Chicken", "9.15"),
      item("L18", "Sweet & Sour Pork", "9.15"),
      item("L19", "Hot Braised Pork", "9.15", { spicy: true }),
      item("L20", "Spicy Pork with Garlic Sauce", "9.15", { spicy: true }),
      item("L21", "Kung Pao Roast Pork", "9.15", { spicy: true }),
      item("L22", "Mongolian Beef", "9.45"),
      item("L23", "Green Pepper Steak", "9.45"),
      item("L24", "Beef with Broccoli", "9.45"),
      item("L25", "Hunan Beef", "9.45", { spicy: true }),
      item("L26", "Beef with Mixed Vegetable", "9.45"),
      item("L27", "Kung Pao Beef", "9.45", { spicy: true }),
      item("L28", "Almond Fried Shrimp", "9.45"),
      item("L29", "Sweet & Sour Shrimp", "9.45"),
      item("L30", "Hot Braised Shrimp", "9.45", { spicy: true }),
      item("L31", "Shrimp with Broccoli", "9.45"),
      item("L32", "Spicy Shrimp with Garlic Sauce", "9.45", { spicy: true }),
      item("L33", "Shrimp with Mixed Vegetable", "9.45"),
      item("L34", "Kung Pao Shrimp", "9.45", { spicy: true }),
      item("L35", "Garlic Shrimp", "9.45"),
      item("L36", "Hunan Shrimp", "9.45", { spicy: true }),
      item("L37", "Shrimp with Lobster Sauce", "9.45"),
      item("L38", "Phoenix and Dragon", "9.45"),
      item("L39", "Fried Rice with Beef, Chicken, Pork, Vegetable, or Shrimp", "9.15"),
      item("L40", "Lo Mein with Beef, Chicken, Pork, Vegetable, or Shrimp", "9.15"),
      item("L41", "Chow Mein with Beef, Chicken, Pork, Vegetable, or Shrimp", "9.15"),
      item("L42", "House Special Chow Mein", "9.45", {
        description: "Mixed with chicken, beef, and shrimp."
      }),
      item("L43", "House Special Fried Rice", "9.45", {
        description: "Mixed with chicken, beef, and shrimp."
      }),
      item("L44", "House Special Lo Mein", "9.45", {
        description: "Mixed with chicken, beef, and shrimp."
      })
    ]
  },
  {
    name: "Kids Menu",
    note: "Served with french fries or rice.",
    items: [
      item("K1", "Kid's Sweet & Sour Chicken", "7.95"),
      item("K2", "Kid's Sweet & Sour Pork", "7.95"),
      item("K3", "Kid's Sweet & Sour Shrimp", "7.95"),
      item("K4", "Kid's Fried Chicken Wings (5)", "7.95"),
      item("K5", "Kid's Chicken Fried Rice", "7.95"),
      item("K6", "Kid's Shrimp Fried Rice", "7.95")
    ]
  },
  {
    name: "Family Dinners",
    note: "Includes soup, egg rolls, and listed entrees.",
    items: [
      item("", "Family Dinner for Two", "36.95", {
        description: "Includes sizzling rice soup, egg rolls (2), Mongolian beef, and sweet & sour chicken."
      }),
      item("", "Family Dinner for Three", "49.85", {
        description: "Includes sizzling rice soup, egg rolls (3), Mongolian beef, Moo Goo Gai Pan, and sweet & sour chicken."
      }),
      item("", "Family Dinner for Four", "66.50", {
        description:
          "Includes sizzling rice soup, egg rolls (4), Mongolian beef, Moo Goo Gai Pan, sweet & sour chicken, and shrimp with lobster sauce."
      }),
      item("", "Family Dinner for Five", "80.25", {
        description:
          "Includes sizzling rice soup, egg rolls (5), Mongolian beef, Moo Goo Gai Pan, sweet & sour chicken, shrimp with lobster sauce, and Triple Crown."
      })
    ]
  },
  {
    name: "Sides",
    items: [
      item("", "Steamed Rice", "Small 3.15 / Large 4.95"),
      item("", "Plain Fried Rice", "Small 3.15 / Large 4.95"),
      item("", "Extra Brown Sauce (8 oz)", "1.25"),
      item("", "Extra Brown Gravy (8 oz)", "1.25")
    ]
  },
  {
    name: "Drinks",
    items: [item("", "Soft Drinks", "1.75"), item("", "Iced Tea", "1.75")]
  }
];

function item(code, name, price, options = {}) {
  return { code, name, price, ...options };
}

function useBusinessStatus() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return getBusinessStatus(now);
}

function getBusinessStatus(date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "America/New_York"
  }).formatToParts(date);
  const day = parts.find((part) => part.type === "weekday")?.value ?? "Sunday";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const minutesNow = hour * 60 + minute;
  const schedule = weeklySchedule[day];

  if (schedule && minutesNow >= schedule.open && minutesNow < schedule.close) {
    return {
      isOpen: true,
      text: `Open · Closes ${formatMinutes(schedule.close)}`,
      today: restaurant.hours.find((entry) => entry.day === day)?.time ?? "Call for hours"
    };
  }

  const todayIndex = weekdays.indexOf(day);
  for (let offset = 0; offset < 7; offset += 1) {
    const nextDay = weekdays[(todayIndex + offset) % 7];
    const nextSchedule = weeklySchedule[nextDay];
    if (!nextSchedule) continue;
    if (offset === 0 && minutesNow < nextSchedule.open) {
      return {
        isOpen: false,
        text: `Closed · Opens ${formatMinutes(nextSchedule.open)}`,
        today: restaurant.hours.find((entry) => entry.day === day)?.time ?? "Call for hours"
      };
    }
    if (offset > 0) {
      return {
        isOpen: false,
        text: `Closed · Opens ${nextDay} ${formatMinutes(nextSchedule.open)}`,
        today: restaurant.hours.find((entry) => entry.day === day)?.time ?? "Call for hours"
      };
    }
  }

  return { isOpen: false, text: "Call for hours", today: "Call for hours" };
}

function formatMinutes(totalMinutes) {
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}${minute ? `:${String(minute).padStart(2, "0")}` : ""} ${suffix}`;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].name);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState([]);

  const filteredCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return menuCategories;

    return menuCategories
      .map((category) => ({
        ...category,
        items: category.items.filter((menuItem) =>
          [menuItem.code, menuItem.name, menuItem.description, menuItem.price]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(normalized)
        )
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  return (
    <div className="min-h-screen bg-moon-cream text-black">
      <a className="skip-link" href="#menu">
        Skip to menu
      </a>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <QuickInfo />
        <MenuSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          openCategories={openCategories}
          setOpenCategories={setOpenCategories}
          query={query}
          setQuery={setQuery}
          filteredCategories={filteredCategories}
        />
        <DeliveryInfo />
        <Hours />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Navbar({ menuOpen, setMenuOpen }) {
  const navLinks = [
    ["Menu", "#menu"],
    ["Hours", "#hours"],
    ["Location", "#location"],
    ["Contact", "#contact"]
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-moon-rice bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <a href="#" className="flex items-center gap-3" aria-label="China Moon home">
          <span className="grid h-10 w-10 place-items-center rounded bg-black text-lg font-semibold text-white">
            CM
          </span>
          <span>
            <span className="block text-base font-medium leading-tight sm:text-lg">{restaurant.name}</span>
            <span className="block text-xs font-normal text-black">{restaurant.cityState}</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="border-b-2 border-transparent px-3 py-2 text-sm font-normal text-black transition hover:border-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              {label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-moon-ink/15 bg-white text-black md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-moon-rice bg-white px-4 py-2 md:hidden">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block rounded px-3 py-3 text-sm font-normal text-black"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const status = useBusinessStatus();

  return (
    <section className="pattern-bg border-b border-moon-rice">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-9 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <div>
          <p className="mb-4 inline-flex border-l-2 border-black bg-white px-3 py-2 text-sm font-normal text-black">
            Marietta Chinese restaurant
          </p>
          <h1 className="max-w-3xl text-4xl font-medium leading-tight text-black sm:text-5xl">
            {restaurant.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg font-normal leading-7 text-black">{restaurant.tagline}</p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-black">{restaurant.description}</p>
          <a
            href={restaurant.reviewsHref}
            className="mt-4 flex w-fit flex-wrap items-center gap-x-2 gap-y-1 text-sm font-normal text-black underline-offset-4 hover:underline"
            aria-label={`${restaurant.name} Google reviews, ${restaurant.rating} stars from ${restaurant.reviewCount} reviews`}
          >
            <span className="font-medium text-black">{restaurant.rating}</span>
            <span aria-hidden="true">★</span>
            <span>({restaurant.reviewCount} reviews)</span>
            <span aria-hidden="true">•</span>
            <span>$10-20</span>
            <span aria-hidden="true">•</span>
            <span>{restaurant.cuisine}</span>
          </a>
          <div className="mt-4 flex items-center gap-2 text-base">
            <span className={status.isOpen ? "text-green-700" : "text-red-700"}>
              {status.isOpen ? "Open" : "Closed"}
            </span>
            <span aria-hidden="true">·</span>
            <span>{status.text.replace(/^(Open|Closed) · /, "")}</span>
          </div>
          <div className="mt-7 grid gap-3 sm:flex">
            <ActionButton href="#menu" label="View Menu" tone="primary" icon={<Utensils size={18} />} />
            <ActionButton href={restaurant.phoneHref} label="Call Us" icon={<Phone size={18} />} />
            <ActionButton href={restaurant.mapsHref} label="Get Directions" icon={<MapPin size={18} />} />
          </div>
        </div>
        <div className="border border-moon-rice bg-white p-2">
          <iframe
            title="China Moon location map"
            src={restaurant.mapEmbedSrc}
            className="h-64 w-full border-0 sm:h-72 lg:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex items-center justify-between gap-3 px-2 py-3">
            <a className="text-sm font-normal leading-5 text-black underline underline-offset-4" href={restaurant.mapsHref}>
              {restaurant.address}
            </a>
            <a
              href={restaurant.mapsHref}
              className="shrink-0 text-sm font-normal text-black underline underline-offset-4"
            >
              Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickInfo() {
  const status = useBusinessStatus();
  const facts = [
    { icon: <Utensils size={20} />, label: "Cuisine", value: restaurant.cuisine },
    { icon: <MapPin size={20} />, label: "Address", value: restaurant.address, href: restaurant.mapsHref },
    { icon: <Phone size={20} />, label: "Phone", phones: restaurant.phoneNumbers },
    { icon: <Clock size={20} />, label: "Today", value: status.today }
  ];

  return (
    <section className="border-b border-moon-rice bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className={`flex gap-2 border border-moon-rice bg-white p-3 ${fact.label === "Address" ? "col-span-2 md:col-span-1" : ""}`}
          >
            <span className="mt-1 text-black">{fact.icon}</span>
            <div>
              <p className="text-xs font-normal text-black">{fact.label}</p>
              {fact.phones ? (
                <div className="mt-1 space-y-1">
                  {fact.phones.map((phone) => (
                    <a key={phone.href} className="block text-sm font-normal leading-5 underline underline-offset-4" href={phone.href}>
                      {phone.label}
                    </a>
                  ))}
                </div>
              ) : fact.href ? (
                <a className="mt-1 block text-sm font-normal leading-5 underline underline-offset-4" href={fact.href}>
                  {fact.value}
                </a>
              ) : (
                <p className="mt-1 text-sm font-normal leading-5">{fact.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto max-w-7xl px-4 pb-4 text-sm font-normal text-black sm:px-6 lg:px-8">
        {restaurant.note}
      </p>
      <div className="mx-auto max-w-7xl px-4 pb-5 sm:px-6 lg:px-8">
        <p className="text-base">
          <span className={status.isOpen ? "text-green-700" : "text-red-700"}>
            {status.isOpen ? "Open" : "Closed"}
          </span>
          <span> · {status.text.replace(/^(Open|Closed) · /, "")}</span>
        </p>
      </div>
    </section>
  );
}

function MenuSection({
  activeCategory,
  setActiveCategory,
  openCategories,
  setOpenCategories,
  query,
  setQuery,
  filteredCategories
}) {
  const hasSearch = query.trim().length > 0;

  function toggleCategory(categoryName) {
    setActiveCategory(categoryName);
    setOpenCategories((current) =>
      current.includes(categoryName)
        ? current.filter((name) => name !== categoryName)
        : [...current, categoryName]
    );
  }

  return (
    <section id="menu" className="scroll-mt-24 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-normal text-black">Menu & prices</p>
            <h2 className="mt-2 text-3xl font-medium sm:text-4xl">Find your meal fast</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black">
              Search by dish name or jump to a category. Prices are listed directly on the page for quick mobile scanning.
            </p>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search menu"
              className="h-12 w-full rounded border border-moon-ink/20 bg-white pl-11 pr-4 text-base font-normal outline-none transition focus:border-black focus:ring-4 focus:ring-black/10"
              type="search"
            />
          </div>
        </div>

        <div className="clear-both -mx-4 mt-10 border-b border-moon-rice bg-white px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-8 overflow-x-auto" aria-label="Menu categories">
            {menuCategories.map((category) => (
              <a
                key={category.name}
                href={`#${slug(category.name)}`}
                onClick={() => {
                  setActiveCategory(category.name);
                  setOpenCategories((current) =>
                    current.includes(category.name) ? current : [...current, category.name]
                  );
                }}
                className={`shrink-0 border-b-4 px-1 pb-3 pt-2 text-sm font-normal transition ${
                  activeCategory === category.name
                    ? "border-black text-black"
                    : "border-transparent text-[#6f6f6f] hover:text-black"
                }`}
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-9">
          {filteredCategories.length === 0 ? (
            <div className="border border-moon-ink/10 bg-white p-8 text-center">
              <p className="text-lg font-medium">No menu items found.</p>
              <p className="mt-2 text-sm text-black">Try searching for chicken, shrimp, soup, rice, or lunch.</p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <article key={category.name} id={slug(category.name)} className="scroll-mt-44 md:scroll-mt-52">
                <button
                  type="button"
                  onClick={() => toggleCategory(category.name)}
                  className="flex w-full items-center justify-between gap-4 border-b-2 border-moon-ink bg-white py-4 text-left"
                  aria-expanded={hasSearch || openCategories.includes(category.name)}
                  aria-controls={`${slug(category.name)}-panel`}
                >
                  <span>
                    <span className="block text-2xl font-medium">{category.name}</span>
                    {category.note && <span className="mt-1 block text-sm font-normal text-black">{category.note}</span>}
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="bg-moon-cream px-3 py-1 text-xs font-normal text-black">
                      {category.items.length} items
                    </span>
                    <ChevronDown
                      className={`text-black transition ${
                        hasSearch || openCategories.includes(category.name) ? "rotate-180" : ""
                      }`}
                      size={22}
                    />
                  </span>
                </button>
                <div
                  id={`${slug(category.name)}-panel`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    hasSearch || openCategories.includes(category.name)
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {category.items.map((menuItem, index) => (
                        <MenuItemCard
                          key={`${category.name}-${menuItem.code}-${menuItem.name}-${index}`}
                          menuItem={menuItem}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function MenuItemCard({ menuItem }) {
  const labels = [
    menuItem.spicy && "Spicy",
    menuItem.vegetarian && "Vegetarian"
  ].filter(Boolean);

  return (
    <div className="border border-moon-rice bg-white p-4 transition hover:border-black">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h4 className="text-base font-medium leading-6">
            {menuItem.code && <span className="mr-2 text-black">{menuItem.code}</span>}
            {menuItem.name}
          </h4>
          {menuItem.description && <p className="mt-2 text-sm leading-6 text-black">{menuItem.description}</p>}
        </div>
        {menuItem.price && (
          <p className="text-left text-base font-medium leading-6 text-black sm:max-w-44 sm:shrink-0 sm:text-right">
            {menuItem.price}
          </p>
        )}
      </div>
      {menuItem.options && (
        <div className="mt-3 divide-y divide-moon-rice border-t border-moon-rice">
          {menuItem.options.map(([label, price]) => (
            <div key={label} className="flex items-center justify-between gap-4 py-2 text-sm">
              <span>{label}</span>
              <span className="font-medium">{price}</span>
            </div>
          ))}
        </div>
      )}
      {labels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {labels.map((label) => (
            <span
              key={label}
              className="rounded border border-moon-rice bg-moon-cream px-2.5 py-1 text-xs font-normal text-black"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function DeliveryInfo() {
  return (
    <section className="border-y border-moon-rice bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-medium">Delivery info</h2>
        <p className="mt-3 max-w-3xl leading-7">
          Free delivery is available within a 5-mile radius with a $16 minimum. Normal delivery time is usually 20 to
          35 minutes. During busy hours, especially 6 PM to 8 PM, delivery may take 45 to 60 minutes.
        </p>
        <p className="mt-3 max-w-3xl leading-7">
          We do not charge a delivery fee. If you are able, a tip for your driver is greatly appreciated.
        </p>
      </div>
    </section>
  );
}

function Hours() {
  return (
    <section id="hours" className="scroll-mt-24 border-y border-moon-rice bg-white py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-normal text-black">Hours</p>
          <h2 className="mt-2 text-3xl font-medium">Weekly business hours</h2>
          <p className="mt-3 text-sm leading-7 text-black">
            Holiday hours may differ. Call ahead on major holidays to confirm.
          </p>
        </div>
        <div className="border border-moon-ink/10 bg-moon-cream p-4">
          {restaurant.hours.map((entry) => (
            <div key={entry.day} className="flex items-center justify-between border-b border-moon-rice py-3 last:border-0">
              <span className="font-normal">{entry.day}</span>
              <span className="text-right text-sm font-normal text-black">{entry.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="scroll-mt-24 bg-moon-cream py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-normal text-black">Location</p>
          <h2 className="mt-2 text-3xl font-medium">China Moon in Marietta</h2>
          <div className="mt-6 space-y-4 text-black">
            <p className="flex gap-3 font-normal">
              <MapPin className="mt-1 shrink-0 text-black" size={20} />
              <a className="underline decoration-black decoration-2 underline-offset-4" href={restaurant.mapsHref}>
                {restaurant.address}
              </a>
            </p>
            <div className="flex gap-3 font-normal">
              <Phone className="mt-1 shrink-0 text-black" size={20} />
              <div className="space-y-1">
                {restaurant.phoneNumbers.map((phone) => (
                  <a key={phone.href} className="block underline decoration-black decoration-2 underline-offset-4" href={phone.href}>
                    {phone.label}
                  </a>
                ))}
              </div>
            </div>
            <p className="text-sm leading-7">
              Parking is available in the shopping center lot. Use the directions button for the most current route.
            </p>
          </div>
          <div className="mt-6">
            <ActionButton href={restaurant.mapsHref} label="Get Directions" tone="primary" icon={<MapPin size={18} />} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-moon-rice bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-black p-6 text-white sm:p-8">
          <p className="text-sm font-normal text-white">Contact</p>
          <h2 className="mt-2 text-3xl font-medium">Questions about the menu?</h2>
          <p className="mt-3 max-w-2xl leading-7 text-white">
            Call China Moon to ask about prices, ingredients, current wait times, or special holiday hours.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {restaurant.phoneNumbers.map((phone) => (
              <ActionButton key={phone.href} href={phone.href} label={phone.label} icon={<Phone size={18} />} light />
            ))}
            <ActionButton href={restaurant.mapsHref} label="Get Directions" icon={<MapPin size={18} />} light />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-moon-ink px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
        <div>
          <p className="text-xl font-medium">{restaurant.name}</p>
          <p className="mt-2 text-sm leading-6 text-white">{restaurant.cuisine} restaurant in {restaurant.cityState}</p>
        </div>
        <div>
          <p className="font-medium">Address</p>
          <a className="mt-2 block text-sm leading-6 text-white underline underline-offset-4" href={restaurant.mapsHref}>
            {restaurant.address}
          </a>
        </div>
        <div>
          <p className="font-medium">Phone</p>
          <div className="mt-2 space-y-1">
            {restaurant.phoneNumbers.map((phone) => (
              <a key={phone.href} className="block text-sm text-white underline underline-offset-4" href={phone.href}>
                {phone.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-medium">Hours</p>
          <p className="mt-2 text-sm leading-6 text-white">Tue-Fri 11 AM-10 PM, Sat-Sun 12-10 PM, Mon closed</p>
          <div className="mt-3 flex gap-3">
            {restaurant.social.map((link) => (
              <a key={link.label} className="text-sm font-normal text-white underline underline-offset-4" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl border-t border-white/15 pt-5 text-xs text-white">
        Copyright {new Date().getFullYear()} {restaurant.name}. All rights reserved.
      </p>
    </footer>
  );
}

function ActionButton({ href, label, icon, tone, light }) {
  const classes = tone === "primary"
    ? "bg-black text-white hover:bg-moon-soy"
    : light
      ? "bg-white text-black hover:bg-moon-rice"
      : "bg-white text-black hover:bg-moon-rice";

  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded border border-moon-ink/10 px-5 py-3 text-sm font-normal transition focus:outline-none focus:ring-4 focus:ring-black/20 ${classes}`}
    >
      {icon}
      {label}
    </a>
  );
}

function slug(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
