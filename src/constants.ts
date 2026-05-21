export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Suisse", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export const MOCK_ITEMS = [
  {
    id: "598607",
    title: "Ordinateur Apple MACBOOK Air 13,6",
    price: 0,
    type: "Informatique",
    image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Boulanger/00001.webp",
  },
  {
    id: "607961",
    title: "Lave linge hublot HAIER HW90-B14939S8-FR",
    price: 0,
    type: "Gros Électroménager",
    image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Boulanger/00002.webp",
  },
  {
    id: "607962",
    title: "Friteuse sans huile MOULINEX Easy Fry XXL 7.5L",
    price: 0,
    type: "Petit Électroménager",
    image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Boulanger/00005.webp",
  },
  {
    id: "607963",
    title: "Friteuse sans huile MOULINEX Easy fry Dual XXL 11L",
    price: 0,
    type: "Petit Électroménager",
    image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Boulanger/00006.webp",
  },
  {
    id: "616757",
    title: "Barbecue électrique NINJA",
    price: 0,
    type: "Petit Électroménager",
    image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Boulanger/00007.webp",
  },
  {
    id: "618065",
    title: "Barbecue électrique NINJA",
    price: 0,
    type: "Petit Électroménager",
    image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Boulanger/00008.webp",
  },
  {
    id: "618598",
    title: "Robot tondeuse SUNSEEKER",
    price: 0,
    type: "Jardin",
    image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Boulanger/00009.webp",
  },
  {
    id: "618991",
    title: "Trottinette électrique SEGWAY",
    price: 0,
    type: "Mobilité",
    image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Boulanger/00010.webp",
  },
  {
    id: "620891",
    title: "SAMSUNG TV QLED",
    price: 0,
    type: "Image et Son",
    image: "https://storage.googleapis.com/onestock-tools-hosting-hwn8eubny/mbousquet/Boulanger/00011.webp",
  }
];

export interface Route {
  to: string;
  cost: number;
  carbon: string;
  transitHours?: number;
  transitDays?: number;
  cutoffs?: string[];
  cutoff?: string;
  carrier?: string;
  direct?: boolean;
}

export interface Supplier {
  name: string;
  itemId: string | null;
  purchasePrice: number;
  routes: Route[];
  isWarehouse?: boolean;
}

export interface Hub {
  name: string;
  routes: Route[];
}

const STOCKS = [
    { "item_id": "598607", "endpoint_id": "schafisheim", "quantity": 0 },
    { "item_id": "598607", "endpoint_id": "bienne", "quantity": 15 },
    { "item_id": "598607", "endpoint_id": "wallisellen", "quantity": 0 },
    { "item_id": "598607", "endpoint_id": "grancia", "quantity": 10 },
    { "item_id": "598607", "endpoint_id": "dropship_01", "quantity": 0 },
    { "item_id": "598607", "endpoint_id": "dropship_02", "quantity": 10 },
    { "item_id": "607961", "endpoint_id": "schafisheim", "quantity": 0 },
    { "item_id": "607961", "endpoint_id": "bienne", "quantity": 3 },
    { "item_id": "607961", "endpoint_id": "dropship_01", "quantity": 4 },
    { "item_id": "607962", "endpoint_id": "dropship_01", "quantity": 17 },
    { "item_id": "607963", "endpoint_id": "schafisheim", "quantity": 21 },
    { "item_id": "607963", "endpoint_id": "wallisellen", "quantity": 7 },
    { "item_id": "607963", "endpoint_id": "grancia", "quantity": 7 },
    { "item_id": "607963", "endpoint_id": "dropship_01", "quantity": 2 },
    { "item_id": "616757", "endpoint_id": "schafisheim", "quantity": 17 },
    { "item_id": "616757", "endpoint_id": "bienne", "quantity": 8 },
    { "item_id": "618598", "endpoint_id": "schafisheim", "quantity": 3 },
    { "item_id": "618598", "endpoint_id": "bienne", "quantity": 20 },
    { "item_id": "618598", "endpoint_id": "wallisellen", "quantity": 14 },
    { "item_id": "618598", "endpoint_id": "grancia", "quantity": 23 },
    { "item_id": "618598", "endpoint_id": "dropship_01", "quantity": 6 },
    { "item_id": "618991", "endpoint_id": "dropship_01", "quantity": 13 },
    { "item_id": "618991", "endpoint_id": "dropship_02", "quantity": 19 },
    { "item_id": "620891", "endpoint_id": "bienne", "quantity": 19 },
    { "item_id": "620891", "endpoint_id": "wallisellen", "quantity": 24 },
    { "item_id": "620891", "endpoint_id": "grancia", "quantity": 3 },
    { "item_id": "626930", "endpoint_id": "bienne", "quantity": 7 },
    { "item_id": "626930", "endpoint_id": "wallisellen", "quantity": 8 },
    { "item_id": "626930", "endpoint_id": "dropship_01", "quantity": 6 }
];

export const SUPPLIER_DATA: Supplier[] = STOCKS.filter(s => s.quantity > 0).map(s => {
  const isWarehouse = s.endpoint_id === 'schafisheim';
  const name = s.endpoint_id.charAt(0).toUpperCase() + s.endpoint_id.slice(1);
  return {
    name,
    itemId: s.item_id,
    purchasePrice: 0,
    isWarehouse,
    routes: [
      { 
        to: "France", 
        cost: 9.99, 
        carbon: isWarehouse ? "500g" : "100g", 
        transitDays: isWarehouse ? 2 : 1, 
        cutoff: "16:00", 
        carrier: "Geodis", 
        direct: true 
      }
    ]
  };
});

export const HUB_DATA: Hub[] = [];

