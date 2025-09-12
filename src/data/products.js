export const products = [
  {
    id: 1,
    name: "Mouse Óptico Profissional MX Master 3",
    description: "Mouse sem fio com sensor de alta precisão, ideal para ambientes corporativos e trabalho intensivo.",
    price: 299.90,
    originalPrice: 349.90,
    category: "Mouses",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    stock: 25,
    specs: [
      { label: "DPI", value: "4000" },
      { label: "Conexão", value: "Wireless" },
      { label: "Bateria", value: "70 dias" },
      { label: "Peso", value: "141g" }
    ],
    features: [
      "Sensor de alta precisão",
      "Design ergonômico",
      "Bateria de longa duração",
      "Compatível com múltiplos dispositivos"
    ]
  },
  {
    id: 2,
    name: "Teclado Mecânico RGB K95 Platinum",
    description: "Teclado mecânico com switches Cherry MX, iluminação RGB e teclas programáveis.",
    price: 899.90,
    originalPrice: 1099.90,
    category: "Teclados",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    stock: 12,
    specs: [
      { label: "Switches", value: "Cherry MX Speed" },
      { label: "Layout", value: "Full Size" },
      { label: "Iluminação", value: "RGB" },
      { label: "Conexão", value: "USB" }
    ],
    features: [
      "Switches Cherry MX",
      "Iluminação RGB personalizável",
      "Teclas macro programáveis",
      "Construção em alumínio"
    ]
  },
  {
    id: 3,
    name: "Headset Gamer Pro X2",
    description: "Headset com cancelamento de ruído ativo, ideal para reuniões e chamadas profissionais.",
    price: 499.90,
    category: "Headsets",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
    stock: 18,
    specs: [
      { label: "Driver", value: "50mm" },
      { label: "Frequência", value: "20Hz-20kHz" },
      { label: "Microfone", value: "Cancelamento de ruído" },
      { label: "Conexão", value: "USB/Wireless" }
    ],
    features: [
      "Cancelamento de ruído ativo",
      "Som surround 7.1",
      "Microfone removível",
      "Bateria de 20 horas"
    ]
  },
  {
    id: 4,
    name: "Mouse Pad Gaming XXL",
    description: "Mouse pad de alta qualidade com superfície otimizada para precisão e controle.",
    price: 89.90,
    category: "Acessórios",
    image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400&h=300&fit=crop",
    stock: 35,
    specs: [
      { label: "Tamanho", value: "900x400mm" },
      { label: "Material", value: "Tecido premium" },
      { label: "Base", value: "Antiderrapante" },
      { label: "Espessura", value: "3mm" }
    ],
    features: [
      "Superfície otimizada",
      "Base antiderrapante",
      "Fácil limpeza",
      "Durabilidade superior"
    ]
  },
  {
    id: 5,
    name: "Adaptador USB-C Hub 7 em 1",
    description: "Hub USB-C com múltiplas portas para conectar diversos dispositivos simultaneamente.",
    price: 199.90,
    category: "Adaptadores",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    stock: 22,
    specs: [
      { label: "Portas USB", value: "3x USB 3.0" },
      { label: "HDMI", value: "4K@60Hz" },
      { label: "Ethernet", value: "Gigabit" },
      { label: "SD Card", value: "Sim" }
    ],
    features: [
      "7 portas em 1",
      "Suporte 4K",
      "Ethernet Gigabit",
      "Compatível com Mac/PC"
    ]
  },
  {
    id: 6,
    name: "Teclado Sem Fio Compacto",
    description: "Teclado sem fio compacto e silencioso, perfeito para ambientes de trabalho.",
    price: 159.90,
    category: "Teclados",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    stock: 8,
    specs: [
      { label: "Layout", value: "Compacto" },
      { label: "Conexão", value: "Bluetooth" },
      { label: "Bateria", value: "6 meses" },
      { label: "Peso", value: "400g" }
    ],
    features: [
      "Design compacto",
      "Teclas silenciosas",
      "Bateria de longa duração",
      "Compatível com múltiplos dispositivos"
    ]
  },
  {
    id: 7,
    name: "Mouse Vertical Ergonômico",
    description: "Mouse vertical que reduz a tensão no pulso, ideal para uso prolongado.",
    price: 229.90,
    category: "Mouses",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    stock: 15,
    specs: [
      { label: "DPI", value: "3200" },
      { label: "Design", value: "Vertical" },
      { label: "Conexão", value: "USB" },
      { label: "Peso", value: "120g" }
    ],
    features: [
      "Design ergonômico",
      "Reduz tensão no pulso",
      "Sensor de alta precisão",
      "Construção durável"
    ]
  },
  {
    id: 8,
    name: "Headset Bluetooth Profissional",
    description: "Headset Bluetooth com cancelamento de ruído e bateria de longa duração.",
    price: 399.90,
    category: "Headsets",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
    stock: 20,
    specs: [
      { label: "Conexão", value: "Bluetooth 5.0" },
      { label: "Bateria", value: "30 horas" },
      { label: "Cancelamento", value: "Ativo" },
      { label: "Peso", value: "250g" }
    ],
    features: [
      "Bluetooth 5.0",
      "Cancelamento de ruído",
      "Bateria de 30 horas",
      "Qualidade de som premium"
    ]
  }
];

export const categories = [
  { id: 1, name: "Mouses", slug: "mouses" },
  { id: 2, name: "Teclados", slug: "teclados" },
  { id: 3, name: "Headsets", slug: "headsets" },
  { id: 4, name: "Adaptadores", slug: "adaptadores" },
  { id: 5, name: "Acessórios", slug: "acessorios" }
];

