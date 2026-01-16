<p align="center">
  <img src="frontend/src/assets/favicon/android-chrome-512x512.png" alt="Khappa Logo" width="100"/>
</p>

<h1 align="center">Khappa Inventory System</h1>

<p align="center">
  <strong>A modern inventory management system for businesses</strong>
</p>

---

## Features

- **Product & Category Management** - Full CRUD operations for products and categories
- **Real-time Stock Tracking** - Monitor inventory levels with live updates
- **Modern UI/UX** - Responsive design with smooth Framer Motion animations
- **Cloud Image Hosting** - Product images stored on Cloudinary

---

## Tech Stack

| Frontend | Backend | Services |
|----------|---------|----------|
| React 19 | Node.js + Express 5 | NeonDb |
| Vite | pg (node-postgres) | Cloudinary |
| Tailwind CSS 4 | CORS | Vercel (Frontend) |
| Framer Motion | dotenv | Render (Backend) |
| React Router DOM | | |
| Axios | | |

---

## Preview

<img width="1920" height="1243" alt="1" src="https://github.com/user-attachments/assets/f42f200d-7caf-4607-988f-e376b7a998db" />

<img width="3840" height="2486" alt="2" src="https://github.com/user-attachments/assets/32d92910-95e9-43f8-8c00-c9da08c8d0c7" />

<img width="3840" height="2486" alt="3" src="https://github.com/user-attachments/assets/19102034-f22c-4eef-ab5d-f04a9fcca0b3" />

<img width="3840" height="2486" alt="4" src="https://github.com/user-attachments/assets/b1ec173f-6f16-4231-b9dc-5bd1b5fffb72" />

---

## Project Structure

```
khappa-inventory-system/
├── backend/
│   └── src/
│       ├── controller/     # Request handlers
│       ├── db/             # Database config & queries
│       ├── routes/         # API route definitions
│       ├── app.js          # Express configuration
│       └── server.js       # Entry point
├── frontend/
│   └── src/
│       ├── components/     # UI components (Forms, Layout, Modals)
│       ├── pages/          # Page components
│       ├── services/       # API service layer
│       └── App.jsx         # Main app component
└── ER-diagram.png          # Database schema
```

---

## Getting Started

### Backend
```bash
cd backend
npm install
# Configure .env with DATABASE_URL
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# Configure .env with VITE_API_URL
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET/POST` | `/api/products` | List / Create products |
| `GET/PUT/DELETE` | `/api/products/:id` | Get / Update / Delete product |
| `GET/POST` | `/api/categories` | List / Create categories |
| `GET/PUT/DELETE` | `/api/categories/:id` | Get / Update / Delete category |

---

## Learning Outcomes

This project helped me understand:

- **Backend Development** - Building RESTful APIs with Express, database transactions, and error handling
- **Frontend-Backend Communication** - Using Axios for HTTP requests, handling async data, and managing loading states
- **Database Design** - PostgreSQL schema design, relationships, and writing optimized SQL queries
- **Full-Stack Architecture** - Structuring a project with separation of concerns (routes → controllers → queries)
- **Deployment** - Deploying frontend to Vercel, backend to Render, and configuring CORS for production

---

## License

MIT License

