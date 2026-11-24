# AR.PHOTOGRAPHY — Photo Frame Store

A responsive static catalogue and WhatsApp order website. No database or build step is required.

## Run locally

Open `index.html` in a browser, or run a local static server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to Vercel

1. Create a GitHub repository and upload the contents of this folder.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep the framework preset as **Other**.
4. Leave Build Command and Output Directory empty/default (static site; no build required).
5. Deploy.

You can also use Vercel CLI from this folder with `vercel`.

## Update products and prices

Edit `products` and `sizes` at the top of `script.js`.

- Product model IDs, titles, categories and image paths are in `products`.
- Wooden-frame sizes and prices are in `sizes`.
- The WhatsApp destination is `WHATSAPP_NUMBER` at the top of `script.js` (digits only, country code included).

Place new product images in `assets/` and update the matching image path.

## Order flow

The form validates the customer's name and mobile number, then opens WhatsApp with a pre-filled order message. The customer must tap **Send** in WhatsApp; websites cannot silently send a message from the customer's WhatsApp account.

## Brand asset note

The supplied image `assets/supplied-logo.png` is preserved in the project. Its visible artwork reads “HOTOGRAPH”, so the site currently uses a clean text-based AR.PHOTOGRAPHY wordmark and a matching AR favicon rather than displaying a potentially incomplete logo image.
