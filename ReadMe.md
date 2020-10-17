# hmr

Hot module reload for express server and webpack client.

Project is prepared for deployment on Heroku.

# Clone locally

```
git clone https://github.com/easychessanimations/hmr.git
```

# Open in gitpod

[hmr gitpod terminal](https://gitpod.io/#https://github.com/easychessanimations/hmr)

# Install, build and start server

```
npm install

npm run build

node devserver.js
```

When the development server is running, modifying any file in `src` would rebuild the client and reload the page, 
modifying any file in `server` would reload the server and the page.