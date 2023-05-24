<div id='top'>

<h1 align="center">Github Finder</a></h1>

<div align="center">Application to discover repositories on Github based on categories. When clicking on a button, the repositories appear in the slider below.</div>
<br /><br /> 

![App register](https://github.com/dropecosta/github-finder/assets/13908414/5dfe3c08-c0bd-415d-986f-38d648df464c)
<br /><br /> 
![App login](https://github.com/dropecosta/github-finder/assets/13908414/b8d6a75c-c5fe-4a90-a20d-308d0e4f8e19)
<br /><br /> 
![Home screen](https://github.com/dropecosta/github-finder/assets/13908414/a6d6642c-5bfd-4bce-837d-062a41befdc9)

### Build with

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Features

- [x] Display of repositories of a certain category according to the selected technology;
- [x] Register as a new user and log in to the restricted area;
- [x] Login with email and password and possibility to login with Google or Github;
- [x] Link to repositories and possibility to add and remove favorite repositories to favorites section;


### Available Scripts

In the project directory, you can run:

### `npm install`

Runs the test watcher in an interactive mode:

### `npm run dev`

I added the environment variables (.env) at the root of the project to facilitate the execution, if you want, you can change the values for your own access. To configure environment variables, add an ".env" file at the root of the application with the following content:

```
DATABASE_URL="mongodb+srv://dropecosta:bbyiIeoRn9GW68H9@cluster0.r2tj8yj.mongodb.net/test"
NEXTAUTH_JWT_SECRET="NEXT-JWT-SECRET"
NEXTAUTH_SECRET="NEXT-SECRET"
GITHUB_ID=< -- Your Github ID -- >
GITHUB_SECRET=< -- Your Github Secret -- >
GITHUB_AUTH_TOKEN=< -- Your Github Auth Token -- >
GOOGLE_CLIENT_ID=< -- Your GOOGLE_CLIENT_ID -- >
GOOGLE_CLIENT_SECRET=< -- Your GOOGLE_CLIENT_SECRET -- >
```

(If you have difficulty with this step, please contact me and I can help! :))


To login, register with email and password or access the login screen with the following credentials:

```
E-mail: test@gmail.com
Password: 1234
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
<br />

<a href='#top'>🔼 Back to top</a>

---

Developed with 🧡 by Pedro Reis
