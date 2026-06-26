# Hair by Nechama Website

A responsive one-page website for Hair by Nechama, a hair styling, cutting, and wig business.

Open `index.html` in a browser to view the site.

Use the Admin button in the footer to update styles/prices, upload gallery photos, set regular times for each weekday, and manage the bookings calendar. The default admin password is `nechama123`; it can be viewed, changed, or reset from the login screen. New booking requests are saved as pending in the Admin calendar. When a booking is submitted, the site opens an email draft to `nechmaabrenig@gmail.com` with all booking details and an approval link back to the website. That approval link carries the booking details so the admin browser can load it into the calendar as pending. When you approve a booking, it is marked confirmed and the site opens a confirmation email draft addressed to the customer.

Gallery photos are compressed and saved in the browser's IndexedDB storage, while prices, bookings, availability, and the admin password are saved in browser storage. They stay on the same browser/computer. A live public version would need a backend or hosting storage for proper secure login, shared updates across devices, permanent file uploads, and automatic email sending without opening an email draft.

If changes seem to disappear, check that you are opening the site the same way each time. Browser storage for `file:///.../index.html` is separate from storage for `http://127.0.0.1:8765/index.html`, and another browser or device will not see the same local changes. Gallery uploads also depend on the browser's storage limit, so very large or many photos may need real hosting storage.

Update these placeholders before publishing:

- Any location, prices, booking link, or social profiles you want shown
