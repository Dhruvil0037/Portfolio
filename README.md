
# Personal Portfolio Website

A modern and responsive portfolio website built with Next.js 13, TypeScript, and Tailwind CSS. Features a clean design, dark mode support, smooth animations, and a contact form.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Powered by Framer Motion
- **Contact Form**: Built-in email functionality using React Email & Resend
- **TypeScript**: Full type safety
- **Modern Tech Stack**: Next.js 13 with App Router
- **Server Actions**: Utilizing Next.js server actions for form handling
- **Tailwind CSS**: For styling and responsive design
- **Section Navigation**: Active section tracking and smooth scrolling
- **Context API**: For theme and active section management

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email Service**: React Email & Resend
- **Icons**: React Icons
- **Timeline**: React Vertical Timeline Component
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

## 📚 Project Structure

```
portfolio/
├── app/                  # Next.js app directory
├── components/          # React components
├── context/            # React context providers
├── lib/                # Utility functions and data
├── public/             # Static assets
├── email/             # Email templates
└── actions/           # Server actions
```

## 🌟 Key Components

- `Intro`: Hero section with personal introduction
- `About`: Detailed about me section
- `Projects`: Showcase of portfolio projects
- `Skills`: Technical skills display
- `Experience`: Work history timeline
- `Contact`: Contact form with email integration
- `Header`: Navigation header with active section highlighting
- `ThemeSwitch`: Dark/light mode toggle

## 🔧 Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Resend API key:
```env
RESEND_API_KEY=your_resend_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Deployment

The project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables
4. Deploy!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Dhruvil Dhamecha**
- LinkedIn: [Dhruvil Dhamecha](https://www.linkedin.com/in/dhruvil-dhamecha-14939b258/)
- GitHub: [@Dhruvil0037](https://github.com/Dhruvil0037)

## 🙏 Acknowledgments

- Next.js Documentation
- Tailwind CSS Documentation
- Framer Motion Documentation
- React Icons Library
- React Email & Resend for email functionality

Feel free to reach out if you have any questions or suggestions!
