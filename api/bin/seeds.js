const mongoose = require('mongoose');
require('../config/db.config');
const Product = require('../models/product.model');


const products = [
  {
    name: "Maranta Crocanta",
    description: "La Maranta Crocanta es una planta única por su textura y coloración vibrante. Es perfecta para añadir un toque exótico y llamativo a cualquier colección de plantas.",
    price: 26.90,
    petFriendly: false,
    category: 'indoor',
    size: 'M',
    productType: 'plant',
    imageUrls: ['images/Maranta-Crocata.png']
  },
  
  {
    name: "Calathea Medallón",
    description: "La Calathea Medallón es conocida por sus grandes hojas redondeadas con patrones distintivos de verde oscuro y claro. Una planta perfecta para quienes buscan añadir un toque de naturaleza artística a su hogar.",
    price: 21.90,
    petFriendly: true,
    category: 'indoor',
    size: 'M',
    productType: 'plant',
    imageUrls: ['images/Calathea_Medalion.png', 'images/Calathea_Medallion2.png']
  },
  
  {
    name: "Calathea Orbifolia",
    description: "La Calathea Orbifolia es apreciada por sus hojas grandes y redondas con franjas verdes y plateadas. Es una planta que aporta tranquilidad y elegancia a cualquier espacio.",
    price: 23.90,
    petFriendly: true,
    category: 'indoor',
    size: 'L',
    productType: 'plant',
    imageUrls: ['images/Calathea-Orbifolia.png']
  },
  {
    name: "Ave del Paraíso",
    description: "Planta tropical con grandes hojas y flores que se asemejan a un ave en vuelo.",
    price: 29.99,
    petFriendly: false,
    category: 'indoor',
    size: 'L',
    productType: 'plant',
    imageUrls: ['images/avedelparaiso1.png'],
  },
  {
    name: "Ficus Moclame",
    description: "Planta con follaje denso, redondeado, y muy adaptable a espacios interiores.",
    price: 19.99,
    petFriendly: false,
    category: 'indoor',
    size: 'M',
    productType: 'plant',
    imageUrls: ['images/Ficus Moclame 1.png', 'images/Ficus-Moclame2.png'], 
  },
  {
    name: "Sansevieria Trifasciata",
    description: "Conocida comúnmente como la planta de serpiente, es resistente y requiere poco mantenimiento.",
    price: 15.99,
    petFriendly: true,
    category: 'outdoor',
    size: 'M',
    productType: 'plant',
    imageUrls: ['images/Sansevieria1.png', 'images/Sansevieria2.png']
  },

  {
    name: "Monstera Adansonii",
    description: "La Monstera Adansonii, conocida también como la 'planta de queso suizo', es famosa por sus hojas únicas y perforadas. Es ideal para dar un toque tropical a cualquier espacio interior.",
    price: 22.90,
    petFriendly: false,
    category: 'indoor',
    size: 'M',
    productType: 'plant',
    imageUrls: ['images/Monstera_Andansonii.png']
  },
  
  {
    name: "Maranta Leuconeura",
    description: "Conocida como la 'planta de la oración', la Maranta Leuconeura destaca por sus hojas verdes vibrantes con marcas únicas. Es una planta que aporta paz y belleza a cualquier rincón.",
    price: 18.90,
    petFriendly: true,
    category: 'indoor',
    size: 'S',
    productType: 'plant',
    imageUrls: ['images/Maranta_Leuconeura.png']
  },
  
  {
    name: "Buganvilla Blanca",
    description: "La Buganvilla Blanca es una planta trepadora espectacular conocida por sus floraciones blancas y abundantes. Ideal para crear un rincón colorido y lleno de vida.",
    price: 24.90,
    petFriendly: false,
    category: 'outdoor',
    size: 'M',
    productType: 'plant',
    imageUrls: ['images/Bougainvillea-Blanca.png']
  },
  
  {
    name: "Ciclamen Blanco",
    description: "El Ciclamen Blanco es una planta de interior encantadora, con flores delicadas y hojas verdes, perfecta para agregar un toque de elegancia y serenidad.",
    price: 16.90,
    petFriendly: true,
    category: 'indoor',
    size: 'S',
    productType: 'plant',
    imageUrls: ['images/cyclamen-blanco.png']
  },
  
  {
    name: "Orquídea Violeta",
    description: "La Orquídea Violeta es una planta exótica y elegante, con flores vibrantes y un aire de sofisticación. Es un regalo perfecto para cualquier ocasión.",
    price: 29.90,
    petFriendly: false,
    category: 'indoor',
    size: 'M',
    productType: 'plant',
    imageUrls: ['images/orquidea1.png']
  },
  {
    name: "Begonia Hiemalis",
    description: "La Begonia Hiemalis es una planta vibrante, conocida por sus flores coloridas y su resistencia al frío. Perfecta para agregar un toque de color a jardines exteriores o terrazas.",
    price: 19.90,
    petFriendly: false,
    category: 'outdoor',
    size: 'M',
    productType: 'plant',
    imageUrls: ['images/Begonia-Hiemalis.png']
  },
  
  {
    name: "Ananas Comosus",
    description: "El Ananas Comosus, más conocido como piña, es una planta tropical que puede cultivarse en exteriores en climas cálidos. Sus frutas son tanto decorativas como deliciosas.",
    price: 27.90,
    petFriendly: true,
    category: 'outdoor',
    size: 'L',
    productType: 'plant',
    imageUrls: ['images/Ananas-comosus.png']
  },
  
  {
    name: "Phoenix Roebelenii",
    description: "La Phoenix Roebelenii, o palmera enana, es ideal para jardines pequeños o como planta decorativa en patios. Su elegante forma y tamaño manejable la hacen muy popular.",
    price: 32.90,
    petFriendly: true,
    category: 'outdoor',
    size: 'L',
    productType: 'plant',
    imageUrls: ['images/PHOENIX_ROEBELINII.png']
  },

  {
    name: "Clásica",
    description: "Maceta de cerámica de alta calidad, con un diseño clásico y elegante, perfecta para cualquier tipo de planta interior. Disponible en varios tamaños.",
    price: 14.90,
    compatiblePlants: ["Todas las plantas de tamaño S y M"],
    category: 'accessories',
    size: ['S', 'M'],
    productType: 'pot',
    imageUrls: ['images/Kale-2.png']
  },
  
  {
    name: "Milo",
    description: "Maceta de terracota tradicional, ideal para plantas que requieren un buen drenaje. Su diseño atemporal se adapta a cualquier decoración.",
    price: 12.90,
    compatiblePlants: ["Todas las plantas de tamaño M"],
    category: 'accessories',
    size: 'M',
    productType: 'pot',
    imageUrls: ['images/Moon.png']
  },
  
  {
    name: "Ocean",
    description: "Esta maceta combina funcionalidad y estilo moderno, perfecta para dar un toque contemporáneo a tu hogar. Adecuada para plantas de interior de tamaño pequeño y mediano.",
    price: 16.90,
    compatiblePlants: ["Todas las plantas de tamaño S y M"],
    category: 'accessories',
    size: ['S', 'M'],
    productType: 'pot',
    imageUrls: ['images/milo.png']
  },
  


];

Product.deleteMany() 
  .then(() => Product.create(products)) 
  .then(productsCreated => { 
    console.log(`${productsCreated.length} products created successfully`);
    mongoose.connection.close();
  })
  .catch(error => console.error('An error occurred while creating products seeds', error));