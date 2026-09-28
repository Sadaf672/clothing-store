export default function AnnouncementBar() {
  return (
    <div className="bg-brand-primary text-white text-center py-2.5 px-4 text-sm font-medium tracking-wide">
      <span>Free Delivery on Orders Above Rs. 5,000</span>
      <span className="mx-2 opacity-50">|</span>
      <span className="hidden sm:inline">Use code: ELEGANCE10</span>
    </div>
  );
}
