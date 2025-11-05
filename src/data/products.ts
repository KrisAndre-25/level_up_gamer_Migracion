export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  imageSrc: string;
  images: string[]; 
};

export const products: Product[] = [
  {
    id: 1,
    title: "Juego de Cartas Pokémon",
    description: "Un emocionante juego de cartas con temática Pokémon. Perfecto para noches de juego con amigos y familiares.",
    category: "Juegos de Mesa",
    price: 24990,
    imageSrc: "/src/assets/img/pokemon1.webp",
    images: [
      "/src/assets/img/pokemon1.webp",
      "/src/assets/img/pkm2.png",
      "/src/assets/img/pkm3.webp",
      "/src/assets/img/pkm4.webp"
    ]
  },
  {
    id: 2,
    title: "Headset Gamer Pro",
    description: "Auriculares gamer con sonido envolvente 7.1 y micrófono integrado. Diseñados para largas sesiones de juego.",
    category: "Audio",
    price: 49990,
    imageSrc: "/src/assets/img/headset1.webp",
    images: [
      "/src/assets/img/headset1.webp",
      "/src/assets/img/headset2.webp",
      "/src/assets/img/headset3.webp",
      "/src/assets/img/headset4.webp"
    ]
  },
  {
    id: 3,
    title: "Mouse RGB Gaming",
    description: "Mouse gamer de alta precisión con iluminación RGB personalizable. Ideal para juegos competitivos.",
    category: "Periféricos",
    price: 29990,
    imageSrc: "/src/assets/img/mouseRGB1.webp",
    images: [
      "/src/assets/img/mouseRGB1.webp",
      "/src/assets/img/mouseRGB2.webp",
      "/src/assets/img/mouseRGB3.webp",
      "/src/assets/img/mouseRGB4.jpg"
    ]
  },
  {
    id: 4,
    title: "Monitor ASUS TUF VG249QM5A",
    description: 'Monitor 23.8" Full HD 280Hz con tecnología G-Sync',
    category: "Monitores",
    price: 150000,
    imageSrc: "/src/assets/img/Asustuf2.webp",
    images: [
      "/src/assets/img/Asustuf2.webp",
      "/src/assets/img/Asustuf3.webp",
      "/src/assets/img/Asustuf4.webp"
    ]
  },
  {
    id: 5,
    title: "Teclado Logitech MX Keys",
    description: "Teclado inalámbrico mecánico con retroiluminación",
    category: "Periféricos",
    price: 99990,
    imageSrc: "/src/assets/img/tecladoMxkeys1.webp",
    images: [
      "/src/assets/img/tecladoMxkeys1.webp",
      "/src/assets/img/tecladoMxkeys2.webp",
      "/src/assets/img/tecladoMxkeys3.webp",
      "/src/assets/img/tecladoMxkeys4.webp"
    ]
  },
  {
    id: 6,
    title: "SSD NVMe 1TB Kingston",
    description: "PCIe 4.0 7000MB/s de velocidad de lectura",
    category: "Almacenamiento",
    price: 129990,
    imageSrc: "/src/assets/img/SSDnvme1.webp",
    images: [
      "/src/assets/img/SSDnvme1.webp",
      "/src/assets/img/SSDnvme2.webp",
      "/src/assets/img/SSDnvme3.webp"
    ]
  },
  {
    id: 7,
    title: "Silla Gamer Razer",
    description: "Silla ergonómica con soporte lumbar ajustable a 135°",
    category: "Mobiliario",
    price: 189990,
    imageSrc: "/src/assets/img/sillagamerRazer1.webp",
    images: [
      "/src/assets/img/sillagamerRazer1.webp",
      "/src/assets/img/sillagamerRazer2.webp",
      "/src/assets/img/sillagamerRazer3.webp",
      "/src/assets/img/sillagamerRazer4.webp"
    ]
  },
  {
    id: 8,
    title: "Router Wi-Fi 6 AX3000",
    description: "Doble banda, OFDMA, para gaming sin lag",
    category: "Redes",
    price: 84990,
    imageSrc: "/src/assets/img/router1.webp",
    images: [
      "/src/assets/img/router1.webp",
      "/src/assets/img/router2.webp",
      "/src/assets/img/router3.webp",
      "/src/assets/img/router4.webp"
    ]
  },
];