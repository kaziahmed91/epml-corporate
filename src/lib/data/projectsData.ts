// Dummy data for projects
export const projects = [
  {
    id: '1',
    slug: 'skyline-residences',
    title: 'Skyline Residences',
    location: 'Downtown District',
    city: 'Metro City',
    type: 'Residential',
    status: 'Ongoing',
    image: '/landscape.jpg',
    description: 'Luxury apartments with panoramic city views.',
    startDate: '2024-02-15',
    completionDate: '2026-08-30',
    totalUnits: 120,
    features: ['Rooftop Pool', 'Fitness Center', 'Concierge Service'],
  },
  {
    id: '2',
    slug: 'harbor-heights',
    title: 'Harbor Heights',
    location: 'Waterfront Area',
    city: 'Metro City',
    type: 'Mixed Use',
    status: 'Upcoming',
    image: '/landscape.jpg',
    description: 'Modern living spaces with commercial outlets on the ground floor.',
    startDate: '2025-04-10',
    completionDate: '2027-11-20',
    totalUnits: 85,
    features: ['Waterfront Views', 'Retail Spaces', 'Underground Parking'],
  },
  {
    id: '3',
    slug: 'green-valley',
    title: 'Green Valley',
    location: 'Suburban District',
    city: 'Greenfield',
    type: 'Residential',
    status: 'Completed',
    image: '/landscape.jpg',
    description: 'Eco-friendly residential community with extensive green spaces.',
    startDate: '2022-09-05',
    completionDate: '2024-12-15',
    totalUnits: 65,
    features: ['Solar Panels', 'Community Garden', 'EV Charging Stations'],
  },
  {
    id: '4',
    slug: 'central-plaza',
    title: 'Central Plaza',
    location: 'City Center',
    city: 'Metro City',
    type: 'Commercial',
    status: 'Ongoing',
    image: '/landscape.jpg',
    description: 'Prime commercial real estate in the heart of the business district.',
    startDate: '2023-07-20',
    completionDate: '2026-03-10',
    totalUnits: 40,
    features: ['24/7 Security', 'Smart Building Technology', 'Conference Facilities'],
  },
  {
    id: '5',
    slug: 'sunset-heights',
    title: 'Sunset Heights',
    location: 'Hillside Area',
    city: 'Westview',
    type: 'Residential',
    status: 'Upcoming',
    image: '/landscape.jpg',
    description: 'Exclusive hillside residences with spectacular sunset views.',
    startDate: '2025-06-15',
    completionDate: '2027-09-25',
    totalUnits: 32,
    features: ['Infinity Pool', 'Private Terraces', 'Smart Home Systems'],
  },
  {
    id: '6',
    slug: 'riverside-lofts',
    title: 'Riverside Lofts',
    location: 'Riverside District',
    city: 'Riverside',
    type: 'Residential',
    status: 'Completed',
    image: '/landscape.jpg',
    description: 'Contemporary loft apartments overlooking the scenic river.',
    startDate: '2022-04-10',
    completionDate: '2024-08-20',
    totalUnits: 48,
    features: ['River Views', 'Industrial Design', 'Rooftop Garden'],
  },
];

