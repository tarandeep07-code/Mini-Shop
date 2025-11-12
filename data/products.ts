import { Product } from "@/types/product";

export const products: Product[] = [
  // 🖥 Electronics
  { id: 1, name: "Wireless Headphones", price: 1999, image: "/images/headphones.jpeg", category: "Electronics" },
  { id: 2, name: "Bluetooth Speaker", price: 1499, image: "/images/speaker.jpg", category: "Electronics" },
  { id: 3, name: "Smartwatch", price: 2999, image: "/images/smartwatch.jpg", category: "Electronics" },
  { id: 4, name: "Gaming Mouse", price: 899, image: "/images/mouse.jpg", category: "Electronics" },
  { id: 5, name: "Mechanical Keyboard", price: 2499, image: "/images/keyboard.jpg", category: "Electronics" },
  { id: 6, name: "Portable Power Bank", price: 1199, image: "/images/powerbank.jpg", category: "Electronics" },
  { id: 7, name: "USB-C Charger", price: 699, image: "/images/charger.jpg", category: "Electronics" },
  { id: 8, name: "Noise Cancelling Earbuds", price: 2599, image: "/images/earbuds.jpg", category: "Electronics" },
  { id: 9, name: "4K Action Camera", price: 5999, image: "/images/camera.jpg", category: "Electronics" },
  { id: 10, name: "LED Monitor", price: 8999, image: "/images/monitor.jpg", category: "Electronics" },

  // 👕 Fashion
  { id: 11, name: "Men’s Cotton T-Shirt", price: 499, image: "/images/tshirt.jpg", category: "Fashion" },
  { id: 12, name: "Women’s Denim Jacket", price: 1999, image: "/images/denim.jpg", category: "Fashion" },
  { id: 13, name: "Sneakers", price: 2499, image: "/images/sneakers.jpg", category: "Fashion" },
  { id: 14, name: "Leather Belt", price: 899, image: "/images/belt.jpg", category: "Fashion" },
  { id: 15, name: "Classic Sunglasses", price: 799, image: "/images/sunglasses.jpg", category: "Fashion" },
  { id: 16, name: "Wool Scarf", price: 599, image: "/images/scarf.jpg", category: "Fashion" },
  { id: 17, name: "Women’s Handbag", price: 1799, image: "/images/handbag.jpg", category: "Fashion" },
  { id: 18, name: "Sports Cap", price: 499, image: "/images/cap.jpg", category: "Fashion" },
  { id: 19, name: "Casual Jeans", price: 1599, image: "/images/jeans.jpg", category: "Fashion" },
  { id: 20, name: "Men’s Formal Shoes", price: 2999, image: "/images/formalshoes.jpg", category: "Fashion" },

  // 🏠 Home & Kitchen
  { id: 21, name: "Non-stick Frying Pan", price: 999, image: "/images/fryingpan.jpg", category: "Home & Kitchen" },
  { id: 22, name: "Electric Kettle", price: 1299, image: "/images/kettle.jpg", category: "Home & Kitchen" },
  { id: 23, name: "Set of 6 Glasses", price: 699, image: "/images/glasses.jpg", category: "Home & Kitchen" },
  { id: 24, name: "Pressure Cooker", price: 1999, image: "/images/cooker.jpg", category: "Home & Kitchen" },
  { id: 25, name: "Toaster", price: 1099, image: "/images/toaster.jpg", category: "Home & Kitchen" },
  { id: 26, name: "Wall Clock", price: 899, image: "/images/clock.jpg", category: "Home & Kitchen" },
  { id: 27, name: "Cotton Bedsheet", price: 1299, image: "/images/bedsheet.jpg", category: "Home & Kitchen" },
  { id: 28, name: "Table Lamp", price: 1599, image: "/images/lamps.jpg", category: "Home & Kitchen" },
  { id: 29, name: "Set of Cushions", price: 999, image: "/images/cushions.jpg", category: "Home & Kitchen" },
  { id: 30, name: "Vacuum Cleaner", price: 4999, image: "/images/vacuum.jpg", category: "Home & Kitchen" },

  // ⚽ Sports
  { id: 31, name: "Football", price: 699, image: "/images/football.jpg", category: "Sports" },
  { id: 32, name: "Cricket Bat", price: 1299, image: "/images/bat.jpg", category: "Sports" },
  { id: 33, name: "Yoga Mat", price: 599, image: "/images/yogamat.jpg", category: "Sports" },
  { id: 34, name: "Tennis Racket", price: 2499, image: "/images/tennisracket.jpg", category: "Sports" },
  { id: 35, name: "Skipping Rope", price: 299, image: "/images/skipping.jpg", category: "Sports" },
  { id: 36, name: "Dumbbell Set", price: 1999, image: "/images/dumbbells.jpg", category: "Sports" },
  { id: 37, name: "Cycling Helmet", price: 1199, image: "/images/helmet.jpg", category: "Sports" },
  { id: 38, name: "Running Shoes", price: 2599, image: "/images/runningshoes.jpg", category: "Sports" },
  { id: 39, name: "Gym Gloves", price: 499, image: "/images/gloves.jpg", category: "Sports" },
  { id: 40, name: "Cricket Ball", price: 399, image: "/images/ball.jpg", category: "Sports" },

  // 💄 Beauty
  { id: 41, name: "Moisturizing Cream", price: 499, image: "/images/cream.jpg", category: "Beauty" },
  { id: 42, name: "Face Wash", price: 299, image: "/images/facewash.jpg", category: "Beauty" },
  { id: 43, name: "Perfume", price: 999, image: "/images/perfume.jpg", category: "Beauty" },
  { id: 44, name: "Lipstick", price: 399, image: "/images/lipstick.jpg", category: "Beauty" },
  { id: 45, name: "Hair Oil", price: 299, image: "/images/hairoil.jpg", category: "Beauty" },
  { id: 46, name: "Shampoo", price: 499, image: "/images/shampoo.jpg", category: "Beauty" },
  { id: 47, name: "Conditioner", price: 599, image: "/images/conditioner.jpg", category: "Beauty" },
  { id: 48, name: "Face Mask", price: 299, image: "/images/facemask.jpg", category: "Beauty" },
  { id: 49, name: "Body Lotion", price: 499, image: "/images/lotion.jpg", category: "Beauty" },
  { id: 50, name: "Compact Powder", price: 699, image: "/images/compact.jpg", category: "Beauty" },

  // 📚 Books
  { id: 51, name: "Atomic Habits", price: 499, image: "/images/book1.jpg", category: "Books" },
  { id: 52, name: "Deep Work", price: 399, image: "/images/book2.jpg", category: "Books" },
  { id: 53, name: "Think and Grow Rich", price: 349, image: "/images/book3.jpg", category: "Books" },
  { id: 54, name: "The Alchemist", price: 299, image: "/images/book4.jpg", category: "Books" },
  { id: 55, name: "Rich Dad Poor Dad", price: 399, image: "/images/book5.jpg", category: "Books" },
  { id: 56, name: "Sapiens", price: 699, image: "/images/book6.jpg", category: "Books" },
  { id: 57, name: "Ikigai", price: 299, image: "/images/book7.jpg", category: "Books" },
  { id: 58, name: "The Power of Now", price: 499, image: "/images/book8.jpg", category: "Books" },
  { id: 59, name: "The Subtle Art of Not Giving a F*ck", price: 499, image: "/images/book9.jpg", category: "Books" },
  { id: 60, name: "Start With Why", price: 499, image: "/images/book10.jpg", category: "Books" },

  // 🧸 Toys
  { id: 61, name: "Remote Car", price: 999, image: "/images/remotecar.jpg", category: "Toys" },
  { id: 62, name: "Lego Set", price: 2499, image: "/images/lego.jpg", category: "Toys" },
  { id: 63, name: "Teddy Bear", price: 699, image: "/images/teddy.jpg", category: "Toys" },
  { id: 64, name: "Puzzle Game", price: 499, image: "/images/puzzle.jpg", category: "Toys" },
  { id: 65, name: "Toy Train", price: 899, image: "/images/train.jpg", category: "Toys" },
  { id: 66, name: "Building Blocks", price: 799, image: "/images/blocks.jpg", category: "Toys" },
  { id: 67, name: "Doll House", price: 1999, image: "/images/dollhouse.jpg", category: "Toys" },
  { id: 68, name: "Action Figure", price: 599, image: "/images/actionfigure.jpg", category: "Toys" },
  { id: 69, name: "Musical Keyboard Toy", price: 999, image: "/images/toykeyboard.jpg", category: "Toys" },
  { id: 70, name: "Board Game", price: 699, image: "/images/boardgame.jpg", category: "Toys" },
  
  // 💻 More Electronics
  { id: 71, name: "Laptop Stand", price: 999, image: "/images/stand.jpg", category: "Electronics" },
  { id: 72, name: "Webcam", price: 1499, image: "/images/webcam.jpg", category: "Electronics" },
  { id: 73, name: "Portable SSD", price: 4999, image: "/images/ssd.jpg", category: "Electronics" },
  { id: 74, name: "Smartphone Tripod", price: 699, image: "/images/tripod.jpg", category: "Electronics" },
  { id: 75, name: "Wireless Keyboard", price: 1299, image: "/images/wirelesskeyboard.jpg", category: "Electronics" },
  { id: 76, name: "HDMI Cable", price: 299, image: "/images/hdmi.jpg", category: "Electronics" },
  { id: 77, name: "Bluetooth Adapter", price: 399, image: "/images/adapter.jpg", category: "Electronics" },
  { id: 78, name: "Smart Bulb", price: 799, image: "/images/smartbulb.jpg", category: "Electronics" },
  { id: 79, name: "Portable Projector", price: 8999, image: "/images/projector.jpg", category: "Electronics" },
  { id: 80, name: "Wireless Router", price: 1999, image: "/images/router.jpg", category: "Electronics" },

  // 🧼 Misc / Household
  { id: 81, name: "Laundry Basket", price: 799, image: "/images/basket.jpg", category: "Home & Kitchen" },
  { id: 82, name: "Scented Candles", price: 599, image: "/images/candle.jpg", category: "Home & Kitchen" },
  { id: 83, name: "Doormat", price: 499, image: "/images/doormat.jpg", category: "Home & Kitchen" },
  { id: 84, name: "Iron Box", price: 1499, image: "/images/iron.jpg", category: "Home & Kitchen" },
  { id: 85, name: "Water Bottle", price: 399, image: "/images/bottle.jpg", category: "Home & Kitchen" },
  { id: 86, name: "Coffee Mug", price: 299, image: "/images/mug.jpg", category: "Home & Kitchen" },
  { id: 87, name: "Knife Set", price: 999, image: "/images/knife.jpg", category: "Home & Kitchen" },
  { id: 88, name: "Curtains", price: 1399, image: "/images/curtains.jpg", category: "Home & Kitchen" },
  { id: 89, name: "Floor Mat", price: 599, image: "/images/floormat.jpg", category: "Home & Kitchen" },
  { id: 90, name: "Storage Box", price: 499, image: "/images/storage.jpg", category: "Home & Kitchen" },

  // 💍 Accessories
  { id: 91, name: "Smart Ring", price: 2499, image: "/images/ring.jpg", category: "Fashion" },
  { id: 92, name: "Chain Necklace", price: 1299, image: "/images/necklace.jpg", category: "Fashion" },
  { id: 93, name: "Bracelet", price: 899, image: "/images/bracelet.jpg", category: "Fashion" },
  { id: 94, name: "Earrings", price: 699, image: "/images/earrings.jpg", category: "Fashion" },
  { id: 95, name: "Anklet", price: 499, image: "/images/anklet.jpg", category: "Fashion" },
  { id: 96, name: "Makeup Brush Set", price: 999, image: "/images/brush.jpg", category: "Beauty" },
  { id: 97, name: "Nail Polish Set", price: 599, image: "/images/nailpolish.jpg", category: "Beauty" },
  { id: 98, name: "Hand Cream", price: 299, image: "/images/handcream.jpg", category: "Beauty" },
  { id: 99, name: "Beard Trimmer", price: 1499, image: "/images/trimmer.jpg", category: "Beauty" },
  { id: 100, name: "Face Roller", price: 699, image: "/images/faceroller.jpg", category: "Beauty" },


];
