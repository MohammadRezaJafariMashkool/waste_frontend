🛠 Project Enhancements & UI Improvements

This project has been significantly improved to enhance user experience, responsiveness, and performance in the product browsing and filtering interface.

✅ Key Features Added

1. 🧰 Advanced Filtering & Sorting Panel

 Introduced a filters section that allows users to:

   Filter skips by availability (e.g., on-road allowed).
   Filter by price range using a dynamic slider.
   Sort products by price, popularity, or size.
 The filter panel is now:

   Sticky to the top of the viewport to prevent confusion during scrolling.
   Responsive across all devices (mobile, tablet, desktop).
   Built with Framer Motion to provide smooth animations when filters open/close or results change.
   Equipped with a debounced filter delay for a polished transition experience.

2. 🎨 Enhanced Item Cards Design

 Improved the item display with:

   Card hover animations including blue shadows and scaling effects for visual feedback.
   Swapped the positions of price and hire period for better emphasis on key information.
   Added an optional "⭐ Recommended" badge in the data model to give featured products greater visibility.
   Integrated Framer Motion animations for smooth entry/exit of items on load and filter changes.

3. 📱 Responsive and Accessible Design

 Limited visible items to 6 per page to avoid overwhelming users.
 Added a "Show More" button to load additional items incrementally.
 Ensured consistent image aspect ratios (`4:3`) to maintain layout integrity across devices.
 Disabled selection buttons for unavailable skips, updated the text to `Unavailable`, and added:

   A tooltip explaining why the item is disabled:
    “This skip cannot be placed on public roads due to local council restrictions.”

4. 📏 Mobile Optimizations

 Reworked the step progress UI for mobile devices to improve visibility and interaction.
 Optimized font sizes and layout spacing for smaller viewports to ensure usability and readability.

---

 📦 Tech Stack

 React + Tailwind CSS
 Framer Motion for UI animation
 Supabase for media assets
 Vite + SWC for fast bundling
