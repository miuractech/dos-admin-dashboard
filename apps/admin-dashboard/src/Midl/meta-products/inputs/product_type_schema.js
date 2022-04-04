const schema = {
  id: "id",
  sku: "id",
  name: "name",
  description: "description",
  display_image: "url",
  color: [{ color_name: "color name", color_code: "color code" }],
  size: ["x", "s", "m"],
  material: ["cotton"],
  style: ["style"],
  variants: [{ color: 0, size: 1, material: 0, style: 0 }],
  image: [
    {
      // referencing color index
      color: 0,
      front: "url",
      back: "url",
      left: "url",
      right: "url",
      top: "url",
      bottom: "url",
    },
  ],
  // referencing variant index
  price: [{ variant: 0, amount: 250 }],
  inventory: [{ variant: 0, location: "chennai", number: 20 }],
};

// We May not need separate collections
// Add any fields I'm missing