// Detailed project data with extended information
export const projectsDetail = {
  'skyline-residences': {
    id: '1',
    slug: 'skyline-residences',
    title: 'Skyline Residences',
    location: 'Downtown District',
    city: 'Metro City',
    type: 'Residential',
    status: 'Ongoing',
    mainImage: '/landscape.jpg',
    galleryImages: ['/landscape.jpg', '/landscape.jpg', '/landscape.jpg', '/landscape.jpg'],
    description: 'Luxury apartments with panoramic city views. Located in the heart of Downtown, Skyline Residences offers premium living spaces with modern amenities and unparalleled views of the city skyline.',
    longDescription: `
      <p>Skyline Residences represents the pinnacle of urban luxury living. Situated in the vibrant Downtown District, these premium apartments offer an unrivaled combination of location, design, and amenities.</p>
      
      <p>The development comprises 120 meticulously crafted units, ranging from stylish studios to expansive three-bedroom penthouses. Each residence features floor-to-ceiling windows that frame spectacular city views, high-quality finishes, and smart home technology.</p>

      <p>Residents will enjoy access to an exclusive suite of amenities, including a rooftop infinity pool, fully-equipped fitness center, private lounges, and 24/7 concierge service. The ground floor hosts curated retail spaces that enhance the living experience.</p>

      <p>Sustainability is at the core of Skyline Residences, with energy-efficient systems, water conservation features, and abundant green spaces incorporated throughout the development.</p>
    `,
    startDate: '2024-02-15',
    completionDate: '2026-08-30',
    architect: 'Modern Architects Inc.',
    developer: 'EPML Properties',
    totalUnits: 120,
    unitTypes: [
      { type: 'Studio', size: '450-500 sq ft', priceRange: '$250,000 - $300,000', available: 20 },
      { type: '1 Bedroom', size: '650-750 sq ft', priceRange: '$350,000 - $450,000', available: 40 },
      { type: '2 Bedrooms', size: '900-1100 sq ft', priceRange: '$500,000 - $650,000', available: 50 },
      { type: '3 Bedrooms Penthouse', size: '1500-2000 sq ft', priceRange: '$1,000,000 - $1,500,000', available: 10 },
    ],
    features: [
      'Rooftop Infinity Pool', 
      'Fitness Center', 
      'Concierge Service', 
      'Smart Home Technology',
      'Floor-to-ceiling Windows',
      'Private Balconies',
      'Secure Underground Parking',
      'Common Roof Garden',
      'Co-working Spaces',
      'Electric Vehicle Charging Stations'
    ],
    amenities: ['Rooftop Pool', 'Fitness Center', 'Concierge', 'Security', 'Parking'],
    constructionProgress: 45,
    nearbyAttractions: ['City Park', 'Shopping District', 'Business Hub', 'Metro Station'],
    contactEmail: 'sales@epmlproperties.com',
    contactPhone: '+1 (555) 123-4567',
  },
  'harbor-heights': {
    id: '2',
    slug: 'harbor-heights',
    title: 'Harbor Heights',
    location: 'Waterfront Area',
    city: 'Metro City',
    type: 'Mixed Use',
    status: 'Upcoming',
    mainImage: '/landscape.jpg',
    galleryImages: ['/landscape.jpg', '/landscape.jpg', '/landscape.jpg'],
    description: 'Modern living spaces with commercial outlets on the ground floor.',
    longDescription: `
      <p>Harbor Heights is a visionary mixed-use development located in the prestigious Waterfront Area. Combining residential comfort with commercial convenience, this development is designed to create a vibrant community where people can live, work, and play.</p>
      
      <p>The residential component consists of 85 thoughtfully designed apartments, from compact one-bedroom units to luxurious three-bedroom residences. Each unit offers waterfront views, premium finishes, and contemporary design elements.</p>

      <p>The ground floor is dedicated to a curated selection of retail spaces, cafes, and service providers, creating a dynamic environment for residents and visitors alike. The central plaza serves as a community hub, hosting seasonal events and gatherings.</p>

      <p>Harbor Heights embodies modern urban planning principles, emphasizing walkability, community interaction, and environmental responsibility. The development includes sustainable features like rainwater harvesting systems and energy-efficient design.</p>
    `,
    startDate: '2025-04-10',
    completionDate: '2027-11-20',
    architect: 'Coastal Design Studio',
    developer: 'EPML Properties',
    totalUnits: 85,
    unitTypes: [
      { type: '1 Bedroom', size: '600-700 sq ft', priceRange: '$400,000 - $500,000', available: 30 },
      { type: '2 Bedrooms', size: '850-1000 sq ft', priceRange: '$550,000 - $700,000', available: 40 },
      { type: '3 Bedrooms', size: '1200-1400 sq ft', priceRange: '$800,000 - $1,000,000', available: 15 },
    ],
    features: [
      'Waterfront Views', 
      'Retail Spaces', 
      'Underground Parking', 
      'Rooftop Garden',
      'Private Balconies',
      'Community Plaza',
      'Secure Access System',
      'Bicycle Storage',
      'High-speed Internet Infrastructure',
      'Energy-efficient Appliances'
    ],
    amenities: ['Waterfront Access', 'Retail Outlets', 'Parking', 'Security', 'Community Spaces'],
    constructionProgress: 0, // Not started yet
    nearbyAttractions: ['Harbor', 'Marina', 'Waterfront Park', 'Ferry Terminal'],
    contactEmail: 'info@epmlproperties.com',
    contactPhone: '+1 (555) 987-6543',
  },
  'green-valley': {
    id: '3',
    slug: 'green-valley',
    title: 'Green Valley',
    location: 'Suburban District',
    city: 'Greenfield',
    type: 'Residential',
    status: 'Completed',
    mainImage: '/landscape.jpg',
    galleryImages: ['/landscape.jpg', '/landscape.jpg', '/landscape.jpg', '/landscape.jpg'],
    description: 'Eco-friendly residential community with extensive green spaces.',
    longDescription: `
      <p>Green Valley is a sustainable residential community designed with nature and ecological responsibility at its core. Nestled in the scenic Suburban District of Greenfield, this development harmoniously integrates with its natural surroundings.</p>
      
      <p>The community comprises 65 eco-friendly homes ranging from cozy townhouses to spacious family residences. Each home is constructed using sustainable materials and features energy-efficient systems that significantly reduce the environmental footprint.</p>

      <p>Green Valley boasts extensive communal green spaces, including community gardens, walking trails, and preserved natural habitats. The central park serves as the community's heart, providing residents with a space for recreation, relaxation, and social activities.</p>

      <p>This development stands as a testament to how modern residential communities can prioritize sustainability without compromising on comfort, convenience, or aesthetic appeal.</p>
    `,
    startDate: '2022-09-05',
    completionDate: '2024-12-15',
    architect: 'EcoDesign Associates',
    developer: 'EPML Properties',
    totalUnits: 65,
    unitTypes: [
      { type: 'Townhouse', size: '1200-1400 sq ft', priceRange: '$380,000 - $450,000', available: 10 },
      { type: 'Garden Home', size: '1500-1800 sq ft', priceRange: '$470,000 - $550,000', available: 8 },
      { type: 'Family Residence', size: '2000-2400 sq ft', priceRange: '$580,000 - $700,000', available: 5 },
    ],
    features: [
      'Solar Panels', 
      'Community Garden', 
      'EV Charging Stations',
      'Rainwater Harvesting',
      'Energy-efficient Appliances',
      'Natural Lighting Design',
      'Walking Trails',
      'Communal Green Spaces',
      'Recycling Center',
      'Sustainable Building Materials'
    ],
    amenities: ['Community Gardens', 'Central Park', 'Walking Trails', 'Playground', 'Recycling Facilities'],
    constructionProgress: 100, // Completed
    nearbyAttractions: ['Nature Reserve', 'Cycling Trails', 'Farmers Market', 'Organic Cafe'],
    contactEmail: 'info@epmlproperties.com',
    contactPhone: '+1 (555) 456-7890',
  },
  'central-plaza': {
    id: '4',
    slug: 'central-plaza',
    title: 'Central Plaza',
    location: 'City Center',
    city: 'Metro City',
    type: 'Commercial',
    status: 'Ongoing',
    mainImage: '/landscape.jpg',
    galleryImages: ['/landscape.jpg', '/landscape.jpg', '/landscape.jpg'],
    description: 'Prime commercial real estate in the heart of the business district.',
    longDescription: `
      <p>Central Plaza represents the future of commercial real estate in Metro City's bustling business district. This prestigious development offers state-of-the-art office spaces designed to meet the evolving needs of modern businesses.</p>
      
      <p>The complex features 40 commercial units ranging from compact office suites ideal for startups to expansive floors suitable for established corporations. Each space is equipped with cutting-edge technology infrastructure, adaptable layouts, and premium finishes.</p>

      <p>Central Plaza prioritizes the wellbeing of its occupants with thoughtfully designed common areas, natural lighting, and greenery throughout the building. The ground floor hosts a selection of cafes, restaurants, and service providers to enhance the workplace experience.</p>

      <p>With its strategic location at the heart of the city's business hub, Central Plaza offers unparalleled connectivity to public transport, major highways, and key business partners.</p>
    `,
    startDate: '2023-07-20',
    completionDate: '2026-03-10',
    architect: 'Business Architecture Group',
    developer: 'EPML Properties',
    totalUnits: 40,
    unitTypes: [
      { type: 'Office Suite', size: '500-800 sq ft', priceRange: 'From $500,000', available: 15 },
      { type: 'Mid-size Office', size: '1200-1800 sq ft', priceRange: 'From $1,200,000', available: 18 },
      { type: 'Full Floor', size: '5000-6000 sq ft', priceRange: 'From $5,000,000', available: 7 },
    ],
    features: [
      '24/7 Security', 
      'Smart Building Technology', 
      'Conference Facilities',
      'High-speed Fiber Optics',
      'Sustainable Energy Systems',
      'Rooftop Meeting Space',
      'Underground Parking',
      'Digital Access Control',
      'Common Breakout Areas',
      'Green Building Certification'
    ],
    amenities: ['Conference Center', 'Business Lounge', 'Cafeteria', 'Security', 'Parking'],
    constructionProgress: 65,
    nearbyAttractions: ['Financial District', 'Convention Center', 'Luxury Hotels', 'Transportation Hub'],
    contactEmail: 'commercial@epmlproperties.com',
    contactPhone: '+1 (555) 234-5678',
  },
  'sunset-heights': {
    id: '5',
    slug: 'sunset-heights',
    title: 'Sunset Heights',
    location: 'Hillside Area',
    city: 'Westview',
    type: 'Residential',
    status: 'Upcoming',
    mainImage: '/landscape.jpg',
    galleryImages: ['/landscape.jpg', '/landscape.jpg', '/landscape.jpg'],
    description: 'Exclusive hillside residences with spectacular sunset views.',
    longDescription: `
      <p>Sunset Heights is an exclusive collection of luxury residences perched on the picturesque hillsides of Westview. This boutique development offers an unparalleled living experience with breathtaking panoramic views of the surrounding landscape and spectacular sunsets.</p>
      
      <p>The development features 32 meticulously designed homes, each positioned to maximize views and privacy. The residences range from elegant villas to sophisticated penthouses, all characterized by spacious layouts, premium materials, and thoughtful design details.</p>

      <p>Residents of Sunset Heights will enjoy a range of exclusive amenities, including an infinity-edge pool overlooking the valley, a fully-equipped fitness center, and landscaped gardens. The development's design harmoniously integrates with the natural topography, preserving the hillside's natural beauty.</p>

      <p>Every home in Sunset Heights comes equipped with smart home technology, energy-efficient systems, and high-end finishes, providing the perfect blend of luxury, comfort, and sustainability.</p>
    `,
    startDate: '2025-06-15',
    completionDate: '2027-09-25',
    architect: 'Hillside Design Partners',
    developer: 'EPML Properties',
    totalUnits: 32,
    unitTypes: [
      { type: 'Luxury Villa', size: '2500-3000 sq ft', priceRange: '$1,500,000 - $2,000,000', available: 12 },
      { type: 'Premium Residence', size: '1800-2200 sq ft', priceRange: '$1,000,000 - $1,400,000', available: 15 },
      { type: 'Penthouse', size: '3500-4000 sq ft', priceRange: '$2,500,000 - $3,000,000', available: 5 },
    ],
    features: [
      'Infinity Pool', 
      'Private Terraces', 
      'Smart Home Systems',
      'Panoramic Views',
      'Premium Finishes',
      'Floor-to-ceiling Windows',
      'Private Gardens',
      'Home Automation',
      'Wine Cellars',
      'Designer Kitchens'
    ],
    amenities: ['Infinity Pool', 'Fitness Center', 'Landscaped Gardens', 'Security', 'Concierge'],
    constructionProgress: 0, // Not started yet
    nearbyAttractions: ['Scenic Overlook', 'Hiking Trails', 'Boutique Shops', 'Fine Dining'],
    contactEmail: 'luxury@epmlproperties.com',
    contactPhone: '+1 (555) 678-9012',
  },
  'riverside-lofts': {
    id: '6',
    slug: 'riverside-lofts',
    title: 'Riverside Lofts',
    location: 'Riverside District',
    city: 'Riverside',
    type: 'Residential',
    status: 'Completed',
    mainImage: '/landscape.jpg',
    galleryImages: ['/landscape.jpg', '/landscape.jpg', '/landscape.jpg'],
    description: 'Contemporary loft apartments overlooking the scenic river.',
    longDescription: `
      <p>Riverside Lofts is a distinctive residential development that combines industrial heritage with contemporary design. Located in the vibrant Riverside District, these unique loft apartments offer an urban lifestyle with the tranquility of riverside living.</p>
      
      <p>The development features 48 thoughtfully converted lofts within a former industrial building, preserving original architectural elements like exposed brick walls, timber beams, and generous ceiling heights. Each residence balances the building's historic character with modern comforts and finishes.</p>

      <p>Many units offer direct views of the river, and all residents enjoy access to a communal rooftop garden that provides panoramic views of the waterfront and surrounding cityscape. The ground floor hosts a selection of cafes and boutique shops that complement the neighborhood's character.</p>

      <p>Riverside Lofts is ideally situated along the riverfront promenade, offering residents direct access to walking and cycling paths, waterside dining, and cultural attractions.</p>
    `,
    startDate: '2022-04-10',
    completionDate: '2024-08-20',
    architect: 'Urban Conversion Architects',
    developer: 'EPML Properties',
    totalUnits: 48,
    unitTypes: [
      { type: 'Studio Loft', size: '550-650 sq ft', priceRange: '$280,000 - $350,000', available: 8 },
      { type: '1 Bedroom Loft', size: '750-850 sq ft', priceRange: '$380,000 - $450,000', available: 12 },
      { type: '2 Bedroom Loft', size: '1100-1300 sq ft', priceRange: '$520,000 - $650,000', available: 6 },
    ],
    features: [
      'River Views', 
      'Industrial Design', 
      'Rooftop Garden',
      'Exposed Brick Walls',
      'High Ceilings',
      'Original Timber Beams',
      'Modern Kitchens',
      'Energy-efficient Windows',
      'Hardwood Flooring',
      'Balconies (select units)'
    ],
    amenities: ['Rooftop Garden', 'Bicycle Storage', 'Riverfront Access', 'Security', 'Ground Floor Retail'],
    constructionProgress: 100, // Completed
    nearbyAttractions: ['Riverfront Park', 'Dining District', 'Art Galleries', 'Historic Quarter'],
    contactEmail: 'info@epmlproperties.com',
    contactPhone: '+1 (555) 345-6789',
  },
};

// Filter data
export const filterData = {
  locations: [
    { id: '1', name: 'Metro City' },
    { id: '2', name: 'Greenfield' },
    { id: '3', name: 'Westview' },
    { id: '4', name: 'Riverside' },
  ],
  projectTypes: [
    { id: '1', name: 'Residential' },
    { id: '2', name: 'Commercial' },
    { id: '3', name: 'Mixed Use' },
  ],
  projectStatuses: [
    { id: '1', name: 'Upcoming' },
    { id: '2', name: 'Ongoing' },
    { id: '3', name: 'Completed' },
  ],
};