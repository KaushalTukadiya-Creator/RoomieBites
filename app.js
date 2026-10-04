/**
 * RoomieBites - Smart Allergy-Safe Meal Planner & Shopping List Assistant
 */

(function () {
  'use strict';

  // ==========================================================================
  // CONSTANTS & SEED DATA
  // ==========================================================================

  const ALLERGEN_OPTIONS = [
    'Peanuts', 'Tree Nuts', 'Dairy', 'Gluten', 'Eggs',
    'Shellfish', 'Fish', 'Soy', 'Sesame', 'Mustard'
  ];

  const DIET_OPTIONS = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free',
    'High-Protein', 'Pescatarian', 'Halal'
  ];

  const DAYS_OF_WEEK = [
    { key: 'mon', label: 'Monday' },
    { key: 'tue', label: 'Tuesday' },
    { key: 'wed', label: 'Wednesday' },
    { key: 'thu', label: 'Thursday' },
    { key: 'fri', label: 'Friday' },
    { key: 'sat', label: 'Saturday' },
    { key: 'sun', label: 'Sunday' }
  ];

  const MEAL_SLOTS = [
    { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { key: 'lunch', label: 'Lunch', icon: '🥪' },
    { key: 'dinner', label: 'Dinner', icon: '🍲' },
    { key: 'snack', label: 'Snack', icon: '🍎' }
  ];

  // Default seed roommates
  const DEFAULT_ROOMMATES = [
    {
      id: 'alex-1',
      name: 'Alex',
      avatar: '🥑',
      allergens: ['Peanuts', 'Tree Nuts', 'Gluten'],
      diets: ['High-Protein'],
      dislikes: 'Dislikes raw onions, spicy food'
    },
    {
      id: 'maya-2',
      name: 'Maya',
      avatar: '🦊',
      allergens: ['Dairy', 'Shellfish'],
      diets: ['Vegetarian'],
      dislikes: 'Prefers oat milk, no bell peppers'
    }
  ];

  // Default curated recipe catalog
  const DEFAULT_RECIPES = [
    {
      id: 'r1',
      name: 'Sweet Potato & Black Bean Power Bowl',
      category: 'Lunch',
      cookTime: 25,
      servings: 2,
      description: 'Roasted sweet potato cubes, spiced black beans, fluffy quinoa, and zesty lime tahini drizzle.',
      allergens: ['Sesame'],
      diets: ['Vegan', 'Vegetarian', 'Gluten-Free', 'High-Protein', 'Dairy-Free'],
      ingredients: [
        { name: 'Sweet potato', amount: '2 medium', aisle: 'Produce' },
        { name: 'Black beans (canned)', amount: '1 can (15oz)', aisle: 'Pantry & Condiments' },
        { name: 'Quinoa', amount: '1 cup', aisle: 'Grains & Bakery' },
        { name: 'Avocado', amount: '1 ripe', aisle: 'Produce' },
        { name: 'Tahini', amount: '2 tbsp', aisle: 'Pantry & Condiments' },
        { name: 'Lime', amount: '1 fresh', aisle: 'Produce' },
        { name: 'Ground cumin', amount: '1 tsp', aisle: 'Pantry & Condiments' }
      ],
      instructions: 'Roast sweet potatoes with olive oil and cumin at 400°F (200°C) for 20 mins. Cook quinoa. Warm black beans. Assemble bowls and drizzle with whisked tahini and lime juice.'
    },
    {
      id: 'r2',
      name: 'Berry Chia Seed Overnight Oatmeal',
      category: 'Breakfast',
      cookTime: 10,
      servings: 1,
      description: 'Creamy gluten-free rolled oats soaked in oat milk, layered with chia seeds, maple syrup, and fresh blueberries.',
      allergens: [], // Zero major allergens when made with certified GF oats & oat milk
      diets: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
      ingredients: [
        { name: 'Gluten-free rolled oats', amount: '0.75 cup', aisle: 'Grains & Bakery' },
        { name: 'Oat milk (unsweetened)', amount: '1 cup', aisle: 'Dairy & Substitutes' },
        { name: 'Chia seeds', amount: '1 tbsp', aisle: 'Pantry & Condiments' },
        { name: 'Fresh blueberries', amount: '0.5 cup', aisle: 'Produce' },
        { name: 'Pure maple syrup', amount: '1 tbsp', aisle: 'Pantry & Condiments' },
        { name: 'Cinnamon', amount: '0.5 tsp', aisle: 'Pantry & Condiments' }
      ],
      instructions: 'Combine oats, oat milk, chia seeds, and cinnamon in a jar. Refrigerate overnight. Top with fresh blueberries and maple syrup before enjoying.'
    },
    {
      id: 'r3',
      name: 'Thai Coconut Basil Chicken Curry',
      category: 'Dinner',
      cookTime: 30,
      servings: 3,
      description: 'Tender chicken breast simmered with coconut milk, snap peas, bell pepper, ginger, and aromatic Thai basil.',
      allergens: [],
      diets: ['Gluten-Free', 'Dairy-Free', 'High-Protein', 'Halal'],
      ingredients: [
        { name: 'Boneless chicken breast', amount: '1.2 lbs', aisle: 'Meat, Fish & Protein' },
        { name: 'Coconut milk', amount: '1 can (14oz)', aisle: 'Pantry & Condiments' },
        { name: 'Red curry paste (GF)', amount: '2 tbsp', aisle: 'Pantry & Condiments' },
        { name: 'Sugar snap peas', amount: '1 cup', aisle: 'Produce' },
        { name: 'Red bell pepper', amount: '1 sliced', aisle: 'Produce' },
        { name: 'Fresh basil leaves', amount: '0.5 cup', aisle: 'Produce' },
        { name: 'Jasmine rice', amount: '1.5 cups', aisle: 'Grains & Bakery' }
      ],
      instructions: 'Brown chicken cubes in oil with curry paste. Pour in coconut milk and simmer for 15 mins. Add snap peas and red bell pepper for the final 5 mins. Stir in fresh basil. Serve over jasmine rice.'
    },
    {
      id: 'r4',
      name: 'Mediterranean Lemon Herb Salmon',
      category: 'Dinner',
      cookTime: 20,
      servings: 2,
      description: 'Pan-seared Atlantic salmon fillets with fresh dill, lemon zest, garlic, and crisp roasted asparagus.',
      allergens: ['Fish'],
      diets: ['Pescatarian', 'Gluten-Free', 'Dairy-Free', 'High-Protein'],
      ingredients: [
        { name: 'Fresh salmon fillets', amount: '2 fillets (12oz)', aisle: 'Meat, Fish & Protein' },
        { name: 'Asparagus bunch', amount: '1 bunch', aisle: 'Produce' },
        { name: 'Lemon', amount: '2 whole', aisle: 'Produce' },
        { name: 'Garlic cloves', amount: '3 cloves', aisle: 'Produce' },
        { name: 'Fresh dill', amount: '2 sprigs', aisle: 'Produce' },
        { name: 'Extra virgin olive oil', amount: '2 tbsp', aisle: 'Pantry & Condiments' }
      ],
      instructions: 'Season salmon with salt, pepper, and minced garlic. Sear skin-side down for 5 mins, flip and cook 3 mins with lemon juice and fresh dill. Sauté asparagus alongside.'
    },
    {
      id: 'r5',
      name: 'Hearty Golden Lentil Vegetable Soup',
      category: 'Dinner',
      cookTime: 35,
      servings: 4,
      description: 'Warming red and brown lentils stewed with carrots, celery, crushed tomatoes, turmeric, and baby spinach.',
      allergens: [],
      diets: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'High-Protein'],
      ingredients: [
        { name: 'Brown or green lentils', amount: '1.5 cups', aisle: 'Grains & Bakery' },
        { name: 'Carrots', amount: '3 diced', aisle: 'Produce' },
        { name: 'Celery stalks', amount: '3 stalks', aisle: 'Produce' },
        { name: 'Crushed canned tomatoes', amount: '1 can (14oz)', aisle: 'Pantry & Condiments' },
        { name: 'Vegetable broth', amount: '4 cups', aisle: 'Pantry & Condiments' },
        { name: 'Baby spinach', amount: '2 cups', aisle: 'Produce' },
        { name: 'Ground turmeric', amount: '1 tsp', aisle: 'Pantry & Condiments' }
      ],
      instructions: 'Sauté carrots and celery. Add lentils, broth, canned tomatoes, and turmeric. Simmer for 25 mins until tender. Stir in spinach at the end until wilted.'
    },
    {
      id: 'r6',
      name: 'Crisp Apple Slices with Sunflower Butter',
      category: 'Snack',
      cookTime: 5,
      servings: 1,
      description: 'Crunchy Honeycrisp apple wedges served with creamy roasted sunflower seed butter and cinnamon.',
      allergens: [], // Safe alternative to peanut & tree nut butter
      diets: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
      ingredients: [
        { name: 'Honeycrisp apples', amount: '2 whole', aisle: 'Produce' },
        { name: 'Sunflower seed butter', amount: '3 tbsp', aisle: 'Pantry & Condiments' },
        { name: 'Ground cinnamon', amount: '0.25 tsp', aisle: 'Pantry & Condiments' }
      ],
      instructions: 'Slice apples into even wedges. Dust sunflower butter with a hint of cinnamon and dip away!'
    },
    {
      id: 'r7',
      name: 'Classic Avocado Toast on Sourdough',
      category: 'Breakfast',
      cookTime: 10,
      servings: 1,
      description: 'Artisan sourdough toasted with mashed avocado, chili flakes, sea salt, and a poached egg.',
      allergens: ['Gluten', 'Eggs'],
      diets: ['Vegetarian'],
      ingredients: [
        { name: 'Sourdough bread slices', amount: '2 slices', aisle: 'Grains & Bakery' },
        { name: 'Ripe avocado', amount: '1 whole', aisle: 'Produce' },
        { name: 'Eggs', amount: '2 large', aisle: 'Dairy & Substitutes' },
        { name: 'Red pepper flakes', amount: '1 pinch', aisle: 'Pantry & Condiments' },
        { name: 'Lemon juice', amount: '1 tsp', aisle: 'Produce' }
      ],
      instructions: 'Toast sourdough until crisp. Mash avocado with lemon, salt, and chili flakes. Poach or fry eggs to preference and place on top.'
    },
    {
      id: 'r8',
      name: 'Tofu & Vegetable Tamari Stir-Fry',
      category: 'Dinner',
      cookTime: 25,
      servings: 2,
      description: 'Golden crispy pressed tofu cubes tossed with broccoli florets, bell peppers, tamari, and sesame seeds.',
      allergens: ['Soy', 'Sesame'],
      diets: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'High-Protein'],
      ingredients: [
        { name: 'Extra firm tofu', amount: '1 block (14oz)', aisle: 'Produce' },
        { name: 'Broccoli florets', amount: '2 cups', aisle: 'Produce' },
        { name: 'Tamari gluten-free soy sauce', amount: '3 tbsp', aisle: 'Pantry & Condiments' },
        { name: 'Toasted sesame oil', amount: '1 tbsp', aisle: 'Pantry & Condiments' },
        { name: 'Sesame seeds', amount: '1 tbsp', aisle: 'Pantry & Condiments' },
        { name: 'Brown rice', amount: '1 cup', aisle: 'Grains & Bakery' }
      ],
      instructions: 'Press and cube tofu. Pan-fry in sesame oil until golden. Toss in broccoli and bell pepper with tamari. Garnish with toasted sesame seeds and serve over brown rice.'
    },
    {
      id: 'r9',
      name: 'Creamy Garlic Butter Shrimp Fettuccine',
      category: 'Dinner',
      cookTime: 25,
      servings: 3,
      description: 'Succulent gulf shrimp sautéed in rich garlic butter, tossed with fettuccine pasta, cream, and parmesan.',
      allergens: ['Shellfish', 'Dairy', 'Gluten'],
      diets: ['Pescatarian'],
      ingredients: [
        { name: 'Jumbo raw shrimp (peeled)', amount: '1 lb', aisle: 'Meat, Fish & Protein' },
        { name: 'Fettuccine pasta', amount: '8 oz', aisle: 'Grains & Bakery' },
        { name: 'Heavy cream', amount: '0.75 cup', aisle: 'Dairy & Substitutes' },
        { name: 'Butter', amount: '3 tbsp', aisle: 'Dairy & Substitutes' },
        { name: 'Parmesan cheese (grated)', amount: '0.5 cup', aisle: 'Dairy & Substitutes' },
        { name: 'Garlic cloves', amount: '4 minced', aisle: 'Produce' }
      ],
      instructions: 'Boil pasta al dente. Sauté garlic and shrimp in butter for 3-4 mins until pink. Pour in cream and parmesan to form a velvety sauce. Toss with pasta.'
    },
    {
      id: 'r10',
      name: 'Peanut Butter Banana Oatmeal Shake',
      category: 'Breakfast',
      cookTime: 5,
      servings: 1,
      description: 'Rich energy smoothie blended with creamy peanut butter, frozen ripe bananas, protein powder, and milk.',
      allergens: ['Peanuts', 'Dairy'],
      diets: ['Vegetarian', 'High-Protein'],
      ingredients: [
        { name: 'Creamy peanut butter', amount: '2 tbsp', aisle: 'Pantry & Condiments' },
        { name: 'Frozen bananas', amount: '2 medium', aisle: 'Produce' },
        { name: 'Whole milk', amount: '1.25 cups', aisle: 'Dairy & Substitutes' },
        { name: 'Rolled oats', amount: '0.3 cup', aisle: 'Grains & Bakery' }
      ],
      instructions: 'Add all ingredients to high-speed blender. Blend until smooth, thick, and creamy.'
    },
    {
      id: 'r11',
      name: 'Turkey Taco Lettuce Boats',
      category: 'Lunch',
      cookTime: 20,
      servings: 2,
      description: 'Lean ground turkey simmered in homemade Mexican taco spices, spooned into crisp Romaine boats with guacamole.',
      allergens: [],
      diets: ['Gluten-Free', 'Dairy-Free', 'High-Protein'],
      ingredients: [
        { name: 'Lean ground turkey', amount: '1 lb', aisle: 'Meat, Fish & Protein' },
        { name: 'Romaine lettuce hearts', amount: '1 pack', aisle: 'Produce' },
        { name: 'Pico de gallo', amount: '1 cup', aisle: 'Produce' },
        { name: 'Avocado guacamole', amount: '0.5 cup', aisle: 'Produce' },
        { name: 'Taco seasoning (mild)', amount: '2 tbsp', aisle: 'Pantry & Condiments' }
      ],
      instructions: 'Brown ground turkey with taco seasoning and splash of water for 8 mins. Spoon warm meat into crisp romaine leaves, topped with pico de gallo and guacamole.'
    },
    {
      id: 'r12',
      name: 'Hummus & Crisp Vegetable Crudités',
      category: 'Snack',
      cookTime: 10,
      servings: 2,
      description: 'Silky chickpea hummus surrounded by Persian cucumber spears, baby rainbow carrots, and bell pepper strips.',
      allergens: ['Sesame'], // tahini
      diets: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
      ingredients: [
        { name: 'Classic chickpea hummus', amount: '8 oz tub', aisle: 'Pantry & Condiments' },
        { name: 'Persian cucumbers', amount: '4 whole', aisle: 'Produce' },
        { name: 'Baby carrots', amount: '1 bag', aisle: 'Produce' },
        { name: 'Bell peppers (yellow & orange)', amount: '2 whole', aisle: 'Produce' }
      ],
      instructions: 'Slice vegetables into crunchy dipping sticks. Serve around a bowl of hummus drizzled with olive oil.'
    },
    {
      id: 'r13',
      name: 'Lemon Herb Quinoa Salad with Chickpeas',
      category: 'Lunch',
      cookTime: 20,
      servings: 3,
      description: 'Fluffy chilled quinoa, canned chickpeas, chopped parsley, diced cucumber, and cherry tomatoes in lemon vinaigrette.',
      allergens: [],
      diets: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'High-Protein'],
      ingredients: [
        { name: 'Quinoa', amount: '1 cup', aisle: 'Grains & Bakery' },
        { name: 'Chickpeas (canned)', amount: '1 can (15oz)', aisle: 'Pantry & Condiments' },
        { name: 'Cherry tomatoes', amount: '1 cup halved', aisle: 'Produce' },
        { name: 'English cucumber', amount: '1 diced', aisle: 'Produce' },
        { name: 'Fresh flat-leaf parsley', amount: '0.5 cup', aisle: 'Produce' },
        { name: 'Lemon juice & olive oil', amount: '3 tbsp', aisle: 'Pantry & Condiments' }
      ],
      instructions: 'Cook quinoa and cool completely. Toss with rinsed chickpeas, cucumbers, cherry tomatoes, and chopped parsley with lemon dressing.'
    },
    {
      id: 'r14',
      name: 'Grilled Chicken & Roasted Sweet Potato Fries',
      category: 'Dinner',
      cookTime: 30,
      servings: 2,
      description: 'Herbed grilled chicken breasts with sweet paprika seasoned sweet potato wedges and steamed green beans.',
      allergens: [],
      diets: ['Gluten-Free', 'Dairy-Free', 'High-Protein', 'Halal'],
      ingredients: [
        { name: 'Chicken breast cutlets', amount: '1.2 lbs', aisle: 'Meat, Fish & Protein' },
        { name: 'Sweet potatoes', amount: '2 large', aisle: 'Produce' },
        { name: 'Fresh green beans', amount: '0.75 lb', aisle: 'Produce' },
        { name: 'Smoked paprika', amount: '1 tsp', aisle: 'Pantry & Condiments' },
        { name: 'Garlic powder', amount: '1 tsp', aisle: 'Pantry & Condiments' },
        { name: 'Olive oil', amount: '2 tbsp', aisle: 'Pantry & Condiments' }
      ],
      instructions: 'Cut sweet potatoes into fries, toss with paprika and bake at 425°F for 22 mins. Grill chicken 6 mins per side. Steam green beans and serve.'
    },
    {
      id: 'r15',
      name: 'Fresh Fruit Skewers with Mint Dressing',
      category: 'Snack',
      cookTime: 10,
      servings: 2,
      description: 'Colorful skewers of cantaloupe, strawberries, grapes, and kiwi with a fresh lime-mint splash.',
      allergens: [],
      diets: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free'],
      ingredients: [
        { name: 'Fresh strawberries', amount: '1 pint', aisle: 'Produce' },
        { name: 'Cantaloupe melon', amount: '0.5 melon', aisle: 'Produce' },
        { name: 'Seedless green grapes', amount: '1 cup', aisle: 'Produce' },
        { name: 'Kiwi fruit', amount: '2 peeled', aisle: 'Produce' },
        { name: 'Fresh mint leaves', amount: '2 sprigs', aisle: 'Produce' }
      ],
      instructions: 'Thread chopped fruits onto bamboo skewers. Sprinkle finely chopped mint and fresh lime juice.'
    },
    {
      id: 'r16',
      name: 'Spinach & Feta Egg Scramble with Toast',
      category: 'Breakfast',
      cookTime: 12,
      servings: 1,
      description: 'Soft scrambled pasture-raised eggs folded with fresh baby spinach and tangy crumbled Greek feta cheese.',
      allergens: ['Eggs', 'Dairy', 'Gluten'],
      diets: ['Vegetarian', 'High-Protein'],
      ingredients: [
        { name: 'Eggs', amount: '3 large', aisle: 'Dairy & Substitutes' },
        { name: 'Baby spinach', amount: '1.5 cups', aisle: 'Produce' },
        { name: 'Feta cheese (crumbled)', amount: '2 tbsp', aisle: 'Dairy & Substitutes' },
        { name: 'Whole wheat toast', amount: '2 slices', aisle: 'Grains & Bakery' },
        { name: 'Olive oil or butter', amount: '1 tsp', aisle: 'Dairy & Substitutes' }
      ],
      instructions: 'Wilt spinach in pan with oil. Beat eggs and pour into pan on low heat, gently stirring. Fold in crumbled feta cheese right before removing.'
    }
  ];

  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================

  let state = {
    roommates: [],
    activeRoommateId: 'all', // 'all' (Household Safe Mode) or roommate id
    recipes: [],
    weeklyPlan: {}, // key: `${day}_${slot}` -> recipeId
    shoppingChecked: {}, // key: itemId -> boolean
    customShoppingItems: [], // array of { id, name, category, checked }
    // UI filters
    searchQuery: '',
    safeOnly: true,
    categoryFilter: 'all',
    dietFilter: 'all',
    timeFilter: 'all',
    activeSlotPicking: null // { day, slot } when modal is open
  };

  // LocalStorage Helpers
  function saveState() {
    try {
      localStorage.setItem('roomie_roommates', JSON.stringify(state.roommates));
      localStorage.setItem('roomie_active_id', state.activeRoommateId);
      localStorage.setItem('roomie_recipes', JSON.stringify(state.recipes));
      localStorage.setItem('roomie_weekly_plan', JSON.stringify(state.weeklyPlan));
      localStorage.setItem('roomie_shopping_checked', JSON.stringify(state.shoppingChecked));
      localStorage.setItem('roomie_custom_items', JSON.stringify(state.customShoppingItems));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }

  function loadState() {
    try {
      const storedRoommates = localStorage.getItem('roomie_roommates');
      state.roommates = storedRoommates ? JSON.parse(storedRoommates) : DEFAULT_ROOMMATES;

      const storedActiveId = localStorage.getItem('roomie_active_id');
      state.activeRoommateId = storedActiveId || 'all';

      const storedRecipes = localStorage.getItem('roomie_recipes');
      state.recipes = storedRecipes ? JSON.parse(storedRecipes) : DEFAULT_RECIPES;

      const storedWeeklyPlan = localStorage.getItem('roomie_weekly_plan');
      state.weeklyPlan = storedWeeklyPlan ? JSON.parse(storedWeeklyPlan) : {};

      const storedShoppingChecked = localStorage.getItem('roomie_shopping_checked');
      state.shoppingChecked = storedShoppingChecked ? JSON.parse(storedShoppingChecked) : {};

      const storedCustomItems = localStorage.getItem('roomie_custom_items');
      state.customShoppingItems = storedCustomItems ? JSON.parse(storedCustomItems) : [];
    } catch (e) {
      console.error('Error loading state, using defaults', e);
      state.roommates = DEFAULT_ROOMMATES;
      state.recipes = DEFAULT_RECIPES;
      state.weeklyPlan = {};
    }
  }

  // ==========================================================================
  // ALLERGEN & SAFETY EVALUATION ENGINE
  // ==========================================================================

  /**
   * Evaluates whether a recipe is safe against the active roommate or the entire household.
   * @param {Object} recipe
   * @param {string} roommateId - specific roommate ID or 'all'
   * @returns {{ isSafe: boolean, allergenConflicts: string[], dietConflicts: string[] }}
   */
  function evaluateMealSafety(recipe, roommateId = state.activeRoommateId) {
    if (!recipe) return { isSafe: true, allergenConflicts: [], dietConflicts: [] };

    let targetAllergens = new Set();
    let targetDiets = new Set();

    if (roommateId === 'all') {
      // Merge all roommates' allergens and diets
      state.roommates.forEach(rm => {
        (rm.allergens || []).forEach(a => targetAllergens.add(a));
        (rm.diets || []).forEach(d => targetDiets.add(d));
      });
    } else {
      const rm = state.roommates.find(r => r.id === roommateId);
      if (rm) {
        (rm.allergens || []).forEach(a => targetAllergens.add(a));
        (rm.diets || []).forEach(d => targetDiets.add(d));
      }
    }

    const mealAllergens = recipe.allergens || [];
    const mealDiets = recipe.diets || [];

    // Check allergen conflicts
    const allergenConflicts = mealAllergens.filter(a => targetAllergens.has(a));

    // Check dietary violations (e.g. if roommate is Vegetarian, meal must have Vegetarian tag)
    const dietConflicts = [];
    if (targetDiets.has('Vegetarian') && !mealDiets.includes('Vegetarian') && !mealDiets.includes('Vegan')) {
      dietConflicts.push('Not Vegetarian');
    }
    if (targetDiets.has('Vegan') && !mealDiets.includes('Vegan')) {
      dietConflicts.push('Not Vegan');
    }
    if (targetDiets.has('Pescatarian') && !mealDiets.includes('Pescatarian') && !mealDiets.includes('Vegetarian') && !mealDiets.includes('Vegan')) {
      dietConflicts.push('Not Pescatarian');
    }
    if (targetDiets.has('Dairy-Free') && mealAllergens.includes('Dairy')) {
      if (!allergenConflicts.includes('Dairy')) allergenConflicts.push('Dairy');
    }
    if (targetDiets.has('Gluten-Free') && mealAllergens.includes('Gluten')) {
      if (!allergenConflicts.includes('Gluten')) allergenConflicts.push('Gluten');
    }

    const isSafe = allergenConflicts.length === 0 && dietConflicts.length === 0;

    return {
      isSafe,
      allergenConflicts,
      dietConflicts
    };
  }

  // ==========================================================================
  // DOM ELEMENTS & INITIALIZATION
  // ==========================================================================

  let DOM = {};

  function cacheDOMElements() {
    DOM = {
      activeRoommateSelect: document.getElementById('activeRoommateSelect'),
      manageRoommatesBtn: document.getElementById('manageRoommatesBtn'),
      activeSafetyBanner: document.getElementById('activeSafetyBanner'),
      navTabs: document.querySelectorAll('.nav-tab'),
      tabPanels: document.querySelectorAll('.tab-panel'),

      // Weekly Planner
      weeklyGrid: document.getElementById('weeklyGrid'),
      autoPlanSafeWeekBtn: document.getElementById('autoPlanSafeWeekBtn'),
      exportPlanBtn: document.getElementById('exportPlanBtn'),
      clearPlanBtn: document.getElementById('clearPlanBtn'),

      // Recipes & Catalog
      recipeCardsGrid: document.getElementById('recipeCardsGrid'),
      recipeSearchInput: document.getElementById('recipeSearchInput'),
      clearSearchBtn: document.getElementById('clearSearchBtn'),
      safeOnlyCheckbox: document.getElementById('safeOnlyCheckbox'),
      categoryFilter: document.getElementById('categoryFilter'),
      dietFilter: document.getElementById('dietFilter'),
      timeFilter: document.getElementById('timeFilter'),
      recipeResultsStats: document.getElementById('recipeResultsStats'),
      addNewMealBtn: document.getElementById('addNewMealBtn'),

      // Shopping List
      shoppingCategoriesContainer: document.getElementById('shoppingCategoriesContainer'),
      shoppingProgressBar: document.getElementById('shoppingProgressBar'),
      shoppingProgressText: document.getElementById('shoppingProgressText'),
      shoppingProgressPercent: document.getElementById('shoppingProgressPercent'),
      shoppingBadge: document.getElementById('shoppingBadge'),
      planMealCount: document.getElementById('planMealCount'),
      plannedMealsMiniList: document.getElementById('plannedMealsMiniList'),
      copyShoppingListBtn: document.getElementById('copyShoppingListBtn'),
      printShoppingListBtn: document.getElementById('printShoppingListBtn'),
      clearCheckedBtn: document.getElementById('clearCheckedBtn'),
      addCustomItemForm: document.getElementById('addCustomItemForm'),
      customItemName: document.getElementById('customItemName'),
      customItemCategory: document.getElementById('customItemCategory'),

      // Roommates
      roommatesGrid: document.getElementById('roommatesGrid'),
      addRoommateBtn: document.getElementById('addRoommateBtn'),

      // Modals
      roommateModal: document.getElementById('roommateModal'),
      roommateForm: document.getElementById('roommateForm'),
      roommateEditId: document.getElementById('roommateEditId'),
      roommateName: document.getElementById('roommateName'),
      roommateAvatar: document.getElementById('roommateAvatar'),
      roommateDislikes: document.getElementById('roommateDislikes'),
      allergenCheckboxCloud: document.getElementById('allergenCheckboxCloud'),
      dietCheckboxCloud: document.getElementById('dietCheckboxCloud'),
      roommateModalTitle: document.getElementById('roommateModalTitle'),

      pickMealModal: document.getElementById('pickMealModal'),
      pickMealModalTitle: document.getElementById('pickMealModalTitle'),
      pickMealModalSubtitle: document.getElementById('pickMealModalSubtitle'),
      slotMealPickerList: document.getElementById('slotMealPickerList'),
      slotMealSearch: document.getElementById('slotMealSearch'),
      slotSafeOnlyCheckbox: document.getElementById('slotSafeOnlyCheckbox'),

      recipeModal: document.getElementById('recipeModal'),
      customRecipeForm: document.getElementById('customRecipeForm'),
      recipeAllergenCloud: document.getElementById('recipeAllergenCloud'),
      recipeDietCloud: document.getElementById('recipeDietCloud'),

      recipeDetailModal: document.getElementById('recipeDetailModal'),
      detailHeaderTitle: document.getElementById('detailHeaderTitle'),
      recipeDetailBody: document.getElementById('recipeDetailBody'),
      detailAddToPlanBtn: document.getElementById('detailAddToPlanBtn'),

      toastContainer: document.getElementById('toastContainer')
    };
  }

  // ==========================================================================
  // RENDER FUNCTIONS
  // ==========================================================================

  function renderAll() {
    renderRoommateSelector();
    renderSafetyBanner();
    renderWeeklyPlanner();
    renderRecipeCatalog();
    renderShoppingList();
    renderRoommatesList();
  }

  // 1. Roommate Selector & Banner
  function renderRoommateSelector() {
    const select = DOM.activeRoommateSelect;
    if (!select) return;

    select.innerHTML = '';

    // Option: Whole Household
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = `🛡️ Whole Household (${state.roommates.length} Roommates)`;
    if (state.activeRoommateId === 'all') allOpt.selected = true;
    select.appendChild(allOpt);

    // Individual Roommates
    state.roommates.forEach(rm => {
      const opt = document.createElement('option');
      opt.value = rm.id;
      opt.textContent = `${rm.avatar || '👤'} ${rm.name}`;
      if (state.activeRoommateId === rm.id) opt.selected = true;
      select.appendChild(opt);
    });
  }

  function renderSafetyBanner() {
    const banner = DOM.activeSafetyBanner;
    if (!banner) return;

    let targetName = 'Entire Household';
    let targetAvatar = '🛡️';
    let targetAllergens = [];
    let targetDiets = [];
    let notes = '';

    if (state.activeRoommateId === 'all') {
      const allSet = new Set();
      const dietSet = new Set();
      state.roommates.forEach(rm => {
        (rm.allergens || []).forEach(a => allSet.add(a));
        (rm.diets || []).forEach(d => dietSet.add(d));
      });
      targetAllergens = Array.from(allSet);
      targetDiets = Array.from(dietSet);
      notes = `Combined safety filter protecting ${state.roommates.map(r => r.name).join(', ')}`;
    } else {
      const rm = state.roommates.find(r => r.id === state.activeRoommateId);
      if (rm) {
        targetName = `${rm.name}'s Safety Profile`;
        targetAvatar = rm.avatar || '🥑';
        targetAllergens = rm.allergens || [];
        targetDiets = rm.diets || [];
        notes = rm.dislikes ? `Preferences: "${rm.dislikes}"` : 'Strict safety checking active';
      }
    }

    const allergenTagsHtml = targetAllergens.length > 0
      ? targetAllergens.map(a => `<span class="tag tag-allergen">⚠️ Avoids ${escapeHtml(a)}</span>`).join('')
      : '<span class="tag tag-safe">✅ No Known Allergies Reported</span>';

    const dietTagsHtml = targetDiets.map(d => `<span class="tag tag-diet">🌿 ${escapeHtml(d)}</span>`).join('');

    banner.innerHTML = `
      <div class="banner-left">
        <div class="banner-avatar">${targetAvatar}</div>
        <div>
          <div class="banner-title">
            <span>${escapeHtml(targetName)}</span>
            <span class="tag tag-safe">Active Filter</span>
          </div>
          <div class="banner-meta">
            ${allergenTagsHtml}
            ${dietTagsHtml}
          </div>
          <p style="font-size:0.75rem; color:var(--text-dim); margin-top:0.3rem;">${escapeHtml(notes)}</p>
        </div>
      </div>
      <div>
        <button id="quickSwitchTabBtn" class="btn btn-secondary btn-sm" onclick="window.RoomieApp.switchTab('suggestionsTab')">
          View Safe Catalog (${getSafeRecipesCount()} Safe)
        </button>
      </div>
    `;
  }

  function getSafeRecipesCount() {
    return state.recipes.filter(r => evaluateMealSafety(r).isSafe).length;
  }

  // 2. Weekly Meal Planner Grid
  function renderWeeklyPlanner() {
    const grid = DOM.weeklyGrid;
    if (!grid) return;

    grid.innerHTML = '';
    const todayIndex = (new Date().getDay() + 6) % 7; // 0 for Mon, 6 for Sun

    DAYS_OF_WEEK.forEach((day, index) => {
      const isToday = index === todayIndex;
      const dayCol = document.createElement('div');
      dayCol.className = `day-column ${isToday ? 'is-today' : ''}`;

      dayCol.innerHTML = `
        <div class="day-header">
          <span class="day-name">${day.label}</span>
          ${isToday ? '<span class="day-tag">Today</span>' : ''}
        </div>
        <div class="day-slots" id="slots-${day.key}">
          <!-- Slots injected below -->
        </div>
      `;

      const slotsContainer = dayCol.querySelector(`#slots-${day.key}`);

      MEAL_SLOTS.forEach(slot => {
        const slotKey = `${day.key}_${slot.key}`;
        const mealId = state.weeklyPlan[slotKey];
        const meal = mealId ? state.recipes.find(r => r.id === mealId) : null;

        const slotEl = document.createElement('div');

        if (meal) {
          const safety = evaluateMealSafety(meal);
          const hasConflict = !safety.isSafe;

          slotEl.className = `meal-slot has-meal ${hasConflict ? 'has-conflict' : ''}`;
          slotEl.innerHTML = `
            <div class="slot-type-header">
              <span class="slot-type-badge">${slot.icon} ${slot.label}</span>
              <div class="slot-actions">
                <button class="btn-slot-action" title="Change meal" onclick="window.RoomieApp.openPickMealModal('${day.key}', '${slot.key}')">✏️</button>
                <button class="btn-slot-action" title="Remove meal" onclick="window.RoomieApp.removeSlotMeal('${slotKey}')">✕</button>
              </div>
            </div>
            <div class="slot-meal-title" onclick="window.RoomieApp.openRecipeDetailModal('${meal.id}')" title="Click for ingredients & recipe">
              ${escapeHtml(meal.name)}
            </div>
            <div class="slot-safety-indicator ${hasConflict ? 'slot-safety-danger' : 'slot-safety-safe'}">
              ${hasConflict
              ? `<span>⚠️ Contains ${safety.allergenConflicts.join(', ') || 'Diet mismatch'}</span>`
              : '<span>🛡️ Safe for Roomie</span>'}
            </div>
          `;
        } else {
          slotEl.className = 'meal-slot';
          slotEl.innerHTML = `
            <div class="slot-type-header">
              <span class="slot-type-badge">${slot.icon} ${slot.label}</span>
            </div>
            <button class="empty-slot-btn" onclick="window.RoomieApp.openPickMealModal('${day.key}', '${slot.key}')">
              <span>➕</span>
              <span>Pick Safe Meal</span>
            </button>
          `;
        }

        slotsContainer.appendChild(slotEl);
      });

      grid.appendChild(dayCol);
    });
  }

  // 3. Recipe Catalog & Suggestions
  function renderRecipeCatalog() {
    const grid = DOM.recipeCardsGrid;
    if (!grid) return;

    let filtered = [...state.recipes];

    // Search query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        (r.ingredients || []).some(i => i.name.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (state.categoryFilter !== 'all') {
      filtered = filtered.filter(r => r.category.toLowerCase() === state.categoryFilter.toLowerCase());
    }

    // Diet filter
    if (state.dietFilter !== 'all') {
      filtered = filtered.filter(r => (r.diets || []).includes(state.dietFilter));
    }

    // Time filter
    if (state.timeFilter !== 'all') {
      const maxMins = parseInt(state.timeFilter, 10);
      filtered = filtered.filter(r => r.cookTime <= maxMins);
    }

    // Safe Only filter
    if (state.safeOnly) {
      filtered = filtered.filter(r => evaluateMealSafety(r).isSafe);
    }

    // Results stats update
    if (DOM.recipeResultsStats) {
      DOM.recipeResultsStats.textContent = `Showing ${filtered.length} of ${state.recipes.length} recipes ${state.safeOnly ? '(Filtered for safety)' : ''}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🥗</div>
          <h3>No matching recipes found</h3>
          <p>Try easing your filters or add a new custom safe recipe using the button above.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = '';
    filtered.forEach(recipe => {
      const safety = evaluateMealSafety(recipe);
      const isSafe = safety.isSafe;

      const card = document.createElement('div');
      card.className = `recipe-card ${isSafe ? '' : 'has-danger'}`;

      const allergenTagsHtml = (recipe.allergens && recipe.allergens.length > 0)
        ? recipe.allergens.map(a => `<span class="tag tag-allergen">${escapeHtml(a)}</span>`).join('')
        : '<span class="tag tag-safe">Allergen-Free</span>';

      const dietTagsHtml = (recipe.diets || []).slice(0, 3).map(d => `<span class="tag tag-diet">${escapeHtml(d)}</span>`).join('');

      card.innerHTML = `
        <div class="recipe-card-header">
          <span class="recipe-category-pill">${escapeHtml(recipe.category)}</span>
          <span class="recipe-safety-badge ${isSafe ? 'safety-badge-safe' : 'safety-badge-danger'}">
            ${isSafe ? '🛡️ Safe for Roomie' : `⚠️ Contains ${safety.allergenConflicts.join(', ') || 'Allergens'}`}
          </span>
        </div>
        <div class="recipe-card-body">
          <h3 class="recipe-card-title">${escapeHtml(recipe.name)}</h3>
          <p class="recipe-card-desc">${escapeHtml(recipe.description || 'Delicious home-cooked meal.')}</p>
          <div class="recipe-card-meta">
            <span>⏱️ ${recipe.cookTime || 20}m</span>
            <span>🍽️ ${recipe.servings || 2} servings</span>
            <span>🥗 ${recipe.ingredients ? recipe.ingredients.length : 0} ingredients</span>
          </div>
          
          <div class="recipe-card-allergens">
            ${!isSafe ? `
              <div class="allergen-warning-strip">
                <span>⚠️ Allergen alert: ${escapeHtml(safety.allergenConflicts.join(', '))}</span>
              </div>
            ` : ''}
            <div class="recipe-tags-list">
              ${allergenTagsHtml}
              ${dietTagsHtml}
            </div>
          </div>
        </div>
        <div class="recipe-card-footer">
          <button class="btn btn-secondary btn-sm" onclick="window.RoomieApp.openRecipeDetailModal('${recipe.id}')">
            View Details
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.RoomieApp.quickAddToPlan('${recipe.id}')">
            <span>➕</span> Plan Meal
          </button>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // 4. Smart Shopping List
  function renderShoppingList() {
    const container = DOM.shoppingCategoriesContainer;
    if (!container) return;

    // Collect all planned recipes
    const plannedRecipeIds = Object.values(state.weeklyPlan).filter(Boolean);
    const plannedRecipes = plannedRecipeIds.map(id => state.recipes.find(r => r.id === id)).filter(Boolean);

    // Update mini preview
    if (DOM.planMealCount) DOM.planMealCount.textContent = plannedRecipes.length;
    if (DOM.plannedMealsMiniList) {
      if (plannedRecipes.length === 0) {
        DOM.plannedMealsMiniList.innerHTML = `<span style="font-size:0.75rem; color:var(--text-dim)">No meals scheduled in weekly calendar yet.</span>`;
      } else {
        DOM.plannedMealsMiniList.innerHTML = plannedRecipes.map((r, i) => `
          <div class="mini-meal-item">
            <span>${escapeHtml(r.name)}</span>
            <span style="color:var(--text-dim)">${escapeHtml(r.category)}</span>
          </div>
        `).join('');
      }
    }

    // Build Aggregated Grocery Items grouped by aisle
    // key: aisle -> map of { nameKey -> { name, amounts: [], sources: [] } }
    const aisleMap = {
      'Produce': {},
      'Dairy & Substitutes': {},
      'Meat, Fish & Protein': {},
      'Grains & Bakery': {},
      'Pantry & Condiments': {},
      'Other': {}
    };

    // 1. Ingest planned recipes
    plannedRecipes.forEach(recipe => {
      (recipe.ingredients || []).forEach(ing => {
        const aisle = aisleMap[ing.aisle] ? ing.aisle : 'Other';
        const key = ing.name.trim().toLowerCase();

        if (!aisleMap[aisle][key]) {
          aisleMap[aisle][key] = {
            id: `plan_${aisle}_${key}`.replace(/[^a-z0-9]/gi, '_'),
            name: ing.name.trim(),
            amounts: [],
            sources: new Set(),
            isCustom: false
          };
        }
        if (ing.amount) aisleMap[aisle][key].amounts.push(ing.amount);
        aisleMap[aisle][key].sources.add(recipe.name);
      });
    });

    // 2. Ingest custom extra grocery items
    state.customShoppingItems.forEach(item => {
      const aisle = aisleMap[item.category] ? item.category : 'Other';
      const key = item.name.trim().toLowerCase();

      if (!aisleMap[aisle][key]) {
        aisleMap[aisle][key] = {
          id: item.id,
          name: item.name.trim(),
          amounts: ['1'],
          sources: new Set(['Manual add']),
          isCustom: true
        };
      } else {
        aisleMap[aisle][key].sources.add('Manual add');
      }
    });

    // Count totals & completed
    let totalItems = 0;
    let checkedItems = 0;

    container.innerHTML = '';

    Object.keys(aisleMap).forEach(aisle => {
      const itemsObj = aisleMap[aisle];
      const keys = Object.keys(itemsObj);
      if (keys.length === 0) return;

      const groupCard = document.createElement('div');
      groupCard.className = 'category-group-card';

      const aisleIcon = {
        'Produce': '🥬',
        'Dairy & Substitutes': '🥛',
        'Meat, Fish & Protein': '🥩',
        'Grains & Bakery': '🌾',
        'Pantry & Condiments': '🥫',
        'Other': '🛒'
      }[aisle] || '📦';

      let itemsHtml = '';
      keys.forEach(k => {
        const item = itemsObj[k];
        totalItems++;
        const isChecked = !!state.shoppingChecked[item.id];
        if (isChecked) checkedItems++;

        const amountStr = item.amounts.length > 0 ? item.amounts.join(' + ') : '';
        const sourcesCount = item.sources.size;

        itemsHtml += `
          <li class="shopping-item-row ${isChecked ? 'checked' : ''}" id="row-${item.id}">
            <div class="item-left">
              <input type="checkbox" class="item-checkbox" id="chk-${item.id}" 
                ${isChecked ? 'checked' : ''} 
                onchange="window.RoomieApp.toggleShoppingItem('${item.id}')">
              <label for="chk-${item.id}" class="item-label">
                <strong>${escapeHtml(item.name)}</strong>
                ${amountStr ? `<span style="color:var(--text-muted); font-size:0.8rem"> (${escapeHtml(amountStr)})</span>` : ''}
              </label>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="item-source-badge" title="${Array.from(item.sources).join(', ')}">
                ${sourcesCount > 1 ? `${sourcesCount} meals` : Array.from(item.sources)[0]}
              </span>
              ${item.isCustom ? `
                <button class="btn-remove-item" onclick="window.RoomieApp.removeCustomItem('${item.id}')" title="Delete custom item">&times;</button>
              ` : ''}
            </div>
          </li>
        `;
      });

      groupCard.innerHTML = `
        <div class="category-group-header">
          <div class="category-title">
            <span>${aisleIcon}</span>
            <span>${escapeHtml(aisle)}</span>
          </div>
          <span class="category-count">${keys.length} items</span>
        </div>
        <ul class="category-items-list">
          ${itemsHtml}
        </ul>
      `;

      container.appendChild(groupCard);
    });

    if (totalItems === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted); background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--border-color);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛒</div>
          <h3>Your shopping list is empty</h3>
          <p>Add meals to your weekly planner or add custom items using the input above!</p>
        </div>
      `;
    }

    // Update progress bar & counters
    const percent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
    if (DOM.shoppingProgressBar) DOM.shoppingProgressBar.style.width = `${percent}%`;
    if (DOM.shoppingProgressText) DOM.shoppingProgressText.textContent = `${checkedItems} of ${totalItems} items checked`;
    if (DOM.shoppingProgressPercent) DOM.shoppingProgressPercent.textContent = `${percent}%`;
    if (DOM.shoppingBadge) DOM.shoppingBadge.textContent = totalItems;
  }

  // 5. Roommates Profile Grid
  function renderRoommatesList() {
    const grid = DOM.roommatesGrid;
    if (!grid) return;

    grid.innerHTML = '';

    state.roommates.forEach(rm => {
      const card = document.createElement('div');
      const isActive = state.activeRoommateId === rm.id;
      card.className = `profile-card ${isActive ? 'is-active-focus' : ''}`;

      const allergenTags = (rm.allergens || []).map(a =>
        `<span class="tag tag-allergen">⚠️ ${escapeHtml(a)}</span>`
      ).join('') || '<span style="font-size:0.8rem; color:var(--text-muted);">None reported</span>';

      const dietTags = (rm.diets || []).map(d =>
        `<span class="tag tag-diet">🌿 ${escapeHtml(d)}</span>`
      ).join('') || '<span style="font-size:0.8rem; color:var(--text-muted);">Standard diet</span>';

      card.innerHTML = `
        <div class="profile-card-header">
          <div class="profile-card-avatar">${rm.avatar || '🥑'}</div>
          <div class="profile-card-info">
            <h3>${escapeHtml(rm.name)}</h3>
            <span style="font-size:0.75rem; color:${isActive ? 'var(--primary)' : 'var(--text-dim)'}; font-weight:700;">
              ${isActive ? '● Currently Active Focus' : 'Roommate'}
            </span>
          </div>
        </div>

        <div class="profile-card-section">
          <span class="profile-section-label">Allergies & Intolerances</span>
          <div style="display:flex; flex-wrap:wrap; gap:0.35rem;">${allergenTags}</div>
        </div>

        <div class="profile-card-section">
          <span class="profile-section-label">Dietary Preferences</span>
          <div style="display:flex; flex-wrap:wrap; gap:0.35rem;">${dietTags}</div>
        </div>

        ${rm.dislikes ? `
          <div class="profile-card-section">
            <span class="profile-section-label">Dislikes / Notes</span>
            <p style="font-size:0.82rem; color:var(--text-muted);">${escapeHtml(rm.dislikes)}</p>
          </div>
        ` : ''}

        <div class="profile-card-actions">
          <button class="btn btn-secondary btn-sm" onclick="window.RoomieApp.openEditRoommateModal('${rm.id}')">
            ✏️ Edit Profile
          </button>
          <div style="display:flex; gap:0.4rem;">
            ${!isActive ? `
              <button class="btn btn-primary btn-sm" onclick="window.RoomieApp.setActiveRoommate('${rm.id}')">
                Set as Active
              </button>
            ` : ''}
            ${state.roommates.length > 1 ? `
              <button class="btn btn-danger-outline btn-sm" onclick="window.RoomieApp.deleteRoommate('${rm.id}')" title="Delete profile">
                🗑️
              </button>
            ` : ''}
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // ==========================================================================
  // MODAL HANDLERS & POPULATORS
  // ==========================================================================

  // Checkbox clouds for allergens and diets
  function populateCloud(container, options, selectedItems = [], isAllergen = false) {
    if (!container) return;
    container.innerHTML = '';
    options.forEach(opt => {
      const isChecked = selectedItems.includes(opt);
      const label = document.createElement('label');
      label.className = `tag-checkbox-label ${isChecked ? (isAllergen ? 'is-allergen-checked' : 'is-checked') : ''}`;
      label.innerHTML = `
        <input type="checkbox" value="${escapeHtml(opt)}" ${isChecked ? 'checked' : ''}>
        <span>${isAllergen ? '⚠️' : '🌿'} ${escapeHtml(opt)}</span>
      `;
      const input = label.querySelector('input');
      input.addEventListener('change', () => {
        if (input.checked) {
          label.classList.add(isAllergen ? 'is-allergen-checked' : 'is-checked');
        } else {
          label.classList.remove(isAllergen ? 'is-allergen-checked' : 'is-checked');
        }
      });
      container.appendChild(label);
    });
  }

  function getSelectedCloudValues(container) {
    if (!container) return [];
    const checked = container.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checked).map(c => c.value);
  }

  // Roommate Modal
  function openRoommateModal(roommateId = null) {
    DOM.roommateEditId.value = roommateId || '';
    if (roommateId) {
      const rm = state.roommates.find(r => r.id === roommateId);
      if (!rm) return;
      DOM.roommateModalTitle.textContent = `Edit ${rm.name}'s Profile`;
      DOM.roommateName.value = rm.name;
      DOM.roommateAvatar.value = rm.avatar || '🥑';
      DOM.roommateDislikes.value = rm.dislikes || '';
      populateCloud(DOM.allergenCheckboxCloud, ALLERGEN_OPTIONS, rm.allergens || [], true);
      populateCloud(DOM.dietCheckboxCloud, DIET_OPTIONS, rm.diets || [], false);
    } else {
      DOM.roommateModalTitle.textContent = 'Add Roommate Profile';
      DOM.roommateName.value = '';
      DOM.roommateAvatar.value = '🥑';
      DOM.roommateDislikes.value = '';
      populateCloud(DOM.allergenCheckboxCloud, ALLERGEN_OPTIONS, [], true);
      populateCloud(DOM.dietCheckboxCloud, DIET_OPTIONS, [], false);
    }
    openModal(DOM.roommateModal);
  }

  // Pick Meal for Slot Modal
  function openPickMealModal(dayKey, slotKey) {
    state.activeSlotPicking = { day: dayKey, slot: slotKey };
    const dayObj = DAYS_OF_WEEK.find(d => d.key === dayKey);
    const slotObj = MEAL_SLOTS.find(s => s.key === slotKey);

    DOM.pickMealModalSubtitle.textContent = `Choosing for ${dayObj ? dayObj.label : dayKey} ${slotObj ? slotObj.label : slotKey}`;
    DOM.slotMealSearch.value = '';
    DOM.slotSafeOnlyCheckbox.checked = true;
    renderSlotMealPickerList();
    openModal(DOM.pickMealModal);
  }

  function renderSlotMealPickerList() {
    const list = DOM.slotMealPickerList;
    if (!list) return;

    const query = (DOM.slotMealSearch.value || '').toLowerCase();
    const safeOnly = DOM.slotSafeOnlyCheckbox.checked;
    const currentSlotType = state.activeSlotPicking ? state.activeSlotPicking.slot : null;

    let available = [...state.recipes];

    // Slot matching preferred (e.g. recommend Breakfast meals for breakfast slot, but don't strictly forbid)
    if (currentSlotType) {
      available.sort((a, b) => {
        const aMatches = a.category.toLowerCase() === currentSlotType.toLowerCase() ? -1 : 1;
        const bMatches = b.category.toLowerCase() === currentSlotType.toLowerCase() ? -1 : 1;
        return aMatches - bMatches;
      });
    }

    if (query) {
      available = available.filter(r =>
        r.name.toLowerCase().includes(query) ||
        (r.category || '').toLowerCase().includes(query)
      );
    }

    if (safeOnly) {
      available = available.filter(r => evaluateMealSafety(r).isSafe);
    }

    if (available.length === 0) {
      list.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted)">No matching meals found. Try unchecking 'Strictly Safe' or add a custom recipe!</div>`;
      return;
    }

    list.innerHTML = '';
    available.forEach(meal => {
      const safety = evaluateMealSafety(meal);
      const isSafe = safety.isSafe;

      const item = document.createElement('div');
      item.className = `picker-meal-item ${isSafe ? '' : 'has-allergen-danger'}`;
      item.onclick = () => selectMealForSlot(meal.id, isSafe, safety.allergenConflicts);

      item.innerHTML = `
        <div class="picker-meal-info">
          <h4>${escapeHtml(meal.name)}</h4>
          <div class="picker-meal-meta">
            <span>${meal.category}</span> • <span>⏱️ ${meal.cookTime}m</span> • 
            ${isSafe
          ? '<span style="color:#34d399; font-weight:700;">🛡️ 100% Safe</span>'
          : `<span style="color:#fb7185; font-weight:700;">⚠️ Contains ${safety.allergenConflicts.join(', ') || 'Allergens'}</span>`}
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" type="button">Select</button>
      `;

      list.appendChild(item);
    });
  }

  function selectMealForSlot(recipeId, isSafe, conflicts = []) {
    if (!state.activeSlotPicking) return;
    const { day, slot } = state.activeSlotPicking;
    const slotKey = `${day}_${slot}`;

    if (!isSafe) {
      const confirmed = window.confirm(
        `⚠️ ALLERGEN WARNING:\n\nThis recipe contains ${conflicts.join(', ')}, which violates your active roommate safety profile!\n\nAre you sure you want to schedule this meal?`
      );
      if (!confirmed) return;
    }

    state.weeklyPlan[slotKey] = recipeId;
    saveState();
    closeModal(DOM.pickMealModal);
    renderWeeklyPlanner();
    renderShoppingList();
    showToast(`Added meal to weekly plan!`, 'success');
  }

  // Recipe Detail Modal
  function openRecipeDetailModal(recipeId) {
    const recipe = state.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const safety = evaluateMealSafety(recipe);

    DOM.detailHeaderTitle.innerHTML = `
      <h3>${escapeHtml(recipe.name)}</h3>
      <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.3rem;">
        <span class="recipe-category-pill">${escapeHtml(recipe.category)}</span>
        <span class="recipe-safety-badge ${safety.isSafe ? 'safety-badge-safe' : 'safety-badge-danger'}">
          ${safety.isSafe ? '🛡️ Safe for Roomie' : `⚠️ Contains: ${safety.allergenConflicts.join(', ')}`}
        </span>
      </div>
    `;

    const ingredientsHtml = (recipe.ingredients || []).map(ing => `
      <li>
        <span>•</span>
        <span><strong>${escapeHtml(ing.amount || '')}</strong> ${escapeHtml(ing.name)}</span>
        <span style="margin-left:auto; font-size:0.75rem; color:var(--text-dim); background:var(--bg-card); padding:0.1rem 0.4rem; border-radius:4px;">${escapeHtml(ing.aisle || 'Pantry')}</span>
      </li>
    `).join('');

    DOM.recipeDetailBody.innerHTML = `
      <div class="detail-meta-bar">
        <span>⏱️ <strong>Cook Time:</strong> ${recipe.cookTime || 20} mins</span>
        <span>🍽️ <strong>Servings:</strong> ${recipe.servings || 2}</span>
        <span>🌿 <strong>Tags:</strong> ${(recipe.diets || []).join(', ') || 'Standard'}</span>
      </div>
      <div>
        <h4 style="margin-bottom:0.4rem; font-size:0.95rem;">Description</h4>
        <p style="font-size:0.85rem; color:var(--text-muted);">${escapeHtml(recipe.description || 'Delicious allergen-aware meal.')}</p>
      </div>
      <div>
        <h4 style="margin-bottom:0.5rem; font-size:0.95rem;">Ingredients (${recipe.ingredients ? recipe.ingredients.length : 0})</h4>
        <ul class="detail-ingredients-list">
          ${ingredientsHtml}
        </ul>
      </div>
      ${recipe.instructions ? `
        <div>
          <h4 style="margin-bottom:0.4rem; font-size:0.95rem;">Cooking Instructions</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${escapeHtml(recipe.instructions)}</p>
        </div>
      ` : ''}
    `;

    DOM.detailAddToPlanBtn.onclick = () => {
      closeModal(DOM.recipeDetailModal);
      quickAddToPlan(recipe.id);
    };

    openModal(DOM.recipeDetailModal);
  }

  // Quick Add To First Empty Slot
  function quickAddToPlan(recipeId) {
    const recipe = state.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const safety = evaluateMealSafety(recipe);
    if (!safety.isSafe) {
      const confirmed = window.confirm(
        `⚠️ Allergen Warning: This meal contains ${safety.allergenConflicts.join(', ')}. Schedule anyway?`
      );
      if (!confirmed) return;
    }

    // Try finding slot matching category first
    let assigned = false;
    const catMap = {
      'Breakfast': 'breakfast',
      'Lunch': 'lunch',
      'Dinner': 'dinner',
      'Snack': 'snack'
    };
    const preferredSlotKey = catMap[recipe.category] || 'dinner';

    for (const day of DAYS_OF_WEEK) {
      const slotKey = `${day.key}_${preferredSlotKey}`;
      if (!state.weeklyPlan[slotKey]) {
        state.weeklyPlan[slotKey] = recipeId;
        assigned = true;
        showToast(`Scheduled for ${day.label} ${recipe.category}!`, 'success');
        break;
      }
    }

    // If preferred slot full, find any empty slot
    if (!assigned) {
      for (const day of DAYS_OF_WEEK) {
        for (const slot of MEAL_SLOTS) {
          const slotKey = `${day.key}_${slot.key}`;
          if (!state.weeklyPlan[slotKey]) {
            state.weeklyPlan[slotKey] = recipeId;
            assigned = true;
            showToast(`Scheduled for ${day.label} ${slot.label}!`, 'success');
            break;
          }
        }
        if (assigned) break;
      }
    }

    if (!assigned) {
      showToast('Weekly calendar is completely full! Clear some slots first.', 'danger');
    } else {
      saveState();
      renderWeeklyPlanner();
      renderShoppingList();
    }
  }

  // Add Custom Recipe Modal
  function openCustomRecipeModal() {
    DOM.customRecipeForm.reset();
    populateCloud(DOM.recipeAllergenCloud, ALLERGEN_OPTIONS, [], true);
    populateCloud(DOM.recipeDietCloud, DIET_OPTIONS, [], false);
    openModal(DOM.recipeModal);
  }

  // General Modal Helpers
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
  }

  // ==========================================================================
  // ACTION WORKFLOWS (AUTO-PLAN, EXPORT, SHOPPING, CUSTOM RECIPE)
  // ==========================================================================

  // 1. One-Click Auto-Plan Safe Week
  function autoPlanSafeWeek() {
    const safeRecipes = state.recipes.filter(r => evaluateMealSafety(r).isSafe);

    if (safeRecipes.length === 0) {
      alert('No recipes in the catalog currently pass all allergen & diet requirements for the active roommate profile!');
      return;
    }

    // Group by category
    const breakfasts = safeRecipes.filter(r => r.category === 'Breakfast');
    const lunches = safeRecipes.filter(r => r.category === 'Lunch');
    const dinners = safeRecipes.filter(r => r.category === 'Dinner');
    const snacks = safeRecipes.filter(r => r.category === 'Snack');

    // Helper to get random or fallback
    function pickFrom(arr, fallbackArr, index) {
      if (arr.length > 0) return arr[index % arr.length].id;
      if (fallbackArr.length > 0) return fallbackArr[index % fallbackArr.length].id;
      return safeRecipes[0].id;
    }

    const newPlan = {};
    DAYS_OF_WEEK.forEach((day, index) => {
      newPlan[`${day.key}_breakfast`] = pickFrom(breakfasts, safeRecipes, index);
      newPlan[`${day.key}_lunch`] = pickFrom(lunches, safeRecipes, index + 1);
      newPlan[`${day.key}_dinner`] = pickFrom(dinners, safeRecipes, index + 2);
      newPlan[`${day.key}_snack`] = pickFrom(snacks, safeRecipes, index);
    });

    state.weeklyPlan = newPlan;
    saveState();
    renderWeeklyPlanner();
    renderShoppingList();
    showToast('✨ 7-Day safe meal plan generated!', 'success');
  }

  // 2. Export / Copy Plan Summary
  function exportPlanSummary() {
    let summary = `🛡️ RoomieBites Weekly Meal Plan (Safe for ${state.activeRoommateId === 'all' ? 'Entire Household' : (state.roommates.find(r => r.id === state.activeRoommateId) || {}).name})\n`;
    summary += `--------------------------------------------------\n`;

    DAYS_OF_WEEK.forEach(day => {
      summary += `\n📅 ${day.label.toUpperCase()}:\n`;
      MEAL_SLOTS.forEach(slot => {
        const mealId = state.weeklyPlan[`${day.key}_${slot.key}`];
        const meal = mealId ? state.recipes.find(r => r.id === mealId) : null;
        summary += `  • ${slot.label}: ${meal ? meal.name : '—'}\n`;
      });
    });

    copyTextToClipboard(summary, 'Weekly meal plan copied to clipboard!');
  }

  // 3. Copy Shopping List
  function copyShoppingList() {
    const plannedRecipeIds = Object.values(state.weeklyPlan).filter(Boolean);
    const plannedRecipes = plannedRecipeIds.map(id => state.recipes.find(r => r.id === id)).filter(Boolean);

    let listText = `🛒 RoomieBites Grocery List\n`;
    listText += `Generated for ${plannedRecipes.length} planned meals\n`;
    listText += `===================================\n\n`;

    // Group items by aisle
    const aisleMap = {};
    plannedRecipes.forEach(recipe => {
      (recipe.ingredients || []).forEach(ing => {
        const aisle = ing.aisle || 'Pantry & Condiments';
        if (!aisleMap[aisle]) aisleMap[aisle] = [];
        aisleMap[aisle].push(`${ing.amount ? ing.amount + ' ' : ''}${ing.name}`);
      });
    });

    state.customShoppingItems.forEach(item => {
      const aisle = item.category || 'Other';
      if (!aisleMap[aisle]) aisleMap[aisle] = [];
      aisleMap[aisle].push(item.name);
    });

    Object.keys(aisleMap).forEach(aisle => {
      listText += `[ ${aisle.toUpperCase()} ]\n`;
      aisleMap[aisle].forEach(item => {
        listText += `  [ ] ${item}\n`;
      });
      listText += `\n`;
    });

    copyTextToClipboard(listText, 'Shopping list copied to clipboard!');
  }

  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg, 'success');
      }).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg, 'success');
    } catch (err) {
      showToast('Could not copy to clipboard automatically', 'danger');
    }
    document.body.removeChild(textarea);
  }

  // 4. Toast Notification
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✅' : '⚠️'}</span>
      <span>${escapeHtml(message)}</span>
    `;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Utility to escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // EVENT LISTENERS & WIRING
  // ==========================================================================

  function bindEvents() {
    // Tab switching
    DOM.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTabId = tab.dataset.tab;
        switchTab(targetTabId);
      });
    });

    // Active Roommate Dropdown
    DOM.activeRoommateSelect.addEventListener('change', (e) => {
      state.activeRoommateId = e.target.value;
      saveState();
      renderSafetyBanner();
      renderWeeklyPlanner();
      renderRecipeCatalog();
      renderRoommatesList();
      showToast('Active roommate filter updated!', 'success');
    });

    // Manage Roommates Button
    DOM.manageRoommatesBtn.addEventListener('click', () => {
      switchTab('roommatesTab');
    });

    // Weekly Planner Buttons
    DOM.autoPlanSafeWeekBtn.addEventListener('click', autoPlanSafeWeek);
    DOM.exportPlanBtn.addEventListener('click', exportPlanSummary);
    DOM.clearPlanBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all planned meals for the week?')) {
        state.weeklyPlan = {};
        saveState();
        renderWeeklyPlanner();
        renderShoppingList();
        showToast('Weekly calendar cleared', 'success');
      }
    });

    // Recipe Search & Filters
    DOM.recipeSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (DOM.clearSearchBtn) {
        DOM.clearSearchBtn.classList.toggle('visible', state.searchQuery.length > 0);
      }
      renderRecipeCatalog();
    });

    DOM.clearSearchBtn.addEventListener('click', () => {
      DOM.recipeSearchInput.value = '';
      state.searchQuery = '';
      DOM.clearSearchBtn.classList.remove('visible');
      renderRecipeCatalog();
    });

    DOM.safeOnlyCheckbox.addEventListener('change', (e) => {
      state.safeOnly = e.target.checked;
      renderRecipeCatalog();
    });

    DOM.categoryFilter.addEventListener('change', (e) => {
      state.categoryFilter = e.target.value;
      renderRecipeCatalog();
    });

    DOM.dietFilter.addEventListener('change', (e) => {
      state.dietFilter = e.target.value;
      renderRecipeCatalog();
    });

    DOM.timeFilter.addEventListener('change', (e) => {
      state.timeFilter = e.target.value;
      renderRecipeCatalog();
    });

    DOM.addNewMealBtn.addEventListener('click', openCustomRecipeModal);

    // Slot Meal Search & Filter in Modal
    DOM.slotMealSearch.addEventListener('input', renderSlotMealPickerList);
    DOM.slotSafeOnlyCheckbox.addEventListener('change', renderSlotMealPickerList);

    // Add Custom Recipe Form Submit
    DOM.customRecipeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('recipeName').value.trim();
      const category = document.getElementById('recipeCategory').value;
      const cookTime = parseInt(document.getElementById('recipeTime').value, 10) || 20;
      const servings = parseInt(document.getElementById('recipeServings').value, 10) || 2;
      const description = document.getElementById('recipeDescription').value.trim();
      const instructions = document.getElementById('recipeInstructions').value.trim();
      const allergens = getSelectedCloudValues(DOM.recipeAllergenCloud);
      const diets = getSelectedCloudValues(DOM.recipeDietCloud);

      // Parse ingredients textarea
      const rawIngs = document.getElementById('recipeIngredients').value.split('\n');
      const ingredients = rawIngs.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        let aisle = 'Pantry & Condiments';
        let ingName = trimmed;
        // Check for bracket aisle e.g. [Produce]
        const match = trimmed.match(/\[(.*?)\]/);
        if (match) {
          aisle = match[1].trim();
          ingName = trimmed.replace(/\[.*?\]/, '').trim();
        }
        return { name: ingName, amount: '', aisle };
      }).filter(Boolean);

      const newRecipe = {
        id: 'custom_' + Date.now(),
        name,
        category,
        cookTime,
        servings,
        description,
        allergens,
        diets,
        ingredients,
        instructions
      };

      state.recipes.unshift(newRecipe);
      saveState();
      closeModal(DOM.recipeModal);
      renderRecipeCatalog();
      showToast('Custom recipe added successfully!', 'success');
    });

    // Roommate Form Submit
    DOM.roommateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = DOM.roommateEditId.value;
      const name = DOM.roommateName.value.trim();
      const avatar = DOM.roommateAvatar.value.trim() || '🥑';
      const dislikes = DOM.roommateDislikes.value.trim();
      const allergens = getSelectedCloudValues(DOM.allergenCheckboxCloud);
      const diets = getSelectedCloudValues(DOM.dietCheckboxCloud);

      if (editId) {
        // Update existing
        const index = state.roommates.findIndex(r => r.id === editId);
        if (index !== -1) {
          state.roommates[index] = { ...state.roommates[index], name, avatar, dislikes, allergens, diets };
        }
      } else {
        // Add new
        const newRm = {
          id: 'rm_' + Date.now(),
          name,
          avatar,
          dislikes,
          allergens,
          diets
        };
        state.roommates.push(newRm);
        state.activeRoommateId = newRm.id; // switch focus to newly added roommate
      }

      saveState();
      closeModal(DOM.roommateModal);
      renderAll();
      showToast('Roommate profile saved!', 'success');
    });

    // Add Roommate Button
    DOM.addRoommateBtn.addEventListener('click', () => openRoommateModal(null));

    // Emoji suggestion clicks
    document.querySelectorAll('.btn-emoji').forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.roommateAvatar.value = btn.textContent;
      });
    });

    // Modal Close Buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.closeModal;
        closeModal(document.getElementById(modalId));
      });
    });

    // Close modal on click backdrop
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        closeModal(e.target);
      }
    });

    // Shopping List Buttons
    DOM.copyShoppingListBtn.addEventListener('click', copyShoppingList);
    DOM.printShoppingListBtn.addEventListener('click', () => window.print());
    DOM.clearCheckedBtn.addEventListener('click', () => {
      state.shoppingChecked = {};
      saveState();
      renderShoppingList();
      showToast('All items unchecked', 'success');
    });

    // Add Custom Shopping Item
    DOM.addCustomItemForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = DOM.customItemName.value.trim();
      const category = DOM.customItemCategory.value;
      if (!name) return;

      state.customShoppingItems.push({
        id: 'cust_' + Date.now(),
        name,
        category,
        checked: false
      });

      DOM.customItemName.value = '';
      saveState();
      renderShoppingList();
      showToast(`Added ${name} to shopping list!`, 'success');
    });
  }

  function switchTab(tabId) {
    DOM.navTabs.forEach(t => {
      const isTarget = t.dataset.tab === tabId;
      t.classList.toggle('active', isTarget);
      t.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    DOM.tabPanels.forEach(p => {
      p.classList.toggle('active', p.id === tabId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================================================
  // PUBLIC API ON WINDOW (for inline handlers)
  // ==========================================================================

  window.RoomieApp = {
    switchTab,
    openPickMealModal,
    openRecipeDetailModal,
    openEditRoommateModal: (id) => openRoommateModal(id),
    quickAddToPlan,
    removeSlotMeal: (slotKey) => {
      delete state.weeklyPlan[slotKey];
      saveState();
      renderWeeklyPlanner();
      renderShoppingList();
      showToast('Removed meal from slot', 'success');
    },
    toggleShoppingItem: (itemId) => {
      state.shoppingChecked[itemId] = !state.shoppingChecked[itemId];
      saveState();
      renderShoppingList();
    },
    removeCustomItem: (itemId) => {
      state.customShoppingItems = state.customShoppingItems.filter(i => i.id !== itemId);
      delete state.shoppingChecked[itemId];
      saveState();
      renderShoppingList();
      showToast('Removed item', 'success');
    },
    setActiveRoommate: (id) => {
      state.activeRoommateId = id;
      saveState();
      renderSafetyBanner();
      renderWeeklyPlanner();
      renderRecipeCatalog();
      renderRoommatesList();
      showToast('Active focus roommate changed!', 'success');
    },
    deleteRoommate: (id) => {
      const rm = state.roommates.find(r => r.id === id);
      if (confirm(`Are you sure you want to remove ${rm ? rm.name : 'this roommate'}?`)) {
        state.roommates = state.roommates.filter(r => r.id !== id);
        if (state.activeRoommateId === id) {
          state.activeRoommateId = 'all';
        }
        saveState();
        renderAll();
        showToast('Roommate removed', 'success');
      }
    }
  };

  // ==========================================================================
  // BOOTSTRAP APP
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    cacheDOMElements();
    loadState();
    bindEvents();
    renderAll();
  });

})();
