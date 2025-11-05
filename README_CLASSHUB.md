# ClassHub - Modern Class Management Platform

A modern, fully-featured class management platform built with React.js, featuring advanced 3D animations, intuitive UI, and seamless file management for teachers and students.

## ✨ Features

### For Teachers
- 📚 Create and manage multiple classes
- ☁️ Upload class materials (PDFs, PowerPoint, documents, videos, and more)
- 📊 Track class statistics and material uploads
- 🎓 Manage student access to materials
- 📈 Monitor engagement and material usage

### For Students
- 📖 Browse and access all available classes
- ⬇️ Download class materials easily
- 🔍 Search and filter materials
- 📱 Access materials on any device

### Technology Stack
- **Frontend Framework**: React 18.2.0
- **Animation Library**: Framer Motion for smooth UI transitions
- **3D Graphics**: React Three Fiber with Three.js
- **State Management**: Zustand for lightweight state management
- **Routing**: React Router v6
- **Styling**: CSS3 with modern features and animations
- **Icons**: Font Awesome 6.4.0

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Vickyrrrrrr/education-website.git
cd education-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js              # Navigation bar with role selector
│   ├── Footer.js              # Footer component
│   ├── HeroSection.js         # Hero section with 3D animation
│   ├── AnimatedBackground.js  # 3D background animation
│   ├── FeaturesSection.js     # Features showcase
│   ├── MaterialUpload.js       # File upload component
│   ├── MaterialList.js        # Display uploaded materials
│   └── ClassForm.js           # Create new class form
├── pages/
│   ├── Home.js                # Landing page
│   ├── ClassDashboard.js      # Browse all classes
│   ├── ClassDetail.js         # View class details and materials
│   └── TeacherPanel.js        # Teacher control panel
├── store/
│   └── classStore.js          # Zustand state management
├── styles/
│   ├── index.css              # Global styles
│   ├── App.css                # App layout styles
│   ├── Navbar.css             # Navigation styles
│   ├── Footer.css             # Footer styles
│   ├── HeroSection.css        # Hero section styles
│   ├── FeaturesSection.css    # Features section styles
│   ├── ClassDashboard.css     # Dashboard styles
│   ├── ClassDetail.css        # Class detail styles
│   ├── MaterialUpload.css     # Upload component styles
│   ├── MaterialList.css       # Material list styles
│   ├── TeacherPanel.css       # Teacher panel styles
│   └── ClassForm.css          # Form styles
├── App.js                     # Main app component
└── index.js                   # React entry point
```

## 🎨 UI/UX Features

### 3D & Advanced Animations
- **Animated 3D Background**: Rotating icosahedron in the hero section
- **Smooth Transitions**: Framer Motion animations throughout
- **Hover Effects**: Interactive card animations and hover states
- **Gradient Backgrounds**: Modern gradient overlays and text
- **Float Animations**: Floating icon animations
- **Glassmorphism**: Frosted glass effects on hero content

### Color Scheme
- **Primary Color**: #0064c8 (Professional Blue)
- **Secondary Color**: #ff9600 (Vibrant Orange)
- **Gradients**: Linear gradients combining primary and secondary colors

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Mobile menu toggle
- Optimized for all screen sizes (mobile, tablet, desktop)

## 🔧 Usage Guide

### For Students
1. Navigate to the home page to see available classes
2. Click "Classes" in the navigation bar to see all available classes
3. Click "Enter Class" on any class card to view materials
4. Download any material by clicking the "Download" button

### For Teachers
1. Use the role selector in the navbar to switch to "Teacher" mode
2. Click on "Teacher Panel" to access the control center
3. Create a new class using the "Create New Class" button
4. Upload materials to your classes by clicking "Upload Material"
5. View statistics about your classes in the dashboard

## 🎯 Material Upload

The upload component supports:
- **PDF Files** (.pdf)
- **PowerPoint Presentations** (.pptx)
- **Documents** (.doc, .docx)
- **Videos** (.mp4, .mov, .avi, etc.)
- **Other Files** (any file type)

### File Upload Features
- Drag and drop support
- File size tracking
- Auto-detection of file type
- Upload date tracking
- Easy file management

## 📊 State Management

The app uses Zustand for state management with the following store:

- `classes`: Array of all classes
- `addClass`: Function to create new classes
- `addMaterial`: Function to upload materials to a class
- `deleteMaterial`: Function to remove materials
- `getClassById`: Function to fetch specific class data

## 🛠️ Customization

### Change Colors
Edit the CSS variables in `src/styles/index.css`:
```css
:root {
  --primary-color: #0064c8;
  --secondary-color: #ff9600;
  /* ... other variables ... */
}
```

### Modify Animations
Adjust animation properties in individual CSS files or modify Framer Motion variants in component files.

### Add New Features
- Create components in `src/components/`
- Add pages in `src/pages/`
- Update store in `src/store/classStore.js`
- Create corresponding CSS files in `src/styles/`

## 🚀 Deployment

### Deploy to Netlify
```bash
npm run build
# Deploy the 'build' folder to Netlify
```

### Deploy to Vercel
```bash
vercel
```

### Deploy to GitHub Pages
```bash
npm run build
# Configure package.json with homepage
```

## 📝 Future Enhancements

- [ ] User authentication and profiles
- [ ] Real-time notifications
- [ ] Comments and discussions on materials
- [ ] Assignment submission system
- [ ] Video streaming support
- [ ] Advanced search and filters
- [ ] Dark mode toggle
- [ ] Mobile app version
- [ ] Admin panel for system management
- [ ] Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Vickyrrrrrr**
- GitHub: [@Vickyrrrrrr](https://github.com/Vickyrrrrrr)

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Animations powered by [Framer Motion](https://www.framer.com/motion)
- 3D graphics by [Three.js](https://threejs.org) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- Icons from [Font Awesome](https://fontawesome.com)

---

**Happy Teaching & Learning! 🎓**
