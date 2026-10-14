// خريطة خفيفة: مفتاح كارت السيستم (systemsDetails.items) → slug صفحته.
// منفصلة عن systems.js عشان الكومبوننتس اللي على الكلاينت (Nav/Footer/SystemsDetails) ماتشيلش المحتوى كله.
export const SYSTEM_ORDER = ["cafe", "resto", "barber", "clinic", "dental", "pharma", "bar", "shop"];

export const SYSTEM_SLUGS = {
  cafe: "cafe-pos-system",
  resto: "restaurant-system",
  barber: "barber-booking-system",
  clinic: "clinic-management-system",
  dental: "dental-clinic-system",
  pharma: "pharmacy-system",
  bar: "gym-bar-system",
  shop: "retail-pos-system",
};
