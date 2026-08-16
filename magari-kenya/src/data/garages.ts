export type Garage = {
  slug: string;
  name: string;
  website: string;
  city: string;
  address: string;
  phone: string;
  type: "Franchise dealer" | "Independent dealer" | "Luxury / exotic" | "Marketplace";
  brands: string[];
  blurb: string;
  luxury: boolean;
};

export const garages: Garage[] = [
  {
    slug: "dt-dobie",
    name: "DT Dobie Kenya",
    website: "https://www.dtdobie.co.ke",
    city: "Nairobi",
    address: "Lusaka Road, Industrial Area, Nairobi",
    phone: "+254 709 202 000",
    type: "Franchise dealer",
    brands: ["Mercedes-Benz", "Volkswagen", "Jeep", "Fuso"],
    blurb:
      "One of Kenya's oldest franchise dealers and the official Mercedes-Benz partner, with new passenger cars, commercial vehicles and factory-backed servicing.",
    luxury: true,
  },
  {
    slug: "cfao-mobility",
    name: "CFAO Mobility Kenya (Toyota Kenya)",
    website: "https://www.toyotakenya.com",
    city: "Nairobi",
    address: "Uhuru Highway, Nairobi",
    phone: "+254 703 024 000",
    type: "Franchise dealer",
    brands: ["Toyota", "Lexus", "Hino", "Yamaha", "Suzuki"],
    blurb:
      "Official Toyota and Lexus distributor in Kenya. New vehicles, genuine parts, and the Toyota Certified used-car programme.",
    luxury: true,
  },
  {
    slug: "simba-corporation",
    name: "Simba Corporation",
    website: "https://www.simbacorp.com",
    city: "Nairobi",
    address: "Simba Corp Centre, Mombasa Road, Nairobi",
    phone: "+254 730 606 000",
    type: "Franchise dealer",
    brands: ["Mitsubishi", "Renault", "Fuso", "Proton"],
    blurb:
      "Franchise holder for Mitsubishi and Renault in Kenya, with a large aftersales network across Nairobi and Mombasa.",
    luxury: false,
  },
  {
    slug: "isuzu-east-africa",
    name: "Isuzu East Africa",
    website: "https://www.isuzu.co.ke",
    city: "Nairobi",
    address: "Enterprise / Mombasa Road, Nairobi",
    phone: "+254 703 013 000",
    type: "Franchise dealer",
    brands: ["Isuzu"],
    blurb:
      "Kenya's largest vehicle assembler, best known for the D-Max pick-up and the MU-X SUV, plus trucks and buses.",
    luxury: false,
  },
  {
    slug: "rma-motors",
    name: "RMA Motors Kenya",
    website: "https://www.rmamotors.com",
    city: "Nairobi",
    address: "Mombasa Road, Nairobi",
    phone: "+254 709 400 000",
    type: "Luxury / exotic",
    brands: ["Land Rover", "Jaguar", "Range Rover"],
    blurb:
      "Official Jaguar Land Rover importer for Kenya. Range Rover, Defender and Discovery models with full manufacturer warranty.",
    luxury: true,
  },
  {
    slug: "bavaria-auto",
    name: "Bavaria Auto (BMW Kenya)",
    website: "https://www.bavariaauto.co.ke",
    city: "Nairobi",
    address: "Mombasa Road, Nairobi",
    phone: "+254 709 902 000",
    type: "Luxury / exotic",
    brands: ["BMW", "MINI", "BMW Motorrad"],
    blurb:
      "Authorised BMW and MINI dealer in Kenya, including M performance models and BMW Premium Selection approved used cars.",
    luxury: true,
  },
  {
    slug: "porsche-centre-nairobi",
    name: "Porsche Centre Nairobi",
    website: "https://www.porsche.com/kenya/",
    city: "Nairobi",
    address: "Mombasa Road, Nairobi",
    phone: "+254 709 400 400",
    type: "Luxury / exotic",
    brands: ["Porsche"],
    blurb:
      "Kenya's only official Porsche centre, covering 911, Cayenne, Macan, Panamera and Taycan with factory-trained technicians.",
    luxury: true,
  },
  {
    slug: "kai-and-karo",
    name: "Kai & Karo",
    website: "https://www.kaikaro.co.ke",
    city: "Nairobi",
    address: "Mombasa Road, Nairobi",
    phone: "+254 711 111 111",
    type: "Independent dealer",
    brands: ["Toyota", "Mazda", "Subaru", "Nissan", "Mercedes-Benz"],
    blurb:
      "Large Nairobi showroom specialising in Japanese and European used imports, with in-house financing and trade-ins.",
    luxury: false,
  },
  {
    slug: "motorhub-kenya",
    name: "Motorhub Kenya",
    website: "https://www.motorhub.co.ke",
    city: "Nairobi",
    address: "Ngong Road, Nairobi",
    phone: "+254 700 222 333",
    type: "Independent dealer",
    brands: ["Toyota", "Subaru", "Volkswagen", "Mazda"],
    blurb:
      "Independent dealer stocking locally used and freshly imported units, with inspection reports on every listing.",
    luxury: false,
  },
  {
    slug: "sportika-motors",
    name: "Sportika Motors",
    website: "https://www.sportika.co.ke",
    city: "Nairobi",
    address: "Westlands, Nairobi",
    phone: "+254 733 444 555",
    type: "Independent dealer",
    brands: ["Subaru", "Toyota", "Mitsubishi", "Audi"],
    blurb:
      "Performance-leaning Nairobi dealer known for Subaru WRX/STI imports and sporty Japanese hatchbacks.",
    luxury: false,
  },
  {
    slug: "topcar-kenya",
    name: "Topcar Kenya",
    website: "https://www.topcar.co.ke",
    city: "Nairobi",
    address: "Kilimani, Nairobi",
    phone: "+254 705 666 777",
    type: "Marketplace",
    brands: ["Multiple"],
    blurb:
      "Online car marketplace aggregating stock from dealers and private sellers across Kenya, with price guides and reviews.",
    luxury: false,
  },
  {
    slug: "car-and-general",
    name: "Car & General Kenya",
    website: "https://www.cargen.com",
    city: "Nairobi",
    address: "New Cargen House, Lusaka Road, Nairobi",
    phone: "+254 709 799 000",
    type: "Franchise dealer",
    brands: ["TVS", "Ashok Leyland", "Piaggio"],
    blurb:
      "Listed Kenyan distributor of light commercial vehicles, three-wheelers and power products, with branches countrywide.",
    luxury: false,
  },
];

export const garageBySlug = (slug: string) => garages.find((g) => g.slug === slug);
