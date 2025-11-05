# ClassHub - Quick Start Guide

## 🎯 Getting Started in 5 Minutes

### Step 1: Install Dependencies
**Windows Users:**
```
Double-click setup.bat
```

**Mac/Linux Users:**
```bash
bash setup.sh
```

**Or manually:**
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm start
```

The application will automatically open at `http://localhost:3000`

### Step 3: Explore the Application

#### 🎓 As a Student:
1. The home page shows featured classes with 3D animations
2. Click "Classes" to browse all available classes
3. Click "Enter Class" to view materials
4. Click "Download" to get class materials

#### 👨‍🏫 As a Teacher:
1. Use the role selector in the navbar (top right)
2. Switch from "Student" to "Teacher"
3. Click "Teacher Panel" in the navigation
4. Click "Create New Class" to add a class
5. In your class, click "Upload Material" to share files

---

## 📱 Key Features

### 🎨 Beautiful 3D Animations
- **Hero Section**: Rotating 3D object with smooth animations
- **Cards**: Hover animations that lift and shadow
- **Transitions**: Smooth fade and slide effects throughout
- **Gradients**: Modern color gradients on buttons and text

### 📁 File Management
- **Drag & Drop Upload**: Simply drag files onto the upload area
- **Multiple File Types**: PDF, PowerPoint, Documents, Videos, etc.
- **Instant Downloads**: Students can quickly download materials
- **File Metadata**: See file size and upload date

### 👥 Role-Based Access
- **Student Dashboard**: View and download materials
- **Teacher Panel**: Create classes and manage materials
- **Statistics**: View class and material counts

---

## 🎮 Interactive Elements

### Navigation
- Click menu items to navigate
- Use role selector to switch between Student/Teacher
- Mobile menu (hamburger icon) for smaller screens

### Class Cards
- Hover to see smooth lift animation
- Click "Enter Class" to access materials
- See material count badges

### Upload Area
- Drag files to upload
- Click to browse your computer
- Visual feedback when dragging

### Download
- Click download button next to any material
- File type icons help identify content

---

## 🛠️ Customization Tips

### Change App Name
Edit `src/components/Navbar.js` - Change "ClassHub" to your preferred name

### Change Colors
Edit `src/styles/index.css` - Modify CSS color variables:
```css
--primary-color: #0064c8;
--secondary-color: #ff9600;
```

### Add Your Logo
1. Create an `img` folder in `public/`
2. Add your logo image
3. Update Navbar.js with new path

### Modify 3D Animation
Edit `src/components/AnimatedBackground.js` to change:
- 3D shape type
- Rotation speed
- Colors
- Position

---

## 📊 Data Structure

### Classes
```javascript
{
  id: 1,
  name: "Web Development 101",
  teacher: "John Doe",
  description: "Learn web development",
  materials: [/* ... */]
}
```

### Materials
```javascript
{
  id: 1,
  name: "Lecture 1.pdf",
  size: "2.4MB",
  date: "2024-01-10",
  type: "pdf"
}
```

---

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder ready to deploy.

---

## 📞 Troubleshooting

### Port 3000 Already in Use
The app will automatically try the next available port. Check the terminal for the actual port.

### Dependencies Won't Install
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Blank Page After npm start
- Check browser console (F12) for errors
- Ensure Node.js version is v14 or higher
- Try clearing browser cache

### 3D Animation Not Showing
- Check if Three.js loaded successfully
- Update your graphics drivers
- Try a different browser (Chrome recommended)

---

## 📚 Next Steps

1. **Explore Components**: Check `src/components/` folder
2. **Study Animations**: Review CSS files in `src/styles/`
3. **Understand State**: See `src/store/classStore.js`
4. **Add Features**: Create new components and pages
5. **Deploy**: Push to GitHub and deploy to Netlify/Vercel

---

## 🎓 Learning Resources

- **React**: https://react.dev
- **Framer Motion**: https://www.framer.com/motion
- **Three.js**: https://threejs.org
- **CSS**: https://developer.mozilla.org/en-US/docs/Web/CSS

---

## 💡 Pro Tips

✨ **3D Performance**: 3D animations work best on modern browsers (Chrome, Firefox, Safari Edge)

📱 **Mobile Testing**: Use Firefox DevTools (F12 → Responsive Design Mode) to test mobile layout

🎨 **Custom Colors**: Change all colors quickly by editing `:root` in `src/styles/index.css`

⚡ **Fast Development**: React Hot Reload automatically refreshes when you save files

📦 **Dependencies**: All dependencies are in `package.json` - add more with `npm install package-name`

---

Enjoy using **ClassHub**! 🚀
