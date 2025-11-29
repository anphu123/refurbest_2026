import { Category } from "@/types";
import {
  Smartphone,
  Tablet,
  Headphones,
  Watch,
  Laptop,
  Gamepad2,
  Camera,
  Sparkles,
  Battery,
  Wifi,
  Bluetooth,
  Cpu
} from "lucide-react";

export const categories: Category[] = [
  // Điện thoại theo thương hiệu
  { id: "iphone", name: "iPhone", slug: "iphone", icon: Smartphone },
  { id: "samsung", name: "Samsung", slug: "samsung", icon: Smartphone },
  { id: "xiaomi", name: "Xiaomi", slug: "xiaomi", icon: Smartphone },
  { id: "oppo", name: "Oppo", slug: "oppo", icon: Smartphone },

  // Điện thoại theo phân khúc
  { id: "cao-cap", name: "Cao cấp (>20tr)", slug: "cao-cap", icon: Sparkles },
  { id: "trung-cap", name: "Trung cấp (10-20tr)", slug: "trung-cap", icon: Smartphone },
  { id: "pho-thong", name: "Phổ thông (<10tr)", slug: "pho-thong", icon: Smartphone },

  // Phụ kiện điện thoại
  { id: "op-lung", name: "Ốp lưng", slug: "op-lung", icon: Smartphone },
  { id: "sac-cap", name: "Sạc & Cáp", slug: "sac-cap", icon: Battery },
  { id: "tai-nghe", name: "Tai nghe", slug: "tai-nghe", icon: Headphones },
  { id: "kinh-cuong-luc", name: "Kính cường lực", slug: "kinh-cuong-luc", icon: Smartphone },

  // Thiết bị công nghệ khác
  { id: "tablet", name: "Tablet", slug: "tablet", icon: Tablet },
  { id: "laptop", name: "Laptop", slug: "laptop", icon: Laptop },
  { id: "dong-ho-thong-minh", name: "Đồng hồ thông minh", slug: "dong-ho-thong-minh", icon: Watch },
  { id: "loa-bluetooth", name: "Loa Bluetooth", slug: "loa-bluetooth", icon: Bluetooth },
];

export const brands = [
  "Apple", "Samsung", "Xiaomi", "Oppo", "Vivo", "Realme",
  "OnePlus", "Huawei", "Nokia", "Sony", "Motorola", "Google",
  "Nothing", "Asus", "Honor", "Redmi", "Poco", "TCL"
];

