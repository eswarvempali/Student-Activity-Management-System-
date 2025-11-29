# 🎓 Student Activities Platform

A comprehensive React-based web application for managing student activities at Green Valley High School. Built with modern web technologies and designed for both students and administrators.

## ✨ Features

### For Students
- **Browse Activities**: Explore 16+ diverse activities across 5 categories
- **Category Filtering**: Filter events by Sports, Academic, Arts, Technology, or Community
- **Easy Registration**: One-click registration for activities
- **Activity Details**: View comprehensive information about each event
- **Dashboard**: Personal dashboard to track registered activities

### For Administrators
- **Event Management**: Create, edit, and delete activities
- **Registration Analytics**: Track total registrations and popular events
- **Category Insights**: Monitor engagement across different activity types
- **Participant Tracking**: View registered students for each event
- **Statistics Dashboard**: Comprehensive analytics and reporting

## 🛠️ Technology Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: Inline CSS with modern design patterns
- **Build Tool**: Vite for fast development and optimized builds
- **Code Quality**: ESLint for code linting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vempalieswar-art/student-activities-platform.git
   cd student-activities-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── EventForm.jsx    # Form for creating/editing events
│   ├── EventList.jsx    # List of events with registration
│   ├── Footer.jsx       # Site footer
│   └── Navbar.jsx       # Navigation bar
├── pages/              # Main application pages
│   ├── Home.jsx         # Landing page with featured events
│   ├── Login.jsx        # Authentication page
│   ├── StudentDashboard.jsx  # Student activity dashboard
│   ├── AdminDashboard.jsx    # Admin management dashboard
│   └── ActivityDetails.jsx   # Individual event details
├── App.jsx             # Main application component
├── App.css             # Global styles
├── index.css           # Base styles
└── main.jsx           # Application entry point
```

## 🎯 Key Components

### Home Page
- Hero section with school branding
- Statistics dashboard (events, participants, categories)
- Featured events showcase
- Interactive category filtering

### Admin Dashboard
- Registration statistics and analytics
- Event management (CRUD operations)
- Category-wise performance tracking
- Participant management

### Student Dashboard
- Personal activity registration
- Event browsing and filtering
- Registration status tracking

## 📊 Sample Data

The application includes 16 pre-configured activities across 5 categories:

- **Academic**: Chess Club, Debate Society, Science Fair, Math Olympiad
- **Sports**: Soccer Tryouts, Volleyball Tournament, Basketball League
- **Arts**: Art Workshop, Music Band, Drama Club, Photography, Dance
- **Technology**: Coding Bootcamp, Robotics Workshop
- **Community**: Environmental Club, Community Service

## 🔐 User Roles

### Student Role
- Browse and filter activities
- Register/unregister for events
- View activity details
- Track personal registrations

### Admin Role
- All student permissions plus:
- Create new activities
- Edit existing events
- Delete activities
- View registration analytics
- Monitor category performance

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with gradients and shadows
- **Interactive Elements**: Hover effects, smooth transitions
- **Color-Coded Categories**: Visual distinction between activity types
- **Status Indicators**: Registration status and event levels

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**vempalieswar-art**
- GitHub: [@vempalieswar-art](https://github.com/vempalieswar-art)
- Email: vempalieswar@gmail.com

## 🙏 Acknowledgments

- Built with React and Vite
- Inspired by modern educational platforms
- Designed for Green Valley High School community

---

⭐ **Star this repository** if you find it helpful!
