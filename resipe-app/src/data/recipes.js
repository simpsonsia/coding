
const recipes = [
  {
    id: 1,
    name: "Creamy Garlic Parmesan Pasta",
    category: "Dinner",
    time: 25,
    servings: 2,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900",
    description: "A comforting pasta dish with a creamy garlic sauce and freshly grated Parmesan.",
    ingredients: [
      "200g pasta",
      "3 cloves garlic, minced",
      "2 tablespoons butter",
      "1/2 cup heavy cream",
      "1/2 cup grated Parmesan",
      "Salt and black pepper",
      "Fresh parsley"
    ],
    instructions: [
      "Cook the pasta in salted boiling water according to the package instructions.",
      "Melt the butter in a pan and sauté the garlic until fragrant.",
      "Stir in the cream and Parmesan, then season with salt and pepper.",
      "Add the drained pasta and toss until coated in the sauce.",
      "Garnish with parsley and serve warm."
    ]
  },
  {
    id: 2,
    name: "Fresh Avocado Toast",
    category: "Breakfast",
    time: 10,
    servings: 1,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=900",
    description: "Crunchy toast topped with creamy avocado, lemon, and a pinch of seasoning.",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "1 teaspoon lemon juice",
      "Salt and black pepper",
      "Chili flakes (optional)"
    ],
    instructions: [
      "Toast the bread until golden and crisp.",
      "Mash the avocado with lemon juice, salt, and pepper.",
      "Spread the avocado mixture over the toast.",
      "Finish with chili flakes if desired and serve immediately."
    ]
  },
  {
    id: 3,
    name: "Berry Breakfast Bowl",
    category: "Breakfast",
    time: 8,
    servings: 1,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900",
    description: "A colorful breakfast bowl filled with fruit, yogurt, and crunchy toppings.",
    ingredients: [
      "1 cup Greek yogurt",
      "1/2 cup strawberries",
      "1/2 cup blueberries",
      "1/4 cup granola",
      "1 teaspoon honey"
    ],
    instructions: [
      "Spoon the Greek yogurt into a bowl.",
      "Wash and slice the fruit.",
      "Arrange the fruit and granola over the yogurt.",
      "Drizzle with honey and enjoy."
    ]
  },
  {
    id: 4,
    name: "Classic Garden Salad",
    category: "Lunch",
    time: 15,
    servings: 2,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900",
    description: "A refreshing salad with crisp vegetables and a simple homemade dressing.",
    ingredients: [
      "4 cups mixed greens",
      "1 cucumber",
      "1 cup cherry tomatoes",
      "1/4 red onion",
      "2 tablespoons olive oil",
      "1 tablespoon lemon juice",
      "Salt and pepper"
    ],
    instructions: [
      "Wash and dry the mixed greens.",
      "Slice the cucumber, tomatoes, and red onion.",
      "Combine the vegetables in a large bowl.",
      "Whisk the olive oil, lemon juice, salt, and pepper together.",
      "Toss the salad with the dressing just before serving."
    ]
  },
  {
    id: 5,
    name: "Fluffy Pancakes",
    category: "Breakfast",
    time: 20,
    servings: 3,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=900",
    description: "Soft, fluffy pancakes perfect for a relaxed weekend breakfast.",
    ingredients: [
      "1 cup all-purpose flour",
      "1 tablespoon sugar",
      "1 teaspoon baking powder",
      "3/4 cup milk",
      "1 egg",
      "2 tablespoons melted butter",
      "Maple syrup"
    ],
    instructions: [
      "Mix the flour, sugar, and baking powder in a bowl.",
      "Whisk the milk, egg, and melted butter in a separate bowl.",
      "Combine the wet and dry ingredients until just mixed.",
      "Pour small portions into a lightly greased, medium-hot pan.",
      "Flip when bubbles appear, cook until golden, and serve with syrup."
    ]
  },
  {
    id: 6,
    name: "Chocolate Brownies",
    category: "Dessert",
    time: 40,
    servings: 9,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900",
    description: "Rich chocolate brownies with a soft center and a delicious crackly top.",
    ingredients: [
      "1/2 cup melted butter",
      "1 cup sugar",
      "2 eggs",
      "1/3 cup cocoa powder",
      "1/2 cup all-purpose flour",
      "1 teaspoon vanilla extract",
      "A pinch of salt"
    ],
    instructions: [
      "Preheat the oven to 175°C (350°F).",
      "Whisk the melted butter and sugar together.",
      "Beat in the eggs and vanilla extract.",
      "Fold in the cocoa powder, flour, and salt.",
      "Spread the batter into a lined baking pan.",
      "Bake for 20–25 minutes, then let cool before cutting."
    ]
  }
];

export default recipes;
