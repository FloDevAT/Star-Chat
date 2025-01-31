# Star-Chat

## Introduction

This application demonstrates the use of WebSockets to build a simple chat application. It also showcases how NX Monorepos can be used to efficiently combine backend and frontend applications.

![Chat Demo](https://github.com/FloDevAT/Star-Chat/blob/main/.screenshots/chat_demo.png)

## Setup Instructions

To run this application, follow these steps:

1. Install all dependencies:

```bash
   npm install
```

2. Create a `.env` file in the root of the project

```
JWT_SECRET=YOUR_JWT_SECRET
WS_PORT=8765
API_PORT=3333
```

3. Start both the frontend and backend services:

```bash
   npm run start:star-chat
```

## Security Considerations

This application includes a basic implementation of JWT (JSON Web Tokens) for authentication. However, since users connect using only their username—without a password—the JWT implementation is somewhat redundant and does not provide real security.

For a production-ready application, consider implementing a proper authentication mechanism with password protection and secure token handling.
