export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  imageSrc: string;
};

export const products: Product[] = [
  {
    id: 1,
    title: "Juego de Cartas Gamer",
    description: "Un emocionante juego de cartas con temática gamer. Perfecto para noches de juego con amigos y familiares.",
    category: "Juegos de Mesa",
    price: 24990,
    imageSrc: "/assets/img/cartasGamer.png",
  },
  {
    id: 2,
    title: "Headset Gamer",
    description: "Auriculares gamer con sonido envolvente y micrófono integrado. Diseñados para largas sesiones de juego con comodidad máxima.",
    category: "Audio",
    price: 49990,
    imageSrc: "/assets/img/headset.png",
  },
  {
    id: 3,
    title: "Mouse RGB",
    description: "Mouse gamer de alta precisión con iluminación RGB personalizable. Ideal para juegos competitivos y casuales.",
    category: "Periféricos",
    price: 29990,
    imageSrc: "/assets/img/mouse.png",
  },
  {
    id: 4,
    title: "ASUS TUF VG249QM5A",
    description: 'Monitor 23.8" Full HD 280Hz',
    category: "Monitores",
    price: 150000,
    imageSrc: "/img/monitor1.png",
  },
  {
    id: 5,
    title: "Logitech MX Keys",
    description: "Teclado inalámbrico",
    category: "Periféricos",
    price: 99990,
    imageSrc: "/img/notebook1.webp",
  },
  {
    id: 6,
    title: "SSD NVMe 1TB",
    description: "PCIe 4.0 7000MB/s",
    category: "Almacenamiento",
    price: 129990,
    imageSrc: "/img/notebook2.jpg",
  },
  {
    id: 7,
    title: "Silla Gamer Ω",
    description: "Soporte lumbar, 135°",
    category: "Mobiliario",
    price: 189990,
    imageSrc: "/img/ps5.png",
  },
  {
    id: 8,
    title: "Router Wi-Fi 6 AX3000",
    description: "Doble banda, OFDMA",
    category: "Redes",
    price: 84990,
    imageSrc: "/img/telefono1.jpg",
  },
];