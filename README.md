# Hair by Nechama Website

A responsive one-page website for Hair by Nechama, a hair styling, cutting, and wig business.

Open `index.html` in a browser to view the site locally. When it is hosted on Vercel, Vercel serves the site and the `/api/send-email` function.

Use the Admin button in the footer to update styles/prices, upload gallery photos, set regular times for each weekday, and manage the bookings calendar. The default admin password is `nechama123`. New booking requests are saved as pending in the Admin calendar. When a booking is submitted on Vercel, the site sends the request to `nechamabrenig@gmail.com` with all booking details and an approval link back to the website. It also sends the customer a request-received email explaining that the booking is not confirmed yet. That approval link carries the booking details so the admin browser can load it into the calendar as pending. When you approve a booking, it is marked confirmed and the site sends a confirmation email to the customer.

Automatic email sending uses Resend through the Vercel function at `/api/send-email`. Add these environment variables in Vercel before expecting real emails to send:

- `RESEND_API_KEY`
- `ADMIN_EMAIL=nechamabrenig@gmail.com`
- `EMAIL_FROM`, for example `Hair by Nechama <bookings@your-domain.com>` after the sending domain is verified in Resend

Gallery photos are compressed and saved in the browser's IndexedDB storage, while prices, bookings, availability, and the admin password are saved in browser storage. They stay on the same browser/computer. A live public version would need database or hosting storage for proper secure login, shared updates across devices, and permanent file uploads.

If changes seem to disappear, check that you are opening the site the same way each time. Browser storage for `file:///.../index.html` is separate from storage for `http://127.0.0.1:8765/index.html`, and another browser or device will not see the same local changes. Gallery uploads also depend on the browser's storage limit, so very large or many photos may need real hosting storage.

Update these placeholders before publishing:

- Any location, prices, booking link, or social profiles you want shown
