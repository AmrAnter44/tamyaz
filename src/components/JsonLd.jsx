// عرض الـJSON-LD من السيرفر — بياخد object واحد أو array.
// "<" بيتحوّل لـ< عشان أي نص فيه </script> مايكسرش الصفحة.
export default function JsonLd({ data }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
